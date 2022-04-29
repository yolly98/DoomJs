
var GAME=null;
function begin(checkPoint,arrayDati){

	let game=null;
	precaricaImages('../css/');
	
	
	
	if(PAGE=='editor'){


	
	//	document.getElementById('menu').style.display='none';
		document.getElementById('sfondoCaricamento').style.display='block';
		chargingBar();

		setTimeout(function(){

			clearInterval(chargingTime);
			chargingTime=null;
			chargingCounter=0;
			document.getElementById('barraCaricamento').style.width=0+'vw';
			document.getElementById('sfondoCaricamento').style.display='none';

			if(PAUSA==1){
				game.sketcher.deleteMenu(game);
				PAUSA=0;
			}



		},4200);

		setTimeout(function(){             //lascio che i clock si occupino di cancellare tutto, aspetto 2 secondi che lo facciano e poi pulisco i clock
		

			
			GAME=new Game(document.getElementById("playgroundWrapper")); 

			let game=GAME;

			EDITOR=1;

			game.clockPlayer();
			
			game.clockBulletPlayer();
			

			nodeEditor=document.getElementById('navEditor');
			
			nodeEditor.style.display='block';

			if(ID!=null){
					game.createFloor(defaultF);
				if(defaultE!=null)
					game.createEnemy(defaultE);
				if(defaultB!=null)
					game.createBox(defaultB);	

				//setto valori iniziali

				
				default0=default0.split(' ');
				game.player.point.y=parseInt(default0[0]);
				game.player.life=parseInt(default0[1]);
				game.player.ammo=parseInt(default0[2]);	
				game.viteTotali=parseInt(default0[4]);

				let gun=null;
				switch (default0[3]){

					case 'Pistola':
						gun=new Type0;
					break;
					
					case 'Pompa':
						gun=new Type4;
					break;

					case 'Mitraglia':
						gun=new Type1;
					break;

					case 'Precisione':
						gun=new Type3;
					break;
					
				}	
				game.player.typeBullet=gun;
				game.player.counterFire=0;
				game.player.intervalFire=gun.interval;
				clearInterval(bulletTimePlayer);
				clearInterval(bulletInterval);
				game.clockBulletPlayer();
			}
			else{
				let sfondo=new Floor(game.playground,5000,600,0,0,new TypeSfondo(),null,"-");

				sfondo.index=game.floorOut;
				game.floorOut++;
				game.arrayFloor.push(sfondo);
			}


			let allMoviment=document.getElementById('allMoviment');
			let noCollision=document.getElementById('noCollision');
			let blockFloorMobili=document.getElementById('blockFloorMobili');
			let blockClock=document.getElementById('blockClock');
			let blockEnemy=document.getElementById('blockEnemy');
			let blockEnemyGravity=document.getElementById('blockEnemyGravity');
			let blockObject=document.getElementById('blockObject');
			let dimSfondo=document.getElementById('dimSfondo');
			
			
			for(let i=0;i<game.arrayFloor.length;i++)
				if(game.arrayFloor[i].type=='sfondo' && dimSfondo.value!=parseInt(game.arrayFloor[i].width/5000))
					dimSfondo.value=parseInt(game.arrayFloor[i].width/5000);
					
			

			allMoviment.checked=false;
			noCollision.checked=false;
			blockFloorMobili.checked=false;
			blockClock.checked=false;
			blockEnemy.checked=false;	
			blockEnemyGravity.checked=false;	
			blockObject.checked=false;	

			ALL_MOVIMENT=0;
			NO_COLLISION=0;
			BLOCK_CLOCK_FLOOR=0;
			NO_GRAVITY_ENEMY=0;
			STEP=ABSOLUTE_STEP;
			BLOCK_OBJECT=0;

		
			game.sketcher.updateLifeBar(game.player)

			game.player.width=50;
			game.player.height=80;

			
			
			
			createTouchControl();
		},4200/2);

		
	}



	/*********/

	else if(PAGE=='game'){

		if(arrayDati==null){
			document.getElementById('sfondoCaricamento').style.display='block';
			chargingBar();
		}

		let time;
		if(arrayDati==null)
			time=4200;
		else	
			time=0;	//il caricamento è stato già avviato dal ricomincia(cose) 

		setTimeout(function(){

			if(time==4200){
				clearInterval(chargingTime);
				chargingTime=null;
				chargingCounter=0;
				document.getElementById('barraCaricamento').style.width=0+'vw';
				document.getElementById('sfondoCaricamento').style.display='none';
			
				if(PAUSA==1){
					//game.sketcher.deleteMenu(game);
					PAUSA=0;
				}

				
			}

	
	
		},time);

		setTimeout(function(){ 

			GAME=new Game(document.getElementById("playgroundWrapper"));

			game=GAME;
	
			game.checkPoint=checkPoint;

			let arma=null;
			if(arrayDati!=null && checkPoint!=0){
				game.vitePerse=arrayDati['vitePerse'];
				game.metri=arrayDati['metri'];
				game.player.metri=game.metri;
				game.tempo=arrayDati['tempo'];
				game.clock=(game.tempo*1000)/TIME_PLAYER_MOVE;
				game.arrayDatiGioco=arrayDati;
				game.player.point.y=arrayDati['posY'];
				game.player.life=arrayDati['life'];
				game.player.ammo=arrayDati['ammo'];
				arma=arrayDati['gun'];
				game.player.slotChiaveG=arrayDati['chiaveG'];
				game.player.slotChiaveB=arrayDati['chiaveB'];
				game.player.slotChiaveR=arrayDati['chiaveR'];
			}
			
			game.player.point.x=50;


			if(arrayDati==null)
				default0=default0.split(' ');
			if(checkPoint==0){	
				game.player.point.y=parseInt(default0[0]);
				game.player.life=parseInt(default0[1]);
				game.player.ammo=parseInt(default0[2]);	
				arma=default0[3];
			}
			game.viteTotali=parseInt(default0[4]);
			

			game.clockPlayer();
	
			game.clockBulletPlayer();
			

			game.createFloor(defaultF);
			if(defaultE!=null)
				game.createEnemy(defaultE);
			if(defaultB!=null)
				game.createBox(defaultB);	

			//setto valori iniziali

			


			let gun=null;
			switch (arma){

				case 'Pistola':
					gun=new Type0;
				break;
				
				case 'Pompa':
					gun=new Type4;
				break;

				case 'Mitraglia':
					gun=new Type1;
				break;

				case 'Precisione':
					gun=new Type3;
				break;
				
			}	
			game.player.typeBullet=gun;
			game.player.counterFire=0;
			game.player.intervalFire=gun.interval;
			clearInterval(bulletTimePlayer);
			clearInterval(bulletInterval);
			game.clockBulletPlayer();

			
			if(PAUSA==1 && time==0){
				game.sketcher.deleteMenu(game);
				PAUSA=0;
			}

			createTouchControl();

		},time/2);

	}
	
}


function Game(playgroundWrapper){



	let playground=playgroundWrapper.childNodes[1];
	if(detectmob()==false){
		document.addEventListener("keydown",this.movePlayerDown.bind(this),false);
		document.addEventListener("keyup",this.movePlayerUp.bind(this),false);
	}


	this.playground=new Playground(playground);
	this.player=new Player(this.playground);	
	this.sketcher=new Sketcher(playgroundWrapper);
	this.arrayFloor=new Array();
	this.arrayEnemy=new Array();
	this.arrayBox=new Array();
	this.arrayDeathDiv=new Array();
	this.arrayBulletCollisionDiv=new Array();
	this.floorOut=0;  //indice indipendente dalla posizione nell'array
	this.enemyOut=0;
	this.boxOut=0;
	this.deathDivOut=0;
	this.bulletCollisionDivOut=0;

	this.playerLife=0;
	this.blockMoveFloor=0;
	this.livello="1";  //inutile togliere durante pulizia codice salva il livello in cui sto
	

	this.triggerMove=0; 
	

	this.menu=0; //0 attivo 1 non attivo


	//punteggi

	this.metri=0;
	this.tempo=0;
	this.danniSubiti=0;
	this.vitePerse=0;//max 3
	this.viteTotali=3; //default
	this.nemiciUccisi=0;
	this.colpiVuoto=0;
	this.colpiSegno=0;
	this.colpiTotali=0;
	this.danniInflitti=0;

	this.clock=0;//contatore di clock player


	this.checkPoint=null; //salva i metri
	
	this.ripetizioniSfondo=0;//salva quante ripetizioni dello sfondo mancano alla fine, serve a non doverlo caricare tutto

	this.arrayDatiGioco={metri:0,tempo:0,danniSubiti:0,vitePerse:0,nemiciUccisi:0,colpiVuoto:0,colpiTotali:0,posY:0,life:0,ammo:0,gun:'pistola',chiaveG:0,chiaveB:0,chiaveR:0};

	
}


