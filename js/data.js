Game.prototype.salva=function(){

	BLOCK_EDITOR=1; 

	if(document.getElementById('saving')==null){
							
		let saveDiv=document.createElement('div');
		saveDiv.setAttribute('id','saving')
		let saveLabel=document.createElement('LABEL');
		let savePoint1=document.createElement('LABEL');
		let savePoint2=document.createElement('LABEL');
		let savePoint3=document.createElement('LABEL');

		saveLabel.textContent='Attendere';
		savePoint1.textContent='.';
		savePoint2.textContent='.';
		savePoint3.textContent='.';
		savePoint1.style.opacity=1;
		savePoint2.style.opacity=0;
		savePoint3.style.opacity=0;
		saveDiv.appendChild(saveLabel);
		saveDiv.appendChild(savePoint1);
		saveDiv.appendChild(savePoint2);
		saveDiv.appendChild(savePoint3);
		document.getElementById('menu').appendChild(saveDiv);

		savingInterval=setInterval(function(){
			let saveLabel=document.getElementById('saving');
				if(saveLabel.childNodes[1].style.opacity==1){
					saveLabel.childNodes[1].style.opacity=0;
					saveLabel.childNodes[2].style.opacity=1;
					saveLabel.childNodes[3].style.opacity=0;
				}
				else if(saveLabel.childNodes[2].style.opacity==1){
					saveLabel.childNodes[1].style.opacity=0;
					saveLabel.childNodes[2].style.opacity=0;
					saveLabel.childNodes[3].style.opacity=1;
				}
				else if(saveLabel.childNodes[3].style.opacity==1){
					saveLabel.childNodes[1].style.opacity=1;
					saveLabel.childNodes[2].style.opacity=0;
					saveLabel.childNodes[3].style.opacity=0;
				}

		},500);
	}

    let newF='';
    let f=this.arrayFloor;
    for(let i=0;i<f.length;i++){

        newF+=String(f[i].identifier)+' ';
        newF+=String(f[i].index)+' ';
		newF+=String(f[i].type)+' ';
        newF+=String(DIST+f[i].spawnX)+' ';
        newF+=String(f[i].spawnY)+' ';
        newF+=String(f[i].width)+' ';
		newF+=String(f[i].height)+' ';
        if(f[i].a==1)
            newF+='a ';
        else if(f[i].d==1)
            newF+='d ';
        else    
			newF+='null '; 
            
		if(detectmob()==false  || f[i].type!='sfondo')	
			newF+=String(DIST+f[i].point.x)+' ';
		else if(detectmob()==true && f[i].type=='sfondo')
			newF+=String(f[i].point.x)+' ';
            
		newF+=String(f[i].point.y)+' ';	      
        newF+=String(f[i].maxX)+' ';
		newF+=String(f[i].maxY)+' ';
		newF+=String(f[i].counterX)+' ';
		newF+=String(f[i].counterY)+' ';
		newF+=String(f[i].counterVx)+' ';
		newF+=String(f[i].counterVy)+' £ ';

    }

    let newE='';
    let e=this.arrayEnemy;
    for(let i=0;i<e.length;i++){

        newE+=String(e[i].identifier)+' ';
        newE+=String(e[i].index)+' ';
        newE+=String(e[i].type)+' ';
        newE+=String(DIST+e[i].spawnX)+' ';
        newE+=String(e[i].spawnY)+' ';
        if(e[i].view=='sx')
            newE+='a ';
        else if(e[i].view=='dx')
            newE+='d ';
        else    
			newE+='null '; 
		newE+=String(DIST+e[i].point.x)+' ';
		newE+=String(e[i].point.y)+' ';	  	       
        newE+=String(e[i].maxX)+' ';
		newE+=String(e[i].maxY)+' ';
		newE+=String(e[i].counterX)+' ';
		newE+=String(e[i].stepCounter)+' £ ';

    }

    let newB='';
    let b=this.arrayBox;
    for(let i=0;i<b.length;i++){

        newB+=String(b[i].identifier)+' ';
        newB+=String(b[i].index)+' ';
        newB+=String(b[i].type)+' ';
        newB+=String(DIST+b[i].point.x)+' ';
        newB+=String(b[i].point.y)+' £ ';

    }


    if(newF=='' && newE=='' && newB=='')
		return;
	let nomeLivello=document.getElementById('nomeLivello').value;	
	let vita=parseInt(document.getElementById('vitaIniziale').value);
	let munizioni=parseInt(document.getElementById('munizioniIniziali').value);
	let posYplayer=parseInt(document.getElementById('posYiniziale').value)*10;  //non devo permettere inserimento di valori non multipli di 10
	let arma=document.getElementById('armaIniziale').value;	
	let nVite=document.getElementById('nViteInput').value;

	let sfondo=document.getElementById('inputImageLiv').value;


	vita=typeof(vita)=='number'?vita:100;
	munizioni=typeof(munizioni)=='number'?munizioni:100;
	posYplayer=typeof(posYplayer)=='number'?posYplayer:100;
	

    let objectArray=newF+' ^ '+newE+' ^ '+newB;
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

			BLOCK_EDITOR=0;

			let divSaving=document.getElementById('saving');
			divSaving.parentNode.removeChild(divSaving);
			clearInterval(savingInterval);
			savingInterval=null;

			if(this.responseText!="nome del livello già esistente"  && this.responseText!="nome del livello non valido")
		   		document.getElementById('textData').textContent=this.responseText
		    if(this.responseText=="nome del livello già esistente")
				alert(this.responseText);
			else if(this.responseText=="nome del livello non valido")
				alert(this.responseText);	
		    else{
				   alert('salvateggio avvenuto con successo');
				   SAVE=1;
				   default0=[String(posYplayer),String(vita),String(munizioni),arma,nVite,sfondo];
				   NOME_LIVELLO=nomeLivello;
			}	   
		
        }
    };
    ajax.open("POST", "../php/salva.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("objectArray="+objectArray+"&datiLivello="+String(nomeLivello)+'§'+String(vita)+'§'+String(munizioni)+'§'+String(posYplayer)+'§'+String(arma)+'§'+String(nVite)+'§'+String(sfondo));

	
}

