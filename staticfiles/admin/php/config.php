<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */
// define('DB_SERVER', '156.67.222.155:3306');
// define('DB_USERNAME', 'u386034025_sa');
// define('DB_PASSWORD', '12BaBonNam@');
// define('DB_NAME', 'u386034025_diep_db');
 
// /* Attempt to connect to MySQL database */
// $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// local db
$servername = "localhost";
$database = "diep_db";
$username = "root";
$password = "";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
//  echo 'checking connection to mysql ...<br>';
// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
// else {
//     echo 'Connected';
// }
?>