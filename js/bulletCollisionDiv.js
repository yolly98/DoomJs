function BulletCollisionDiv(object){ //player or enemy


	//posizione
	this.point=new Point(null,null);
	if(object.dir=='d')
		this.point.x=object.point.x+object.width/2;  //30 è un valore a caso peer staccarlo dal bordo
	else
		this.point.x=object.point.x;
	this.point.y=object.point.y;  //60 è l'altezza del player

	
	//dimensione
	this.width=object.width/2;
	this.height=object.height;

	this.timeLife=5 //tempo di vita 20 clock del tempo del mondo

	this.identifier='bulletCollisionDiv';
	this.type=object.type;
	this.index;
	this.dir=object.dir;


}


/************/

BulletCollisionDiv.prototype.intervalLife=function(){

	this.timeLife--;
	if(this.timeLife<=0) //verrà cancellato
		this.width=0;

}

