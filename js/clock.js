/************************///CLOCK///*****************************/

Game.prototype.clockPlayer=function(){  //è il tempo del gioco

	let game=GAME;
	let player=this.player;
	let sketcher=this.sketcher;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let arrayEnemy=this.arrayEnemy;

	playerTime=setInterval(function(){ 
		
							
									
								
									   
										if(PAUSA==1 || DISTRUZIONE==1 || BLOCK_EDITOR==1)
											return;

										   

										if(PAGE=='game'){

											let nodoMetri=document.getElementById('metri');
											let nodoVite=document.getElementById('nVite');
											let nodoTempo=document.getElementById('tempo');

											if(nodoMetri==null){
												nodoMetri=document.createElement('div');
												nodoMetri.setAttribute('id','metri');
												document.getElementById('playground').appendChild(nodoMetri);
											}

											if(nodoTempo==null){
												nodoTempo=document.createElement('div');
												nodoTempo.setAttribute('id','tempo');
												document.getElementById('playground').appendChild(nodoTempo);
											}

											if(nodoMetri!=null && nodoMetri.textContent!=game.metri)
												nodoMetri.textContent='m: '+game.metri;
											
											if(nodoVite!=null && nodoVite.textContent!=game.viteTotali-game.vitePerse)
												nodoVite.textContent=game.viteTotali-game.vitePerse;
												
											if(nodoTempo!=null && nodoTempo.textContent!=game.tempo)
												nodoTempo.textContent='t: '+game.tempo;	

										}	


										//aggiorno il tempo di gioco
										game.clock++;
										game.tempo=Math.floor((game.clock*TIME_PLAYER_MOVE)/1000);

										//oggiorno i dati dal player
										game.metri=game.player.metri;


										//controllo sloto chiavi
										let slotChiaveG=document.getElementById('chiaveG');
										let slotChiaveB=document.getElementById('chiaveB');
										let slotChiaveR=document.getElementById('chiaveR');

										if(game.player.slotChiaveG==1)
											slotChiaveG.style.display="block";
										else
											slotChiaveG.style.display="none";

										if(game.player.slotChiaveB==1)
											slotChiaveB.style.display="block";
										else
											slotChiaveB.style.display="none";

										if(game.player.slotChiaveR==1)
											slotChiaveR.style.display="block";
										else
											slotChiaveR.style.display="none";

										//reimposto valori editor

										if(PAGE=='editor'){
											let allMoviment=document.getElementById('allMoviment');
											let noCollision=document.getElementById('noCollision');
											let blockFloorMobili=document.getElementById('blockFloorMobili');
											let blockClock=document.getElementById('blockClock');
											let blockEnemy=document.getElementById('blockEnemy');
											let blockEnemyGravity=document.getElementById('blockEnemyGravity');
											let blockObject=document.getElementById('blockObject');
											let hideNav=document.getElementById('hideNav');
											let info=document.getElementById('Info');
				
											if(allMoviment.checked==true)
												ALL_MOVIMENT=1;
											else
												ALL_MOVIMENT=0;

											if(noCollision.checked==true)
												NO_COLLISION=1;
											else
												NO_COLLISION=0;

											if(blockFloorMobili.checked==true)
												BLOCK_CLOCK_FLOOR=1;
											else
												BLOCK_CLOCK_FLOOR=0;

											if(blockClock.checked==true)
												STEP=0;
											else
												STEP=ABSOLUTE_STEP;

											if(blockEnemy.checked==true)
												BLOCK_ENEMY=1;
											else
												BLOCK_ENEMY=0;

											if(blockEnemyGravity.checked==true){
												NO_GRAVITY_ENEMY=1;
												for(let i=0;i<game.arrayEnemy.length;i++)
													if(game.arrayEnemy[i].gravity==1)
														game.arrayEnemy[i].gravity=0;
											}
											else
												NO_GRAVITY_ENEMY=0;

											if(blockObject.checked==true)
												BLOCK_OBJECT=1;
											else if(MOUSE==0)
												BLOCK_OBJECT=0;

											if(hideNav.checked==true)
												document.getElementById('navEditor').style.display='none';
											else 
												document.getElementById('navEditor').style.display='block';

											if(info.checked==true){
												if(INFO==0)
													document.getElementById('p-switchInfo').style.display='block';
												
												INFO=1;
											}
											else 
												INFO=0;
										}

										if(player.life<=0 && EDITOR==0){
											
											player.width=0
											game.vitePerse++;
											game.salvaStat();
											game.sketcher.drawMenu(game);
											PAUSA=1;
										}
										
										if(player.counterFire!=0)
											player.counterFire++;

										if(player.counterFire>=player.intervalFire/TIME_PLAYER_MOVE)
											player.counterFire=0;

										for(let i=0;i<arrayFloor.length;i++)
											if(arrayFloor[i].point.x<=game.playground.width+game.playground.width/4 || arrayFloor[i].type=='FSX_0')	
												if((EDITOR==0 || (EDITOR==1 && arrayFloor[i].point.x+arrayFloor[i].width>=0-game.playground.width/4)) || arrayFloor[i].type=='FSX_0')
													arrayFloor[i].moveFloorSemoventi(playground,game);	//FSX_0 li muovo sempre perchè devo mantenere le sincronizzazioni
										
												
												
										if(game.playerLife!=player.life){
											sketcher.updateLifeBar(player);
											game.playerLife=player.life;
										}
										
                                        if(EDITOR==0)
                                            game.clockFloor();
                                        else
                                            game.clockFloorEditor();
                                            
											
                                        game.clockEnemy();
									

									
										player.block(0,0,0);
									



									if(NO_COLLISION==0){
									//collisione con floor
									    let appoggio1=null;  //ricorda se c'era una collisione 'sopra' con i floor(serve a non farla sovrascrivere dagli enemy)
								

									    appoggio1=game.checkObjectHit(player,arrayFloor,"player-floor");

										
									    //collisione con enemy
									    game.checkObjectHit(player,arrayEnemy,"player-enemy");

									    if(player.collision==1 && appoggio1!='noSopra'){
									    	//console.log('eccezione');

									    	player.collision=0;
									    	player.gravity=0;
									    	player.v0=null;
									    }

										//collisione con box
										game.checkBoxHit();
										

									}

									player.move(playground,game);


									if(NO_COLLISION==0){  //faccio le collisioni per i floor perchè i floor semoventi lavorano con la posizione del player che ora è cambiata
										//collisione con floor
											let appoggio1=null;  //ricorda se c'era una collisione 'sopra' con i floor(serve a non farla sovrascrivere dagli enemy)
									
	
											appoggio1=game.checkObjectHit(player,arrayFloor,"player-floor");
	
											
											if(player.collision==1 && appoggio1!='noSopra'){
												//console.log('eccezione');
	
												player.collision=0;
												player.gravity=0;
												player.v0=null;
											}
	
										
										}


									
									sketcher.drawObject(player,null,game);

									

									for(let i=0;i<game.arrayDeathDiv.length;i++){

										game.arrayDeathDiv[i].intervalLife();

										sketcher.drawObject(game.arrayDeathDiv[i],game.arrayDeathDiv[i].index,game);

									}
									game.deleteObject("deathDiv");		

									//div per la collisione dei proiettili

									for(let i=0;i<game.arrayBulletCollisionDiv.length;i++){

										game.arrayBulletCollisionDiv[i].intervalLife();

										sketcher.drawObject(game.arrayBulletCollisionDiv[i],game.arrayBulletCollisionDiv[i].index,game);		

									}
									game.deleteObject("bulletCollisionDiv");

									sketcher.updateCoolingBar(player);
									sketcher.updateAmmoBar(player);

								}
								,TIME_PLAYER_MOVE);
}

