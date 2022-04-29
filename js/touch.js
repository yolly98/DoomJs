var Interval_arrowW=null;
var Interval_arrowA=null;
var Interval_arrowD=null;
var Interval_arrowS=null;

function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

/********************/

function createTouchControl(){

    if(detectmob()==false)
        return;

        window.ontouchstart = function(event) {
            if (event.touches.length>1) { //If there is more than one touch
                event.preventDefault();
            }
        }   

    let move=document.createElement('div');
    let stick=document.createElement('div');
    let fire=document.createElement('div');
    let jump=document.createElement('div');
    let pausa=document.createElement('div');

    move.setAttribute('id','moveStick');
    stick.setAttribute('id','stick');
    fire.setAttribute('id','touchFire');
   // jump.setAttribute('id','touchJump');
    pausa.setAttribute('id','touchPausa');

    
    move.appendChild(stick);
    let P=document.getElementById('playground');
    P.appendChild(move);
    P.appendChild(fire);
    P.appendChild(jump);
    P.appendChild(pausa);

    move.addEventListener('touchmove',touchMove.bind(this),false);
    move.addEventListener('touchend',touchEnd.bind(this),false);

    fire.addEventListener('touchstart',touchMoveFire.bind(this),false);
    fire.addEventListener('touchend',touchEndFire.bind(this),false);

    //jump.addEventListener('touchstart',touchStartJump.bind(this),false);
    //jump.addEventListener('touchend',touchEndJump.bind(this),false);

    pausa.addEventListener('touchstart',touchPausa.bind(this),false);

    if(PAGE=='editor'){
        
        fire.parentNode.removeChild(fire);
        //jump.parentNode.removeChild(jump);

        let table=document.createElement('table');
        table.setAttribute('id','sizeControll');
        P.appendChild(table);
        
        table.innerHTML="<tr> <td></td> <td id='arrowW' class='size' ontouchstart=arrowW() ontouchend=arrowEnd('w')></td> <td></td> </tr>";
        table.innerHTML+="<tr> <td id='arrowA' class='size' ontouchstart=arrowA() ontouchend=arrowEnd('a')></td> <td></td> <td  id='arrowD' class='size' ontouchstart=arrowD() ontouchend=arrowEnd('d')></td> </tr>";
        table.innerHTML+="<tr> <td></td> <td id='arrowS' class='size' ontouchstart=arrowS() ontouchend=arrowEnd('s')></td> <td></td> </tr>"; 
   
       
    }
    else{
        pausa.style.top='1vw';
        pausa.style.left='50%';
        pausa.style.transform='translateX(-50%)';
    }
} 

/***************************/

function touchPausa(ev){
    if(PAUSA==0){
        GAME.sketcher.drawMenu(GAME);
        PAUSA=1;
    }
}
/***************************/

function touchEnd(ev){

    document.getElementById('stick').style.left=4.5+'vw';
    document.getElementById('stick').style.top=4.5+'vw';


    let game=GAME;
    playerNode=document.getElementById(PLAYER_ID+game.player.type);

	
	if( PAUSA==0){//a  mov SX
		game.player.a=0;
		if(game.player.v0=='a')
			game.player.v0=null;
		
		game.player.d=0;
		if(game.player.v0=='d')
			game.player.v0=null; //in caso di bug pulire l'intervallo dei floor
		
	}	

    if(game.player.wUp==0 && PAUSA==0){//w  SALTO
		game.player.wUp=1;
		game.player.w=0;
		if(game.player.collision==1)
			game.player.gravity=1;
		clearTimeout(jumpTime);
		

	}

	

	if( (game.player.shift==1 || game.player.sEditor==1) && PAUSA==0){//shift ACCOVACCIA
		
		
		if(ALL_MOVIMENT==1)
			game.player.sEditor=0;//nell'editor lo uso per muovermi anche verso il basso
		
		else{


			for(let i=0;i<game.arrayFloor.length;i++){  //se sono abbassato sotto ad un floor più basso di origin_height

				let tocco=null;
				let objectShift=new Player(game.playground);
				objectShift.identifier='nessuno';
				objectShift.point.x=game.player.point.x;
				objectShift.point.y=game.player.point.y;
				objectShift.height=game.player.height;

				while(objectShift.height<game.player.origin_height){

					tocco=game.arrayFloor[i].floorHit(objectShift,'player-floor');
					
					let fx=game.arrayFloor[i].point.x;
					let fw=game.arrayFloor[i].width;
					let ox=objectShift.point.x;
					let ow=objectShift.width;
					if(tocco=='sotto'){
						
						if(ox==fx+fw || ox+ow==fx)
							tocco=null;
						else 
							break;
					}
					
					objectShift.height+=game.player.stepY;
					objectShift.point.y-=game.player.stepY;
				}

				if(tocco=='sotto')
					return;
				


			}



			if(playerNode!=null)
				if(game.player.bulletDir=='d')
					playerNode.style.backgroundImage="url('../css/player/player-dx1-gun"+game.player.typeBullet.type.toString()+".png')";
				else if(game.player.bulletDir=='a')
					playerNode.style.backgroundImage="url('../css/player/player-sx1-gun"+game.player.typeBullet.type.toString()+".png')";

			game.player.shift=0;
			game.player.blockJump=0;
		}
	}

}

