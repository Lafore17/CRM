<?php

namespace Classes\Models\Companies;
use Classes\Utils\Sql;

class Companines{
	function __construct(int $uid) {
		if( $id <= 0 ){
            throw new WrongIdException("Wrong id $id");
        }
        
        $sql = Sql::getInstance();
        $r = $sql->getAssocArray("SELECT * FROM ".self::TABLE_NAME." WHERE u=$id");
        $this->sql->logError(__METHOD__);
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
								name='$name'
								,site='$site'
								,contact_person='$contact_person'
								,email='$email'
								,phone='$phone' 
								WHERE id='$id'")
	}
	public function getId() {
        return $this->id;
    }
}