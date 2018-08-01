<?php

ini_set('display_errors', E_ALL);
spl_autoload_register(function ($class) {
    $root = $_SERVER['DOCUMENT_ROOT'];
    
    $class= str_replace("\\","/",$class);
    $path = "$root/$class.php";
    if(is_file($path)){
        require_once($path);    
    }else{
        throw new Exception("Unable to load class $class! File /$class.php not found.");
    }
});