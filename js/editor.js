//FUNZIONAMENTO EDITOR


//ALL_MOVIMENT=1; (senza gravità)
//NO_COLLISION=1;	(senza collisioni)
//EDITOR=1;			(tutti i clock bloccati tranne i floor) SOLO IN TALE STATO SI PUò EDITARE
//STEP=0;			(blocca scorrimento)
//STEP=ABSOLUTE_STEP	(riprendi scorrimento)



Game.prototype.createBoxEditor=function(type){


	let type0=new KitMedicoSmall; 
	let type1=new KitMedicoMedium; 
	let type2=new KitMedicoLarge; 
	let type3=new Armatura;
	let type4=new FucilePompa; 
	let type5=new Cecchino; 
	let type6=new Mitraglia;
	let type7=new MunizioniSmall;
	let type8=new MunizioniMedio;
	let type9=new MunizioniLarge;
	let type10=new chiaveG_0;
	let type11=new chiaveG_1;
	let type12=new chiaveB_0;
	let type13=new chiaveB_1;
	let type14=new chiaveR_0;
	let type15=new chiaveR_1; 
	let type16=new triggerBlocco; 
	let type17=new triggerScorri; 
	let type18=new triggerCheckPoint;
	let type19=new triggerWin; 

		let tipo=null;

		switch (type) {
 			case 'KMS':
    			tipo=type0;
    		break;

  			case 'KMM':
    			tipo=type1;
    		break;

    		case 'KML':
    			tipo=type2;
    		break;

    		case 'A':
    			tipo=type3;
    		break;

    		case 'P':
    			tipo=type4;
    		break;

    		case 'C':
    			tipo=type5;
    		break;

    		case 'M':
    			tipo=type6;
    		break;

    		case 'MS':
    			tipo=type7;
    		break;

    		case 'MM':
    			tipo=type8;
    		break;

    		case 'ML':
    			tipo=type9;
    		break;

 			case 'CG0':
    			tipo=type10;
    		break;

    		case 'CB0':
    			tipo=type12;
    		break;

    		case 'CR0':
    			tipo=type14;
    		break;

    		case 'TR':
    			tipo=type16;
    		break;

    		case 'TS':
    			tipo=type17;
    		break;

    		case 'TC':
    			tipo=type18;
			break;
			
			case 'TV':
    			tipo=type19;
    		break

		}

		let posX=0;
		let posY=0;
		
		do{
			posX+=this.player.absoluteStepX;
		}while(posX<this.playground.width/2);

		do{
			posY+=this.player.stepY;
		}while(posY<this.playground.height/2);


		if(type=='TR' || type=='TC' || type=='TS' || type=='TV')
			posY=0;

		
		let newBox=new Box(posX,posY,tipo);
		newBox.index=this.boxOut;
		this.boxOut++;
		this.arrayBox.push(newBox);

}


/********************/

Game.prototype.createEnemyEditor=function(type){


	let type0=new TypeE0; //default
	let type1=new TypeE1; //cane
	let type2=new TypeE2; //torretta
	let type3=new TypeE3; //corazzato
	let type4=new TypeE4; //cecchino
	let type5=new TypeE5; //zombie
	let typeBOSS1=new TypeBOSS1;  //il -10 serve a far venire la collisione con il floor

	let typeBomba_0=new TypeBomba_0;
	let typeDragBox_0=new TypeDragBox_0;

		let tipo=null;

		switch (type) {
 			case 'standard':
    			tipo=type0;
    		break;

  			case 'toro':  //cane
    			tipo=type1;

    		break;

    		case 'fuso':
    			tipo=type2;
    		break;

    		case 'corazzato':
    			tipo=type3;
    		break;

    		case 'cecchino':
    			tipo=type4;
    		break;

    		case 'zombie':
    			tipo=type5;
    		break;

    		case 'bomba':
    			tipo=typeBomba_0;
    		break;

    		case 'cassa':
    			tipo=typeDragBox_0;
    		break;

    		case 'boss':
    			tipo=typeBOSS1;
    		break;

    		
		}

		let posX=0;
		let posY=0;
		
		do{
			posX+=this.player.absoluteStepX;
		}while(posX<this.playground.width/2);

		do{
			posY+=this.player.stepY;
		}while(posY<this.playground.height/2);


		
		let newEnemy=new Enemy(tipo,posX,posY,'a');
		newEnemy.index=this.enemyOut;
		this.enemyOut++;
		this.arrayEnemy.push(newEnemy);

}


