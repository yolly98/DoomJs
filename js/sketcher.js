
var PLAYER_ID='player';
var BASE_FLOOR_ID='floor';
var BASE_BULLET_ID='bullet';
var BASE_ENEMY_ID='enemy';
var BASE_BOX_ID='box';
var BASE_DEATHDIV_ID='deathDiv';
var BASE_BULLETCOLLISIONDIV_ID='bulletCollisionDiv';

function Sketcher(playgroundWrapper){

	this.playground=playgroundWrapper.childNodes[1];
	this.baseElementsId=playgroundWrapper.id+'_';

}

/************************/

Sketcher.prototype.drawObject=function(object,index,game){

	let playground=GAME.playground;

	if((object.identifier=='moveDiv' || object.identifier=='moveDiv1')&& EDITOR==1 && (index==null || index=='cancella')){

		node=document.getElementById(object.identifier);
		if(node!=null){
			node.parentNode.removeChild(node);
			node=null;
		}
		if(index!='cancella'){
			node=document.createElement('div');
			node.setAttribute('id',object.identifier);

			node.style.width=object.width/SCALA+'vw';
			node.style.height=object.height/SCALA+'vw';
			node.style.left=object.point.x/SCALA+'vw';
			node.style.top=object.point.y/SCALA+'vw';

			if(detectmob()==true && object.type=='sfondo')
				node.style.width=5000/SCALA+'vw';


			if(object.identifier!='moveDiv1'){
				if(detectmob()==false)
					node.onmousedown=function(){game.setMouseDown();};
				else{
					node.ontouchstart=function(){game.setMouseDown();};
					node.addEventListener('touchmove',touchTracking.bind(this),false);
					node.addEventListener('touchend',touchTrackingEnd.bind(this),false);
					
				}
			}

	
			this.playground.appendChild(node);


		}
		
		return;
	}
	else if(object.identifier=='moveDiv' && EDITOR==1 && index!=null && index!='cancella'){

		let zona1_=Math.floor((playground.width/100)*20); //20% della larghezza della finestra
		let _zona1=Math.floor((playground.width/100)*35); //35%
		let zona2_=Math.floor((playground.width/100)*45); //45%
		let _zona2=Math.floor((playground.width/100)*55); //55%
		let zona3_=Math.floor((playground.width/100)*65); //65%
		let _zona3=Math.floor((playground.width/100)*80); //80%
		let altezza=Math.floor((playground.height/100)*20); //30% dell'altezza della finestra

		let zona4=Math.floor((playground.width/100)*75);
		let zona5=Math.floor((playground.width/100)*25);

		let appoggio=null;
		if(index.search('cancella')==0){
			index=index.split('-');
			appoggio=index[0];
			index=index[1];
		}
		node=document.getElementById('moveDiv'+'-'+String(index));
		if(node!=null){
			node.parentNode.removeChild(node);
			node=null;
		}

		if(appoggio==null){
			node=document.createElement('div');
			node.setAttribute('id','moveDiv'+'-'+String(index));
			node.setAttribute('class','moveDivBoss');

			if(index=='zona1'){

				node.style.width=(_zona1-zona1_)/SCALA+'vw';
				node.style.height=object.height/SCALA+'vw';
				node.style.left=zona1_/SCALA+'vw';
				node.style.top=altezza/SCALA+'vw';
			}
			
			
			if(index=='zona2'){

				node.style.width=(_zona2-zona2_)/SCALA+'vw';
				node.style.height=object.height/SCALA+'vw';
				node.style.left=zona2_/SCALA+'vw';
				node.style.top=altezza/SCALA+'vw';
			}	

			
			if(index=='zona3'){

				node.style.width=(_zona3-zona3_)/SCALA+'vw';
				node.style.height=object.height/SCALA+'vw';
				node.style.left=zona3_/SCALA+'vw';
				node.style.top=altezza/SCALA+'vw';
			}	

			
			if(index=='zona4'){

				node.style.width=object.width/SCALA+'vw';
				node.style.height=object.height/SCALA+'vw';
				node.style.left=zona4/SCALA+'vw';
				node.style.top=object.point.y/SCALA+'vw';
			}	

			
			if(index=='zona5'){

				node.style.width=object.width/SCALA+'vw';
				node.style.height=object.height/SCALA+'vw';
				node.style.left=zona5/SCALA+'vw';
				node.style.top=object.point.y/SCALA+'vw';
			}	

			

	
			this.playground.appendChild(node);


		}
		
		return;
	}

	/***************/
	
	let baseID=null; let baseClass=null;

	if(object==null){
		console.log('null');
		return;
	}

	
	if(object.point.x>GAME.playground.width+GAME.playground.width/4){
		return;
	} //non disegno oggetti che non sono ancora entrati in playground
	if(object.point.x+object.width<0-GAME.playground.width/4){
		return;
	} 

	if(object.identifier=='player'){
		baseID=PLAYER_ID+object.type;
		baseClass=baseID
	}

	else if(object.identifier=='bullet'){
		baseID=BASE_BULLET_ID+object.type+'_'+index;
		baseClass=BASE_BULLET_ID+object.type;
	}

	else if(object.identifier=='floor'){
		baseID=BASE_FLOOR_ID+object.type+'_'+index;
		baseClass=BASE_FLOOR_ID+object.type;
	}

	else if(object.identifier=='enemy'){
		baseID=BASE_ENEMY_ID+'_'+object.type+'_'+index;
		baseClass=BASE_ENEMY_ID+'_'+object.type;
	}

	else if(object.identifier=='box'){

		baseID=BASE_BOX_ID+object.type+'_'+index;
		baseClass=BASE_BOX_ID+'_'+object.type;
	}

	else if(object.identifier=='deathDiv'){ 
		baseID=BASE_DEATHDIV_ID+'_'+object.type+'_'+index;
		baseClass=BASE_DEATHDIV_ID+'_'+object.type;

	}

	else if(object.identifier=='bulletCollisionDiv'){ 
		baseID=BASE_BULLETCOLLISIONDIV_ID+'_'+object.type+'_'+index;
		baseClass=BASE_BULLETCOLLISIONDIV_ID;

	}

	let objectNode=document.getElementById(baseID);
	
	if(objectNode==null && object.width>0){

		objectNode=document.createElement('div');
		objectNode.setAttribute('id',baseID);

		objectNode.setAttribute('class',baseClass);
		

		if(EDITOR==1){
			objectNode.onclick=function(){

					if(object.type=='sfondo' && PAGE=='editor'){
						objectNode.addEventListener('touchend',touchTrackingEnd.bind(this),false);
					}
				
						//object.mouse=1;
						
						game.makeDiv(object);
						if(object.identifier=='enemy')
							object.gravity=0;
					
				
				}
		}

		
		

		this.playground.appendChild(objectNode);
	}

	if(object.width<=0 ){//elimino nodo uscito dalla finestra
		if(object.identifier=='enemy'){

			clearInterval(object.bulletInterval);
			

		}

		if(EDITOR==0 && objectNode!=null){
			objectNode.parentNode.removeChild(objectNode);
			
		}
		else if(EDITOR==1 && object.identifier!='player' && objectNode!=null)
			objectNode.parentNode.removeChild(objectNode);

		if(OBJECT_BACK!=null)
			OBJECT_BACK=null;
		
		if(OBJECT_MOVE_RANGE!=null){
			let nodeMakeDim=document.getElementById('makeDim');
			MAKE_DIM=0;
			nodeMakeDim.style.backgroundColor='grey';
			nodeMakeDim.style.borderColor='red';

			nodeMoveDiv=document.getElementById('moveDiv');
			if(nodeMoveDiv!=null){
				nodeMoveDiv.parentNode.removeChild(nodeMoveDiv);
				nodeMoveDiv=null;
			}
			OBJECT_MOVE_RANGE=null;
		}
		
	}
	
	
	if(objectNode==null)
		return;

	objectNode.style.width=object.width/SCALA+'vw';///16+'em';
	objectNode.style.height=object.height/SCALA+'vw';///16+'em';
	objectNode.style.left=object.point.x/SCALA+'vw';///16+'em';
	objectNode.style.top=object.point.y/SCALA+'vw';///16+'em';

	if(object.identifier=='deathDiv'){

		if(object.type!=7){
			if(object.width==30 && object.height==60)//zombie
				objectNode.style.backgroundSize='2vw 4vw';
			
			if(object.width==50 && object.height==80)//standard
				objectNode.style.backgroundSize='3vw 4vw';	

				
			if(object.width==80 && object.height==80)//toro
			objectNode.style.backgroundSize='4vw 5vw';

			
			if(object.width==80 && object.height==70)//fuso
				objectNode.style.backgroundSize='5vw 5vw';

				
			if(object.width==100 && object.height==120)//corazzato
			objectNode.style.backgroundSize='7vw 8vw';

			
			if(object.width==60 && object.height==70)//cecchino
				objectNode.style.backgroundSize='4vw 5vw';

			
			if(object.width==80 && object.height==120)//boss
				objectNode.style.backgroundSize='5vw 8vw';	

			
			if(object.width==50 && object.height==80)//player
				objectNode.style.backgroundSize='3vw 5vw';
		
		}
		
	}
	

	//IMMAGINI

	if(object.identifier=='bullet')
		objectNode.style.backgroundImage="url('../css/bullet/bullet"+object.type+'-'+object.dir+".png')";

	if(object.identifier=='bulletCollisionDiv')
		objectNode.style.backgroundImage="url('../css/bullet/bulletCollisionDiv-"+object.type+'-'+object.dir+".png')";

	/****/

	if(object.identifier=='player'){


		if((object.bulletDir=='a' || object.v0=='a') ){

			if(object.shift==1 && object.collision==0){
				objectNode.style.backgroundImage="url('../css/player/playerShift-sx"+"-gun"+object.typeBullet.type.toString()+".png')";
				
			}
		
			else if(object.collision==1)
				objectNode.style.backgroundImage="url('../css/player/playerJump-sx"+"-gun"+object.typeBullet.type.toString()+".png')";

			else if(object.a==1 && object.blockSx==0){
				if(object.camminaSx%5==0)
					objectNode.style.backgroundImage="url('../css/player/player-sx"+(object.camminaSx/5).toString()+"-gun"+object.typeBullet.type.toString()+".png')";
				else
					objectNode.style.backgroundImage="url('../css/player/player-sx"+((object.camminaSx-object.camminaSx%5)/5).toString()+"-gun"+object.typeBullet.type.toString()+".png')";
				object.camminaSx++;
				if(object.camminaSx==25)
					object.camminaSx=5;
			}
			else
				objectNode.style.backgroundImage="url('../css/player/player-sx1-gun"+object.typeBullet.type.toString()+".png')";
	

		}
	

		if((object.bulletDir=='d' || object.v0=='d')){
		
			if(object.shift==1 && object.collision==0){
				objectNode.style.backgroundImage="url('../css/player/playerShift-dx"+"-gun"+object.typeBullet.type.toString()+".png')";
			
			}
			else if(object.collision==1)
				objectNode.style.backgroundImage="url('../css/player/playerJump-dx"+"-gun"+object.typeBullet.type.toString()+".png')";

			else if (object.d==1 && object.blockDx==0){
				if(object.camminaDx%5==0)
					objectNode.style.backgroundImage="url('../css/player/player-dx"+(object.camminaDx/5).toString()+"-gun"+object.typeBullet.type.toString()+".png')";
				else
					objectNode.style.backgroundImage="url('../css/player/player-dx"+((object.camminaDx-object.camminaDx%5)/5).toString()+"-gun"+object.typeBullet.type.toString()+".png')";	
				object.camminaDx++;
				if(object.camminaDx==25)
						object.camminaDx=5;
				}	
			else	
				objectNode.style.backgroundImage="url('../css/player/player-dx1-gun"+object.typeBullet.type.toString()+".png')";


		}
		

	}	

	/*******/

	if(object.identifier=='enemy'){

		if(object.type=='boss1' && object.point.y!=object.spawnY)
				return;


		if(object.a==1 && object.stepCounter==0){
			if((object.type==0 && object.fire==0) || (object.type==1 && object.fire==1) || (object.type==3 && object.fire==0)/*|| object.type=='boss1'*/ || (object.type==5 && object.fire==1)){
				
				objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"-a"+object.camminaSx.toString()+".png')";
				
				object.camminaSx++;
				if(((object.type==0 || object.type==1 || object.type==5)&&object.camminaSx==5)||(object.type==3 &&object.camminaSx==3))
					object.camminaSx=1;
			}

			else if(object.stepCounter==0 && ((object.type==0 && object.fire==1)||object.type==2 || object.type==4 || object.type=='boss1' || (object.type==5 && object.fire==0) || (object.type==1 && object.fire==0) || (object.type==3 && object.fire==0)))
				objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"-a1.png')";

		}

		if(object.d==1 && object.stepCounter==0){
			if((object.type==0 && object.fire==0) || (object.type==1 && object.fire==1) || (object.type==3 && object.fire==0) || (object.type==5 && object.fire==1)){
				
				objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"-d"+object.camminaDx.toString()+".png')";

				object.camminaDx++;
				if(((object.type==0 || object.type==1 || object.type==5)&&object.camminaDx==5)||(object.type==3 && object.camminaDx==3))
					object.camminaDx=1;
			}
			else if(object.stepCounter==0 &&((object.type==0 && object.fire==1)||object.type==2 || object.type==4 || object.type=='boss1' || (object.type==5 && object.fire==0) || (object.type==1 && object.fire==0) || (object.type==3 && object.fire==0)))	
				objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"-d1.png')";
		}


		if(object.fire==1 && object.type==0){//TIPO 0 e BOSS1 (SCHIVA)
			if(object.bulletDir=='a'){
				if(object.shift==1)
					objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"Shift-"+object.bulletDir+".png')";
				
			}	
			else if(object.bulletDir=='d'){
				if(object.shift==1)
					objectNode.style.backgroundImage="url('../css/enemy/enemy"+object.type+"Shift-d.png')";
				
			}
		}	


		
	}	

	
}

