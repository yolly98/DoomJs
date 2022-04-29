

function Player(playground){

	//posizione
	let x=null,y=null;
	this.point=new Point(x,y);
	this.point.x=playground.offsetLeft+5;  //5 è un valore a caso peer staccarlo dal bordo
	this.point.y=playground.height-80-70;  //80 è l'altezza del player
	
	//movimenti
	this.stepX=5;//tutte le altre posizioni devo essere multiple di 5
	this.stepY=10;
	this.absoluteStepX=5;
	this.jump=300; //300 millisecondi poi cade, il tempo di gioco è 20 ms => (300/20)*10=150px è l'innalzamento massimo

	//comandi
	this.w=0;
	this.s=0;
	this.a=0;
	this.d=0;
	this.shift=0;
	this.sEditor=0;

	this.wUp=1;//mi serve per risolvere bug per le collisioni con floor

	this.blockJump=0;
	this.blockSx=0;
	this.blockDx=0;
	this.blockLivello=0; // lo uso per bloccare il personaggio se voglio muovere lo sfondo a prescindere da lui
	
	this.gravity=1;

	this.precStepY=this.point.y//salvo posizione precedente y

	this.collisionFloor=1;//0 c'è collisione 1 no		//un enemy è sopra il player
	this.collision=0; //0 c'è collisione 1 no  			//il player è sopra un floor o enemy
	this.collisionChange=0;                    
	this.v0=null;//salvo velocità iniziale se si è in volo
	//dimensione
	this.width=50;
	this.height=80;
	this.origin_height=this.height;


	//ARMI
	this.fire=0;
	this.typeBullet=new Type0;
	this.arrayBullet=new Array();
	this.bulletDir='d';
	//this.chooseAim=0;
	this.counterFire=0;
	this.intervalFire=this.typeBullet.interval;

	this.life=100;

	this.identifier='player';
	this.type=0;
	this.bulletOut=0;

	this.camminaDx=5;  //serve per animazione
	this.camminaSx=5;
	//this.counterShift=0; //quando è accovacciato deve muoversi più lentamente, eseguo uno step ogni 2 clock
	this.camminaShiftSx=1; //1 o 2 (animazione)
	this.camminaShiftDx=1;

	this.ammo=50; //default numero munizioni

	this.slotChiaveG=0;
	this.slotChiaveB=0;
	this.slotChiaveR=0;

	this.metri=this.point.x/ABSOLUTE_STEP;
	this.danniSubiti=0;

}


/*******************/


Player.prototype.move=function(playground,game){

	
	if(this.height==0)
		return;

	
	let playerNode=document.getElementById(PLAYER_ID+this.type);

	let imageSx="url('../css/player/player-sx";
	let imageDx="url('../css/player/player-dx";
	
	
	if(ALL_MOVIMENT==0){
		if(this.gravity==1 && this.point.y+this.height<(playground.offsetTop+playground.height))
			this.point.y+=this.stepY;
			
		if(this.point.y+this.height>(playground.offsetTop+playground.height))
			this.point.y=playground.offsetTop+playground.height-this.height;

		if(this.sEditor==1)
			this.sEditor=0;
	}
	
	if(this.sEditor==1)
		this.point.y+=this.stepY;


	if(this.w==1 && this.point.y>playground.offsetTop && this.blockJump==0 ){
		this.point.y-=this.stepY;
		if(this.point.y<=playground.offsetTop){
			this.point.y=playground.offsetTop;
			this.w=0;
			this.gravity=1;
		}
	}

	/***///collisioni
	this.collisionChange=this.collision;
	/**///salto solo se sono atterrato
	if(this.point.y==this.precStepY)
			this.collision=0;
		else
			this.collision=1;

	this.precStepY=this.point.y;	
	
	if(this.collisionChange!=this.collision && this.collision==0){//atterraggio
		
		this.v0=null;
	}
	/*******/	


	if(this.shift==1 && this.height==this.origin_height && this.collision==0){
		this.point.y+=this.origin_height/2;
		this.height=this.origin_height/2;

		if(playerNode!=null)
			if(this.bulletDir=='d')
				playerNode.style.backgroundImage="url('../css/player/playerShift-dx1-gun"+this.typeBullet.type.toString()+".png')";
			else if(this.bulletDir=='a')
				playerNode.style.backgroundImage="url('../css/player/playerShift-sx1-gun"+this.typeBullet.type.toString()+".png')";

	}
	else if(this.shift==0 && this.height!=this.origin_height){
		this.point.y-=this.origin_height/2;
		this.height=this.height*2;
		game.checkObjectHit(game.player,game.arrayFloor,"player-floor"); //controllo le collisioni nell'istante in cui mi sto alzando(non coperto dal clock)
		
	}	





	this.precStepX=this.point.x;
	if((this.a==1 || this.v0=='a') && this.blockSx==0 && this.point.x>playground.offsetLeft && this.shift==0 && game.triggerMove==0){

			this.point.x-=this.stepX;
			this.metri--;

	}

	if((this.d==1 || this.v0=='d')&& this.blockDx==0 && this.point.x<playground.offsetLeft+playground.width-this.width && this.shift==0 && game.triggerMove==0){

			this.point.x+=this.stepX;
			this.metri++;

	}

	if(this.a==1 && this.d==0 && this.collision==1)
		this.v0='a';

	if(this.d==1 && this.a==0&& this.collision==1)
		this.v0='d';



	

}

