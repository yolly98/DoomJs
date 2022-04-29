
function Floor(playground,width,height,posX,posY,Type,capitolo,dir){

	this.stepX=Type.stepX;
	this.stepY=Type.stepY;

	this.type=Type.type;

	this.point=new Point(posX,posY)
	this.spawnX=this.point.x;
	this.spawnY=this.point.y;

	this.width=width;
	this.height=height;
	this.collisionFloor=1; //0 c'è collisione 1 no, il player sta sopra o meno (lo uso nei floor semoventi)

	
	if(this.point.x+this.width<0 && EDITOR==0)//serve per checkPoint
		this.width=0;


	this.identifier='floor';
	this.index;

	this.capitolo=capitolo;

	this.counterX=Type.counterX; //conattore per maxX
	this.counterY=Type.counterY; //contatore per maxY

	this.counterVx=Type.counterVx; //contatore per vX
	this.counterVy=Type.counterVy; //contatore per vY

	if(dir=='a'){
		this.a=1;
		this.d=0;
	}
	else if(dir=='d'){
		this.d=1;
		this.a=0;
	}
	else{
		this.a=Type.a;
		this.d=Type.d;
	}
	this.maxX=Type.maxX; //range di movimento
	this.maxY=Type.maxY;

	this.vX=Type.vX; //velocità di movimento
	this.vY=Type.vY;

	this.contactDamage=Type.contactDamage;

	this.make=0;  //è 1 se sto modificando la mappa

	if(this.type=='FAscensore_0')
		this.salitaForzata=0;  //la uso per forzare la risalita dell'ascensore quando NON sono sopra di esso

	
}

/**************/

Floor.prototype.moveFloor=function(playground){

	if(this.type=='sfondo' && detectmob()==true)
		return;
	
	this.point.x-=ABSOLUTE_STEP;
	if(this.point.x+this.width<0-playground.width/4)
		this.width=0;
	

	if(this.type=='sfondo' && this.width+this.point.x-GAME.player.point.x<5000 && EDITOR==0 && GAME.ripetizioniSfondo>0){
		this.width+=5000;
		GAME.ripetizioniSfondo--;
	}



}


/**************/