/********************/

Sketcher.prototype.updateLifeBar=function(player){


	let lifeBarNode=document.getElementById('lifeSpan');
	if(player.life<0 && EDITOR==0)
		lifeBarNode.innerText=0;
	else
		lifeBarNode.innerText=player.life;

	if(player.life<40)
		lifeBarNode.style.color='red';
	else
		lifeBarNode.style.color='green';
}

/*****************************/

Sketcher.prototype.updateCoolingBar=function(player){


	let coolingBarNode=document.getElementById('coolingBar');

	let counter=player.counterFire*TIME_PLAYER_MOVE;
	let interval=player.typeBullet.interval;
	let percentuale=(100*(interval-counter))/interval;
	
	coolingBarNode.style.width=((110*percentuale)/100)/SCALA/*/16+'em'*/+'vw';


}

/********************/

Sketcher.prototype.updateAmmoBar=function(player){


	let ammoBarNode=document.getElementById('ammoSpan');
	if(player.ammo<0)
		ammoBarNode.innerText=0;
	else
		ammoBarNode.innerText=player.ammo;

	if(player.ammo<10)
		ammoBarNode.style.color='red';
	else
		ammoBarNode.style.color='black';
}

/***************************/

Sketcher.prototype.drawMenu=function(game){


	//let menu=new Menu(game.playground);
	
	let nodeMenu=document.createElement('div');
	let sfondoMenu=document.createElement('div');
	let wrapper=document.getElementById("playgroundWrapper");
	let playground=document.getElementById('playground');


	let dimX_px=playground.clientWidth;
	let dimY_px=playground.clientHeight;
	
	let _vw=window.innerWidth/100;  //colcolo 1vw


	sfondoMenu.style.width=(dimX_px/_vw)+0.3+'vw';
	sfondoMenu.style.height=(dimY_px/_vw)+0.3+'vw';


	nodeMenu.setAttribute('id','menu');
	sfondoMenu.setAttribute('id','sfondoMenu');

	wrapper.appendChild(nodeMenu);
	wrapper.appendChild(sfondoMenu);
	


	let button1=document.createElement("BUTTON");
	let button2=document.createElement("BUTTON");
	let button3=document.createElement("BUTTON");
	let scoreDiv=document.createElement('div');
	let fullScreen=document.createElement('div');

	let winAlert=null;
	let record=null;
	if(WIN==1)
		winAlert=document.createElement('div');

	if(PAGE=='game')
		record=document.createElement('div');
	

	let metri_=game.metri;
	let tempo_=game.tempo;
	let danniSubiti_=game.danniSubiti+game.arrayDatiGioco['danniSubiti'];
	let vitePerse_=game.vitePerse;//max 3
	let viteTotali_=game.viteTotali; //default
	let nemiciUccisi_=game.nemiciUccisi+game.arrayDatiGioco['nemiciUccisi'];
	let colpiVuoto_=game.colpiVuoto+game.arrayDatiGioco['colpiVuoto'];
	let colpiTotali_=game.colpiTotali+game.arrayDatiGioco['colpiTotali'];

	let velocita=null;
	let precisione=null;

	if (tempo_==0)
		velocita=0;
	else
		velocita=Math.floor(metri_/tempo_);

	if(colpiTotali_==0)
		precisione=0;
	else	
		precisione=Math.floor((colpiTotali_-colpiVuoto_)/colpiTotali_);

	let punteggioTotale_=Math.floor(metri_/10)+velocita-Math.floor((vitePerse_/viteTotali_)*10)-danniSubiti_+(nemiciUccisi_*100)+precisione;
	
	button1.textContent = "RIPRENDI";  
	if(PAGE=='game'){
		button2.textContent = "RICOMINCIA";
		scoreDiv.textContent='score: '+String(punteggioTotale_);
	}
	else if(PAGE=='editor')
		button2.textContent = "SALVA";

	button3.textContent = "ESCI";   
	


	button1.setAttribute('class','buttonMenu');
	button2.setAttribute('class','buttonMenu');
	button3.setAttribute('class','buttonMenu');
	scoreDiv.setAttribute('id','scoreDiv');
	fullScreen.setAttribute('id','fullScreen');

	if(winAlert!=null)
		winAlert.setAttribute('id','winAlert');

	

	if(PAGE=='editor'){
	
		button1.style.top=((menu.height/4)-25)/SCALA+'vw';
		
		button2.style.top=((menu.height/2)-25)/SCALA+'vw';

		button3.style.top=(((menu.height/4)*3)-25)/SCALA+'vw';

		
	}
	else if(PAGE=='game'){

		record.setAttribute('id','newRecord');

		

		if(WIN==1){
			winAlert.style.top=scoreDiv.style.top;
			scoreDiv.style.top=button1.style.top;
			button1.style.display='none';//bottone 1 non premibile
			winAlert.textContent='Hai completato il livello';
			
		}

		record.style.top=parseInt(scoreDiv.style.top)-1+'vw';

		if(parseInt(RECORD)<parseInt(punteggioTotale_)){

			record.textContent='Nuovo Record!';
		}
		else	
		record.textContent='';


	}

	let button4=null;
	if(EDITOR==0 && game.checkPoint!=0 && game.vitePerse<game.viteTotali){
	 	button4=document.createElement('BUTTON');
		button4.textContent='RICOMINCIA DAL CHECKPOINT';
		button4.setAttribute('class','buttonMenu');
		
		
		button4.onclick=function(){
			WIN=0;
			game.ricomincia(game.checkPoint);
			GAME.salvaStat();
			RECORD=punteggioTotale_;

		}
	}

	if(PAGE=='game'){
		nodeMenu.appendChild(scoreDiv);
		nodeMenu.appendChild(record);
	}
	if(WIN==1)
		nodeMenu.appendChild(winAlert);
	if(game.player.width>0)
		nodeMenu.appendChild(button1);
	if(EDITOR==0 && game.checkPoint!=0 && game.vitePerse<game.viteTotali)
		nodeMenu.appendChild(button4);  
		 
	nodeMenu.appendChild(button2);  
	nodeMenu.appendChild(button3);
	nodeMenu.appendChild(fullScreen);
	
	



	button1.onclick=function(){
			
				if(BLOCK_EDITOR==1)
					return;
				
				game.sketcher.deleteMenu(game);PAUSA=0;
		

		};
	button2.onclick=function(){

		if(BLOCK_EDITOR==1)
		return;
		
			if(PAGE=='game'){
				WIN=0;
				game.ricomincia(0);
				GAME.salvaStat();
				RECORD=punteggioTotale_;
			}
			else if(PAGE=='editor')
				iniziaSalvataggio();

	}
	button3.onclick=function(){

		if(BLOCK_EDITOR==1)
			return;

			if(PAGE=='game')
				GAME.salvaStat();
			else if(PAGE=='editor' && SAVE==0){
				let conferma=confirm('Vuoi uscire senza salvare?');
				if(conferma==false)
					return;
			}		
			window.history.back(-1);
		
			
	}
	
	fullScreen.onclick=function(){

		let fullScreen=document.body;
		if (document.fullscreenElement || document.webkitFullscreenElement ||
			document.mozFullScreenElement)
			closeFullscreen();
		else
			openFullscreen(fullScreen);	
	}



}	


