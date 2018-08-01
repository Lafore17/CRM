<?php

require_once $_SERVER['DOCUMENT_ROOT']."/Classes/autoload.php";

use Classes\Utils\JSONResponse;

$path = stripslashes($_GET['api_path']);
$method = $_SERVER['REQUEST_METHOD'];
unset($_GET['api_path']);

$controllersPath = $_SERVER['DOCUMENT_ROOT']."/Classes/Controllers";
$namespace = "Classes\Controllers\\";
$files = scandir($controllersPath);

$obj = null;

foreach($files as $file){
    if(is_file($controllersPath."/".$file)){
        $class = explode(".",$file);
        $class = $namespace.$class[0];
        require_once $controllersPath."/".$file;
        $contents = file_get_contents($controllersPath."/".$file);
        
        $search = "@http $method $path";
        if(strpos($contents, $search) !== FALSE){
            $regexp = "#\s*$search\s*\n\s*[a-z]*\s*function\s*([a-zA-Z\_0-9]+)#mi";
            #echo $regexp;
            preg_match($regexp, $contents, $matches);
            $method = $matches[1];
            $obj = new $class();
        }
    }
}

if(!$obj){
    JSONResponse::error("No handler found for $path!");
}

try{
    $result = $obj->$method();
    JSONResponse::ok($result);
}catch(\Exception $e){
    JSONResponse::error($e->getMessage());
}