<?php
//GRABA UN TURNO, RECIBE: DOCTOR_ID y FECHA (YYYY-MM-DD HH:MM:SS.SSS)
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
		$doctor=$datos->doctor_id;
		$time=$datos->time;
		$avaliable=true;
		if ($doctor!=null AND $time!=null){
			$sql="INSERT INTO turns (doctor_id, time, available)VALUES('".$doctor."','".$time."','".$available."');";
			echo $sql;
			$results=$db->exec($sql);
			if  ( $results!=false){

				// set response code - 200 OK
				http_response_code(200);
			 
				echo json_encode(
					array("message" => "Turno grabado.")
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
			echo json_encode(array("message" => "No se puede grabar el turno, informacion incompleta."));
		}

   }


?>