Floor.prototype.moveFloorSemoventi=function(playground,game){

	//è avviato nel clockPlayer e non clockFloor perchè devo essere sicuro che siano sincronizzati
	if(this.height==0)
		return;

	if(BLOCK_CLOCK_FLOOR==1)
		return;

	if(this.make==1 && BLOCK_OBJECT==1)
		return;

let player=game.player;
let arrayFloor=game.arrayFloor;
let enemy=new Array();


	for(let i=0;i<game.arrayEnemy.length;i++){

		let tocco=this.floorHit(game.arrayEnemy[i],'enemy-floor');

			if(tocco=='sopra')
				enemy.push(game.arrayEnemy[i]);
	}
	


	if(this.type=='FB'){

		if(this.width<=0)
			return;

		if(this.counterVx>=this.vX)
			this.counterVx=0;

		if(this.counterVy>=this.vY)
			this.counterVy=0;

		if(this.counterVx==0){

			this.point.x-=this.stepX;
			this.width+=2*this.stepX;
			this.counterX+=this.stepX;

			if(this.counterX>=this.maxX)
				this.width=0;
			
		}

		if(this.counterVy==0){

			this.point.y-=this.stepY;
			this.height+=2*this.stepY;
			this.counterY+=this.stepY;

			if(this.counterY>=this.maxY)
				this.width=0;
			
				
		}

		this.counterVx++;
		this.counterVy++;
	}

	
	if(this.type=='FSX_0'){


		//evito che passi sopra ad un altro floor
		let object=new Player(game.playground);
		object.point.x=this.point.x;
		object.point.y=this.point.y;
		object.height=this.height;
		object.width=this.width;
		object.identifier='nessuno';

		let array=game.arrayFloor;
		for(let j=0;j<array.length;j++){

			if(this.point.x>GAME.playground.width+GAME.playground.width/4)
				break;
			if(this.point.x+this.width<0-GAME.playground.width/4 && EDITOR==1)
				break;	


			let tocco=array[j].floorHit(object,'player-floor');
			if(tocco=='sx' && this.d==1){
				this.d=0;
				this.a=1;
				this.counterX=this.maxX-this.counterX;
				if(array[j].type=='FSX_0' && array[j].a==1){
					array[j].d=1;
					array[j].a=0;
					array[j].counterX=array[j].maxX-array[j].counterX;

				}
			}
			else if(tocco=='dx' && this.a==1){
				this.d=1;
				this.a=0;
				this.counterX=this.maxX-this.counterX;

				if(array[j].type=='FSX_0' && array[j].d==1){
					array[j].d=0;
					array[j].a=1;
					array[j].counterX=array[j].maxX-array[j].counterX;
				}
			}

		}
		/**/



		if(this.counterVx>=this.vX)
			this.counterVx=0;

		if(this.a==1 && this.counterVx==0){

			this.point.x-=this.stepX;
			
			if(this.stepX==0)   //accade solo nell'editor
				this.counterX+=ABSOLUTE_STEP;
			else
				this.counterX+=this.stepX;

			
			if(this.collisionFloor==0 && player.blockSx==0)
				if(player.point.x<playground.offsetLeft+playground.width/2 && EDITOR==1 && DIST>0){
						game.moveAll('a');	
				}
				else{
					player.point.x-=this.stepX;
					player.metri--;
				}
					
				
			

			if(enemy!=null )
				for(let j=0;j<enemy.length;j++)
					if(enemy[j].blockSx==0){	
						enemy[j].point.x-=this.stepX;
						enemy[j].spawnX-=this.stepX;
						if(enemy[j].make==1 && OBJECT_MOVE_RANGE!=null)
							OBJECT_MOVE_RANGE.point.x-=this.stepX;
					}

			if(this.counterX>=this.maxX){ 
				this.a=0;
				this.d=1;
				this.counterX=0;
				}
		}
		else if(this.d==1 && this.counterVx==0){

			this.point.x+=this.stepX;

			if(this.stepX==0)   //accade solo nell'editor
				this.counterX+=ABSOLUTE_STEP;
			else
				this.counterX+=this.stepX;


			if(this.collisionFloor==0 && player.blockDx==0){
				if(player.point.x>playground.offsetLeft+playground.width/2 && player.blockDx==0 && STEP!=0){
						game.moveAll('d');
				}
				else{
					player.point.x+=this.stepX;	
					player.metri++;
				}
					
				
			}

			if(enemy!=null )
				for(let j=0;j<enemy.length;j++)
					if(enemy[j].blockDx==0){	
						enemy[j].point.x+=this.stepX;
						enemy[j].spawnX+=this.stepX;
						if(enemy[j].make==1 && OBJECT_MOVE_RANGE!=null)
							OBJECT_MOVE_RANGE.point.x+=this.stepX;
					}


			if(this.counterX>=this.maxX){
				this.a=1;
				this.d=0;
				this.counterX=0;
			}
		}

		this.counterVx++;


	}


	if(this.type=='FSY_0' || this.type=='FAscensore_0'){




		//evito che passi sopra ad un altro floor
		let object=new Player(game.playground);
		object.point.x=this.point.x;
		object.point.y=this.point.y;
		object.height=this.height;
		object.width=this.width;
		object.identifier='nessuno';

		let array=game.arrayFloor;
		for(let j=0;j<array.length;j++){

			let tocco=array[j].floorHit(object,'player-floor');
			if(tocco=='sopra' && this.d==1){

				if(this.type=='FAscensore_0')
					this.salitaForzata=1;
				
				this.d=0;
				this.a=1;
				this.counterY=this.maxY-this.counterY;
				
				if(array[j].type=='FSY_0' && array[j].a==1){
					array[j].d=1;
					array[j].a=0;
					array[j].counterY=array[j].maxY-array[j].counterY;

				}
			}
			else if(tocco=='sotto' && this.a==1){
				this.d=1;
				this.a=0;
				this.counterY=this.maxY-this.counterY;
				if(array[j].type=='FSY_0' && array[j].d==1){
					array[j].d=0;
					array[j].a=1;
					array[j].counterY=array[j].maxY-array[j].counterY;
				}
			}

		}
		/**/




		if(this.counterVy>=this.vY)
			this.counterVy=0;

		/**per Ascensore**/
		if(this.counterVy==0 && this.a!=1 && this.collisionFloor==0 && this.type=='FAscensore_0' && this.point.y>this.spawnY-this.maxY){
			this.a=1;
			this.d=0;
			this.counterY=this.maxY-this.counterY;
		}
			
		else if(this.counterVy==0 && this.d!=1 && this.collisionFloor==1 && this.type=='FAscensore_0' && this.point.y<this.spawnY && this.salitaForzata==0){
			this.d=1;
			this.a=0;
			this.counterY=this.maxY-this.counterY;
		}
		
		/*******/

		if(this.a==1 && this.counterVy==0){

			this.point.y-=this.stepY;
			this.counterY+=this.stepY;
			//this.timeY++;
			if(this.counterY>=this.maxY){ 
				
				this.a=0;
				if(this.type=='FSY_0'){
					this.d=1;
				}
				this.counterY=0;
				if(this.type=='FAscensore_0' && this.salitaForzata==1)
					this.salitaForzata=0;
				
			}
				
		}
		else if(this.d==1 && this.counterVy==0){

			this.point.y+=this.stepY;
			this.counterY+=this.stepY;
			//this.timeY++;
			if(this.counterY>=this.maxY){

				this.d=0;
				if(this.type=='FSY_0')
					this.a=1;
					
				this.counterY=0;
				
			}
		}

		if(this.collisionFloor==0)
				player.point.y=this.point.y-player.height;

		if(enemy!=null )
				for(let j=0;j<enemy.length;j++){

					enemy[j].point.y=this.point.y-enemy[j].height;
					enemy[j].spawnY=this.point.y-enemy[j].height;
					if(enemy[j].make==1 && OBJECT_MOVE_RANGE!=null)
						OBJECT_MOVE_RANGE.point.y=this.point.y-enemy[j].height;
				}
	
		
		this.counterVy++;
		
	}


	if(this.type=='FPorta' ||
		this.type=='FPortaG_0' || this.type=='FPortaG_0' || 
		this.type=='FPortaB_0' || this.type=='FPortaB_1' ||
		this.type=='FPortaR_0' || this.type=='FPortaR_1'){

		if(this.counterVy>=this.vY)
			this.counterVy=0;

		if(this.a==1 && this.counterVy==0 && this.d==0){
			this.height-=this.stepY;
				
		}
		else if(this.a==1 && this.counterVy==0 && this.d==1){
			this.width-=this.stepX;
				
		}
		

		this.counterVy++;	
	}


}

