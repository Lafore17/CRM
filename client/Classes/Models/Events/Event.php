<?php

namespace Classes\Models\Events;
use Classes\Utils\Sql;

class Event{
	function __construct(int $id) {
		if( $id <= 0 ){
            throw new WrongIdException("Wrong id $id");
        }
        
        $sql = Sql::getInstance();
        $r = $sql->getAssocArray("SELECT * FROM ".self::TABLE_NAME." WHERE id=$id");
        $this->sql->logError(__METHOD__);
        $this->id = $id;
        
        if( empty($r) ){
            throw new NonExistingItemException("Нет такой компании с id $id");
        }
        
        $r = $r[0];
        $this->type = $r['type'];
        $this->topic = $r['topic'];
        $this->description = $r['description'];
        $this->decision = $r['decision'];
        $this->date = $r['date'];
	} 
	
	function updateEvent() { //todo получить id компании, чтобы поизвести обновление
		$this->sql->query = ("UPDATE company SET 
								type='$this->type'
								,topic='$this->topic'
								,description='$this->description'
								,decision='$this->decision'
								,date='$this->date' 
								WHERE id='$this->id'")
	}
	public function getId() {
        return $this->id;
    }
}