<?php

namespace Classes\Controllers;
use Classes\Utils\Sql;
use Classes\Models\User\User;

class CompanyController{
	
	# @http POST /company/create/
	function createCompany() {
	}
	
	# @http GET /user/logout/
	function auth() {
		if (isset($_POST['logout'])) {
			$user->userLogout();
		}
	}
}