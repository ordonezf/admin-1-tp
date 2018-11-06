from flask import Flask, request, jsonify
import database as db

app = Flask(__name__)

db = db.DataBase('database.db')


@app.route('/')
def root():
    return 'Go to /search_turns'


@app.route('/search_turns')
def search_turns():
    key = request.args.get('search').lower()
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
    '''
    return jsonify(id=1,
                   practice='Guardia',
                   doctor='Juan Carlos',
                   time='2018-11-07 13:00',
                   )