/*********************/

Game.prototype.movePlayerDown=function(ev){

	if(chargingTime!=null)
		return;

	let playerNode=document.getElementById(PLAYER_ID+this.player.type);
	let game=GAME;


	
	if(ev.keyCode==27){//esc  PAUSA
		

		if(PAUSA==0){
			this.sketcher.drawMenu(game);
			PAUSA=1;
		}
		
	}	

	if(ev.keyCode==65 && PAUSA==0){//a  SX
		if(this.player.d==1)
			this.player.d=0;
		this.player.a=1;
		
			this.player.bulletDir='a';
	}	

	else if(ev.keyCode==68 && PAUSA==0){//d  DX
		if(this.player.a==1)
			this.player.a=0;
		this.player.d=1;
		
			this.player.bulletDir='d';
	}	

	else if(ev.keyCode==87 && this.player.w==0 && this.player.collision==0 && this.player.wUp==1 && PAUSA==0){//w  SALTO

		this.player.wUp=0;
		if(ALL_MOVIMENT==1)
			jumpTime=null;
		

		if(this.player.shift!=1 && this.player.chooseAim!=1 ){
				
			this.player.w=1;
			this.player.gravity=0;
			jumpTime=setTimeout(this.playerFall.bind(this),this.player.jump);
		}
		
	}



	else if(ev.keyCode==32 && PAUSA==0){//space SPARA

		this.player.fire=1;

		if(bulletInterval==null && this.player.counterFire==0){

			let appoggio=new Type0;
			game.colpiTotali++;
			game.colpiVuoto=game.colpiTotali-game.colpiSegno;

			if(this.player.ammo>0){
				if(this.player.typeBullet.type==0 && this.player.typeBullet.interval==STANDARD_INTERVAL_BULLET)
					this.player.typeBullet.interval=appoggio.interval;
				this.player.ammo-=Math.ceil(this.player.typeBullet.damage/10);
			}
			else{

				if(this.player.typeBullet.type!=0)
					this.player.typeBullet=new Type0;

				this.player.counterFire=0;
				this.player.typeBullet.interval=STANDARD_INTERVAL_BULLET;
				this.player.intervalFire=this.player.typeBullet.interval;
				clearInterval(bulletTimePlayer);
				clearInterval(bulletInterval);
				this.clockBulletPlayer();
			}

			this.clockFirePlayer();
			this.player.counterFire=1; //il clock del player lo riporterà a 0
		}


	}


	else if(ev.keyCode==/*16*/83 && this.player.shift==0  && PAUSA==0){//shift ACCOVACCIA, PS:ora è 'S'

		
		if(ALL_MOVIMENT==1)
			this.player.sEditor=1;
		else{
			this.player.shift=1;
			this.player.blockJump=1;
		}

	}

	if(ev.keyCode==39){//freccia dx
		
		if(EDITOR!=1)
			return;

		let object=null;
		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1)
				object=this.arrayFloor[i]

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1)
				object=this.arrayEnemy[i]

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				object=this.arrayBox[i];	


		if(object==null)
			return;	

		if(MAKE_DIM==1 && object.identifier=='floor')
			object.width+=ABSOLUTE_STEP;

		else if( (BLOCK_OBJECT==1 && object.identifier=='floor' && object.type=='FSX_0' )||
				(BLOCK_OBJECT==1 && object.identifier=='enemy' && (object.type==0 || object.type==2)) ){

				if(object.a==1 && object.counterX>0){
					object.point.x+=ABSOLUTE_STEP;
					object.counterX-=ABSOLUTE_STEP;
				}
				else if(object.d==1 && object.counterX<object.maxX){
					object.point.x+=ABSOLUTE_STEP;
					object.counterX+=ABSOLUTE_STEP;
				}
		}
		else if(MAKE_DIM==0){	
			object.point.x+=ABSOLUTE_STEP;
			object.spawnX+=ABSOLUTE_STEP;
		}
		

		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

		if(object.type=='PORT'){
			OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
			OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
			OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
			OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
		}
		
		
	}	
	if(ev.keyCode==37){//freccia sx
		
		if(EDITOR!=1)
			return;

		let object=null;
		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1)
				object=this.arrayFloor[i]

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1)
				object=this.arrayEnemy[i]

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				object=this.arrayBox[i];	

		if(object==null)
			return;		

		if(MAKE_DIM==1 && object.identifier=='floor' && object.width-ABSOLUTE_STEP>0)
			object.width-=ABSOLUTE_STEP;

		else if( (BLOCK_OBJECT==1 && object.identifier=='floor' && object.type=='FSX_0' )||
				(BLOCK_OBJECT==1 && object.identifier=='enemy' && (object.type==0 || object.type==3)) ){

				if(object.a==1 && object.counterX<object.maxX){
					object.point.x-=ABSOLUTE_STEP;
					object.counterX+=ABSOLUTE_STEP;
				}
				else if(object.d==1 && object.counterX>0){
					object.point.x-=ABSOLUTE_STEP;
					object.counterX-=ABSOLUTE_STEP;
				}
		}
		else if(MAKE_DIM==0){
			object.point.x-=ABSOLUTE_STEP;
			object.spawnX-=ABSOLUTE_STEP;
		}
		

		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

		if(object.type=='PORT'){
			OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
			OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
			OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
			OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
		}
		
	}	
	if(ev.keyCode==38){//freccia su
		
		if(EDITOR!=1)
			return;

		let object=null;
		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1)
				object=this.arrayFloor[i]

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1)
				object=this.arrayEnemy[i]

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				object=this.arrayBox[i];

		if(object==null)
			return;				

		
		if(MAKE_DIM==1 && object.identifier=='floor')
			object.height+=ABSOLUTE_STEP*2;

		else if(BLOCK_OBJECT==1 && object.identifier=='floor' && object.type=='FSY_0'){

				if(object.a==1 && object.counterY<object.maxY){
					object.point.y-=ABSOLUTE_STEP*2;
					object.counterY+=ABSOLUTE_STEP*2;
				}
				else if(object.d==1 && object.counterY>0){
					object.point.y-=ABSOLUTE_STEP*2;
					object.counterY-=ABSOLUTE_STEP*2;
				}
		}
		else if(MAKE_DIM==0){
			object.point.y-=ABSOLUTE_STEP*2;	
			object.spawnY-=ABSOLUTE_STEP*2;
		}
		

		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

		if(object.type=='PORT'){
			OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
			OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
			OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
			OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
		}
		
	}	
	if(ev.keyCode==40){//freccia giu
		
		if(EDITOR!=1)
			return;

		let object=null;
		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1)
				object=this.arrayFloor[i]

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1)
				object=this.arrayEnemy[i]

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				object=this.arrayBox[i];	

		if(object==null)
			return;		


		if(MAKE_DIM==1 && object.identifier=='floor' && object.height-(ABSOLUTE_STEP*2)>0)
			object.height-=ABSOLUTE_STEP*2;

		else if(BLOCK_OBJECT==1 && object.identifier=='floor' && object.type=='FSY_0'){

				if(object.a==1 && object.counterY>0){
					object.point.y+=ABSOLUTE_STEP*2;
					object.counterY-=ABSOLUTE_STEP*2;
				}
				else if(object.d==1 && object.counterY<object.maxY){
					object.point.y+=ABSOLUTE_STEP*2;
					object.counterY+=ABSOLUTE_STEP*2;
				}
		}
		else if(MAKE_DIM==0){
			object.point.y+=ABSOLUTE_STEP*2;
			object.spawnY+=ABSOLUTE_STEP*2;
		}
		

		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

		if(object.type=='PORT'){
			OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
			OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
			OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
			OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
		}
		
	}	
	
	if(ev.keyCode==16){//shift
		
		if(EDITOR!=1)
			return;

		let object=null;
		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1)
				object=this.arrayFloor[i];

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1)
				object=this.arrayEnemy[i];

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				object=this.arrayBox[i];	

		if(object==null)
			return;	

		let old=OBJECT_BACK;
		object.point.x=old.x;
		object.point.y=old.y;
		if(object.identifier=='floor'){
			object.width=old.width;
			object.height=old.height;
		}
		object.maxX=old.maxX;
		object.maxY=old.maxY;
		object.type=old.type;

		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);
		
	}	

	if(ev.keyCode==13){//invio
		
		if(EDITOR!=1)
			return;

		if(document.getElementById('makeBox').style.display=='block')
			this.updateMakeBox();

		for(let i=0;i<this.arrayFloor.length;i++)
			if(this.arrayFloor[i].make==1){
				this.arrayFloor[i].make=0;
				this.arrayFloor[i].blockMove=0;

			}

		for(let i=0;i<this.arrayEnemy.length;i++)
			if(this.arrayEnemy[i].make==1){
				this.arrayEnemy[i].make=0;
				this.arrayEnemy[i].blockMove=0;
			}

		for(let i=0;i<this.arrayBox.length;i++)
			if(this.arrayBox[i].make==1)
				this.arrayBox[i].make=0;	

		OBJECT_BACK=null;
		
		let nodeMakeDim=document.getElementById('makeDim');
		MAKE_DIM=0;
		nodeMakeDim.style.backgroundColor='grey';
		nodeMakeDim.style.borderColor='red';

		exitMakeBox();
		if(OBJECT_MOVE_RANGE==null)
			return;
		
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,'cancella',game);
		OBJECT_MOVE_RANGE=null;


		let nodePort=document.getElementById('moveDiv1');
		if(nodePort!=null){
			nodePort.parentNode.removeChild(nodePort);
			OBJECT_MOVE_RANGE_PORT=null;
		}
	
		
		if(OBJECT_MOVE_RANGE_BOSS1!=null){
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS1,'cancella-zona1',game);
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS2,'cancella-zona2',game);
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS3,'cancella-zona3',game);
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS4,'cancella-zona4',game);
			this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS5,'cancella-zona5',game);
				
			OBJECT_MOVE_RANGE_BOSS1=null;
			OBJECT_MOVE_RANGE_BOSS2=null;
			OBJECT_MOVE_RANGE_BOSS3=null;
			OBJECT_MOVE_RANGE_BOSS4=null;
			OBJECT_MOVE_RANGE_BOSS5=null;
		}
		

		
	}	


}