/********************/

Game.prototype.createFloorEditor=function(type){

	
	let type0=new TypeF0;
	let typeFSX_0=new TypeFSX_0;
	let typeFSY_0=new TypeFSY_0;
	let typeFM=new TypeFM;
	let typeSfondo=new TypeSfondo;
	let typeAscensore_0=new TypeFAscensore_0;
	let typeFPorta=new TypeFPorta;
	let typeFPortaG_0=new TypeFPortaG_0;
	//let typeFPortaG_1=new TypeFPortaG_1;
	let typeFPortaB_0=new TypeFPortaB_0;
	//let typeFPortaB_1=new TypeFPortaB_1;
	let typeFPortaR_0=new TypeFPortaR_0;
	//let typeFPortaR_1=new TypeFPortaR_1;
	let typeEGY=new TypeEnemyGenesys;
	let typePORT=new TypePortale;

		let tipo=null;
		let porta=0; //standard verticale

		switch (type) {
 			case 'standard_0':
    			tipo=type0;
    		break;

  			case 'FSX_0':
    			tipo=typeFSX_0;
    		break;

    		case 'FSY_0':
    			tipo=typeFSY_0;
    		break;

    		case 'FM':
    			tipo=typeFM;
    		break;

    		case 'Sfondo':
    			tipo=typeSfondo;
    		break;

    		case 'Ascensore_0':
    			tipo=typeAscensore_0;
    		break;

    		case 'FPorta_Y':
    			tipo=typeFPorta;
			break;
			
    		case 'FPorta_X':
				tipo=typeFPorta;
				porta=1;
    		break;

    		case 'FPortaG_Y':
    			tipo=typeFPortaG_0;
			break;
			
			case 'FPortaG_X':
				tipo=typeFPortaG_0;
				porta=1;
    		break;

    		case 'FPortaB_Y':
    			tipo=typeFPortaB_0;
			break;
			
			case 'FPortaB_X':
				tipo=typeFPortaB_0;
				porta=1;
    		break;

  			case 'FPortaR_Y':
    			tipo=typeFPortaR_0;
			break;
			
			case 'FPortaR_X':
				tipo=typeFPortaR_0;
				porta=1;
    		break;

    		case 'EGY':
    			tipo=typeEGY;
    		break;

    		case 'PORT':
    			tipo=typePORT;
    		break;

		}

		

		let posX=0;
		let posY=0;
		
		do{
			posX+=this.player.absoluteStepX;
		}while(posX<this.playground.width/2);

		do{
			posY+=this.player.stepY;
		}while(posY<this.playground.height/2);

		let newFloor=new Floor(this.playground,40,40,posX,posY,tipo,null,"-");
		if(porta==1)
			newFloor.d=1;
		newFloor.index=this.floorOut;
		this.floorOut++;
		this.arrayFloor.push(newFloor);

}

/********************/

Game.prototype.blockClockFloor=function(){

	if(BLOCK_CLOCK_FLOOR==0)
		BLOCK_CLOCK_FLOOR=1;
		
	else
		BLOCK_CLOCK_FLOOR=0;
		

}

/********************/

