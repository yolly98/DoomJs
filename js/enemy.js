


function Enemy(Type,x,y,dir){

	//posizione
	this.point=new Point(null,null);
	this.point.x=x;  //30 è un valore a caso peer staccarlo dal bordo
	this.point.y=y;  //60 è l'altezza del player

	this.spawnX=this.point.x;
	this.spawnY=this.point.y;
	
	//movimenti
	this.stepX=Type.stepX;
	this.stepY=Type.stepY;
	this.jump=Type.jump;

	this.maxX=Type.maxX; //range di movimento
	this.maxY=Type.maxY;
	this.counterX=0; //conta i passi per il range di movimento
	this.counterY=0;

	//comandi
	this.w=0;
	this.s=0;
	this.a=0;
	this.d=0;
	if(dir=='a')
		this.view='sx';
	else if(dir=='d')
		this.view='dx';
	this.shift=Type.shift;
	if(dir=='a')
		this.a=1;
	if(dir=='d')
		this.d=1;

	//BLOCCHI
	this.blockJump=0;
	this.blockSx=0;
	this.blockDx=0;
	this.gravity=0;

	this.blockViewSx=null;
	this.blockViewDx=null;


	this.precStepY=this.point.y//salvo posizione precedente y
	this.precStepX=this.point.x//salvo positione precedente x
	this.collisionFloor=1
	this.collision=0; //0 c'è collisione 1 no
	this.collisionChange=0;
	this.v0=null;//salvo velocità iniziale se si è in volo
	
	//dimensione
	this.width=Type.width;
	this.height=Type.height;
	this.origin_height=this.height;

	this.time=Type.time;
	this.type=Type.type;
	

	this.identifier='enemy';
	this.index;
	this.life=Type.life;

	
	//ARMI
	this.fire=0;
	this.arrayBullet=new Array();
	this.bulletDir=null;
	this.bulletOut=0;
	this.rangeShotX=Type.rangeShotX;
	this.rangeShotY=Type.rangeShotY;
	this.typeBullet=Type.typeBullet;
	this.bulletInterval=null;  	//intervallo tra uno sparo e l'altro
	this.bulletTimeEnemy=null; 	//clock che fa muovere i proiettili nemici
	
	this.contactDamage=Type.contactDamage;

	this.estrazione=0;		//serve a dire se è stata fatta un'estrazione


	this.camminaSx=1;//servono per animazioni
	this.camminaDx=1;

	this.stepCounter=0; //deve fare un passo ogni this.type.time volte

	this.make=0;  //è 1 se sto modificando la mappa

	this.counterFall=0;  //conta da che altezza è caduta una bomba o cassa

	
	if(this.point.x+this.width<0 && EDITOR==0)//serve per checkPoint
		this.width=0;


		

}


/***************************/