/****************/

Game.prototype.movePlayerUp=function(ev){

	playerNode=document.getElementById(PLAYER_ID+this.player.type);

	
	if(ev.keyCode==65 && PAUSA==0){//a  mov SX
		this.player.a=0;
		if(this.player.v0=='a')
			this.player.v0=null;
		
	}	

	else if(ev.keyCode==68 && PAUSA==0){//d  mov DX
		this.player.d=0;
		if(this.player.v0=='d')
			this.player.v0=null; //in caso di bug pulire l'intervallo dei floor
		
	}	

	else if(ev.keyCode==87 && this.player.wUp==0 && PAUSA==0){//w  SALTO
		this.player.wUp=1;
		this.player.w=0;
		if(this.player.collision==1)
			this.player.gravity=1;
		clearTimeout(jumpTime);
		

	}

	
	else if(ev.keyCode==187 && PAUSA==0){ //+ mobilità completa

		ALL_MOVIMENT=0;
	}

	else if(ev.keyCode==32 && PAUSA==0){//space SPARA

		this.player.fire=0;
		clearInterval(bulletInterval);
		bulletInterval=null;
	
	}

	else if(ev.keyCode==/*16*/83 && (this.player.shift==1 || this.player.sEditor==1) && PAUSA==0){//shift ACCOVACCIA
		
		
		if(ALL_MOVIMENT==1)
			this.player.sEditor=0;//nell'editor lo uso per muovermi anche verso il basso
		
		else{


			for(let i=0;i<this.arrayFloor.length;i++){  //se sono abbassato sotto ad un floor più basso di origin_height

				let tocco=null;
				let objectShift=new Player(this.playground);
				objectShift.identifier='nessuno';
				objectShift.point.x=this.player.point.x;
				objectShift.point.y=this.player.point.y;
				objectShift.height=this.player.height;

				while(objectShift.height<this.player.origin_height){

					tocco=this.arrayFloor[i].floorHit(objectShift,'player-floor');
					
					let fx=this.arrayFloor[i].point.x;
					let fw=this.arrayFloor[i].width;
					let ox=objectShift.point.x;
					let ow=objectShift.width;
					if(tocco=='sotto'){
						
						if(ox==fx+fw || ox+ow==fx)
							tocco=null;
						else 
							break;
					}
					
					objectShift.height+=this.player.stepY;
					objectShift.point.y-=this.player.stepY;
				}

				if(tocco=='sotto')
					return;
				


			}



			if(playerNode!=null)
				if(this.player.bulletDir=='d')
					playerNode.style.backgroundImage="url('../css/player/player-dx1-gun"+this.player.typeBullet.type.toString()+".png')";
				else if(this.player.bulletDir=='a')
					playerNode.style.backgroundImage="url('../css/player/player-sx1-gun"+this.player.typeBullet.type.toString()+".png')";

			this.player.shift=0;
			this.player.blockJump=0;
		}
	}


	


}

/*******/
Game.prototype.playerFall=function(){

	this.player.w=0;
	this.player.gravity=1;
	

}


/******************************/

Game.prototype.createDeathDiv=function(object){


	let div=new DeathDiv(object);
	div.index=this.deathDivOut;
	this.deathDivOut++;
	this.arrayDeathDiv.push(div);

}


/*****************************/

Game.prototype.createBulletCollisionDiv=function(object){


	let div=new BulletCollisionDiv(object);
	div.index=this.bulletCollisionDivOut;
	this.bulletCollisionDivOut++;
	this.arrayBulletCollisionDiv.push(div);

}


/******************************/
Game.prototype.deleteObject=function(object){  //object è una stringa identificativa

	let array; let baseId;
	if(object=="floor"){
		baseId=BASE_FLOOR_ID;
	    array=this.arrayFloor;
	}
	 
	else if(object=="enemy"){
		baseId=BASE_ENEMY_ID+'_';
		array=this.arrayEnemy;
	}
	else if(object=="box"){
		baseId=BASE_BOX_ID;
		array=this.arrayBox;
	}

	else if(object=="deathDiv"){
		baseID=BASE_DEATHDIV_ID;
		array=this.arrayDeathDiv;
	}


	else if(object=="bulletCollisionDiv"){
		baseID=BASE_BULLETCOLLISIONDIV_ID;
		array=this.arrayBulletCollisionDiv;
	}
		
	let objectNode;
	for(let i=0;i<array.length;i++){

		if(array[i].point.x>this.playground.width)
			continue;
		
		//non cancello oggetti che non sono ancora entrati in playground
		 

		objectNode=document.getElementById(baseId+array[i].type+'_'+array[i].index); //così sono sicuro di non eliminare prima di aver cancellato il div



		if((array[i].width<=0 /*|| array[i].height<=0*/)&&objectNode==null){

			if(array[i].identifier=='enemy' &&  array[i].arrayBullet.length>0)
				break;

			if(array[i].identifier=='enemy'){  //per sicurezza
				clearInterval(array[i].bulletTimeEnemy);
				clearInterval(array[i].bulletInterval);
			}

			if(i==0)
				array.shift();
			else{

				array[i]=array[0];
				array.shift();
			}
		}
	}
}



/*************/

