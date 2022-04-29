

var playerTime=null;
var chargingTime=null;  //intervallo barra di caricamento
var chargingCounter=0;
var chargingMax=46;

var mouseTime=null;


var jumpTime=null;

var bulletTimePlayer=null;

var bulletInterval=null;


var saveTime=null; //salva l'intervallo che fa lampeggiare l'icona di salvataggio
var savingInterval=null; //anima la scritta che dice di aspettare quando salvi nell'editor

var TIME_PLAYER_MOVE=20;


//boss1
var TIME_BOSS1_MOVE=2000;
var TIME_BOSS1_FIRE_INTERVAL=1000;
var timeBoss1Move=null;
var timeBoss1Fire=null;
/****/

var ALL_MOVIMENT=0; //trucco per movimenti completi

var NO_COLLISION=0;
var EDITOR=0;  //blocca i clock tranne quello del clockFloor


var PAUSA=0;

var SCALA=15;
var STEP=5;
var ABSOLUTE_STEP=5;

var STANDARD_INTERVAL_BULLET=500;

var OBJECT_BACK=null;  //salva una copia dell'oggetto che sto modificando nell'editor
var OBJECT_MOVE_RANGE=null;  //salva l'area di movimento di un oggetto

var OBJECT_MOVE_RANGE_BOSS1=null;
var OBJECT_MOVE_RANGE_BOSS2=null;
var OBJECT_MOVE_RANGE_BOSS3=null;
var OBJECT_MOVE_RANGE_BOSS4=null;
var OBJECT_MOVE_RANGE_BOSS5=null;
var OBJECT_MOVE_RANGE_PORT=null;

var BLOCK_CLOCK_FLOOR=0; //blocca i clock semoventi (se 1)
var MAKE_DIM=0; //permette di modificare le dimensioni nell'editor
var MAKE_BOX=0;  //permette di modificare il range di movimento nell'editor
var BLOCK_ENEMY=0 //se 1 blocca il movimento degli enemy
var NO_GRAVITY_ENEMY=0; //tolgo gravità ai nemici

var BLOCK_OBJECT=0; //blocca il movimento solo dell'oggetto selezionato


var DISTRUZIONE=0;  //modificato dal distruttore, se uno bisogna aspettare che torni a 0 per eseguire il ricomincia()
var MOUSE=0; //se 1 posso trascinare cose nell'editor

var PAGE=null; //verrà settata dalla pagina stessa, distingua se è una apertura in editor o in game

var DIST=0; //indica la distandza da playground.offsetLeft all'inizio del livello

var WIN=0; //è 1 se il livello è finito

var SAVE=0// è 1 se il livello è stato salvato almeno una volta
var BLOCK_EDITOR=0; //se 1 significa che sto salvando e non devo permettere all'utente di fare nulla nel frattempo
var INFO=0; //se 1 vengono attivati i click di informazione

/**************/

function Object(object/*width,height,posX,posY,maxX,maxY,type,index,identifier*/){ //salva oggetto dopo creazione
	this.width=object.width;
	this.height=object.height;
	this.x=object.point.x;
	this.y=object.point.y;
	this.maxX=object.maxX;
	this.maxY=object.maxY;
	this.type=object.type;
	this.index=object.index;
	this.identifier=object.identifier;
}

