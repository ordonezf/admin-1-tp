<?php
//RETORNA UN TURNO INDICNADO ID DE DOCTOR
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
		echo "datos:".$datos->id;
		//echo "id: ".$_GET['id'];
		//$id=isset($_GET['id']) ? $_GET['id'] : die();
		$turno=$datos->id;
		if ($turno != null){
			$sql="SELECT available FROM turns WHERE id=".$turno;
			echo $sql;
			$numrows = $results=$db->query($sql);
			if  ( $numrows!=false){
				$res= $results->fetchArray(1);
				if ($res['available']==1){
					$sql="UPDATE turns SET available=0 WHERE id=".$turno.";";
					$results=$db->exec($sql);
				}else{
					$sql="UPDATE turns SET available=1 WHERE id=".$turno.";";
					$results=$db->exec($sql);					
				}
				if  ( $results!=false){

					// set response code - 200 OK
					http_response_code(200);
				 
					echo json_encode(
						array("message" => "Turno actualizado.")
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
				// set response code - 404 Not found
				http_response_code(404);
			 
				// tell the user no products found
				echo json_encode(
					array("message" => "No clients found.")
				);
			}
			
		}else{

			// set response code - 400 bad request
			http_response_code(400);

			// tell the user
			echo json_encode(array("message" => "No se puede actualizar el turno. Faltan datos."));
		}

   }


?>
