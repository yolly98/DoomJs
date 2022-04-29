

function Bullet(player,Type,dir){//dir sta per direzione (lo uso anche quando passo un nemico invece del player)

	
	let x=player.point.x+player.width;
	let y=player.point.y+player.height/4;

	this.point=new Point(x,y);
	this.type=Type.type;
	this.stepX=Type.stepX;
	this.stepY=Type.stepY;
	this.dir=dir;  //w a d

	this.width=Type.width;
	this.height=Type.height;

	this.identifier='bullet';

	this.index;
	this.damage=Type.damage;
	this.timeLife=Type.timeLife

}


/*******************/


Bullet.prototype.moveBullet=function(playground){

	
	if(this.height==0)
		return;
		
	if(this.dir=='a'){

		this.point.x-=this.stepX;

		if(this.timeLife!=null )
			this.timeLife--;

		if(this.point.x+this.width<playground.offsetLeft || (this.timeLife!=null && this.timeLife<0))
			this.width=0;

	}

	else if(this.dir=='d'){


		this.point.x+=this.stepX;

		if(this.timeLife!=null )
			this.timeLife--;

		if(this.point.x>playground.offsetLeft+playground.width || (this.timeLife!=null && this.timeLife<0))
			this.width=0;

	}

	else if(this.dir=='w'){

		this.point.y-=this.stepY;

		if(this.timeLife!=null )
			this.timeLife--;
			 
		if(this.point.y+this.height<playground.offsetTop || (this.timeLife!=null && this.timeLife<0))
			this.width=0;

	}

	else if(this.dir=="s"){

		this.point.y+=this.stepY;

		if(this.timeLife!=null )
			this.timeLife--;

		if(this.point.y>playground.offsetTop+playground.height || (this.timeLife!=null && this.timeLife<0))
			this.width=0;
	}

}

/**************************/