/*************************/

function touchEndFire(ev){

    let game=GAME;

    if( PAUSA==0){//space SPARA

		game.player.fire=0;
		clearInterval(bulletInterval);
		bulletInterval=null;
	
	}

}

/***********************************/

function touchMove(ev){

    let P=document.getElementById('playground');
    let M=document.getElementById('moveStick');

    let x=Math.floor(ev.touches[0].pageX-M.offsetLeft-P.offsetLeft+P.offsetWidth/2);
    let y=Math.floor(ev.touches[0].pageY-M.offsetTop-P.offsetTop+M.offsetHeight/2);

    let vwX=x*0.1;
    let vwY=y*0.1;

    document.getElementById('stick').style.left=vwX+'vw';
    document.getElementById('stick').style.top=vwY+'vw';


    
	if(chargingTime!=null)
    return;

    let game=GAME;
    let playerNode=document.getElementById(PLAYER_ID+game.player.type);



    if(vwX<3 && PAUSA==0){//a  SX

       // console.log('sx');
        if(game.player.d==1)
            game.player.d=0;
        game.player.a=1;
        
            game.player.bulletDir='a';
    }	

    else if(vwX>7.5 && PAUSA==0){//d  DX
       // console.log('dx');
        if(game.player.a==1)
            game.player.a=0;
        game.player.d=1;
        
            game.player.bulletDir='d';
    }	

    if(vwY<2 && game.player.w==0 && game.player.collision==0 && game.player.wUp==1 && PAUSA==0){//w  SALTO

       // console.log('w');

        game.player.wUp=0;
        if(ALL_MOVIMENT==1)
            jumpTime=null;
        

        if(game.player.shift!=1 && game.player.chooseAim!=1 ){
                
            game.player.w=1;
            game.player.gravity=0;
            jumpTime=setTimeout(game.playerFall.bind(game),game.player.jump);
        }
        
    }
    else if(vwY>=2 && PAUSA==0){
        game.player.wUp=1;
		game.player.w=0;
		if(game.player.collision==1)
			game.player.gravity=1;
		clearTimeout(jumpTime);
    }



   

    if(vwY>10 && game.player.shift==0  && PAUSA==0){//shift ACCOVACCIA, PS:ora è 'S'

      //  console.log('s');
        
        if(ALL_MOVIMENT==1)
            game.player.sEditor=1;
        else{
            game.player.shift=1;
            game.player.blockJump=1;
        }

    }
    if(vwY<=10 && (game.player.shift==1 || game.player.sEditor==1) && PAUSA==0){//shift ACCOVACCIA
		
		
		if(ALL_MOVIMENT==1)
			game.player.sEditor=0;//nell'editor lo uso per muovermi anche verso il basso
		
		else{


			for(let i=0;i<game.arrayFloor.length;i++){  //se sono abbassato sotto ad un floor più basso di origin_height

				let tocco=null;
				let objectShift=new Player(game.playground);
				objectShift.identifier='nessuno';
				objectShift.point.x=game.player.point.x;
				objectShift.point.y=game.player.point.y;
				objectShift.height=game.player.height;

				while(objectShift.height<game.player.origin_height){

					tocco=game.arrayFloor[i].floorHit(objectShift,'player-floor');
					
					let fx=game.arrayFloor[i].point.x;
					let fw=game.arrayFloor[i].width;
					let ox=objectShift.point.x;
					let ow=objectShift.width;
					if(tocco=='sotto'){
						
						if(ox==fx+fw || ox+ow==fx)
							tocco=null;
						else 
							break;
					}
					
					objectShift.height+=game.player.stepY;
					objectShift.point.y-=game.player.stepY;
				}

				if(tocco=='sotto')
					return;
				


			}



			if(playerNode!=null)
				if(game.player.bulletDir=='d')
					playerNode.style.backgroundImage="url('../css/player/player-dx1-gun"+game.player.typeBullet.type.toString()+".png')";
				else if(game.player.bulletDir=='a')
					playerNode.style.backgroundImage="url('../css/player/player-sx1-gun"+game.player.typeBullet.type.toString()+".png')";

			game.player.shift=0;
			game.player.blockJump=0;
		}
	}

   
    
}