Game.prototype.checkBoxHit=function(){

	let player=this.player;
	let game=GAME;
	let arrayBox=this.arrayBox;

	if(PAGE=='editor')
		return;

	for(let i=0;i<arrayBox.length;i++){

		let hit=arrayBox[i].boxHit(player);

		if(hit=='hitBox'){

			if(arrayBox[i].type==16 || arrayBox[i].type==17 || arrayBox[i].type==18 || arrayBox[i].type==19)
				arrayBox[i].trigger(game);

			let oldLife=player.life;		
			player.life+=arrayBox[i].addLife;

			if(oldLife>100 && player.life>400) //con armatura attiva
				player.life=400;

			else if(oldLife<100 && player.life>100)
				player.life=100;	

			if(player.life>400)
				player.life=400;

			if(arrayBox[i].newBullet!=null){
				player.typeBullet=arrayBox[i].newBullet;
				player.counterFire=0;
				player.intervalFire=arrayBox[i].newBullet.interval;
				clearInterval(bulletTimePlayer);
				clearInterval(bulletInterval);
				game.clockBulletPlayer();
			}

			if(arrayBox[i].addAmmo!=null)
				player.ammo+=arrayBox[i].addAmmo;

			if(arrayBox[i].type==10 || arrayBox[i].type==11)
				player.slotChiaveG=1;

			if(arrayBox[i].type==12 || arrayBox[i].type==13)
				player.slotChiaveB=1;

			if(arrayBox[i].type==14 || arrayBox[i].type==15)
				player.slotChiaveR=1;

			arrayBox[i].width=0;
		}
	}	

}



/****************************/

Game.prototype.clockBulletPlayer=function(){


	let player=this.player;
	let array=this.player.arrayBullet;
	let arrayEnemy=this.arrayEnemy;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let sketcher=this.sketcher;
	let game=GAME;
	

	bulletTimePlayer=setInterval(function(){

									if(PAUSA==1 || EDITOR==1)
											return;


								
								for(let i=0;i<array.length;i++){

										game.checkObjectHit(array[i],arrayEnemy,"bullet-enemy");
										game.checkObjectHit(array[i],arrayFloor,"bullet-floor");

										array[i].moveBullet(playground);
										sketcher.drawObject(array[i],array[i].index,game);
										player.deleteBullet();
								}


								
							},player.typeBullet.time);



}

/************************************/



Game.prototype.clockBulletEnemy=function(enemy){  


	let array=enemy.arrayBullet;
	let player=this.player;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let sketcher=this.sketcher;
	let game=GAME;
		
	//bulletTimeEnemy devo metterlo come campo di enemy per distinguerlo da quello degli altri
	enemy.bulletTimeEnemy=setInterval(function(){

								if(PAUSA==1 || EDITOR==1)
											return;


								for(let i=0;i<array.length;i++){

										game.checkObjectHit(array[i],player,"bullet-player");
										game.checkObjectHit(array[i],game.arrayEnemy,'bulletEnemy-enemy');

										if(array[i].type!=3)
											game.checkObjectHit(array[i],arrayFloor,"bullet-floor");

										array[i].moveBullet(playground);
										sketcher.drawObject(array[i],array[i].index,game);
										enemy.deleteBullet();
								}


								
							},enemy.typeBullet.time);  //gestisce movimento proiettili nemici



}

/*********************************/

Game.prototype.moveAll=function(dir){


	let game=GAME;
	let player=this.player;
	let sketcher=this.sketcher;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let arrayEnemy=this.arrayEnemy;
	let arrayBox=this.arrayBox;

											let newStep=null;
											if(dir=='a'){
												newStep=STEP;
												if(game.triggerMove==0)
													player.metri--;
											}
											
											else{
												newStep=-STEP;
												if(game.triggerMove==0)
													player.metri++;
											}
											

											if(OBJECT_MOVE_RANGE!=null)
												OBJECT_MOVE_RANGE.point.x+=newStep;

	
											for(let i=0;i<game.arrayFloor.length;i++){

												if(game.arrayFloor[i].type=='sfondo' && detectmob()==true)
													continue;
												arrayFloor[i].point.x+=newStep;
											}

												


											for(let i=0;i<arrayEnemy.length  && player.shift!=1;i++){
											
														if(arrayEnemy[i].width>0 && arrayEnemy[i].height>0){

																
																	arrayEnemy[i].point.x+=newStep;
																	arrayEnemy[i].spawnX+=newStep;

										

																	for(let j=0;j<arrayEnemy[i].arrayBullet.length;j++)

																		if(arrayEnemy[i].arrayBullet[j].dir=='a')
																			arrayEnemy[i].arrayBullet[j].point.x-=newStep;
																		
														}		
											}

											//muovo proiettili del player

											for(let i=0;i<player.arrayBullet.length  && player.shift!=1;i++)

													if(player.arrayBullet[i].dir=='a')
														player.arrayBullet[i].point.x-=newStep;
													

											//muovo i box e li disegno	

											for(let i=0;i<arrayBox.length;i++)

													arrayBox[i].point.x+=newStep;
											

											for(let i=0;i<game.arrayDeathDiv.length && player.shift!=1;i++){

													game.arrayDeathDiv[i].point.x+=newStep;
												
											}	

											for(let i=0;i<game.arrayBulletCollisionDiv.length && player.shift!=1;i++){

													game.arrayBulletCollisionDiv[i].point.x+=newStep;
												
											}





}


/*********************************/

Game.prototype.createRandomBox=function(x,y,width,height){


	let game=GAME;
	let player=this.player;
	let sketcher=this.sketcher;
	let playground=this.playground;
	let arrayBox=this.arrayBox;

	let type0=new KitMedicoSmall; 
	let type1=new KitMedicoMedium; 
	
	let type7=new MunizioniSmall;
	let type8=new MunizioniMedio;
	


	let random=getRandomInt(1,3);
	let tipo=null;
	let estrazione=null;
	let heightBox=40;

	if(random==1){
		estrazione=getRandomInt(0,4);
	
		switch (estrazione) {
 			case 0:
    			tipo=type0;
    		break;

  			case 1:
    			tipo=type1;
    		break;

    		case 2:
    			tipo=type7;
    		break;

    		case 3:
    			tipo=type8;
    		break;

    		

		}
		if(tipo==null)
			return;

		arrayBox.push(new Box(x,y+height-heightBox,tipo));
		arrayBox[arrayBox.length-1].index=game.boxOut;
		game.boxOut++;
		
	}
		


}


/***************************************/

Game.prototype.distruttore=function(){

	

	let node=document.getElementById('playground');

	let game=GAME;

	while (node.hasChildNodes()) {  
  		node.removeChild(node.firstChild);
	} 

	for(let i=0;i<game.arrayFloor.length;i++)
		game.arrayFloor[i].width=0;
	

		

	

	for(let i=0;i<game.arrayEnemy.length;i++){
		let e=game.arrayEnemy[i];
		for(let j=0;j<e.arrayBullet.length;j++){
			e.arrayBullet[j].width=0;
			game.sketcher.drawObject(e.arrayBullet[j],e.arrayBullet[j].index,game);
		}

		e.deleteBullet();	
		game.arrayEnemy[i].width=0;
		game.sketcher.drawObject(game.arrayEnemy[i],game.arrayEnemy[i].index,game);
	}

	

	for(let i=0;i<game.arrayBox.length;i++)
		game.arrayBox[i].width=0;

	for(let i=0;i<game.arrayDeathDiv.length;i++)
		game.arrayDeathDiv[i].width=0;

	for(let i=0;i<game.player.arrayBullet.length;i++)
		game.player.arrayBullet[i].width=0;

	


}


/****************************************/