/***************************/ 


Game.prototype.clockFloor=function(){

	let game=GAME;
	let player=this.player;
	let sketcher=this.sketcher;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let arrayEnemy=this.arrayEnemy;
	let arrayBox=this.arrayBox;


										if(PAUSA==1)
											return;

										
										let step=STEP;

										if((player.point.x>playground.offsetLeft+playground.width/2 &&
											(player.d==1 || player.v0=='d')&&player.blockDx==0 && step==5)||game.triggerMove==1)
												player.stepX=0;

										else  if(game.triggerMove==0)//prima stava dentro l'if e la seconda condizione era un altro if
												player.stepX=player.absoluteStepX;


										
											for(let i=0;i<arrayFloor.length;i++){

												
												if((player.stepX!=player.absoluteStepX && player.shift!=1 && step!=0) || game.triggerMove==1)
														arrayFloor[i].moveFloor(playground);
														

												sketcher.drawObject(arrayFloor[i],arrayFloor[i].index,game);
													
											}
											game.deleteObject("floor");	


											for(let i=0;i<arrayEnemy.length;i++){
											
														if(arrayEnemy[i].width>0 && arrayEnemy[i].height>0){

																if((player.stepX!=player.absoluteStepX && player.shift!=1 && step!=0) || game.triggerMove==1){
																	arrayEnemy[i].moveEnemy(playground);
																
																//muovo proiettili nemici


																	for(let j=0;j<arrayEnemy[i].arrayBullet.length;j++)

																		if(arrayEnemy[i].arrayBullet[j].dir=='a')
																			arrayEnemy[i].arrayBullet[j].point.x-=step;
																		/*else if(arrayEnemy[i].arrayBullet[j].dir=='d')
																			arrayEnemy[i].arrayBullet[j].point.x-=step;*/
																}
														}		
											}

											//muovo proiettili del player

											for(let i=0;i<player.arrayBullet.length  && player.shift!=1;i++)

												if((player.stepX!=player.absoluteStepX && player.shift!=1) || game.triggerMove==1){

													if(player.arrayBullet[i].dir=='a')
														player.arrayBullet[i].point.x-=step;
													/*else if(player.arrayBullet[i].dir=='d')
														player.arrayBullet[i].point.x-=step;*/
												}

											//muovo i box e li disegno	

											for(let i=0;i<arrayBox.length;i++){

												if((player.stepX!=player.absoluteStepX && player.shift!=1 && step!=0) || game.triggerMove==1)
													arrayBox[i].moveBox();
												
												
												sketcher.drawObject(arrayBox[i],arrayBox[i].index,game);
													
											}	
											game.deleteObject("box");


											for(let i=0;i<game.arrayDeathDiv.length && player.shift!=1;i++){

												if((player.stepX!=player.absoluteStepX && player.shift!=1) || game.triggerMove==1)
													game.arrayDeathDiv[i].point.x-=step;
												
											}	

											for(let i=0;i<game.arrayBulletCollisionDiv.length && player.shift!=1;i++){

												if((player.stepX!=player.absoluteStepX && player.shift!=1) || game.triggerMove==1)
													game.arrayBulletCollisionDiv[i].point.x-=step;
												
	
											}


											if(game.triggerMove==1 && step!=0){
													
														player.point.x-=step; //deve avvenire una volta a ciclo
														let divBlock=document.getElementById('divBlock');
														let w=20;
														let h=20;
														divBlock.style.width=w/SCALA+'vw';
														divBlock.style.height=h/SCALA+'vw';
														divBlock.style.left=(player.point.x+w)/SCALA+'vw';
														divBlock.style.top=(player.point.y-2*h)/SCALA+'vw';
														
												}
											if(player.point.x==0 && game.triggerMove==1){
												game.triggerMove=0;	
												let divBlock=document.getElementById('divBlock');
												divBlock.parentNode.removeChild(divBlock);
											}


}

