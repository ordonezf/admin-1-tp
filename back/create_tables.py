create_tables = {
    'USER_TABLE': '''
    create table if not exists users (
        id integer primary key autoincrement,
        dni text,
        first_name text,
        last_name text
    );
    ''',
    'DOCTORS_TABLE': '''
    create table if not exists doctors (
        id integer primary key autoincrement,
        first_name text,
        last_name text
    );
    ''',
    'PRACTICE_TABLE': '''
    create table if not exists practices (
        id integer primary key autoincrement,
        name text,
        doctor_id int no null,
        foreign key (doctor_id) references doctors(id)
    );
    ''',
    'TURNS_TABLE': '''
    create table if not exists turns (
        id integer primary key autoincrement,
        practice_id int not null,
        doctor_id id not null,
        time text,
        available boolean default true,
        foreign key (doctor_id) references doctors(id),
        foreign key (practice_id) references practices(id)
    );
    ''',
    'APPOINTMENTS_TABLE': '''
    create table if not exists appointments (
        id integer primary key autoincrement,
        user_id int not null,
        doctor_id int not null,
        created_at text,
        deleted_at text,
        foreign key (doctor_id) references doctors(id),
        foreign key (user_id) references users(id)
    );
    '''
}
