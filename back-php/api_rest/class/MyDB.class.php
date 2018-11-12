<?php
   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('test.db');
      }
   
	public function conectar(){
//		$db = new MyDB();
		if(!$this) {
			echo $this->lastErrorMsg();
		} else {
			echo "Opened database successfully\n";
		}
		return $this;
	}
 	  
/**	$db->exec('create table if not exists users (
        id integer primary key autoincrement,
        dni text,
        first_name text,
        last_name text
    )');
	$db->exec("insert into users values (1,'28930655', 'Carlos', 'Santillan')");

	$resultado = $db->query('SELECT * FROM users');
	var_dump($resultado->fetchArray());
	*/
   }
?>