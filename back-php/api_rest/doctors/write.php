<?php
//GRABA UN DOCTOR, RECIBE: DNI, LICENCE(NRO MATRICULA), FIRST_NAME, LAST_NAME
//include_once '../class/MyDB.class.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
//header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');


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
		$datos = json_decode(file_get_contents("php://input"));
		//echo "id: ".$_GET['id'];
		//$id=isset($_GET['id']) ? $_GET['id'] : die();
		//$id=$datos->id;
		$dni=$datos->dni;
		$first_name=$datos->first_name;
		$last_name=$datos->last_name;
		$licence=$datos->licence;
		if ($dni!=null AND $first_name!=null AND $last_name!=null){
			$sql="INSERT INTO doctors (dni, licence, first_name, last_name)VALUES('".$dni."','".$licence."','".$first_name."','".$last_name."');";
			echo $sql;
			$results=$db->exec($sql);
			if  ( $results!=false){

				// set response code - 200 OK
				http_response_code(200);
			 
				echo json_encode(
					array("message" => "Usuario grabado.")
				);
			}else{
				// set response code - 404 Not found
				http_response_code(404);
			 
				// tell the user no products found
				echo json_encode(
					array("message" => "Hubo un problema")
				);
			}
			
		}else{

			// set response code - 400 bad request
			http_response_code(400);

			// tell the user
			echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
		}

   }


?>