Game.prototype.openEditor=function(){

	DISTRUZIONE=1;
	
	this.distruttore();

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
		chargingTime=null;
		chargingCounter=0;
		document.getElementById('barraCaricamento').style.width=0+'vw';


		game=new Game(document.getElementById("playgroundWrapper"));

		EDITOR=1;

		game.clockPlayer();
	
		game.clockBulletPlayer();
		

		nodeEditor=document.getElementById('navEditor');
	

		nodeEditor.style.display='block';
	

		let sfondo=new Floor(game.playground,100000,600,0,0,new TypeSfondo(),null,"-");

		sfondo.index=game.floorOut;
		game.floorOut++;
		game.arrayFloor.push(sfondo);


		let allMoviment=document.getElementById('allMoviment');
		let noCollision=document.getElementById('noCollision');
		let blockFloorMobili=document.getElementById('blockFloorMobili');
		let blockClock=document.getElementById('blockClock');
		let blockEnemy=document.getElementById('blockEnemy');
		let blockEnemyGravity=document.getElementById('blockEnemyGravity');
		let blockObject=document.getElementById('blockObject');

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

		game.player.life=100;
		game.playerLife=0;
		game.sketcher.updateLifeBar(game.player)
		game.ammo=50;
		game.player.width=50;
		game.player.height=80;


	},2500);


}

/**********************************/

Game.prototype.makeDiv=function(object){

	let game=GAME;

	if(object.identifier=='player' || object.type=='EGY' || object.type=='sfondo')
		return;

	if(document.getElementById('sizeControll'))
		document.getElementById('sizeControll').style.display='block';	

	for(let i=0;i<this.arrayFloor.length;i++)
		if(this.arrayFloor[i].make==1)
			this.arrayFloor[i].make=0;
			

	for(let i=0;i<this.arrayEnemy.length;i++)
		if(this.arrayEnemy[i].make==1)
			this.arrayEnemy[i].make=0;
			

	for(let i=0;i<this.arrayBox.length;i++)
		if(this.arrayBox[i].make==1)
			this.arrayBox[i].make=0;	

	
	let makeDim=document.getElementById('makeDim');
	MAKE_DIM=0;
	makeDim.style.backgroundColor='grey';
	makeDim.style.borderColor='red';

	object.make=1;

	OBJECT_MOVE_RANGE=new MoveDiv(object);
	
	let nodePort=document.getElementById('moveDiv1');
	if(nodePort!=null){
		nodePort.parentNode.removeChild(nodePort);
		OBJECT_MOVE_RANGE_PORT=null;
	}
	
	this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);//il vecchio viene cancellato dallo sketcher

	if(object.type=='boss1'){
		OBJECT_MOVE_RANGE_BOSS1=new MoveDiv(object);
		OBJECT_MOVE_RANGE_BOSS2=new MoveDiv(object);
		OBJECT_MOVE_RANGE_BOSS3=new MoveDiv(object);
		OBJECT_MOVE_RANGE_BOSS4=new MoveDiv(object);
		OBJECT_MOVE_RANGE_BOSS5=new MoveDiv(object);

		this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS1,'zona1',game);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS2,'zona2',game);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS3,'zona3',game);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS4,'zona4',game);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS5,'zona5',game);
	}

	if(object.type=='PORT'){
		OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
		OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
		OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
		OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
	}
	

	if(OBJECT_BACK!=null && OBJECT_BACK.index==object.index && OBJECT_BACK.identifier==object.identifier)
		return;
	else
		OBJECT_BACK=new Object(object/*object.width,object.height,object.point.x,object.point.y,maxX,maxY,object.type,object.index,object.identifier*/);

	exitMakeBox();
		
}

/******************/

makeDim=function(){

	let node=document.getElementById('makeDim');

	if(MAKE_DIM==0){

		MAKE_DIM=1;
		node.style.backgroundColor='red';
		node.style.borderColor='white';
	}
	else{
		MAKE_DIM=0;
		node.style.backgroundColor='grey';
		node.style.borderColor='red';
	}
}


/***********************/