/*****************/


Game.prototype.clockEnemy=function(){

	let arrayEnemy=this.arrayEnemy;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let sketcher=this.sketcher;
	let player=this.player;
	let game=GAME;


									//nemici

									if(PAUSA==1)
											return;

									


									for(let i=0;i<arrayEnemy.length;i++){

										if(arrayEnemy[i].point.x>game.playground.width+game.playground.width/4)
											continue;
										if(arrayEnemy[i].point.x+arrayEnemy[i].width<0-game.playground.width/4 && EDITOR==1){
											continue;	
										}


										if(timeBoss1Move!=null && arrayEnemy[i].type=='boss1')
											continue;

										if(EDITOR==1){
											if(arrayEnemy[i]!=null) //dopo il deleteObject potrebbe essere stato cancellato e non riallocato
												
												arrayEnemy[i].blockSx=0;
												arrayEnemy[i].blockDx=0;
												
												
												

												if(NO_GRAVITY_ENEMY==0 && arrayEnemy[i].make==0){
													arrayEnemy[i].gravity=1;
													game.checkObjectHit(arrayEnemy[i],arrayFloor,'enemy-floor');
													game.checkObjectHit(arrayEnemy[i],arrayEnemy,'enemy-enemy');
												}
												if(arrayEnemy[i].point.x+arrayEnemy[i].width>=0 && arrayEnemy[i].point.x<=game.playground.width)
														arrayEnemy[i].move(playground,player);//del BLOCK_ENEMY mi occupo dentro la funzione

												sketcher.drawObject(arrayEnemy[i],arrayEnemy[i].index,game);
												
											continue;
										}
										

										

										arrayEnemy[i].blockViewSx=null;
										arrayEnemy[i].blockViewDx=null;


										for(let j=0;j<arrayFloor.length;j++)
											if(arrayFloor[j].width>0 && arrayFloor[j].height>0 )
												arrayEnemy[i].bulletFire(arrayFloor[j],'floor',player);


										arrayEnemy[i].bulletFire(player,'player',null)

										if(arrayEnemy[i].arrayBullet.length>0 && arrayEnemy[i].bulletTimeEnemy==null){
												//console.log('chiamata');
											game.clockBulletEnemy(arrayEnemy[i]);
										}

										else if(arrayEnemy[i].arrayBullet.length<=0 && arrayEnemy[i].bulletTimeEnemy!=null){
												//console.error('pulisce clock');

												
											clearInterval(arrayEnemy[i].bulletTimeEnemy);
											arrayEnemy[i].bulletTimeEnemy=null;
										}
											


											arrayEnemy[i].blockSx=0;
											arrayEnemy[i].blockDx=0;

											//arrayEnemy[i].move(playground);
											arrayEnemy[i].gravity=1;
											if(EDITOR==0){
												game.checkObjectHit(arrayEnemy[i],arrayFloor,'enemy-floor');
												game.checkObjectHit(arrayEnemy[i],arrayEnemy,'enemy-enemy');
												

											}


											if(arrayEnemy[i]!=null && arrayEnemy[i].type=='boss1' && EDITOR==0)
												arrayEnemy[i].moveBoss1(playground,player,game);
											else if(arrayEnemy[i]!=null && EDITOR==0)
												if(arrayEnemy[i].point.x+arrayEnemy[i].width>=0 && arrayEnemy[i].point.x<=game.playground.width)
													arrayEnemy[i].move(playground,player);

											
											if(arrayEnemy[i]!=null) //dopo il deleteObject potrebbe essere stato cancellato e non riallocato
												sketcher.drawObject(arrayEnemy[i],arrayEnemy[i].index,game);

										
									}	
									game.deleteObject('enemy');


}

