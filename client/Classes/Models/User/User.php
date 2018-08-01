<?php

namespace Classes\Models\User;
use Classes\Utils\Sql;

class User{
	const TABLE_NAME = "users";
	
	function __construct($login) { 
        
        $sql = Sql::getInstance();
        $r = $sql->getAssocArray("SELECT * FROM ".self::TABLE_NAME." WHERE login='$login'");
        $this->sql->logError(__METHOD__);
        $this->id = $id;
        
        if( empty($r) ){
            throw new NonExistingItemException("Нет такого пользователя с id $id"); // посмотреть, где эксепшн
        }
        
        $r = $r[0];
		$this->id = $r['id'];
        $this->login = $r['login'];
		$this->pw = $r['pw'];
		
	} 
	
	function userAuth() {
		session_start();
		$_SESSION['uid'] = $this->id;
		$_SESSION['login'] = $this->login;
		header('Location: ../main/');
	}
	
	function userLogout() {
		unset($_SESSION['uid']);
		unset($_SESSION['login']);
		header('Location: ../login/');
	}
	
	public function getId() {
        return $this->id;
    }
}