Enemy.prototype.move=function(playground,player){


	if(this.height==0)
		return;
	//caduta

	enemyNode=document.getElementById(BASE_ENEMY_ID+'_'+this.type+'_'+this.index);

	if(this.gravity==1  && this.point.y+this.height<(playground.offsetTop+playground.height)){
			this.point.y+=this.stepY;
			this.spawnY=this.point.y;
			this.counterFall++;
			if(EDITOR==1 && this.make==1)
				OBJECT_MOVE_RANGE.point.y+=this.stepY;
	}
			
	if(this.point.y+this.height>(playground.offsetTop+playground.height))
			this.point.y=playground.offsetTop+playground.height-this.height;

	if(BLOCK_ENEMY==1)
		return;

	if(this.make==1 && BLOCK_OBJECT==1)
		return;

	if(this.type==6 && this.type==7)
		return;	


	//schivata nemico
	let schiva=null;
	if(player.shift==1 && this.fire==1 && this.estrazione==0 &&  this.type==0){
		schiva=getRandomInt(0,3);
		this.estrazione=1;
	}
	else if(player.shift==0)
		this.estrazione=0;

	if(schiva==0 && this.fire==1 && player.shift==1 && this.shift==0){//solo nemico default(discriminante shift==null)

		this.point.y+=this.height/2;
		this.height=this.height/2;
		this.shift=1;

		
		enemyNode.style.backgroundImage="url('../css/enemy/enemy"+this.type+"Shift-"+this.bulletDir+".png')";
			
	}
	else if((player.shift==0 || this.fire==0) && this.shift==1){
		this.point.y-=this.height;
		this.height=this.height*2;
		this.shift=0;

		//enemyNode.style.backgroundImage="url('../css/enemy/enemy"+this.type+"-d1.png')"; non serve
	}
	
	/****/
	if(((this.type==1 || this.type==5) && this.fire==1) || this.type==4 || this.type=='boss1'){ //per CANE e zombie e cecchino


		if(player.point.x+player.width<=this.point.x && this.blockSx==0){

			/*if(this.blockDx==1)  //non serve perchè i blocchi vengono azzerati ogni volta e poi riscritti da 0
				this.blockDx=0;*/

			this.a=1;
			this.d=0;
			this.view='sx';
			this.stepCounter++;
			if(this.stepCounter>=this.time){
				this.point.x-=this.stepX;
				this.stepCounter=0;
			}
		}
		else if(player.point.x>this.point.x+this.width && this.blockDx==0){

			

			this.a=0;
			this.d=1;
			this.view='dx';
			this.stepCounter++;
			if(this.stepCounter>=this.time){
				this.point.x+=this.stepX;
				this.stepCounter=0;
			}
		}

		

	}

	/****/

	



	if(this.a==1 && this.fire==0 && this.blockSx==0 && (this.type==0 || this.type==3) && this.time!=null){

		this.stepCounter++;
		if(this.stepCounter>=this.time){
				
			this.point.x-=this.stepX;
			this.counterX+=this.stepX;

			if(this.counterX>=this.maxX){ 
				this.a=0;
				this.d=1;
				this.view='dx';
				this.counterX=0;
			}

			this.stepCounter=0;
		}


	}
	else if(this.d==1 && this.fire==0 && this.blockDx==0 && (this.type==0 || this.type==3) && this.time!=null){

		this.stepCounter++;
		if(this.stepCounter>=this.time){
				
			this.point.x+=this.stepX;
			this.counterX+=this.stepX;

			if(this.counterX>=this.maxX){ 
				this.a=1;
				this.d=0;
				this.view='sx';
				this.counterX=0;
			}

			this.stepCounter=0;
		}


	}

	if(this.point.x+this.width+this.maxX<playground.offsetLeft && EDITOR==0)
		this.width=0;


}

/*****************/

Enemy.prototype.block=function(jump,dx,sx){

	this.blockJump=jump;
	this.blockSx=sx;
	this.blockDx=dx;


}


/**************************/


Enemy.prototype.enemyHit=function(object,objectJ){ 

	let objectX=object.point.x;
	let objectY=object.point.y;
	let objectW=object.width;
	let objectH=object.height;
	let index=object.index;
	let objectIdentifier=object.identifier;
	
	if(objectX+objectW>=this.point.x && 
		objectX<=this.point.x+this.width &&
		objectY<=this.point.y+this.height &&objectY>this.point.y && 
		((objectIdentifier=="player-enemy" && objectJ==1)||
			(objectIdentifier=="bullet-enemy"))){ //ho aggiunto playerJ che serebbe il tasto w
													//perchè entrava in conflitto con gli altri
		
		return "sotto";
	}	

	else if(((object.collision==0 && objectX+objectW>=this.point.x)||(object.collision==1 && objectX+objectW>this.point.x))
			&&
			((object.collision==0 && objectX<=this.point.x+this.width )||(object.collision==1 && objectX<this.point.x+this.width ))
			&&
			objectY+objectH==this.point.y)
		{	
			
			return "sopra";
		}	

	
	else if(((objectY>=this.point.y && objectY<this.point.y+this.height) ||
			(objectY+objectH>=this.point.y && objectY+objectH<=this.point.y+this.height) ||
			   (objectY<this.point.y && objectY+objectH>this.point.y+this.height))){		   		
	
		if(objectX+objectW>=this.point.x&& objectX+objectW<this.point.x+this.width)
		{
			return "sx";
		}		
	
		else if(objectX<=this.point.x+this.width && objectX>this.point.x){
		
			return "dx";
		}
	}		


	else{
		return 0;
	}
	
			
		

}