/***************************/

Sketcher.prototype.deleteMenu=function(){


	
	let nodeMenu=document.getElementById('menu');
	nodeMenu.parentNode.removeChild(nodeMenu);

	let sfondoMenu=document.getElementById('sfondoMenu');
	sfondoMenu.parentNode.removeChild(sfondoMenu);


}	

/***************************/


Sketcher.prototype.divBlock=function(player){

	let div=document.createElement('div');
	div.setAttribute('id','divBlock');
	let lock=document.createElement('i');
	lock.setAttribute('class','fas fa-lock');
	div.appendChild(lock);

	let w=20;
	let h=20;
	div.style.width=w/SCALA+'vw';
	div.style.height=h/SCALA+'vw';
	div.style.left=(player.point.x+w)/SCALA+'vw';
	div.style.top=(player.point.y-2*h)/SCALA+'vw';

	this.playground.appendChild(div);
	
}

/***********************************/


Sketcher.prototype.saveIcon=function(){

	let div=document.createElement('div');
	div.setAttribute('id','saveIcon');
	let save=document.createElement('i');
	save.setAttribute('class','fas fa-save');
	div.appendChild(save);

	this.playground.appendChild(div);

	clearInterval(saveTime);
	saveTime=null;
	
	saveTime=setInterval(function(){

			let icon=document.getElementById('saveIcon');
			if(icon==null)
				return;
			if(icon.style.display=='block')
				icon.style.display='none';
			else
				icon.style.display='block';


	},300);

	setTimeout(function(){

		clearInterval(saveTime);
		saveTime=null;
		let icon=document.getElementById('saveIcon');
		if(icon!=null)
			icon.parentNode.removeChild(icon);

	},5000);
	
}