/****************************************/

Game.prototype.createFloor=function(array){

    let type0=new TypeF0;
	let typeFSX_0=new TypeFSX_0;
	let typeFSY_0=new TypeFSY_0;
	let typeFM=new TypeFM;
	let typeSfondo=new TypeSfondo;
	let typeAscensore_0=new TypeFAscensore_0;
	let typeFPorta=new TypeFPorta;
	let typeFPortaG_0=new TypeFPortaG_0;
	let typeFPortaB_0=new TypeFPortaB_0;
	let typeFPortaR_0=new TypeFPortaR_0;
	let typeEGY=new TypeEnemyGenesys;
	let typePORT=new TypePortale;

	

	if(Array.isArray(array)==false)
		array=array.split('£');

	for(let i=0;i<array.length;i++)
		if(Array.isArray(array[i])==false)
			array[i]=array[i].split(' ');

    let container=[];
    for(let i=0;i<array.length;i++){
		
		let tipo=null;
		
		if(array[i][0]=='' || array[i][0]==' ')
			continue;

		switch (array[i][2]) {
 			case '0':
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

    		case 'sfondo':
    			tipo=typeSfondo;
    		break;

    		case 'FAscensore_0':
    			tipo=typeAscensore_0;
    		break;

    		case 'FPorta':
    			tipo=typeFPorta;
    		break;

    		case 'FPortaG_0':
    			tipo=typeFPortaG_0;
            break;
            
    		case 'FPortaB_0':
    			tipo=typeFPortaB_0;
    		break;

  			case 'FPortaR_0':
    			tipo=typeFPortaR_0;
    		break;

    		case 'EGY':
    			tipo=typeEGY;
    		break;

    		case 'PORT':
    			tipo=typePORT;
            break;
		}
		
		if(parseInt(array[i][8])+parseInt(array[i][5])-this.checkPoint<0)
			continue;

        container.push(new Floor(playground,parseInt(array[i][5]),parseInt(array[i][6]),parseInt(array[i][3])-this.checkPoint,parseInt(array[i][4]),tipo,null,array[i][7])); 
    
		container[container.length-1].point.x=parseInt(array[i][8])-this.checkPoint;
		container[container.length-1].point.y=parseInt(array[i][9]);
        container[container.length-1].maxX=parseInt(array[i][10]);
		container[container.length-1].maxY=parseInt(array[i][11]);
		container[container.length-1].counterX=parseInt(array[i][12]);
		container[container.length-1].counterY=parseInt(array[i][13]);
		container[container.length-1].counterVx=parseInt(array[i][14]);
		container[container.length-1].counterVy=parseInt(array[i][15]);

        container[container.length-1].index=parseInt(array[i][1]);
        if(this.floorOut<=parseInt(array[i][1]));
		    this.floorOut=parseInt(array[i][1])+1;
		this.arrayFloor.push(container[container.length-1]);


    }

	if(EDITOR==0 && detectmob()==false){ 
		let appoggio=Math.floor(this.checkPoint/5000)+1;
		let ripetizioni=this.arrayFloor[0].width/5000;
		this.ripetizioniSfondo=ripetizioni-appoggio;
		this.arrayFloor[0].width=5000*appoggio;

		if(this.arrayFloor[0].width+this.arrayFloor[0].point.x-GAME.player.point.x<5000 && GAME.ripetizioniSfondo>0){
			this.arrayFloor[0].width+=5000;
			this.ripetizioniSfondo--;
		}
		
	}
	else if(EDITOR==0 && detectmob()==true){//se sono in mobile non scorro lo sfondo
		this.arrayFloor[0].width=5000;
		if(this.checkPoint!=null)
			this.arrayFloor[0].point.x+=this.checkPoint;
		this.ripetizioniSfondo=0;

	}
}