/*******************************/
//si muove insieme ai floor

Enemy.prototype.moveEnemy=function(playground){


	if(this.spawnX+this.width+this.maxX>0-playground.width){
		
		this.point.x-=ABSOLUTE_STEP;
		this.spawnX-=ABSOLUTE_STEP;
	}
	else if(this.width>0)
		this.width=0;


}

/****************************/



Enemy.prototype.createBullet=function(){

	let enemy=this;
	
	if(this.fire==1){

		let bullet=new Bullet(enemy,enemy.typeBullet,enemy.bulletDir);

		//la direzione 'd' è di default
	
		if(bullet.dir=='d'){

			bullet.point.x=this.point.x+this.width;
			if(bullet.type==5 || bullet.type==2)//palla verde e palla fuoco grande
				bullet.point.y=this.point.y+this.height-bullet.height-10;
			else if(bullet.type==7)
				bullet.point.y=this.point.y+this.height/5;

		}

		else if(bullet.dir=='a'){//console.error('a');

			bullet.point.x=this.point.x-bullet.width;
			if(bullet.type==5 || bullet.type==2)
				bullet.point.y=this.point.y+this.height-bullet.height-10;
			else if(bullet.type==7)
				bullet.point.y=this.point.y+this.height/5;
		}
		
	

		else if(bullet.dir=='s'){//console.error('s');  //accade solo con boss1

			bullet.point.x=this.point.x+this.width/2;
			bullet.point.y=this.point.y+this.height/4;

			let appoggio=bullet.width;
			bullet.width=bullet.height;
			bullet.height=appoggio;
		}

		bullet.index=this.bulletOut;
		this.bulletOut++;
		this.arrayBullet.push(bullet);


	}

}


/****************************/


Enemy.prototype.deleteBullet=function(){


	let array=this.arrayBullet;

	for(let i=0;i<array.length;i++){

		if(array[i].width<=0){

			if(i==0)
				array.shift();
			else{

				array[i]=array[0];
				array.shift();
			}
		}
	}
}

/*******************/

