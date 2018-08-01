<?php

namespace Classes\Models\Companies;
use Classes\Utils\Sql;

class CompanyFactory{
	
	function __construct() {
		$this->sql = new Sql();
	}
	
	function createCompany($name, $site, $contact_person, $email, $phone){
		$this->sql->query = ("INSERT INTO company (name, site, contact_person, email, phone) values ('$name', '$site','$contact_person','$email','$phone')");
		
		$id = $this->sql->getInsertId();
		return new Company($id);
	}
	
	function deleteCompany(Company $company) {
		$this->sql->query = ("DELETE FROM ".Company::TABLE_NAME." WHERE id=".$company->getId()."");
	}
	
	function getCompanies{ // возможно переделать под постраничный вывод
		$res = $this->sql->getAsoocArray("SELECT id FROM ".Company::TABLE_NAME."");
		return array_map(function($e) { return new Company(+$e['id']); }, $res)
	}
	
	
}