/***********************/

function touchMoveFire(ev){

    let game=GAME;

    if(PAUSA==0){//space SPARA

        game.player.fire=1;

        if(bulletInterval==null && game.player.counterFire==0){

            let appoggio=new Type0;
            game.colpiTotali++;
            game.colpiVuoto=game.colpiTotali-game.colpiSegno;

            if(game.player.ammo>0){
                if(game.player.typeBullet.type==0 && game.player.typeBullet.interval==STANDARD_INTERVAL_BULLET)
                    game.player.typeBullet.interval=appoggio.interval;
                game.player.ammo-=Math.ceil(game.player.typeBullet.damage/10);
            }
            else{

                if(game.player.typeBullet.type!=0)
                    game.player.typeBullet=new Type0;

                game.player.counterFire=0;
                game.player.typeBullet.interval=STANDARD_INTERVAL_BULLET;
                game.player.intervalFire=game.player.typeBullet.interval;
                clearInterval(bulletTimePlayer);
                clearInterval(bulletInterval);
                game.clockBulletPlayer();
            }

            game.clockFirePlayer();
            game.player.counterFire=1; //il clock del player lo riporterà a 0
        }


    }
}

/**************************/


touchTracking=function(event){


	if(MOUSE==1){

		let playground=document.getElementById('playground');

		let dim_px=playground.clientWidth;
		let posX=playground.offsetLeft-(playground.offsetWidth/2); //conseguenza del left:100% e transform:translateX(-50%) del playground, usato per centrarlo
		let posY=playground.offsetTop;
		let _vw=window.innerWidth/100;;
		let x=event.touches[0].pageX-posX;
		let y=event.touches[0].pageY-posY;
		x=Math.ceil(((x/_vw)-0.3)*SCALA);  //0.3 bordo playground
		y=Math.ceil(((y/_vw)-0.3)*SCALA);

		MOUSE_X=x;
		MOUSE_Y=y;


	}
}

/*********************/

