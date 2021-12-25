<?php
    header('Access-Control-Allow-Origin: *');
    require_once('config.php');
    
    function themdanhmuc(){
        echo "Ban da goi ham them danh muc";
    }

    function two(){return 2;}

    if ( isset($_GET['action']) && !empty(isset($_GET['action'])) ) {
        $action = $_GET['action'];
        switch( $action ) {
          case "themdanhmuc":{
             themdanhmuc();
          }break;
      
          case "two":{
             two();
          }break;
      
          default: {
            // do not forget to return default data, if you need it...
          }
        }
      }
?>