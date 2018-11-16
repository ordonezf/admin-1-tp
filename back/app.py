import logging
from flask_cors import CORS
from flask import Flask, request, jsonify

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


@app.route('/back/signup', methods=['POST'])
def signup():
    app.logger.info('Hit /signup')
    req = request.form
    data = {k: req[k] for k in req}
    app.logger.info(data)

    # Do something

    return jsonify([data])

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)