/**************/
function MoveDiv(object){	//indica movimento dell'oggetto che si sta creando


	let x=null;
	let y=null;
	this.point=new Point(x,y);
	this.width=null;
	this.height=null;
	if(object.maxX>0 && object.maxX!=null && object.type!='PORT')
		this.width=object.maxX+object.width;

	if(object.maxY>0 && object.maxY!=null && object.identifier=='floor' && object.type!='PORT')
		this.height=object.maxY+object.height;

	if(this.width==null)
		this.width=object.width;
	if(this.height==null)
		this.height=object.height;

		
	if(object.identifier=='enemy'){

		if(object.a==1)
			this.point.x=object.point.x-this.width+object.width+object.counterX;
		else if(object.d==1)
			this.point.x=object.point.x-object.counterX;

		this.point.y=object.point.y;
	}
	else if(object.identifier=='floor'){

		this.point.x=object.point.x;
		this.point.y=object.point.y;

		if(object.maxX>0 && object.maxX!=null){
			if(object.a==1)
				this.point.x=object.point.x-this.width+object.width+object.counterX;
			else if(object.d==1)
				this.point.x=object.point.x-object.counterX;

		}
		else if( (object.maxY>0 && object.maxY!=null) || object.type=='FAscensore_0'){

			if(object.a==1 || object.type=='FAscensore_0')
				this.point.y=object.point.y-this.height+object.height+object.counterY;
			else if(object.d==1)
				this.point.y=object.point.y-object.counterY;

		}
		
	}
	else{
		this.point.x=object.point.x;
		this.point.y=object.point.y;
	}

	
		this.identifier='moveDiv';
	


}



/***************************************/


chargingBar=function(){


	chargingTime=setInterval(function(){

		

		let bc=document.getElementById('barraCaricamento');

		
		let u=chargingMax/100;
		 chargingCounter+=u;
		let dim=chargingCounter;

		if(dim<chargingMax)
			bc.style.width=dim+'vw';
		else{
			
			document.getElementById('sfondoCaricamento').style.display='none';
			
			DISTRUZIONE=0;
		}
			
			
	},40);

}

/******************/

var MOUSE_X;
var MOUSE_Y;

mouseTracking=function(event){


	if(MOUSE==1){

		let playground=document.getElementById('playground');

		let dim_px=playground.clientWidth;
		let posX=playground.offsetLeft-(playground.offsetWidth/2); //conseguenza del left:100% e transform:translateX(-50%) del playground, usato per centrarlo
		let posY=playground.offsetTop;
		let _vw=window.innerWidth/100;;
		let x=event.pageX-posX;
		let y=event.pageY-posY;
		x=Math.ceil(((x/_vw)-0.3)*SCALA);  //0.3 bordo playground
		y=Math.ceil(((y/_vw)-0.3)*SCALA);

		MOUSE_X=x;
		MOUSE_Y=y;


	}
}

/**************/

function Point(x, y){
	this.x = x;
	this.y = y;
}

/***************/

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

/*******************///POWER UP E KIT///**********************/

function KitMedicoSmall(){

	this.stepX=5;
	this.stepY=5;

	this.type=0;
	
	this.newBullet=null;
	this.addLife=20;
	this.addAmmo=null;
	


}

/******/

function KitMedicoMedium(){

	this.stepX=5;
	this.stepY=5;

	this.type=1;
	
	this.newBullet=null;
	this.addLife=50;
	this.addAmmo=null;
}

/*****/

function KitMedicoLarge(){

	this.stepX=5;
	this.stepY=5;

	this.type=2;
	
	this.newBullet=null;
	this.addLife=80;
	this.addAmmo=null;


}	

/******/

function Armatura(){

	this.stepX=5;
	this.stepY=5;

	this.type=3;
	
	this.newBullet=null;
	this.addLife=400;
	this.addAmmo=null;

}

/*****/


function FucilePompa(){

	this.stepX=5;
	this.stepY=5;

	this.type=4;
	
	this.newBullet=new Type4;
	this.addLife=null;
	this.addAmmo=null;

}

/********/

function Cecchino(){

	this.stepX=5;
	this.stepY=5;

	this.type=5;
	
	this.newBullet=new Type3;
	this.addLife=null;
	this.addAmmo=null;

}

/********/

function Mitraglia(){

	this.stepX=5;
	this.stepY=5;

	this.type=6;
	
	this.newBullet=new Type1;
	this.addLife=null;
	this.addAmmo=null;

}

/********/

function MunizioniSmall(){

	this.stepX=5;
	this.stepY=5;

	this.type=7;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=20;

}

/********/

function MunizioniMedio(){

	this.stepX=5;
	this.stepY=5;

	this.type=8;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=50;

}

/********/

function MunizioniLarge(){

	this.stepX=5;
	this.stepY=5;

	this.type=9;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=100;

}

/********/

