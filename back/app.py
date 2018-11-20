import logging
from flask_cors import CORS
from datetime import datetime as dt
from flask import Flask, request, jsonify, make_response

import database as db

app = Flask(__name__)
CORS(app)

db = db.DataBase('database/database.db')


@app.route('/')
def root():
    return 'Go to /search_turns'


@app.route('/search_turns/<search>', methods=['GET'])
def search_turns(search):
    app.logger.info('Hit /search_turns/%s', search)
    sql = '''
    select
        t.id,
        s.name as specialty,
        d.first_name || ' ' || d.last_name as doctor_name,
        t.time
    from turns t
    join doctors_specialties ds on ds.id = t.doctor_specialty_id
    join doctors d on d.id = ds.doctor_id
    join specialties s on s.id = ds.specialty_id
    where t.available = 'true'
        and (s.name like '%{key}%' or
             d.first_name like '%{key}%' or
             d.last_name like '%{key}%'
             )
    order by t.time desc
    ;
    '''.format(key=search)

    res = db.query_database(sql)
    d = [{'id': x[0], 'practice': x[1], 'doctor': x[2], 'time': x[3]} for x in res]

    return make_response(jsonify(d), 200)


@app.route('/signup', methods=['POST'])
def signup():
    try:
        app.logger.info('Hit /signup')
        data = request.get_json()
        app.logger.info(data)
        sql = '''
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
        d = {'user_id': user_id[0]}

        return make_response(jsonify(d), 200)
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
        sql = '''
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


@app.route('/get_specialties', methods=['GET'])
def get_specialties():
    app.logger.info('Hit /get_specialties')
    res = db.query_database('select id, name from specialties;')

    dic = [{'id': x[0], 'value':x[1]} for x in res]
    app.logger.info(dic)

    return make_response(jsonify(dic), 200)


@app.route('/get_physicians/<specialty_id>', methods=['GET'])
def get_physicians(specialty_id):
    app.logger.info('Hit /get_physicians/%s', specialty_id)
    sql = '''
    select
        ds.id,
        'Dr. ' || d.last_name as doctor
    from doctors_specialties ds
    join doctors d on d.id = ds.doctor_id
    where ds.specialty_id = ?
    '''
    res = db.query_database(sql, (specialty_id))

    dic = [{'id': x[0], 'value':x[1]} for x in res]
    app.logger.info(dic)

    return make_response(jsonify(dic), 200)


@app.route('/get_dates/<doctor_specialty_id>', methods=['GET'])
def get_dates(doctor_specialty_id):
    app.logger.info('Hit /get_dates/%s', doctor_specialty_id)
    sql = '''
    select
        id,
        time
    from turns
    where available = 'true' and doctor_specialty_id = ?
    ;
    '''
    res = db.query_database(sql, (doctor_specialty_id))

    dic = [{'id': x[0], 'value':x[1]} for x in res]
    app.logger.info(dic)

    return make_response(jsonify(dic), 200)


@app.route('/new_appointment', methods=['POST'])
def new_appointment():
    app.logger.info('Hit /new_appointment')
    data = request.get_json()
    turn = data['turn']
    now = dt.now().strftime('%Y-%m-%d %H:%M')
    app.logger.info(turn)
    app.logger.info('check if turn is reserved')
    turn_id = [turn['turn_id']]
    is_available = db.query_database('''select available from turns where id = ?''', turn_id)[0][0]
    app.logger.info(is_available)
    if is_available == 'false':
        app.logger.info('Turn is reserved')
        return make_response('Error: turn is occupied!', 205)
    app.logger.info('Reserving turn')
    db.modify_database('''update turns set available = "false" where id = ? ''', turn_id)

    sql = '''
    insert into appointments (user_id, turn_id, created_at, deleted_at)
    values
        (?,?,?,null)
    ;
    '''
    payload = (turn['user_id'], turn['turn_id'], now)

    db.modify_database(sql, payload)
    app.logger.info('New appointment')
    return make_response('Successfully created appointment!', 200)


if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
