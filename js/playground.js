function Playground(playground){

	this.offsetLeft=0;  //è zero perchè ho messo nel css playground positon:absolute
	this.offsetTop=0;
	this.width=parseFloat(playground.style.width)*SCALA;//*16;
	this.height=parseFloat(playground.style.height)*SCALA;//*16;
	
}