Enemy.prototype.bulletFire=function(object,objectIdentifier,player){

	let array=this.arrayBullet;
	let rangeX=this.rangeShotX;
	let rangeY=this.rangeShotY;
	let enemy=this;
	let jump=0;



	if((timeBoss1Move!=null && this.type=='boss1') || this.type==6 || this.type==7)
		return;

	if(objectIdentifier=='player')
		jump=(object.jump/TIME_PLAYER_MOVE)*object.stepY;
	

	if((object.point.y<=this.point.y && object.point.y+object.height>=this.point.y-jump)||//i nemici mi vedono anche se sto saltando
			(object.point.y+object.height>this.point.y+this.height && object.point.y<=this.point.y+this.height)||
				(object.point.y>=this.point.y && object.point.y+object.height<=this.point.y+this.height)){


		if(object.point.x+object.width<=this.point.x &&
			object.point.x+object.width>=this.point.x-rangeX && 
			 	 (this.view=='sx' || this.type=='boss1' || this.type==1 || this.type==5 || this.type==4) && this.width>0){//guarda a sx

			if( player!=null && (objectIdentifier=='floor' || objectIdentifier=='enemy') && 	//l'altezza di player non importa 
					player.point.x+player.width<=this.point.x &&								//non sto decidento di sparare
						player.point.x+player.width>=this.point.x-rangeX &&					//ma bloccare lo sparo
							player.point.y>=object.point.y && player.point.y+player.height<=object.point.y+object.height){ 

									
				let appoggio1=this.point.x-(object.point.x+object.width);
				let appoggio2=this.point.x-(player.point.x+player.width);


				if( this.blockViewSx==null || this.blockViewSx<0 || appoggio1<=this.blockViewSx)

					this.blockViewSx=appoggio1;

				if( this.blockViewSx==null || this.blockViewSx<0 || appoggio2<=this.blockViewSx)

					this.blockViewSx=null;


				if(this.blockViewSx!=null){
					this.fire=0;
					this.bulletDir=null; 
					clearInterval(this.bulletInterval);
					this.bulletInterval=null;
				}
				
				
			}
			

			if(objectIdentifier=='player' && this.bulletInterval==null && this.blockViewSx==null){
			
				this.bulletDir='a'; 
				if(this.type==4 && this.a!=1){
					this.d=0;
					this.a=1;
					this.view='sx';
					document.getElementById('enemy_'+this.type+'_'+this.index).style.backgroundImage="url('../css/enemy/enemy"+this.type+"-a.png')";
				}
				this.fire=1;
				//console.error('visto bulletFire');
				if(this.type!=1 && this.type!=5)
					this.clockFireEnemy();
				
			}
		}
		


		else if(object.point.x<=this.point.x+rangeX && 
			 object.point.x>=this.point.x+this.width && 
			 	(this.view=='dx' || this.type=='boss1' || this.type==1 || this.type==5 || this.type==4) && this.width>0){ //guarda a dx
	

			if(player!=null && (objectIdentifier=='floor' || objectIdentifier=='enemy') && 
				player.point.x>=this.point.x+this.width &&
					player.point.x<this.point.x+this.width+rangeX &&
						player.point.y>=object.point.y && player.point.y+player.height<=object.point.y+object.height){

				let appoggio1=object.point.x-(this.point.x+this.width);
				let appoggio2=player.point.x-(this.point.x+this.width);
				

				if(this.blockViewDx==null || this.blockViewDx<0 || appoggio1<this.blockViewDx)

					this.blockViewDx=appoggio1;

				if( this.blockViewDx==null || this.blockViewDx<0 || appoggio2<=this.blockViewSx)

					this.blockViewDx=null;

				if(this.blockViewDX!=null){
					this.fire=0;
					this.bulletDir=null; //console.error('uscito');
					clearInterval(this.bulletInterval);
					this.bulletInterval=null;
				}
				
			}
			
		

		    if(objectIdentifier=='player' && this.bulletInterval==null && this.blockViewDx==null){
		    	
				this.bulletDir='d';
				if(this.type==4 && this.d!=1){
					this.a=0;
					this.d=1;
					this.view='dx';
					document.getElementById('enemy_'+this.type+'_'+this.index).style.backgroundImage="url('../css/enemy/enemy"+this.type+"-d.png')";
				}
				this.fire=1;
				//console.log('visto');
				if(this.type!=1 && this.type!=5)
					this.clockFireEnemy();
				
			}
		}
		else if(objectIdentifier=='player' && this.bulletInterval!=null){

		this.fire=0;
		this.bulletDir=null; //console.error('uscito');
		clearInterval(this.bulletInterval);
		this.bulletInterval=null;
		}

	}
	else if(objectIdentifier=='player' && this.bulletInterval!=null){

		this.fire=0;
		this.bulletDir=null; //console.error('uscito');
		clearInterval(this.bulletInterval);
		this.bulletInterval=null;
	}
	

}


/**********************************************/

Enemy.prototype.moveBoss1=function(playground,player,game){

	let boss=this;
	if(this.life>=400)
		this.move(playground,player);


	if(this.life<400 && timeBoss1Move==null){


			if(this.shift==1){
				this.point.y-=this.height;
				this.height=this.height*2;
				this.shift=0;
			}


		
			clearInterval(boss.bulletTimeEnemy);
			clearInterval(this.bulletInterval);
			this.typeBullet=new Type5;
			game.clockBoss1Move(boss);
			game.clockBulletEnemy(boss);
			boss.clockFireEnemy();
		

	}

}

/*****************/



Enemy.prototype.explode=function(game){


	if(this.type!=6)
		return;

	if(this.life<=0){


		let floorBomb=new TypeFB;
	
		game.arrayFloor.push(new Floor(playground,5,5,this.point.x,this.point.y,floorBomb));
		game.arrayFloor[game.arrayFloor.length-1].maxX=this.rangeShotX;
		game.arrayFloor[game.arrayFloor.length-1].maxY=this.rangeShotY;
		game.arrayFloor[game.arrayFloor.length-1].index=game.floorOut;


		game.floorOut++;

	}
}



