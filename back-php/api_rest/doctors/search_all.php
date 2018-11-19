<?php
//RETORNA UN DOCTOR buscando por FIRST_NAME or LAST_NAME
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
		//$id=$datos->id;
		//$dni=$datos->dni;
		$first_name=$datos->first_name;
		$last_name=$datos->last_name;
		$sql='SELECT * FROM doctors';
		if ($first_name != null OR $last_name!=null){
			if ($first_name!=null and $last_name!=null){
				$sql="SELECT * FROM doctors WHERE first_name like '%".$first_name."%' or last_name like '%".$last_name."%'";
			}elseif ($first_name!=null){
				$sql="SELECT * FROM doctors WHERE first_name like '%".$first_name."%'";
			}else{
				$sql="SELECT * FROM doctors WHERE last_name like '%".$last_name."%'";
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
			echo json_encode(array("message" => "No se estableci? un criterio de b?squeda."));
		}

   }


?>