/***************************/
Game.prototype.clockFirePlayer=function(){


	let player=this.player;
	let game=GAME;
	let array=this.player.arrayBullet;
	let playground=this.playground;
	let sketcher=this.sketcher;

    player.createBullet();
	bulletInterval=setInterval(function(){

								if(PAUSA==1 || EDITOR==1 || DISTRUZIONE==1)
											return;


								if(player.typeBullet.type==0 && player.typeBullet.interval==STANDARD_INTERVAL_BULLET){
									player.createBullet();
									player.counterFire=1;
									game.colpiTotali++;
									game.colpiVuoto=game.colpiTotali-game.colpiSegno;
									
								}

								else if(player.ammo>0){
									player.ammo-=Math.ceil(player.typeBullet.damage/10);
									game.colpiTotali++;
									game.colpiVuoto=game.colpiTotali-game.colpiSegno;
									player.createBullet();
									player.counterFire=1;
									
								}
								

								
							},player.typeBullet.interval);

	}

/*************************/


Enemy.prototype.clockFireEnemy=function(){

	let enemy=this;
	let array=this.arrayBullet;
	
	if(this.type==6 || this.type==7)
		return;

    enemy.createBullet();
	this.bulletInterval=setInterval(function(){	
										if(PAUSA==1 || EDITOR==1 || DISTRUZIONE==1)
											return;

								enemy.createBullet();
								},enemy.typeBullet.interval); //intervallo tra uno sparo e l'altro

}


/*********************************/


Game.prototype.clockBulletPlayer=function(){


	let player=this.player;
	let array=this.player.arrayBullet;
	let arrayEnemy=this.arrayEnemy;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let sketcher=this.sketcher;
	let game=GAME;
	

	bulletTimePlayer=setInterval(function(){

									if(PAUSA==1 || EDITOR==1 || DISTRUZIONE==1)
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

								if(PAUSA==1 || EDITOR==1 || DISTRUZIONE==1)
											return;


								for(let i=0;i<array.length;i++){

										game.checkObjectHit(array[i],player,"bullet-player");
										game.checkObjectHit(array[i],game.arrayEnemy,'bulletEnemy-enemy');

										if(array[i].type!=3 || (array[i].type==3 && array[i].dir!='s'))
											game.checkObjectHit(array[i],arrayFloor,"bullet-floor");

										array[i].moveBullet(playground);
										sketcher.drawObject(array[i],array[i].index,game);
										enemy.deleteBullet();
								}


								
							},enemy.typeBullet.time);  //gestisce movimento proiettili nemici



}