/***************/
Floor.prototype.floorHit=function(object,objectIdentifier){

	let objectX=object.point.x;
	let objectY=object.point.y;
	let objectW=object.width;
	let objectH=object.height;
	let index=object.index;

	//le collisione sono relative al floor non al player(es. return 'sx' è a dx rispetto al player)

	if(this.type=='sfondo')
		return;

	

	if(objectIdentifier=='bullet-floor' || this.type=='FB' || (this.type=='PORT' && this.a==0)){

		
		if( ( (objectX>=this.point.x && objectX<=this.point.x+this.width)||

				(objectX+objectW>=this.point.x && objectX+objectW<=this.point.x+this.width) ||

				(objectX<=this.point.x && objectX+objectW>=this.point.x+this.width) )&&

			( (objectY>=this.point.y && objectY<=this.point.y+this.height)||	

				(objectY+objectH>=this.point.y && objectY+objectH<=this.point.y+this.height)||

				(objectY<=this.point.y && objectY+objectH>=this.point.y+this.height) ) )
		
				
			return "presoFloor";
		

	}

	
	if(objectX+objectW>=this.point.x && 
		objectX<=this.point.x+this.width && (objectY==this.point.y+this.height
		/*objectY<=this.point.y+this.height && objectY>this.point.y && objectJ==1*/
		|| (this.type=='FSY_0' /*&& object.gravity==1*/ &&
					objectY-this.stepY==this.point.y+this.height)
			
			)
	){ //ho aggiunto playerJ che serebbe il tasto w
		//perchè entrava in conflitto con gli altri
		
		return "sotto";
	}	

	else if( ((object.collision==0 && objectX+objectW>=this.point.x)||(object.collision==1 && objectX+objectW>this.point.x)) && 
		((object.collision==0 && objectX<=this.point.x+this.width)||(object.collision==1 && objectX<this.point.x+this.width)) &&   
		(objectY+objectH==this.point.y || (this.type=='FSY_0' && object.gravity==1 &&
												(objectY+objectH+this.stepY==this.point.y)))
		)


				/************************/

				/*le condizioni dopo 'this.type==FSY_0' sono dovute ai 3 casi che si presentano per la collisione superiore
				con i floor di tipo FSY, tali casi differiscono uno per 0 px (corretto),
				uno per 10 px e uno per 20 px, è stato testato con successo su un floor di altezza venti e andante a 
				a velocità dimezzata rispetto al clock. Pertanto qualsiasi modifica di tali misure non ne garantisce il
				funzionamento.
				*/
				/*******************/

		{	

			return "sopra";
		}	

	
		else if(((objectY>=this.point.y && objectY<this.point.y+this.height) ||
			(objectY+objectH>=this.point.y && objectY+objectH<=this.point.y+this.height) ||
			   (objectY<this.point.y && objectY+objectH>this.point.y+this.height)) ){

			if(objectX+objectW==this.point.x || (this.type=='FSX_0' && objectX+objectW+this.stepX==this.point.x)){
					
				return "sx";
			}		
		
			else if(objectX==this.point.x+this.width || (this.type=='FSX_0' && objectX-this.stepX==this.point.x+this.width)){		
				return "dx";
			}
		}			


	else {
			
		return 0;
	}
			
				

}