/*****************/

Player.prototype.block=function(jump,dx,sx){

	this.blockJump=jump;
	this.blockSx=sx;
	this.blockDx=dx;


}

/**********************/

Player.prototype.createBullet=function(){

	let player=this;

	if(this.fire==1){

		let bullet=new Bullet(player,player.typeBullet,player.bulletDir);

		//la direzione 'd' è di default
		

		if(bullet.dir=='d') //in realtà è inutile perchè è così di default nel costruttore del bullet
			bullet.point.x=this.point.x+this.width;

		if(bullet.dir=='a')
			bullet.point.x=this.point.x-bullet.width;
		

		if(bullet.type!=0) //type 0 è di default nel costruttore di bullet
			bullet.point.y=this.point.y+this.height/2;

		if(bullet.type==0)
			bullet.point.y=this.point.y+this.height/5;
		
		else if(bullet.type==1){
			if(player.shift==0)
				bullet.point.y=this.point.y+this.height/2-10;
			else if(player.shift==1)
				bullet.point.y=this.point.y+this.height-20;	
		}

		else if(bullet.type==4){
			if(player.shift==0)
				bullet.point.y=this.point.y;
			else if(player.shift==1)
				bullet.point.y=this.point.y-20;
		}


		else if(bullet.type==3)
				bullet.point.y=this.point.y+10;
			

			

		bullet.index=this.bulletOut;
		this.bulletOut++;
		this.arrayBullet.push(bullet);


	}

}

/************************/

Player.prototype.deleteBullet=function(){


	let array=this.arrayBullet;

	if(array[0].width<=0 /*|| array[0].height<=0*/){
		
		array.shift();
		
	}
}

/*****************************/



Player.prototype.playerHit=function(object,objectJ){

	let objectX=object.point.x;
	let objectY=object.point.y;
	let objectW=object.width;
	let objectH=object.height;
	let index=object.index;
	let objectIdentifier=object.identifier;

	if(objectX+objectW>=this.point.x && 
		objectX<=this.point.x+this.width &&
		objectY<=this.point.y+this.height && objectY>this.point.y && objectJ==1){ //ho aggiunto playerJ che serebbe il tasto w
																					//perchè entrava in conflitto con gli altri
		
		return "sotto";
	}	

	else if((objectY>=this.point.y && objectY+2<=this.point.y+this.height) ||
			(objectY+objectH-2>=this.point.y && objectY+objectH<=this.point.y+this.height) ||
			   (objectY<this.point.y && objectY+objectH>this.point.y+this.height)){
	
		if(objectX+objectW>=this.point.x&& objectX+objectW<this.point.x+this.width)
		{
	
			
			return "sx";
		}		
	
		else if(objectX<=this.point.x+this.width && objectX>this.point.x){
		
			
			return "dx";
		
		}
	}			

	else if(objectX+objectW-2>=this.point.x && 
		objectX+2<=this.point.x+this.width &&
			objectY+objectH>=this.point.y && objectY+objectH<this.point.y+this.height)

		{	
			
			return "sopra";
		}	

	else {
			
		return 0;
	}
			
				

}