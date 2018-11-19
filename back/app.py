import logging
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response

import database as db

app = Flask(__name__)
CORS(app)

db = db.DataBase('database/database.db')


@app.route('/')
def root():
    return 'Go to /search_turns'


@app.route('/search_turns')
def search_turns():
    app.logger.info('Hit /search_turns')
    key = request.args.get('search').lower()
    app.logger.info(key)
    sql = '''
    select
        t.id,
        p.name as practice,
        concat(d.first_name, ' ', d.last_name) as doctor_name,
        t.time,
    from turns t
    join doctors d on d.id = t.doctor_id
    join practices p on p.id = t.practice_id
    where t.available
        and (p.name like '%{key}%' or
             d.first_name like '%{key}%' or
             d.last_name like '%{key}%' or
             )
    order by t.time desc
    ;
    '''

    d = {'id': 1,
         'practice': 'Guardia',
         'doctor': key,
         'time': '2018-11-07 13:00'
         }
    return jsonify([d])

@app.route('/signup', methods=['POST'])
def signup():
    try:
        app.logger.info('Hit /signup')
        data = request.get_json()
        app.logger.info(data)
        sql ='''
        insert into users(
        dni,
        first_name,
        last_name,
        password) values(?,?,?,?); 
        '''

        user = data['user']

        credentials = (user['dni'], user['password'])

        count_users = db.query_database("select count(*) from users where dni=? and password=?;", credentials)[0][0]

        if (count_users > 0):
            msg = "Attempted to create user {}, but a user with these credentials already exists!".format(user)
            app.logger.error(msg)
            return make_response("User credentials invalid!", 403)

        db.modify_database(sql, (user['dni'], user['first_name'], user['last_name'], user['password']))

        app.logger.info("Insert: created new user {}".format(user))

        return make_response("Successfully created user!", 201)
    except Exception as e:
        app.logger.error("Error creating new user {} : {}".format(user, e))
        return make_response("Error creating user! {}".format(e), 500)


@app.route('/signin', methods=['POST'])
def signin():
    try:
        app.logger.info('Hit /signin')
        data = request.get_json()
        app.logger.info(data)

        user = data['user']

        credentials = (user['dni'], user['password'])

        userid_matches = db.query_database("select * from users where dni=? and password=?;", credentials)

        if (len(userid_matches)==0):
            return make_response("User credentials invalid!", 403)

        user_id = userid_matches[0]

        app.logger.info("Found {} matching users for credentials {}".format(user_id,credentials))

        return make_response(jsonify(user_id), 200)
    except Exception as e:
        return make_response("Error at signin! {}".format(e), 500)

@app.route('/users', methods=['GET'])
def users():
    try:
        app.logger.info('Hit /users')
        users = db.query_database("select id, dni, first_name, last_name from users;")
    
        return make_response(jsonify(users=users), 200)

    except Exception as e:
        return make_response("Error fetching users! {}".format(e), 500)

@app.route('/users/<user_id>', methods=['GET'])
def user_by_id(user_id):
    try:
        app.logger.info('Hit GET /users/{}'.format(user_id))
        user_matches = db.query_database("select id, dni, first_name, last_name from users where id=?;", (user_id))
        if (len(user_matches) == 0):
            return make_response(jsonify(user=()), 200)
        return make_response(jsonify(user=user_matches[0]), 200)

    except Exception as e:
        return make_response("Error fetching user {}! {}".format(user_id, e), 500)

@app.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        app.logger.info('Hit PUT /users/{}'.format(user_id))
        data = request.get_json()
        user_matches = db.query_database("select count(*) from users where id=?;", (user_id))[0][0]

        if (user_matches == 0):
            return make_response("No user was found with id {}".format(user_id), 204)

        user = data['user']

        sql = '''
            update users
            set dni=?,
            first_name=?,
            last_name=? where id=?; 
            '''
        db.modify_database(sql, (user['dni'], user['first_name'], user['last_name'], user_id))

        return make_response("Success!", 200)
    
    except Exception as e:
        return make_response("Error updating user {}! {}".format(user_id, e), 500)

@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        app.logger.info('Hit DELETE /users/{}'.format(user_id))
        user_matches = db.query_database("select count(*) from users where id=?;", (user_id))[0][0]

        if (user_matches == 0):
            return make_response("No user was found with id {}".format(user_id), 204)

        sql = '''
            delete from users where id=?; 
            '''
        db.modify_database(sql, (user_id))

        return make_response("Success!", 200)


    except Exception as e:
        app.logger.error("Error deleting user {}! {}".format(user_id, e))
        return make_response("Error deleting user {}! {}".format(user_id, e), 500)

@app.route('/doctors', methods=['GET'])
def doctors():
    try:
        app.logger.info('Hit /doctors')
        doctors = db.query_database("select * from doctors;")
    
        return make_response(jsonify(doctors=doctors), 200)

    except Exception as e:
        app.logger.error("Error fetching doctors! {}".format(e))
        return make_response("Error fetching doctors! {}".format(e), 500)


@app.route('/doctors', methods=['POST'])
def create_doctor():
    try:
        app.logger.info('Hit POST /doctors')
        data = request.get_json()
        app.logger.info(data)
        sql ='''
            insert into doctors(
            first_name,
            last_name) values(?,?); 
            '''

        doctor = data['doctor']
        db.modify_database(sql, (doctor['first_name'], doctor['last_name']))

        app.logger.info("Insert: created new doctor {}".format(doctor))

        return make_response("Successfully created doctor!", 201)
    except Exception as e:
        app.logger.error("Error creating new doctor {} : {}".format(doctor, e))
        return make_response("Error creating doctor! {}".format(e), 500)

    
    return make_response(jsonify(doctors=doctors), 200)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)