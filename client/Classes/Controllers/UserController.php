<?php

namespace Classes\Controllers;
use Classes\Utils\Sql;
use Classes\Models\User\User;

class UserController{
	
	# @http POST /user/auth/
	function auth() {
		$login = $_POST['login'];
		$pw = $_POST['pw'];
		$user = new User($login);
		if ($pw == $user->pw) {
			$user->userAuth();
		} else {
			echo 'Ошибка авторизации';
			return;
		}
	}
	
	# @http GET /user/logout/
	function auth() {
		if (isset($_POST['logout'])) {
			$user->userLogout();
		}
	}
}