Game.prototype.checkObjectHit=function(object1,object2,objectIdentifier){// attivo passivo


	if(object1==null || object2==null)
		return;

	if(NO_COLLISION==1 && object2.identifier=='player') //il caso in cui il player è object1 è già gestito nel clock
		return;

	let game=GAME;
	let playground=this.playground;
	let sketcher=this.sketcher;
	let player=this.player;
	let stopCheckSopra=0;
	let stopCheckSotto=0;
	let stopCheckSx=0;
	let stopCheckDx=0;

	let array;
	if(object2.identifier=='player'){
		array=new Array();
		array.push(object2);
	}
	else{
		array=object2;
	}


	if(object1.point.x>game.playground.width+game.playground.width/4 && object1.type!='FSX_0')
			return;//non controllo collisioni di oggetti fuori dal playground che quindi non si muovono,però controllo collisioni di FSX_0 per mantenere sincronizzazioni
	if(object1.point.x+object1.width<0-game.playground.width/4 && EDITOR==1 && object1.type!='FSX_0')
		return;		


	if(object1.height==0)
		return;
		
	for(let i=0;i<array.length;i++){


		if(array[i].point.x>game.playground.width+game.playground.width/4 && object1.type!='FSX_0' )
			continue;//non controllo collisioni di oggetti fuori dal playground che quindi non si muovono
		if(array[i].point.x+array[i].width<0-game.playground.width/4 && EDITOR==1 && object1.type!='FSX_0' )
			continue;	

		if(objectIdentifier=='bulletEnemy-enemy' && array[i].type!=6 && array[i].type!=7)
			continue;	

		

		if(array[i].height==0)
			continue;	
		

		if(array[i].identifier=='floor' && (array[i].type=='EGY'  || array[i].type=='sfondo'))
			continue;


		if(objectIdentifier=="player-floor" || objectIdentifier=="bullet-floor" ||  objectIdentifier=="enemy-floor")
			base=BASE_FLOOR_ID+array[i].type+'_'+array[i].index;

		if(objectIdentifier=="player-enemy" || objectIdentifier=="bullet-enemy" || objectIdentifier=='enemy-enemy' || objectIdentifier=='bulletEnemy-enemy')
			base=BASE_ENEMY_ID+'_'+array[i].type+'_'+array[i].index;


		if(objectIdentifier=="bullet-player")
			base=PLAYER_ID+array[i].type;
		


		let objectNode=document.getElementById(base);
	
		/*if(object1==null)
			continue;
		

		if(objectNode==null)
			game.sketcher.drawObject(array[i],array[i].index,game);*/


		let tocco=0; let dirY=null;  //dirY serve a sapere se quello attivo sta saltando oppure no
		if(objectIdentifier=="player-floor" || objectIdentifier=="player-enemy" || objectIdentifier=="enemy-floor" || objectIdentifier=="enemy-enemy")
			dirY=object1.w;
		else if(objectIdentifier=="bullet-floor" || objectIdentifier=="bullet-enemy")
			dirY=object1.dir;

		if(objectIdentifier=="player-floor" || objectIdentifier=="bullet-floor" || objectIdentifier=="enemy-floor")
			tocco=array[i].floorHit(object1,objectIdentifier);

		if(objectIdentifier=="player-enemy" || objectIdentifier=="bullet-enemy" || objectIdentifier=="enemy-enemy" || objectIdentifier=="bulletEnemy-enemy"  ) 
			tocco=array[i].enemyHit(object1,dirY);

		if(objectIdentifier=="bullet-player")
			tocco=array[i].playerHit(object1,dirY);

		
		

		if(tocco=="presoFloor" && objectIdentifier=='bullet-floor'){  //proiettile ha preso un Floor

			if(array[i].type!='PORT'){
				game.createBulletCollisionDiv(object1);

				object1.width=0;
				object1.point.y=playground.offsetTop+playground.height;
					break;
			}
			else if(array[i].type=='PORT' && array[i].a==0){
				array[i].a=1;
			
			
				
				let h=object1.height;
				object1.height=0;
				
				setTimeout(function(){
					array[i].point.x+=array[i].maxX;
					array[i].point.y+=array[i].maxY;
					setTimeout(function(){
						object1.height=h;
						if(object1.dir=='d')
							object1.point.x=array[i].point.x+array[i].width;
						else
							object1.point.x=array[i].point.x-object1.width;
						
						object1.point.y=array[i].point.y+(parseInt(parseInt(array[i].height/2)/10)*10);
						
							
						setTimeout(function(){
							array[i].point.x-=array[i].maxX;
							array[i].point.y-=array[i].maxY;
							array[i].a=0;	
						},300);
					},200);
				},100);

				break;
			}
			else if(array[i].type=='PORT')
				continue;
		}		
		else if(tocco=="presoFloor" && (objectIdentifier=='player-floor' || objectIdentifier=='enemy-floor')){ //accade solo per FB (bomba) e portale
			
			if(array[i].type=='FB'){
				if(object1.identifier=='player')
					if(array[i].contactDamage<=object1.life)
						this.danniSubiti+=array[i].contactDamage;
					else if(object1.life>0)
						this.danniSubiti+=object1.life;

				object1.life-=array[i].contactDamage;

					

				if(object1.life<=0){
					
						if(object1.identifier=='enemy' && object1.type!=6 && object1.type!='boss1'){
							game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
							if(object1.type!=7)
										game.nemiciUccisi++;
						}

						if(object1.identifier=='enemy' && object1.type==6){
							object1.explode(game);
						
						
						}
						else if(object1.identifier!='player')
							game.createDeathDiv(object1);
						

					
					if(object1.identifier!='player')
						object1.width=0;
					object1.damage=0;
					
					
				}
				return;//object1 (oggetto attivo) è appena morto dunque non bisogna controllare altre collisioni
						//inoltre la mancanza di questo return genera il crash del browser
			}
			if(array[i].type=='PORT' && array[i].a==0){
				array[i].a=1;
				object1.collision=0;
			
				let h=object1.height;
				object1.height=0;
				
				setTimeout(function(){
					game.player.metri-=parseInt((game.player.point.x-array[i].point.x)/5); //il point x del player è sempre>di quello di PORT
					array[i].point.x+=array[i].maxX;
					array[i].point.y+=array[i].maxY;
					setTimeout(function(){
						object1.height=h;
						object1.point.x=array[i].point.x+(parseInt(parseInt(array[i].width/2)/5)*5);
						object1.point.y=array[i].point.y+(parseInt(parseInt(array[i].height/2)/10)*10);
						

						game.player.metri+=parseInt(parseInt(array[i].width/2)/5);
						if(array[i].maxX>0)
							game.player.metri+=parseInt(array[i].maxX/5);
						else
							game.player.metri+=parseInt(array[i].maxX/5);

						if(object1.identifier=='player')
							game.playerFall();
						
						else
							object1.collision=1;	
						setTimeout(function(){
							array[i].a=0;	
							array[i].point.x-=array[i].maxX;
							array[i].point.y-=array[i].maxY;
							
						
						},200);
					},200);
				},100);

				return;
			}
			else if(array[i].type=='PORT')
				continue;
		}

		/***NON MI IMPORTA DA DOVE COLPISCE IL PROIETTILE**/

		else if(tocco!=0 && tocco!=null && (objectIdentifier=="bullet-enemy" || objectIdentifier=="bullet-player" || objectIdentifier=="bulletEnemy-enemy" )){

			if(array[i]==null || object1.width==0)return;  //per risolver errore bomba


				if(object1.dir=='d' && array[i].view=='dx' && array[i].type!=6 && array[i].type!=7){

					setTimeout(function(){ 
						if(array[i]==null)
							return;
						if(array[i].a==1 || array[i].type==2)//non vale per torretta
							return;
						array[i].view='sx'
						array[i].a=1;
						array[i].d=0;
						array[i].counterX=array[i].maxX-array[i].counterX;
						objectNode.style.backgroundImage="url('../css/enemy/enemy"+array[i].type+"-a1.png')";
					},1000);
				}
				else if(object1.dir=='a' && array[i].view=='sx' && array[i].type!=6 && array[i].type!=7){
						
					setTimeout(function(){

						if(array[i]==null)
							return;

						if(array[i].d==1 || array[i].type==2)
							return;

						array[i].view='dx'
						array[i].a=0;
						array[i].d=1;
						array[i].counterX=array[i].maxX-array[i].counterX;
						objectNode.style.backgroundImage="url('../css/enemy/enemy"+array[i].type+"-d1.png')";
					},1000);
				}

				game.createBulletCollisionDiv(object1);

				

				if(array[i].identifier=='player'){
					if(object1.damage<=array[i].life)
						this.danniSubiti+=object1.damage;
					else if(object1.life>0)
						this.danniSubiti+=array[i].life;
				}
				else if(array[i].identifier=='enemy'){
					this.danniInflitti+=object1.damage;
					this.colpiSegno++;		
				}

				array[i].life-=object1.damage;
				

				if(array[i].life<=0){

					if(array[i].identifier=='enemy' && array[i].type!=6 && array[i].type!='boss1'){
						game.createRandomBox(array[i].point.x,array[i].point.y,array[i].width,array[i].height);
						if(object1.type!=7)
									game.nemiciUccisi++;
					}

					if(array[i].type!=6)
						game.createDeathDiv(array[i]);
					else if(array[i].type==6)
						array[i].explode(game);

					if(objectIdentifier=="bullet-enemy" && array[i].type=="boss1"){ //passo al secondo livello

						
							let chiave=new chiaveR_0;
							chiave.index=game.boxOut;
							game.arrayBox.push(new Box(array[i].point.x,array[i].point.y+array[i].height-40,chiave));
							game.boxOut++;
							clearInterval(timeBoss1Move);
							setTimeout(function(){clearInterval(timeBoss1Fire);},1000);
					}

					if(player.point.y+player.height==array[i].point.y)
						game.playerFall();

					array[i].width=0;
					array[i].point.x=playground.offsetLeft;
					if(array[i].identifier=='enemy')
						clearInterval(array[i].bulletInterval);

					objectNode.parentNode.removeChild(objectNode);
				}
				objectNode.style.display='none';
				setTimeout(function(){objectNode.style.display='block';},20);
				object1.width=0;
				object1.damage=0;
				
				break;
			}

		/***/

		else if(tocco=="sopra" && stopCheckSopra!=1 ){

			

			if(objectIdentifier=="player-enemy" && array[i].type!=6 && array[i].type!=7){

				object1.w=1;
				object1.gravity=0;
				clearTimeout(jumpTime);
				jumpTime=setTimeout(function(){game.playerFall();},object1.jump);
				
				let danno=array[i].contactDamage;

				if(object1.life>=danno)
					this.danniSubiti+=danno;
				else if(object1.life>0)
					this.danniSubiti+=object1.life;
				object1.life-=danno;

				

				if(array[i].view=='dx')
					object1.v0='a';
				else
					object1.v0='d';

				

				stopCheckSopra=1;

			}	
		
			if(objectIdentifier=="player-floor" || (objectIdentifier=="player-enemy" && (array[i].type==6 || array[i].type==7))){
				object1.collision=0;
				object1.gravity=0;
				object1.v0=null;
				array[i].collisionFloor=0;

				if(array[i].type=='FPorta' ||
				(array[i].type=='FPortaG_0' && player.slotChiaveG==1) ||
				(array[i].type=='FPortaB_0' && player.slotChiaveB==1) ||
				(array[i].type=='FPortaR_0' && player.slotChiaveR==1) ){
					array[i].a=1;
					if(array[i].type=='FPortaG_0')
						player.slotChiaveG=0;
					else if(array[i].type=='FPortaB_0')
						player.slotChiaveB=0;
					else if(array[i].type=='FPortaR_0')
						player.slotChiaveR=0;

				}

				
				if(array[i].type=='FM'){

					
					if(array[i].contactDamage<=object1.life && object1.identifier=='player')
						this.danniSubiti+=array[i].contactDamage;
					else if(object1.identifier=='player' && object1.life>0)	
						this.danniSubiti+=object1.life;

					object1.life-=array[i].contactDamage;

					

				}

				stopCheckSopra=1;

				if(array[i].type=='FSX_0') //caso particolare in cui sono su un FSX e corro verso un floor collidendo a velocità doppia
					for(let k=0;k<game.arrayFloor.length;k++){

						let tocco3=game.arrayFloor[k].floorHit(player,'bullet-floor');

						if(tocco3=='presoFloor' && game.arrayFloor[k].index!=array[i].index && game.arrayFloor[k].type!='sfondo'){
							if(player.a==1){
								player.point.x=game.arrayFloor[k].point.x+game.arrayFloor[k].width;
								player.blockSx=1;
							}
							else if(player.d==1){
								player.point.x=game.arrayFloor[k].point.x-player.width;
								player.blockDx=1;
							}
						}
					}


				if((array[i].type=='FSY_0' || array[i].type=='FAscensore_0') && array[i].a==1) 
					for(let k=0;k<game.arrayFloor.length;k++){

						let tocco3=game.arrayFloor[k].floorHit(player,'player-floor'); //cerco di capire se sono schiaccito fra 2 oggetti

						if(tocco3=='sotto' && game.arrayFloor[k].index!=array[i].index && game.arrayFloor[k].type!='sfondo'){
						
							if(player.collision==0 ){  //il floor ti schiaccia

								let dannoFSY=Math.floor((array[i].height*array[i].width)/500);
								if(player.life>=dannoFSY)
									this.danniSubiti+=dannoFSY;
								else if(player.life>0)
									this.danniSubiti+=player.life;
								player.life-=dannoFSY;
								//object1.point.y+=object1.stepY;

								if(player.life>0 && player.collision==0){ //se non sei morto non ti schiaccia definitivamente

						
									array[i].d=1;
									array[i].a=0;
									array[i].counterY=array[i].maxY-array[i].counterY;
						
								}	
							}	

						}

					}	


			}

			if(objectIdentifier=="enemy-floor" || objectIdentifier=="enemy-enemy"){
				object1.collision=0;

				if(object1.type==6 || object1.type==7){
					object1.life-=object1.counterFall*3;
					if(object1.life<=0){
						if(object1.type==6)
							object1.explode(game);
						else {
							//if(object1.type!=7)
								game.createDeathDiv(object1);
							game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
							if(object1.type!=7)
									game.nemiciUccisi++;
						}
						object1.width=0;
					}
				}
				object1.counterFall=0;

				object1.gravity=0;
				object1.v0=null;

			


				if(objectIdentifier=="enemy-floor" && array[i].type=='FM'){
					object1.life-=array[i].contactDamage;

					if(object1.life<=0){

						if(array[i].identifier=='enemy' && array[i].type!=6 && array[i].type!='boss1'){
							game.createRandomBox(array[i].point.x,array[i].point.y,array[i].width,array[i].height);
							if(object1.type!=7)
									game.nemiciUccisi++;
						}

						object1.life=0;
						object1.width=0;
					}
				}


				if(array[i].type=='FSX_0') //caso particolare in cui sono su un FSX e corro verso un floor collidendo a velocità doppia
					for(let k=0;k<game.arrayFloor.length;k++){

						let tocco3=game.arrayFloor[k].floorHit(object1,'bullet-floor');

						if(tocco3=='presoFloor' && game.arrayFloor[k].index!=array[i].index && game.arrayFloor[k].type!='sfondo'){
							if(object1.a==1){
								object1.point.x=game.arrayFloor[k].point.x+game.arrayFloor[k].width;
								object1.blockSx=1;
							}
							else if(object1.d==1){
								object1.point.x=game.arrayFloor[k].point.x-object1.width;
								object1.blockDx=1;
							}
						}
					}


				if((array[i].type=='FSY_0' || array[i].type=='FAscensore_0') && array[i].a==1) 
					for(let k=0;k<game.arrayFloor.length;k++){

						let tocco3=game.arrayFloor[k].floorHit(object1,'enemy-floor');

						if(tocco3=='sotto' && game.arrayFloor[k].index!=array[i].index && game.arrayFloor[k].type!='sfondo'){
						
							if(object1.collision==0 ){  //il floor ti schiaccia
								object1.life-=Math.floor((array[i].height*array[i].width)/500);
								

								if(object1.life>0 && object1.collision==0){ //se non sei morto non ti schiaccia definitivamente

						
									array[i].d=1;
									array[i].a=0;
									array[i].counterY=array[i].maxY-array[i].counterY;
						
								}
								else{
									
									game.createDeathDiv(object1);
									game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
									object1.width=0;	
									object1.life=0;
									if(object1.type!=7)
										game.nemiciUccisi++;
								}	
							}	

						}

					}		



				stopCheckSopra=1
					
			}
	
													
		}
		else if(tocco=="sotto" && stopCheckSotto!=1){//non tutti i floor devono avere la collisione sotto

			

			if(objectIdentifier=='player-floor' &&
			(
			array[i].type=='FPorta' ||
			(array[i].type=='FPortaG_0' && player.slotChiaveG==1) ||
			(array[i].type=='FPortaB_0' && player.slotChiaveB==1) ||
			(array[i].type=='FPortaR_0' && player.slotChiaveR==1) )
			){
				array[i].a=1;
				if(array[i].type=='FPortaG_0')
					player.slotChiaveG=0;
				else if(array[i].type=='FPortaB_0')
					player.slotChiaveB=0;
				else if(array[i].type=='FPortaR_0')
					player.slotChiaveR=0;

			}


			if(objectIdentifier=="enemy-floor"){ //l'enemy non salta

				if(object1.collision==0 && (array[i].type=='FSY_0' || array[i].type=='FAscensore_0')){  //il floor ti schiaccia
					object1.life-=Math.floor((array[i].height*array[i].width)/500);
					
				
					if(object1.life>0 && array[i].d==1){ //se non sei morto non ti schiaccia definitivamente

						array[i].a=1;
						array[i].d=0;
						array[i].counterY=array[i].maxY-array[i].counterY;
					}
					else{
						//if(object1.type!=7)
							game.createDeathDiv(object1);
						game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
						if(object1.type!=7)
									game.nemiciUccisi++;
						object1.width=0;	
						object1.life=0;
					}
				}
			}

			if(objectIdentifier=="player-enemy"){

				let danno=array[i].contactDamage;

				if(object1.life>=danno)
					this.danniSubiti+=danno;
				else if(object1.life>0)
					this.danniSubiti+=object1.life;
				object1.life-=danno;

			}

			if(objectIdentifier=="player-floor"
				&& array[i].type!='FPorta'   //le porte generano un playerFall involontario quando si alzano
				&& array[i].type!='FPortaG_0'  
				&& array[i].type!='FPortaB_0'
				&& array[i].type!='FPortaR_0'){
				object1.blockJump=1;
				
				if(array[i].type=='FM'){

					
					if(array[i].contactDamage<=object1.life && object1.identifier=='player')
						this.danniSubiti+=array[i].contactDamage;
					else if(object1.identifier=='player' && object1.life>0)	
						this.danniSubiti+=object1.life;

					object1.life-=array[i].contactDamage;

				}

				if(object1.collision==0 && (array[i].type=='FSY_0' || array[i].type=='FAscensore_0')){  //il floor ti schiaccia

					let dannoFSY=Math.floor((array[i].height*array[i].width)/500);

					if(object1.life>=dannoFSY)
						this.danniSubiti+=dannoFSY;
					else if(object1.life>0)
						this.danniSubiti+=object1.life;
					object1.life-=dannoFSY;

				
					if(object1.life>0 && object1.collision==0 && (array[i].d==1 || array[i].type=='FAscensore_0')){ //se non sei morto non ti schiaccia definitivamente
		
						if(array[i].type=='FAscensore_0')
							array[i].salitaForzata=1;
						array[i].a=1;
						array[i].d=0;
						array[i].counterY=array[i].maxY-array[i].counterY;
						
					}	
				}	
				
				else{
					game.playerFall();
					clearTimeout(jumpTime);
				}

					
				

				
			}



			stopCheckSotto=1;

		}
		else if(tocco=="sx"){//stopCheckSx non necessario
								
			
			if(objectIdentifier=="player-floor"){
				
				object1.blockDx=1;

				if(array[i].type=='FM'){

					
					if(array[i].contactDamage<=object1.life && object1.identifier=='player')
						this.danniSubiti+=array[i].contactDamage;
					else if(object1.identifier=='player' && object1.life>0)	
						this.danniSubiti+=object1.life;

					object1.life-=array[i].contactDamage;

				}


				if(array[i].type=='FSX_0'){

					let arrayF=game.arrayFloor;
					for(let k=0;k<arrayF.length;k++){
						let tocco3=arrayF[k].floorHit(object1,'player-floor');
						if(tocco3=='dx'){
							object1.blockSx=1;
							let dannoFSX=Math.floor((array[i].height*array[i].width)/500);

							if(object1.life>=dannoFSX)
								this.danniSubiti+=dannoFSX;
							else if(object1.life>0)	
								this.danniSubiti+=object1.life;
							object1.life-=dannoFSX;


							if(object1.life>0 && array[i].a==1){ //se non sei morto non ti schiaccia definitivamente

								array[i].a=0;
								array[i].d=1;
								array[i].counterX=array[i].maxX-array[i].counterX;
							}
							
						}

					}

					if(object1.blockSx==0){
						if(player.point.x<playground.offsetLeft+playground.width/2 && EDITOR==1 && DIST>0)
							game.moveAll('a');
						else{
							player.point.x-=array[i].stepX;
							player.metri--;
						}
					}	
						
					
						
				}

				if( array[i].type=='FPorta' ||
					(array[i].type=='FPortaG_0'&& player.slotChiaveG==1) ||
					(array[i].type=='FPortaB_0' && player.slotChiaveB==1) ||
					(array[i].type=='FPortaR_0' && player.slotChiaveR==1) ){
						array[i].a=1;
						if(array[i].type=='FPortaG_0' )
							player.slotChiaveG=0;
						else if(array[i].type=='FPortaB_0')
							player.slotChiaveB=0;
						else if(array[i].type=='FPortaR_0')
							player.slotChiaveR=0;

				}
		
				
				stopCheckSx=1;
			}


			if(objectIdentifier=="player-enemy" ){

				if((array[i].type==6 || array[i].type==7) && array[i].blockDx==0){
					array[i].point.x+=object1.absoluteStepX;
					array[i].spawnX+=object1.absoluteStepX;
				}
				else{
					object1.blockDx=1;
					
				}

				if(array[i].type!=6 && array[i].type!=7){

					object1.blockDx=1;
					object1.d=0;
					if(array[i].type!=2)
					setTimeout(function(){object1.blockDx=0;},200);

					let danno=array[i].contactDamage;

					if(object1.life>=danno)
						this.danniSubiti+=danno;
					else if(object1.life>0)
						this.danniSubiti+=object1.life;
					object1.life-=danno;

				
				}

				stopCheckSx=1;

			}	

			if((objectIdentifier=="enemy-enemy" || objectIdentifier=="enemy-floor")){
					
				
				if(objectIdentifier=="enemy-floor" && object1.collision==0 && (object1.type==0 || object1.type==3 || object1.type=='boss1'))
					//sto vedendo se l'enemy mentre collide a sx è anche sopra ad un FSX
					for(let j=0;j<game.arrayFloor.length;j++){
							let tocco2=game.arrayFloor[j].floorHit(object1,'enemy-floor');
							if(tocco2=='sopra' && game.arrayFloor[j].type=='FSX_0')
								object1.blockDx=1;

					}


					let arrayF=game.arrayFloor;
					if(array[i].type=='FSX_0')
					for(let k=0;k<arrayF.length;k++){
						let tocco3=arrayF[k].floorHit(object1,'enemy-floor');
						if(tocco3=='dx'){
							object1.blockSx=1;
							object1.life-=Math.floor((array[i].height*array[i].width)/500);

							if(object1.life>0 && array[i].a==1){ //se non sei morto non ti schiaccia definitivamente

								array[i].a=0;
								array[i].d=1;
								array[i].counterX=array[i].maxX-array[i].counterX;
							}
							else{
								
								game.createDeathDiv(object1);
								game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
								if(object1.type!=7)
									game.nemiciUccisi++;
								object1.width=0;	
								object1.life=0;
							}
							
						}

					}	



				if(object1.type==1 || object1.type==5 || object1.type==6 || object1.type==7 || object1.type==2 || object1.type==4)//cane e zombie
					object1.blockDx=1;


				else if(array[i].type!='FSX_0' && object1.blockDx!=1){
					object1.counterX=object1.maxX-object1.counterX;
					object1.a=1;
					object1.d=0;
					object1.view='sx';
					object1.blockDx=1;

				}
				else if(array[i].type=='FSX_0'  && object1.blockDx!=1)	
					object1.blockDx=1;
				

				if(objectIdentifier=="enemy-floor" && array[i].type=='FSX_0' && object1.blockSx==0){
						object1.point.x-=array[i].stepX;
						object1.spawnX-=array[i].stepX;
						if(object1.make==1)
							OBJECT_MOVE_RANGE.point.x-=array[i].stepX;
				}

		

				stopCheckSx=1;


			}

		}
		else if(tocco=="dx" ){//stopCheckDX non necessario

			
		

			if(objectIdentifier=="player-floor"){

				object1.blockSx=1;

				if(array[i].type=='FM'){

					
					if(array[i].contactDamage<=object1.life && object1.identifier=='player')
						this.danniSubiti+=array[i].contactDamage;
					else if(object1.identifier=='player' && object1.life>0)	
						this.danniSubiti+=object1.life;

					object1.life-=array[i].contactDamage;



				}


				if(array[i].type=='FSX_0'){

					let arrayF=game.arrayFloor;

					for(let k=0;k<arrayF.length;k++){
						tocco3=arrayF[k].floorHit(object1,'player-floor');
						if(tocco3=='sx'){
							object1.blockDx=1;

							let dannoFSX=Math.floor((array[i].height*array[i].width)/500);

							if(object1.life>=dannoFSX)
								this.danniSubiti+=dannoFSX;
							else if(object1.life>0)
								this.danniSubiti+=object1.life;
							object1.life-=dannoFSX;
							
						

							if(object1.life>0 && array[i].d==1){ //se non sei morto non ti schiaccia definitivamente

								array[i].a=1;
								array[i].d=0;
								array[i].counterX=array[i].maxX-array[i].counterX;
							}
							
						}

					}

					if(object1.blockDx==0){
						if(player.point.x>playground.offsetLeft+playground.width/2 && STEP!=0)
							game.moveAll('d');
						else{
							player.point.x+=array[i].stepX;
							player.metri++;
						}
					}
				}

				if( array[i].type=='FPorta' ||
					(array[i].type=='FPortaG_0' && player.slotChiaveG==1) ||
					(array[i].type=='FPortaB_0' && player.slotChiaveB==1) ||
					(array[i].type=='FPortaR_0' && player.slotChiaveR==1) ){
						array[i].a=1;
						if(array[i].type=='FPortaG_0')
							player.slotChiaveG=0;
						else if(array[i].type=='FPortaB_0')
							player.slotChiaveB=0;
						else if(array[i].type=='FPortaR_0')
							player.slotChiaveR=0;

				}
			
				

				stopCheckDx=1;
			}

			if(objectIdentifier=="player-enemy"){

				if((array[i].type==6 || array[i].type==7) && array[i].blockSx==0){
					array[i].point.x-=object1.absoluteStepX;
					array[i].spawnX-=object1.absoluteStepX;
				}
				else{
					object1.blockSx=1;
				}

				if(array[i].type!=6 && array[i].type!=7){
					object1.blockSx=1;
					object1.a=0;
					setTimeout(function(){object1.blockSx=0;},200);

					let danno=array[i].contactDamage;

					if(object1.life>=danno)
						this.danniSubiti+=danno;
					else if(object1.life>0)	
						this.danniSubiti+=object1.life;
					object1.life-=danno;
					
					
				}

				
				stopCheckDx=1;
			}	

			if((objectIdentifier=="enemy-enemy" || objectIdentifier=="enemy-floor")){

				
				if(objectIdentifier=="enemy-floor" && object1.collision==0 && (object1.type==0 || object1.type==3 || object1.type=='boss1'))
					//sto vedendo se l'enemy è su un FSX ma sbatte contro un floor
					for(let j=0;j<game.arrayFloor.length;j++){
							let tocco2=game.arrayFloor[j].floorHit(object1,'enemy-floor');
							if(tocco2=='sopra' && game.arrayFloor[j].type=='FSX_0')
								object1.blockSx=1;

					}



				let arrayF=game.arrayFloor;
				if(array[i].type=='FSX_0')
					for(let k=0;k<arrayF.length;k++){
						let tocco3=arrayF[k].floorHit(object1,'enemy-floor');
						if(tocco3=='sx'){
							object1.blockDx=1;
							object1.life-=Math.floor((array[i].height*array[i].width)/500);

							if(object1.life>0 && array[i].d==1){ //se non sei morto non ti schiaccia definitivamente

								array[i].a=1;
								array[i].d=0;
								array[i].counterX=array[i].maxX-array[i].counterX;
							}
							else{
	
								game.createDeathDiv(object1);
								game.createRandomBox(object1.point.x,object1.point.y,object1.width,object1.height);
								if(object1.type!=7)
									game.nemiciUccisi++;
								object1.width=0;	
								object1.life=0;
							}
							
						}

					}


				if(object1.type==1 || object1.type==5 || object1.type==6 || object1.type==7 || object1.type==2 || object1.type==4)//cane
					object1.blockSx=1;

				else if(array[i].type!='FSX_0' && object1.blockSx!=1){
					object1.counterX=object1.maxX-object1.counterX;
					object1.a=0;
					object1.d=1;
					object1.view='dx';
					object1.blockSx=1;	
				}
				else if(array[i].type=='FSX_0' && object1.blockSx!=1)
					object1.blockSx=1;	

				

				if(objectIdentifier=="enemy-floor" && array[i].type=='FSX_0' && object1.blockDx==0){
						object1.point.x+=array[i].stepX;
						object1.spawnX+=array[i].stepX;
						if(object1.make==1)
							OBJECT_MOVE_RANGE.point.x+=array[i].stepX;
						
				}

						


				stopCheckDx=1;
					

			}
		}
		
		else{
				

			if(array[i].collisionFloor==0 && (objectIdentifier=="player-floor" || objectIdentifier=="player-enemy")){

				array[i].collisionFloor=1;
				
	
				if(object1.w==0 && stopCheckSopra==0){
					object1.collision=1;
					object1.gravity=1;
					

				}	
			}

		}
	}	
	
	if(object1.identifier=='player' && stopCheckSopra==0)
		return 'noSopra';

}


