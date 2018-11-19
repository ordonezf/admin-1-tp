insert_into_tables = {
    'DOCTORS_TABLE': '''
    insert into doctors (first_name, last_name)
    values
        ("John", "Watson"),
        ("Stephen", "Strange"),
        ("Alberto", "Cormillot"),
        ("Leonard", "McCoy"),
        ("Meredith", "Gray"),
        ("Allison", "Cameron")
    ;
    ''',
    'SPECIALTIES_TABLE': '''
    insert into specialties (name)
    values
        ("General"),
        ("Surgeon"),
        ("Nutritionist"),
        ("Traumatologist"),
        ("Pediatrician")
    ;
    ''',
    'DOCTORS_SPECIALTIES_TABLE': '''
    insert into doctors_specialties (specialty_id, doctor_id)
    values
        ("1", "1"),
        ("2", "2"),
        ("3", "3"),
        ("4", "4"),
        ("1", "4"),
        ("1", "5"),
        ("2", "5"),
        ("1", "6"),
        ("5", "6")
    ;
    ''',
    'TURNS_TABLE': '''
    insert into turns (doctor_specialty_id, time, available)
    values
        ("1", "2018-11-27 13:00", "true"),
        ("2", "2018-11-28 14:30", "true"),
        ("3", "2018-11-24 17:30", "true"),
        ("4", "2018-11-28 15:30", "true"),
        ("5", "2018-12-01 09:30", "true"),
        ("6", "2018-11-25 10:00", "true"),
        ("7", "2018-11-25 10:30", "true"),
        ("8", "2018-11-27 13:00", "true"),
        ("9", "2018-12-03 08:00", "true"),
        ("1", "2018-11-30 16:00", "true"),
        ("2", "2018-11-28 16:00", "true"),
        ("3", "2018-11-25 13:00", "true"),
        ("4", "2018-12-01 17:30", "true")
    ;
    '''
}
