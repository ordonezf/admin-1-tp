<?php
//RETORNA UN USUARIO INDICNADO ID o DNI
//include_once '../class/MyDB.class.php';

// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
//header("Access-Control-Allow-Methods: POST");
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
		$id=$datos->id;
		$dni=$datos->dni;
		if ($id != null OR $dni!=null){
			if ($dni!=null){
				$sql="SELECT * FROM users WHERE dni=".$dni;
			}else{
				$sql="SELECT * FROM users WHERE id=".$id;
			}
			echo $sql;
			$numrows = $results=$db->query($sql);
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
			
		}else{

			// set response code - 400 bad request
			http_response_code(400);

			// tell the user
			echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
		}

   }


?>
