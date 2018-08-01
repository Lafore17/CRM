<?php

namespace Classes\Models\Companies;
use Classes\Utils\Sql;

class Company{
	function __construct(int $id) {
		if( $id <= 0 ){
            throw new WrongIdException("Wrong id $id");
        }
        
        $sql = Sql::getInstance();
        $r = $sql->getAssocArray("SELECT * FROM ".self::TABLE_NAME." WHERE id=$id");
        //$this->sql->logError(__METHOD__);
        $this->id = $id;
        
        if( empty($r) ){
            throw new NonExistingItemException("Нет такой компании с id $id");
        }
        
        $r = $r[0];
        $this->company_name = $r['company_name'];
        $this->site = $r['site'];
        $this->contact_person = $r['contact_person'];
        $this->phone_number = $r['phone_number'];
        $this->email = $r['email'];
	} 
	
	function updateCompany() { //todo получить id компании, чтобы поизвести обновление
		$this->sql->query = ("UPDATE company SET 
								name='$this->name'
								,site='$this->site'
								,contact_person='$this->contact_person'
								,email='$this->email'
								,phone='$this->phone' 
								WHERE id='$this->id'");
	}
	
	public function getId() {
        return $this->id;
    }
	
	public function getName() {
        return $this->name;
    }
	
	public function getSite() {
        return $this->site;
    }
	
	public function getContactPerson() {
        return $this->contact_person;
    }
	
	public function getEmail() {
        return $this->email;
    }
	
	public function getPhone() {
        return $this->phone;
    }
}