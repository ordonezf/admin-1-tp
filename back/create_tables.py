create_tables = {
    'USER_TABLE': '''
    create table if not exists users (
        id integer primary key autoincrement,
        dni text,
        first_name text,
        last_name text,
        password text
    );
    ''',
    'DOCTORS_TABLE': '''
    create table if not exists doctors (
        id integer primary key autoincrement,
        first_name text,
        last_name text
    );
    ''',
    'SPECIALTIES_TABLE': '''
    create table if not exists specialties (
        id integer primary key autoincrement,
        name text
    );
    ''',
    'DOCTORS_SPECIALTIES_TABLE': '''
    create table if not exists doctors_specialties (
        id integer primary key autoincrement,
        specialty_id int not null,
        doctor_id int not null,
        foreign key (specialty_id) references specialties(id),
        foreign key (doctor_id) references doctors(id)
    );
    ''',
    'TURNS_TABLE': '''
    create table if not exists turns (
        id integer primary key autoincrement,
        doctor_specialty_id int not null,
        time text,
        available boolean default true,
        foreign key (doctor_specialty_id) references doctors_specialties(id)
    );
    ''',
    'APPOINTMENTS_TABLE': '''
    create table if not exists appointments (
        id integer primary key autoincrement,
        user_id int not null,
        turn_id int not null,
        created_at text,
        deleted_at text,
        foreign key (user_id) references users(id),
        foreign key (turn_id) references turns(id)
    );
    '''
}