/*****************************/

Game.prototype.createEnemy=function(array){

    let type0=new TypeE0; //default
	let type1=new TypeE1; //cane
	let type2=new TypeE2; //torretta
	let type3=new TypeE3; //corazzato
	let type4=new TypeE4; //cecchino
	let type5=new TypeE5; //zombie
	let typeBOSS1=new TypeBOSS1;  //il -10 serve a far venire la collisione con il floor

	let typeBomba_0=new TypeBomba_0;
	let typeDragBox_0=new TypeDragBox_0;

	if(Array.isArray(array)==false)
		array=array.split('£');

	for(let i=0;i<array.length;i++)
		if(Array.isArray(array[i])==false)
			array[i]=array[i].split(' ');
		
    let container=[];
    for(let i=0;i<array.length;i++){

		let tipo=null;
		
		if(array[i][0]=='' || array[i][0]==' ')
			continue;

		switch (array[i][2]) {
 			case '0':
    			tipo=type0;
    		break;

  			case '1':  //cane
    			tipo=type1;

    		break;

    		case '2':
    			tipo=type2;
    		break;

    		case '3':
    			tipo=type3;
    		break;

    		case '4':
    			tipo=type4;
    		break;

    		case '5':
    			tipo=type5;
    		break;

    		case '6':
    			tipo=typeBomba_0;
    		break;

    		case '7':
    			tipo=typeDragBox_0;
    		break;

    		case 'boss1':
    			tipo=typeBOSS1;
    		break;

    		
        }
        
        if(array[i][5].dir=='sx')
            array[i][5].dir='a';
        
        else if(array[i][5].dir=='dx')
            array[i][5].dir='d';
            
        
        
        container.push(new Enemy(tipo,parseInt(array[i][3])-this.checkPoint,parseInt(array[i][4]),array[i][5]));


		container[container.length-1].point.x=parseInt(array[i][6])-this.checkPoint;
		container[container.length-1].point.y=parseInt(array[i][7]);
        container[container.length-1].maxX=parseInt(array[i][8]);
		container[container.length-1].maxY=parseInt(array[i][9]);
		container[container.length-1].counterX=parseInt(array[i][10]);
		container[container.length-1].stepCounter=parseInt(array[i][11]);

		if(container[container.length-1].point.x+container[container.length-1].width<0){
			container.pop();
			continue;
		}

        container[container.length-1].index=parseInt(array[i][1]);
		if(this.enemyOut<=parseInt(array[i][1]));
		    this.enemyOut=parseInt(array[i][1])+1;
		this.arrayEnemy.push(container[container.length-1]);


    }



}