/**************************/


Game.prototype.ricomincia=function(checkPoint){

	
	STEP=ABSOLUTE_STEP;

	EDITOR=0;
	let game=GAME;

	ALL_MOVIMENT=0;
	NO_COLLISION=0;

	for(let i=0;i<this.arrayFloor.length;i++)
		if(this.arrayFloor[i].make==1)
			this.arrayFloor[i].make=0;

	for(let i=0;i<this.arrayEnemy.length;i++)
		if(this.arrayEnemy[i].make==1)
			this.arrayEnemy[i].make=0;

	for(let i=0;i<this.arrayBox.length;i++)
		if(this.arrayBox[i].make==1)
			this.arrayBox[i].make=0;


	let arrayDati=game.arrayDatiGioco;
	if(checkPoint!=0)
		arrayDati['vitePerse']++;
	
		
	arrayDati['tempo']=game.tempo;
	DISTRUZIONE=1;

	game.distruttore();		

	

	let moveDiv=document.getElementById('moveDiv');
	if(moveDiv!=null){
		moveDiv.parentNode.removeChild(moveDiv);
		OBJECT_MOVE_RANGE=null;
	}

	document.getElementById('menu').style.display='none';
	document.getElementById('sfondoCaricamento').style.display='block';
	game.player.width=0;
	chargingBar();
	

	setTimeout(function(){             //lascio che i clock si occupino di cancellare tutto, aspetto 2 secondi che lo facciano e poi pulisco i clock
		clearInterval(timeBoss1Move);
		clearInterval(timeBoss1Fire);
		clearInterval(playerTime);
		clearInterval(bulletInterval);
		clearInterval(bulletTimePlayer);
		clearInterval(chargingTime);
		timeBoss1Move=null; //se non lo risetto a null non parte il move normale
		timeBoss1Fire=null;
		
		chargingTime=null;
		chargingCounter=0;
		document.getElementById('barraCaricamento').style.width=0+'vw';

		
		begin(checkPoint,arrayDati);

		nodeEditor=document.getElementById('navEditor');
	
	
		if(nodeEditor!=null)
			nodeEditor.style.display='none';
		

	},4200);		





}

/***************************************/

Game.prototype.setMouseDown=function(){  //è avviata dall'evento onclick del moveDiv
		
	MOUSE=1; this.clockMouse();
	return;
}

Game.prototype.setMouseUp=function(){

			
			MOUSE=0;
			MOUSE_X=NaN;
			MOUSE_Y=NaN;
			clearInterval(mouseTime); 
			mouseTime=null;
			let checkBox=document.getElementById('blockObject');

			if(OBJECT_MOVE_RANGE!=null && checkBox.checked==false)
				BLOCK_OBJECT=0;

		

}

/*********************/

/* View in fullscreen */
function openFullscreen(elem) {
	if (elem.requestFullscreen) {
	  elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) { /* Firefox */
	  elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
	  elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE/Edge */
	  elem.msRequestFullscreen();
	}
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
	if (document.exitFullscreen) {
	  document.exitFullscreen();
	} else if (document.mozCancelFullScreen) { /* Firefox */
	  document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
	  document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE/Edge */
	  document.msExitFullscreen();
	}
  }