/********************************/


Floor.prototype.enemyGenesysRandom=function(game){


	if(this.type!='EGY')
		return;

	let type0=new TypeE0; //default
	let type1=new TypeE1; //cane
	let type2=new TypeE2; //torretta
	let type3=new TypeE3; //corazzato
	let type4=new TypeE4; //cecchino
	let type5=new TypeE5; //zombie


	let random=getRandomInt(0,6);
	let tipo=null;
	
		switch (random) {
 			case 0:
    			tipo=type0;
    		break;

  			case 1:
    			tipo=type1;
    		break;

    		case 3:
    			tipo=type2;
    		break;

    		case 3:
    			tipo=type3;
    		break;

    		case 4:
    			tipo=type4;
    		break;

    		case 5:
    			tipo=type5;
    		break;

    	}

	if(tipo==null)
			return;

	this.counterX++;
	if(this.counterX>=this.maxX){
		this.width=0;	
		return;
	}

	let dir=getRandomInt(0,2);
	if(dir==0)
		dir='d';
	else
		dir='a';		

	game.arrayEnemy.push(new Enemy(tipo,this.point.x,this.point.y,dir));
	game.arrayEnemy[game.arrayEnemy.length-1].index=game.enemyOut;
	game.enemyOut++;

	this.point.x+=100;
	
		


}