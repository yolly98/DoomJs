function DeathDiv(object){ //player or enemy


	//posizione
	this.point=new Point(null,null);
	
	//dimensione
	if(object.identifier=='enemy' && object.type==7){
		this.width=parseInt((object.width*3)/2);
		this.height=parseInt((object.height*3)/2);
		this.point.x=object.point.x-parseInt(object.width/2);
		this.point.y=object.point.y-parseInt(object.height/2);
	}
	else{
		this.point.x=object.point.x;  //30 è un valore a caso peer staccarlo dal bordo
		this.point.y=object.point.y;  //60 è l'altezza del player
		this.width=object.width;
		this.height=object.height;
	}

	this.timeLife=20 //tempo di vita 20 clock del tempo del mondo

	this.identifier='deathDiv';
	if(object.identifier=='enemy' && object.type==7)
		this.type=7;//unico caso diverso dagli altri (cassa rotta);
	else
		this.type=0;
	this.index;
	


}


/************/

DeathDiv.prototype.intervalLife=function(){

	this.timeLife--;
	if(this.timeLife<=0) //verrà cancellato
		this.width=0;

}