/*******************************/


Game.prototype.clockBoss1Move=function(boss){

	let player=this.player;
	let playground=this.playground;
	let game=GAME;
	let sketcher=this.sketcher;

	if(this.bulletTimeEnemy==null)
		game.clockBulletEnemy(boss);

	timeBoss1Move=setInterval(function(){


		if(PAUSA==1 || EDITOR==1)
				return;

		let zona1_=Math.floor((playground.width/100)*20); //20% della larghezza della finestra
		let _zona1=Math.floor((playground.width/100)*35); //35%
		let zona2_=Math.floor((playground.width/100)*45); //45%
		let _zona2=Math.floor((playground.width/100)*55); //55%
		let zona3_=Math.floor((playground.width/100)*65); //65%
		let _zona3=Math.floor((playground.width/100)*80); //80%
		let altezza=Math.floor((playground.height/100)*20); //30% dell'altezza della finestra

		let zona4=Math.floor((playground.width/100)*75);
		let zona5=Math.floor((playground.width/100)*25);


		if(boss.fire!=1)
			boss.fire=1;

		let sposta=getRandomInt(1,2); 
		bossNode=document.getElementById(BASE_ENEMY_ID+'_'+boss.type+'_'+boss.index);
		if(bossNode==null)
			return;

		if(sposta==1 && player.point.x>=zona1_ && player.point.x+player.width<=_zona1){

			

			boss.point.y=altezza;
			boss.point.x=player.point.x;
			boss.bulletDir='s';
			bossNode.style.backgroundImage="url('../css/enemy/enemyboss1-s.png')";


			if(boss.typeBullet.type!=3){
				clearInterval(boss.bulletInterval);
				clearInterval(boss.bulletTimeEnemy);
				boss.typeBullet=new Type3;
				game.clockBulletEnemy(boss);
				boss.clockFireEnemy();
			}	

		}

		else if(sposta==1 && player.point.x>=zona2_ && player.point.x+player.width<=_zona2){


			boss.point.y=altezza;
			boss.point.x=player.point.x;
			boss.bulletDir='s';
			bossNode.style.backgroundImage="url('../css/enemy/enemyboss1-s.png')";

			if(boss.typeBullet.type!=3){
				clearInterval(boss.bulletInterval);
				clearInterval(boss.bulletTimeEnemy);
				boss.typeBullet=new Type3;
				game.clockBulletEnemy(boss);
				boss.clockFireEnemy();
			}	
		
		}


		else if(sposta==1 && player.point.x>=zona3_ && player.point.x+player.width<=_zona3){

			
			boss.point.y=altezza;
			boss.point.x=player.point.x;
			boss.bulletDir='s';
			bossNode.style.backgroundImage="url('../css/enemy/enemyboss1-s.png')";

			if(boss.typeBullet.type!=3){
				clearInterval(boss.bulletInterval);
				clearInterval(boss.bulletTimeEnemy);
				boss.typeBullet=new Type3;
				game.clockBulletEnemy(boss);
				boss.clockFireEnemy();
			}	

		}
		
		else {



			if(player.point.x<=playground.width/2){

				boss.point.x=zona4;
				boss.bulletDir='a';
				boss.view='sx';
				boss.a=1;
				boss.d=0;
				bossNode.style.backgroundImage="url('../css/enemy/enemyboss1-a1.png')";
			}
			else{
				boss.point.x=zona5;
				boss.bulletDir='d';
				boss.view='dx';
				boss.a=0;
				boss.d=1;
				bossNode.style.backgroundImage="url('../css/enemy/enemyboss1-d1.png')";
			}

			boss.point.y=boss.spawnY;

			if(boss.typeBullet.type!=5){

				clearInterval(boss.bulletInterval);
				clearInterval(boss.bulletTimeEnemy);
				//boss.bulletTimeEnemy=null;
				//boss.bulletInterval=null;
				boss.typeBullet=new Type5;
				game.clockBulletEnemy(boss);
				boss.clockFireEnemy();
			}	


		}

		sketcher.drawObject(boss,boss.index,game);


	},TIME_BOSS1_MOVE);
	
}