function chiaveG_0(){

	this.stepX=5;
	this.stepY=5;

	this.type=10;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/*******/

function chiaveG_1(){

	this.stepX=5;
	this.stepY=5;

	this.type=11;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/********/

function chiaveB_0(){

	this.stepX=5;
	this.stepY=5;

	this.type=12;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/*******/

function chiaveB_1(){

	this.stepX=5;
	this.stepY=5;

	this.type=13;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/********/

function chiaveR_0(){

	this.stepX=5;
	this.stepY=5;

	this.type=14;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/*******/

function chiaveR_1(){

	this.stepX=5;
	this.stepY=5;

	this.type=15;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/*******/

function triggerBlocco(){

	this.stepX=5;
	this.stepY=5;

	this.type=16;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}


/*******/

function triggerScorri(){

	this.stepX=5;
	this.stepY=5;

	this.type=17;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/*******/

function triggerCheckPoint(){

	this.stepX=5;
	this.stepY=5;

	this.type=18;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}

/**********************/

function triggerWin(){

	this.stepX=5;
	this.stepY=5;

	this.type=19;
	
	this.newBullet=null;
	this.addLife=null;
	this.addAmmo=null;

}


/**********************///FLOOR///******************/

function TypeF0(){

	this.stepX=5;
	this.stepY=0;
	this.type=0;

	this.maxX=null;
	this.maxY=null;
	this.counterX=0;
	this.counterY=0;
	this.a=0;
	this.d=0;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=0; 
}

/****/

function TypeSfondo(){

	this.stepX=5;
	this.stepY=0;
	this.type='sfondo';

	this.maxX=null;
	this.maxY=null;
	this.counterX=0;
	this.counterY=0;
	this.a=0;
	this.d=0;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=0; 
}

/****/

function TypeFSX_0(){

	this.stepX=5;
	this.stepY=0;
	this.type='FSX_0'; //floor semovente orizzontale (asse x) di tipo 0

	this.counterX=0;
	this.counterY=0;
	this.a=1;
	this.d=0;
	this.maxX=this.stepX*60;
	this.maxY=null;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=1;	// stessa velocità rispetto al clock
	this.vY=0; 
}

/****/

function TypeFSY_0(){ //farli sempre di altezza 20 affinchè funzioni!!!!

	this.stepX=5;  
	this.stepY=10;
	this.type='FSY_0'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=1; //sopra
	this.d=0;	//sotto
	this.maxX=null
	this.maxY=this.stepY*30;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock
}

/***********/

function TypeFAscensore_0(){

	this.stepX=5;  
	this.stepY=10;
	this.type='FAscensore_0'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=0; //sopra  //l'ascensore setta la direzione in seguito all'interazione con il player
	this.d=0;	//sotto  
	this.maxX=null
	this.maxY=this.stepX*40;//dove può portarmi l'ascensore
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock

}

/***********/

function TypeFPorta(){

	this.stepX=5;  
	this.stepY=10;
	this.type='FPorta'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=0; //sopra  //l'ascensore setta la direzione in seguito all'interazione con il player
	this.d=0;	//sotto  
	this.maxX=null
	this.maxY=null;//dove può portarmi l'ascensore
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock

}

/***********/

function TypeFPortaG_0(){

	this.stepX=5;  
	this.stepY=10;
	this.type='FPortaG_0'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=0; //sopra  //l'ascensore setta la direzione in seguito all'interazione con il player
	this.d=0;	//sotto  
	this.maxX=null
	this.maxY=null;//dove può portarmi l'ascensore
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock

}


/***********/

function TypeFPortaB_0(){

	this.stepX=5;  
	this.stepY=10;
	this.type='FPortaB_0'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=0;    //se 1 la porta (innesco apertura)
	this.d=0;	 //se 1 la porta si apre in orizzontale (definisce direzione)
	this.maxX=null
	this.maxY=null;//dove può portarmi l'ascensore
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock

}

/***********/

function TypeFPortaR_0(){

	this.stepX=5;  
	this.stepY=10;
	this.type='FPortaR_0'; //floor semovente verticale (asse y) di tipo 0

	this.counterX=0;
	this.counterY=0;

	this.a=0; //sopra  //l'ascensore setta la direzione in seguito all'interazione con il player
	this.d=0;	//sotto  
	this.maxX=null
	this.maxY=null;//dove può portarmi l'ascensore
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=2; //velocità dimezzata rispetto al clock

}


/************/

function TypeFM(){	//floor liquido mortale

	this.stepX=5;  
	this.stepY=5;
	this.type='FM'; 

	this.counterX=0;
	this.counterY=0;
	this.a=0; 
	this.d=0;	
	this.maxX=null
	this.maxY=null;
	this.contactDamage=10000;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=0; 
}

/************/

function TypeFB(){	//floor boomba

	this.stepX=20;  
	this.stepY=20;
	this.type='FB'; 

	this.counterX=0;
	this.counterY=0;
	this.a=0; 
	this.d=0;	
	this.maxX=100
	this.maxY=100;
	this.contactDamage=100;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=1;
	this.vY=1; 
}

/************/

function TypeEnemyGenesys(){	//floor genera mostri

	this.stepX=5;  
	this.stepY=5;
	this.type='EGY'; 

	this.counterX=0;
	this.counterY=0;
	this.a=0; 
	this.d=0;	
	this.maxX=10;  //in questo caso corrisponde ai nemici generati
	this.maxY=null;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=0; 
}

/************/

function TypePortale(){	//floor portale di passaggio

	this.stepX=5;  
	this.stepY=5;
	this.type='PORT'; 

	this.counterX=0;
	this.counterY=0;
	this.a=0; 
	this.d=0;	
	this.maxX=200;
	this.maxY=0;
	this.contactDamage=0;

	this.counterVx=0;
	this.counterVy=0;
	this.vX=0;
	this.vY=0; 
}


/******************///BULLET///********************/

function Type0(){ //tipo bullet  //pistola player

	this.stepX=5;
	this.stepY=5;
	this.type=0;
	this.width=20;
	this.height=10;


	this.time=10; //tempo avanzamento proiettile
	this.interval=300; //intervallo tra un proiettile e l'altro
	this.damage=10;
	this.timeLife=null;

}

/****/

function Type1(){     //mitraglia player

	this.stepX=5;
	this.stepY=5;
	this.type=1;
	this.width=20;
	this.height=10;

	this.time=5;
	this.interval=80;
	this.damage=3;
	this.timeLife=null;
}

/*****/

function Type2(){	//palla fuoco grande

	this.stepX=5;
	this.stepY=5;
	this.type=2;
	this.width=70;
	this.height=50;

	this.time=15;
	this.interval=1000;
	this.damage=50;
	this.timeLife=null;
}

/******/

function Type3(){  //precisione nemico/player

	this.stepX=5;
	this.stepY=5;
	this.type=3;
	this.width=100;
	this.height=10;

	this.time=2;
	this.interval=1000;
	this.damage=100;
	this.timeLife=null;
}

/******/


function Type4(){  //fucile a pompa  player

	this.stepX=5;
	this.stepY=5;
	this.type=4;
	this.width=50;
	this.height=50;

	this.time=15;
	this.interval=500;
	this.damage=50;
	this.timeLife=10;//2
}


/********/

function Type5(){  //palla verde boss1

	this.stepX=5;
	this.stepY=5;
	this.type=5;
	this.width=30;
	this.height=30;

	this.time=10;
	this.interval=800
	this.damage=100;
	this.timeLife=null;
}

/*************/


function Type6(){     //mitraglia nemico

	this.stepX=5;
	this.stepY=5;
	this.type=6;
	this.width=20;
	this.height=10;

	this.time=5;
	this.interval=80;
	this.damage=10;
	this.timeLife=null;
}

function Type7(){ //palla fuoco piccola

	this.stepX=5;
	this.stepY=5;
	this.type=7;
	this.width=20;
	this.height=20;


	this.time=10; //tempo avanzamento proiettile
	this.interval=500; //intervallo tra un proiettile e l'altro
	this.damage=10;
	this.timeLife=null;

}

/***********************///ENEMY///****************/


function TypeE0(){  //tipo nemico

	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=0;  //null se non può abbassarsi, 0 se può
	this.type=0;
	this.width=50;
	this.height=80;
	this.maxX=this.stepX*60;
	this.maxY=null;

	this.life=40;
	
	this.time=2; //tempo avanzamento nemico

	this.rangeShotX=300;
	this.rangeShotY=300;
	this.typeBullet=new Type7;

	this.contactDamage=10;

}

/*****/



function TypeE1(){  //tipo nemico CANE

	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può


	this.type=1;
	this.width=80;
	this.height=80;/*50*/
	this.maxX=0;
	this.maxY=0;

	this.life=20;

	this.time=1; //tempo avanzamento nemico

	this.rangeShotX=700;
	this.rangeShotY=700;
	this.typeBullet=null;

	this.contactDamage=50;

}

/*****/



function TypeE2(){  //tipo nemico TORRETTA

	this.stepX=0;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può


	this.type=2;
	this.width=80;
	this.height=70;
	this.maxX=0;
	this.maxY=0;

	this.life=100;

	this.time=0; //tempo avanzamento nemico

	this.rangeShotX=600;
	this.rangeShotY=null;
	this.typeBullet=new Type6;

	this.contactDamage=50;

}

/*****/


function TypeE3(){  //tipo nemico CORAZZATO

	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può
	this.type=3;
	this.width=100;
	this.height=120;
	this.maxX=this.stepX*80;
	this.maxY=null;

	this.life=200;
	
	this.time=5; //tempo avanzamento nemico (ogni 5 clock)

	this.rangeShotX=400;
	this.rangeShotY=400;
	this.typeBullet=new Type2;

	this.contactDamage=100;

}

/****/


function TypeE4(){  //tipo nemico cecchino

	this.stepX=0;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può
	this.type=4;
	this.width=60;
	this.height=70;
	this.maxX=0;
	this.maxY=0;

	this.life=20;
	
	this.time=0; 

	this.rangeShotX=800;
	this.rangeShotY=800;
	this.typeBullet=new Type3;

	this.contactDamage=10;

}


/****/


function TypeE5(){  //tipo nemico zombie

	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può
	this.type=5;
	this.width=30;
	this.height=60;
	this.maxX=0;
	this.maxY=0;

	this.life=40;
	
	this.time=10; //tempo avanzamento nemico

	this.rangeShotX=400;
	this.rangeShotY=400;
	this.typeBullet=null;

	this.contactDamage=10;

}
/*****/


function TypeBOSS1(){  
	
	this.stepX=0;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=0;  //null se non può abbassarsi, 0 se può
	this.type='boss1';
	this.width=80;
	this.height=120;
	this.maxX=0;
	this.maxY=null;

	this.life=500;
	
	this.time=2; //tempo avanzamento nemico

	this.rangeShotX=800;
	this.rangeShotY=800;
	this.typeBullet=new Type7;

	this.contactDamage=10;

}

/****/

function TypeBomba_0(){  //non è un vero enemy ma un box trascinabile che se colpito esplode  
	
	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può
	this.type=6;
	this.width=40;
	this.height=50;
	this.maxX=null;
	this.maxY=null;

	this.life=50;
	
	this.time=null; //tempo avanzamento nemico

	this.rangeShotX=150;
	this.rangeShotY=150;
	this.typeBullet=null;

	this.contactDamage=0;

}

/*****/

function TypeDragBox_0(){  //è una cassa trascinabile  
	
	this.stepX=5;
	this.stepY=10;
	this.jump=null;   //null se non può saltare, 0 se può
	this.shift=null;  //null se non può abbassarsi, 0 se può
	this.type=7;
	this.width=40;
	this.height=50;
	this.maxX=null;
	this.maxY=null;

	this.life=100;
	
	this.time=null; //tempo avanzamento nemico

	this.rangeShotX=0;
	this.rangeShotY=0;
	this.typeBullet=null;

	this.contactDamage=0;

}