function touchTrackingEnd(ev){

    let game=GAME;
    document.getElementById('sizeControll').style.display='none';

    if(document.getElementById('makeBox').style.display=='block')
            game.updateMakeBox();

        for(let i=0;i<game.arrayFloor.length;i++)
            if(game.arrayFloor[i].make==1){
                game.arrayFloor[i].make=0;
                game.arrayFloor[i].blockMove=0;

            }

        for(let i=0;i<game.arrayEnemy.length;i++)
            if(game.arrayEnemy[i].make==1){
                game.arrayEnemy[i].make=0;
                game.arrayEnemy[i].blockMove=0;
            }

        for(let i=0;i<game.arrayBox.length;i++)
            if(game.arrayBox[i].make==1)
                game.arrayBox[i].make=0;	

        OBJECT_BACK=null;
        
        let nodeMakeDim=document.getElementById('makeDim');
        MAKE_DIM=0;
        nodeMakeDim.style.backgroundColor='grey';
        nodeMakeDim.style.borderColor='red';

        exitMakeBox();
        if(OBJECT_MOVE_RANGE==null)
            return;
        
        game.sketcher.drawObject(OBJECT_MOVE_RANGE,'cancella',game);
        OBJECT_MOVE_RANGE=null;


        let nodePort=document.getElementById('moveDiv1');
        if(nodePort!=null){
            nodePort.parentNode.removeChild(nodePort);
            OBJECT_MOVE_RANGE_PORT=null;
        }

        
        if(OBJECT_MOVE_RANGE_BOSS1!=null){
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS1,'cancella-zona1',game);
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS2,'cancella-zona2',game);
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS3,'cancella-zona3',game);
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS4,'cancella-zona4',game);
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_BOSS5,'cancella-zona5',game);
                
            OBJECT_MOVE_RANGE_BOSS1=null;
            OBJECT_MOVE_RANGE_BOSS2=null;
            OBJECT_MOVE_RANGE_BOSS3=null;
            OBJECT_MOVE_RANGE_BOSS4=null;
            OBJECT_MOVE_RANGE_BOSS5=null;
        }
        
}


/***********************************/

function arrowD(){//freccia dx

    let game=GAME;
        
        if(EDITOR!=1)
            return;

        let object=null;
        for(let i=0;i<game.arrayFloor.length;i++)
            if(game.arrayFloor[i].make==1)
                object=game.arrayFloor[i]

        for(let i=0;i<game.arrayEnemy.length;i++)
            if(game.arrayEnemy[i].make==1)
                object=game.arrayEnemy[i]

        for(let i=0;i<game.arrayBox.length;i++)
            if(game.arrayBox[i].make==1)
                object=game.arrayBox[i];	


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
        game.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

        if(object.type=='PORT'){
            OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
            OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
            OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
            OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
        }

        if(Interval_arrowD==null){
            Interval_arrowD=setInterval(function(){
                arrowD();
            },100);
        }
        
        
}	

function arrowA(){//freccia sx
        
    let game=GAME;

        if(EDITOR!=1)
            return;

        let object=null;
        for(let i=0;i<game.arrayFloor.length;i++)
            if(game.arrayFloor[i].make==1)
                object=game.arrayFloor[i]

        for(let i=0;i<game.arrayEnemy.length;i++)
            if(game.arrayEnemy[i].make==1)
                object=game.arrayEnemy[i]

        for(let i=0;i<game.arrayBox.length;i++)
            if(game.arrayBox[i].make==1)
                object=game.arrayBox[i];	

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
        game.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

        if(object.type=='PORT'){
            OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
            OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
            OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
            OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
        }
        
        if(Interval_arrowA==null){
            Interval_arrowA=setInterval(function(){
                arrowA();
            },100);
        }
}	

function arrowW(){//freccia su
        
        if(EDITOR!=1)
            return;

        let game=GAME;

        let object=null;
        for(let i=0;i<game.arrayFloor.length;i++)
            if(game.arrayFloor[i].make==1)
                object=game.arrayFloor[i]

        for(let i=0;i<game.arrayEnemy.length;i++)
            if(game.arrayEnemy[i].make==1)
                object=game.arrayEnemy[i]

        for(let i=0;i<game.arrayBox.length;i++)
            if(game.arrayBox[i].make==1)
                object=game.arrayBox[i];

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
        game.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

        if(object.type=='PORT'){
            OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
            OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
            OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
            OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
        }

        if(Interval_arrowW==null){
            Interval_arrowW=setInterval(function(){
                arrowW();
            },100);
        }
        
}	
 
