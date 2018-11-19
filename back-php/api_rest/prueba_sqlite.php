<?php
   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('test.db');
      }
   }
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   } else {
      echo "Opened database successfully\n";
	  
	//CREAR USUARIOS
/*	$db->exec('create table if not exists users (
        id integer primary key autoincrement,
        dni text,
        first_name text,
        last_name text
    )');*/
//	$db->exec("insert into users (id,dni,first_name, last_name) values (2,'28930666', 'Carlos', 'Santillan')");
//	$db->exec("commit");

	// CREAR DOCTORES
	//$db->exec('drop table  doctors;');
	
	// CREAR DOCTORES
	$db->exec('create table if not exists doctors (
        id integer primary key autoincrement,
        dni text,
		licence integer,
        first_name text,
        last_name text
    );');
	

	//$db->exec('drop table  turns;');
	// CREAR TURNOS (FIJOS, debería haber un proceso que los genere)
	$db->exec('create table if not exists turns (
        id integer primary key autoincrement,
        doctor_id id not null,
        time text,
        available boolean default true,
        foreign key (doctor_id) references doctors(id)
    );');
//        foreign key (doctor_id) references doctors(id),

	//$db->exec('drop table  appointments;');

	// CREAR CITAS
	$db->exec('create table if not exists appointments (
        id integer primary key autoincrement,
        user_id int not null,
        doctor_id int not null,
        created_at text,
        deleted_at text,
        foreign key (doctor_id) references doctors(id),
        foreign key (user_id) references users(id)
    );');
	
	$resultado = $db->query('SELECT * FROM users');
	echo date("Y-m-d H:i:s.000");
	var_dump($resultado->fetchArray());
   }
?>