Game.prototype.deliteEditor=function(){

	let game=GAME;
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

	object.width=0;

	OBJECT_BACK=null;
	
	let nodeMakeDim=document.getElementById('makeDim');
	MAKE_DIM=0;
	nodeMakeDim.style.backgroundColor='grey';
	nodeMakeDim.style.borderColor='red';

	if(OBJECT_MOVE_RANGE==null)
		return;
		
	this.sketcher.drawObject(OBJECT_MOVE_RANGE,'cancella',game);
	OBJECT_MOVE_RANGE=null;

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

	let nodePort=document.getElementById('moveDiv1');
	if(nodePort!=null){
		nodePort.parentNode.removeChild(nodePort);
		OBJECT_MOVE_RANGE_PORT=null;
	}

	exitMakeBox();

}

/*************************/


Game.prototype.makeBox=function(){

	let object=null;
	let game=GAME;

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

	let makeBox=document.getElementById('makeBox');
	makeBox.style.display='block';

	let inputMaxX=document.getElementById('inputMaxX');
	let inputMaxY=document.getElementById('inputMaxY');
	//var inputVx=document.getElementById('inputVx');
	//var inputVy=document.getElementById('inputVy');
	let inputDir=document.getElementById('inputDir');

	if((object.maxX==0 && object.type!='PORT') || object.maxX==null){
		inputMaxX.readOnly=true;
		inputMaxX.value="oggetto non abilitato";
		inputMaxX.style.color="red";
	}
	else{
		inputMaxX.readOnly=false;
		inputMaxX.value=object.maxX.toString();
		inputMaxX.style.color="black";
	}	

	if((object.maxY==0 && object.type!='PORT') || object.maxY==null || object.identifier=='enemy'){
		inputMaxY.readOnly=true;
		inputMaxY.value="oggetto non abilitato";
		inputMaxY.style.color="red";
	}
	else{
		inputMaxY.readOnly=false;
		inputMaxY.value=-object.maxY.toString();
		inputMaxY.style.color="black";
	}	

	if(object.identifier=='enemy' && (object.type==2 || object.type==5 || object.type==1)){
			inputDir.style.display='block';
			inputDir.value=object.view;
			document.getElementById('dirLabel').textContent='direzione';
	}
	else{
		inputDir.style.display='none';		
		document.getElementById('dirLabel').textContent='';
	}


	MAKE_BOX=1;
}

/**********************/

exitMakeBox=function(){

	if(MAKE_BOX==0)
		return;

	let node=document.getElementById('makeBox');
	node.style.display='none';	
	MAKE_BOX=0;
}

/*****************/

Game.prototype.updateMakeBox=function(){

	let game=GAME;


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

	let maxX=document.getElementById('inputMaxX');
	let maxY=document.getElementById('inputMaxY');
	let inputDir=document.getElementById('inputDir');


	if(maxX.value!='oggetto non abilitato' && (parseInt(maxX.value)>=0 || object.type=='PORT')){
		if(parseInt(maxX.value)<=object.counterX)
			object.counterX=0;

		object.maxX=parseInt((maxX.value/5)*5);
		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);
	}

	if(maxY.value!='oggetto non abilitato' && (parseInt(maxY.value)>=0 || object.type=='PORT')){
		if(parseInt(maxY.value)<=object.counterY)
			object.counterY=0;

		object.maxY=parseInt((maxY.value/10)*10);
		OBJECT_MOVE_RANGE=new MoveDiv(object);
		this.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);
	}
	if(inputDir.style.display=='block'){
		if(inputDir.value=='sx' && object.view=='dx'){
			object.a=1;
			object.d=0;
			object.view='sx';
		}
		else if(inputDir.value=='dx' && object.view=='sx'){
			object.a=0;
			object.d=1;
			object.view='dx';
		}
	}

	if(object.type=='PORT'){
		object.maxY=-object.maxY;
		OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
		OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
		OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
		OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
		this.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
	}

	
}


/****************************/


Game.prototype.respawnPlayer=function(){

	this.player.point.x=100;

}

/**********************/

Game.prototype.save=function(){



	let xhttp=new XMLHttpRequest();
	xhttp.onreadystatechange=function(){


	}
	xhttp.open('POST','http://localhost/doom_js/php/save.php',true);


}