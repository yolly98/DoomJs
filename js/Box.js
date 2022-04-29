
function Box(posX,posY,Type){

	this.point=new Point(posX,posY);
	this.stepX=Type.stepX;
	this.stepY=Type.stepY;

	if(Type.type==16 || Type.type==17 || Type.type==18 || Type.type==19){

		this.width=20;
		this.height=1000;
	}

	else{	
		this.width=40;
		this.height=40;
	}

	this.type=Type.type;
	this.identifier='box';
	this.index=null;

	this.newBullet=Type.newBullet;
	this.addLife=Type.addLife;
	this.addAmmo=Type.addAmmo;

	this.make=0;  //è 1 se sto modificando la mappa

	if(this.point.x+this.width<0 && EDITOR==0)//serve per checkPoint
		this.width=0;

	this.originalSpawnX=this.point.x;




}

/***********************/


Box.prototype.moveBox=function(){

	this.point.x-=ABSOLUTE_STEP;
	if(this.point.x+this.width<0-GAME.playground.width)
		this.width=0;
}





/*******************/

Box.prototype.boxHit=function(player){

	

	if( ( (player.point.x>=this.point.x && player.point.x<=this.point.x+this.width) ||	

				(player.point.x+player.width>=this.point.x && player.point.x+player.width<=this.point.x+this.width) ||

				(player.point.x<=this.point.x && player.point.x+player.width>=this.point.x+this.width) )&&

			( (player.point.y>=this.point.y && player.point.x<=this.point.y+this.height)||	

				(player.point.y+player.height>=this.point.y && player.point.y+player.height<=this.point.y+this.height)||

				(player.point.y<=this.point.y && player.point.y+player.height>=this.point.y+this.height) ) )

	
		return 'hitBox';


}


/*************/

Box.prototype.trigger=function(game){



	if(this.type==16){

		STEP=0;

	}

	else if(this.type==17){

		STEP=ABSOLUTE_STEP;
		game.triggerMove=1;
		game.sketcher.divBlock(game.player);

	}

	else if(this.type==18){

		game.sketcher.saveIcon();
		game.checkPoint=(game.metri*5)+25;  //posizione del trigger
		//game.checkPointY=game.player.point.y;
		let a=game.arrayDatiGioco;
		a['metri']=game.metri;
		a['tempo']=game.tempo;
		a['danniSubiti']+=game.danniSubiti;
		a['vitePerse']=game.vitePerse;
		a['nemiciUccisi']+=game.nemiciUccisi;
		a['colpiVuoto']+=game.colpiVuoto;
		a['colpiTotali']+=game.colpiTotali;
		a['colpiSegno']+=game.colpiSegno;
		a['danniInflitti']+=game.colpiInflitti;
		a['posY']=game.player.point.y;
		a['life']=game.player.life;
		a['ammo']=game.player.ammo;
		let gun=null;
		switch (game.player.typeBullet.type){

			case 0:
				gun='Pistola';
			break;
			
			case 4:
				gun='Pompa';
			break;

			case 1:
				gun='Mitraglia';
			break;

			case 3:
				gun='Precisione';
			break;
			
		}	
		a['gun']=gun;
		a['chiaveG']=game.player.slotChiaveG;
		a['chiaveB']=game.player.slotChiaveB;
		a['chiaveR']=game.player.slotChiaveR;
	}

	if(this.type==19){

		if(PAGE=='game')
			WIN=1;
		game.sketcher.drawMenu(game);
		PAUSA=1;
	}
	


}