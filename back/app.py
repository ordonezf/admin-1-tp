import logging
from flask_cors import CORS
from flask import Flask, request, jsonify, make_response

import database as db

app = Flask(__name__)
CORS(app)

db = db.DataBase('database.db')


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
        username,
        birthday,
        email,
        password) values(?,?,?,?,?,?,?); 
        '''

        user = data['user']

        credentials = (user['username'], user['password'])

        matching_users = db.query_database("select count(*) from users where username=? and password=?;", credentials)[0][0]

        user = (user['dni'], user['first_name'], user['last_name'], user['username'], user['birthday'], user['email'], user['password'])

        if (matching_users > 0):
            msg = "Attempted to create user {}, but a user with these credentials already exists!".format(user)
            app.logger.error(msg)
            return make_response("User credentials invalid!", 403)

        db.modify_database(sql, user)

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

        credentials = (user['username'], user['password'])

        userid_matches = db.query_database("select * from users where username=? and password=?;", credentials)[0]

        if len(userid_matches)==0:
            return make_response("User credentials invalid!", 403)

        userid = userid_matches[0]

        app.logger.info("Found {} matching users for credentials {}".format(userid,credentials))

        return make_response(jsonify(userid), 200)
    except Exception as e:
        return make_response("Error at signin! {}".format(e), 500)

@app.route('/users', methods=['GET'])
def users():
    app.logger.info('Hit /users')
    users = db.query_database("select id, username, first_name, last_name, dni, birthday, email from users;")
    
    return make_response(jsonify(users=users), 200)

@app.route('/users/<user_id>', methods=['GET'])
def user_by_id(user_id):
    app.logger.info('Hit /users/{}'.format(user_id))
    user = db.query_database("select id, username, first_name, last_name, birthday, email from users where id=?;", (user_id))[0]
    return make_response(jsonify(user=user), 200)

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)