/*****************************/

Game.prototype.createBox=function(array){

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

	//console.error(array);	
	if(Array.isArray(array)==false)
		array=array.split('£');

	for(let i=0;i<array.length;i++)
		if(Array.isArray(array[i])==false)
			array[i]=array[i].split(' ');
		
    let container=[];
    for(let i=0;i<array.length;i++){

		//console.log(array[i][0]);	
		let tipo=null;
		
		if(array[i][0]=='' || array[i][0]==' ')
			continue;

		switch (array[i][2]) {
 			case '0':
    			tipo=type0;
    		break;

  			case '1':
    			tipo=type1;
    		break;

    		case '2':
    			tipo=type2;
    		break;

    		case '3':
    			tipo=type3;
    		break;

    		case '4':
    			tipo=type4;
    		break;

    		case '5':
    			tipo=type5;
    		break;

    		case '6':
    			tipo=type6;
    		break;

    		case '7':
    			tipo=type7;
    		break;

    		case '8':
    			tipo=type8;
    		break;

    		case '9':
    			tipo=type9;
    		break;

 			case '10':
    			tipo=type10;
    		break;

    		case '12':
    			tipo=type12;
    		break;

    		case '14':
    			tipo=type14;
    		break;

    		case '16':
    			tipo=type16;
    		break;

    		case '17':
    			tipo=type17;
    		break;

    		case '18':
    			tipo=type18;
			break;
			
			case '19':
    			tipo=type19;
    		break;

		}

		
        container.push(new Box(parseInt(array[i][3])-this.checkPoint,parseInt(array[i][4]),tipo));
       

		container[container.length-1].index=array[i][1];
		
		if(container[container.length-1].point.x+container[container.length-1].width<0){
			container.pop();
			continue;
		}
		
		if(this.boxOut<=parseInt(array[i][1]));
		    this.boxOut=parseInt(array[i][1])+1;
		this.arrayBox.push(container[container.length-1]);


    }



}

/*******************************/

Game.prototype.salvaStat=function(){

	let game=GAME;

	let metri_=this.metri;
	let tempo_=this.tempo;
	let danniSubiti_=this.danniSubiti+this.arrayDatiGioco['danniSubiti'];
	let vitePerse_=this.vitePerse;//max 3
	let viteTotali_=this.viteTotali; //default
	let nemiciUccisi_=this.nemiciUccisi+this.arrayDatiGioco['nemiciUccisi'];
	let colpiVuoto_=this.colpiVuoto+this.arrayDatiGioco['colpiVuoto'];
	let colpiTotali_=this.colpiTotali+this.arrayDatiGioco['colpiTotali'];
	
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
	let arrayStat_=String(metri_)+' '+String(tempo_)+' '+String(danniSubiti_)+' '+String(vitePerse_)+' '+String(viteTotali_)+' '+String(nemiciUccisi_)+' '+String(colpiVuoto_)+' '+String(colpiTotali_)+' '+String(punteggioTotale_);

	let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

		   	document.getElementById('textData').textContent=this.responseText;
		   //console.log(this.responseText);
        }
    };
    ajax.open("POST", "../php/statistiche.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("tipoRichiesta="+'salvaStat'+"&arrayStat="+arrayStat_);



}

/**************************************/

function statLivello(_id){


	let nodoStat=document.createElement('div');
	nodoStat.setAttribute('id','statLivello');
	
	let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

		   	document.getElementById('statLivello').textContent=this.responseText;
		  // console.log(this.responseText);
        }
    };
    ajax.open("POST", "../php/statistiche.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("tipoRichiesta="+'statLivello'+"&idLivello="+_id);



}

/******************************************/

