<?php
// RETORNA TODOS LOS usuarios DE LA TABLA USERS

//include_once '../class/MyDB.class.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


   class MyDB extends SQLite3 {
      function __construct() {
         $this->open('../test.db');
      }
   }
   
   $db = new MyDB();
   if(!$db) {
      echo $db->lastErrorMsg();
   } else {
		echo "Opened database successfully\n";
	  
		$data= array();

		$numrows = $results=$db->query('SELECT * FROM users');
		if  ( $numrows!=false){
			while ($res= $results->fetchArray(1))
			{
			//insert row into array
			array_push($data, $res);

			}

			// set response code - 200 OK
			http_response_code(200);
		 
			// show products data in json format
			echo json_encode($data);
		}else{
			// set response code - 404 Not found
			http_response_code(404);
		 
			// tell the user no products found
			echo json_encode(
				array("message" => "No clients found.")
			);
		}

   }


?>