/**************************************/



Game.prototype.clockFloorEditor=function(){

	let game=GAME;
	let player=this.player;
	let sketcher=this.sketcher;
	let arrayFloor=this.arrayFloor;
	let playground=this.playground;
	let arrayEnemy=this.arrayEnemy;
	let arrayBox=this.arrayBox;

	
										
										let newStep=0;

										

										if(player.point.x==Math.floor((playground.width/2)/5)*5 && STEP==5){
										
											player.stepX=0;

											if((player.a==1 || player.v0=='a')&&player.blockSx==0 && player.shift==0)
												newStep=STEP;

											else if((player.d==1 || player.v0=='d')&&player.blockDx==0  && player.shift==0)
												newStep=-STEP;
												
										}
										else 
											player.stepX=player.absoluteStepX;


									
										if(player.a==1 && DIST<=0){

											player.stepX=player.absoluteStepX;
											newStep=0;

										}


											DIST-=newStep;
										

										
											for(let i=0;i<arrayFloor.length;i++){

	
												if(game.arrayFloor[i].type=='sfondo' && detectmob()==true){
													
													sketcher.drawObject(arrayFloor[i],arrayFloor[i].index,game);
													continue;
												}


													arrayFloor[i].point.x+=newStep;

												sketcher.drawObject(arrayFloor[i],arrayFloor[i].index,game);
														
											}
											game.deleteObject("floor");


											for(let i=0;i<arrayEnemy.length  && player.shift!=1;i++){
											
														if(arrayEnemy[i].width>0 && arrayEnemy[i].height>0)								
																	arrayEnemy[i].point.x+=newStep;
																
																
											}


											//muovo i box e li disegno	

											for(let i=0;i<arrayBox.length;i++){

												arrayBox[i].point.x+=newStep;
												
												sketcher.drawObject(arrayBox[i],arrayBox[i].index,game);
													
											}	
											game.deleteObject("box");



											if(OBJECT_MOVE_RANGE!=null){
												OBJECT_MOVE_RANGE.point.x+=newStep;
												sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);
											}

											if(OBJECT_MOVE_RANGE_BOSS1!=null){
												OBJECT_MOVE_RANGE_BOSS1.point.x+=newStep;
												OBJECT_MOVE_RANGE_BOSS2.point.x+=newStep;
												OBJECT_MOVE_RANGE_BOSS3.point.x+=newStep;
												OBJECT_MOVE_RANGE_BOSS4.point.x+=newStep;
												OBJECT_MOVE_RANGE_BOSS5.point.x+=newStep;
												
												sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS1,'zona1',game);
												sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS2,'zona2',game);
												sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS3,'zona3',game);
												sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS4,'zona4',game);
												sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS5,'zona5',game);
											}
											
											if(OBJECT_MOVE_RANGE_PORT!=null){
												OBJECT_MOVE_RANGE_PORT.point.x+=newStep;
												sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
											}


}

/**************************/


Game.prototype.clockMouse=function(){

	let game=GAME;

	mouseTime=setInterval(function(){
		
		if(EDITOR==1 && MOUSE==1 && OBJECT_MOVE_RANGE!=null){
			let objectMouse=null;

			for(let i=0;i<game.arrayFloor.length;i++)
				if(game.arrayFloor[i].make==1)
					objectMouse=game.arrayFloor[i];

			for(let i=0;i<game.arrayEnemy.length;i++)
				if(game.arrayEnemy[i].make==1)
					objectMouse=game.arrayEnemy[i];

			for(let i=0;i<game.arrayBox.length;i++)
				if(game.arrayBox[i].make==1)
					objectMouse=game.arrayBox[i];	
				
			if(objectMouse!=null){
				let x=Math.floor(MOUSE_X/ABSOLUTE_STEP)*ABSOLUTE_STEP;
				let y=Math.floor(MOUSE_Y/(ABSOLUTE_STEP*2))*(ABSOLUTE_STEP*2);
				
				if(isNaN(x) || isNaN(y))
					return;

				BLOCK_OBJECT=1;
				objectMouse.point.x=x;
				objectMouse.point.y=y;
				if(objectMouse.identifier!='box'){
					objectMouse.spawnX=x;
					objectMouse.spawnY=y;

				}
				game.makeDiv(objectMouse);

			}
		}
	},1);


}