function arrowS(){//freccia giu
        
        if(EDITOR!=1)
            return;

        let game=GAME;    

        let object=null;
        for(let i=0;i<game.arrayFloor.length;i++)
            if(game.arrayFloor[i].make==1)
                object=game.arrayFloor[i]

        for(let i=0;i<game.arrayEnemy.length;i++)
            if(game.arrayEnemy[i].make==1)
                object=game.arrayEnemy[i]

        for(let i=0;i<game.arrayBox.length;i++)
            if(game.arrayBox[i].make==1)
                object=game.arrayBox[i];	

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
        game.sketcher.drawObject(OBJECT_MOVE_RANGE,null,game);

        if(object.type=='PORT'){
            OBJECT_MOVE_RANGE_PORT=new MoveDiv(object);
            OBJECT_MOVE_RANGE_PORT.point.x+=object.maxX;
            OBJECT_MOVE_RANGE_PORT.point.y+=object.maxY;
            OBJECT_MOVE_RANGE_PORT.identifier='moveDiv1'
            game.sketcher.drawObject(OBJECT_MOVE_RANGE_PORT,null,game);
        }

        if(Interval_arrowS==null){
            Interval_arrowS=setInterval(function(){
                arrowS();
            },100);
        }
        
}	

/***********************/

function arrowEnd(arrow){

    if(arrow=='w'){
        clearInterval(Interval_arrowW);
        Interval_arrowW=null;
    }

    
    if(arrow=='a'){
        clearInterval(Interval_arrowA);
        Interval_arrowA=null;
    }

    
    if(arrow=='d'){
        clearInterval(Interval_arrowD);
        Interval_arrowD=null;
    }

    
    if(arrow=='s'){
        clearInterval(Interval_arrowS);
        Interval_arrowS=null;
    }
}

/***********************/

function touchStartJump(ev){

    let game=GAME;

    if( game.player.w==0 && game.player.collision==0 && game.player.wUp==1 && PAUSA==0){//w  SALTO

        // console.log('w');
 
         game.player.wUp=0;
         if(ALL_MOVIMENT==1)
             jumpTime=null;
         
 
         if(game.player.shift!=1 && game.player.chooseAim!=1 ){
                 
             game.player.w=1;
             game.player.gravity=0;
             jumpTime=setTimeout(function(){game.playerFall();},game.player.jump);
         }
         
     }

}

/**************************/

function touchEndJump(ev){

    let game=GAME;
    playerNode=document.getElementById(PLAYER_ID+game.player.type);

	
	/*if( PAUSA==0){//a  mov SX
		game.player.a=0;
		if(game.player.v0=='a')
			game.player.v0=null;
		
		game.player.d=0;
		if(game.player.v0=='d')
			game.player.v0=null; //in caso di bug pulire l'intervallo dei floor
		
	}	*/

    if(game.player.wUp==0 && PAUSA==0){//w  SALTO
		game.player.wUp=1;
		game.player.w=0;
		if(game.player.collision==1)
			game.player.gravity=1;
		clearTimeout(jumpTime);
		

	}

	

	if( (game.player.shift==1 || game.player.sEditor==1) && PAUSA==0){//shift ACCOVACCIA
		
		
		if(ALL_MOVIMENT==1)
			game.player.sEditor=0;//nell'editor lo uso per muovermi anche verso il basso
		
		else{


			for(let i=0;i<game.arrayFloor.length;i++){  //se sono abbassato sotto ad un floor più basso di origin_height

				let tocco=null;
				let objectShift=new Player(game.playground);
				objectShift.identifier='nessuno';
				objectShift.point.x=game.player.point.x;
				objectShift.point.y=game.player.point.y;
				objectShift.height=game.player.height;

				while(objectShift.height<game.player.origin_height){

					tocco=game.arrayFloor[i].floorHit(objectShift,'player-floor');
					
					let fx=game.arrayFloor[i].point.x;
					let fw=game.arrayFloor[i].width;
					let ox=objectShift.point.x;
					let ow=objectShift.width;
					if(tocco=='sotto'){
						
						if(ox==fx+fw || ox+ow==fx)
							tocco=null;
						else 
							break;
					}
					
					objectShift.height+=game.player.stepY;
					objectShift.point.y-=game.player.stepY;
				}

				if(tocco=='sotto')
					return;
				


			}



			if(playerNode!=null)
				if(game.player.bulletDir=='d')
					playerNode.style.backgroundImage="url('../css/player/player-dx1-gun"+game.player.typeBullet.type.toString()+".png')";
				else if(game.player.bulletDir=='a')
					playerNode.style.backgroundImage="url('../css/player/player-sx1-gun"+game.player.typeBullet.type.toString()+".png')";

			game.player.shift=0;
			game.player.blockJump=0;
		}
	}

}