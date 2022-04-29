


/******************************/

function caricaLivelli(pagina){

    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         
            let livelli=this.responseText;
          
           livelli=livelli.split('-');
           for(let i=0;i<livelli.length-1;i++)//l'ultimo è uno spazio
               if(livelli[i]!=null){
                    livelli[i]=livelli[i].split(' ');
                    listaLivelli(pagina,livelli[i][0],livelli[i][1],livelli[i][2],livelli[i][3],livelli[i][4],livelli[i][6]);
                     
               }
            livelli.pop(); //tolgo ultimo spazio   

             LIVELLI=livelli;  
                
        }
    };
    ajax.open("POST", "../php/caricaLivelli.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('pagina='+pagina);




}

/********************/

function cancellaLivello(_id){

    let conferma=confirm('Eliminare definitivamente il livello?');
    if(conferma==false)
        return;


    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           document.getElementById('textData').textContent=this.responseText
          let node=document.getElementById('scrollLivelli_editor');
          while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
           caricaLivelli('editor');
                
        }
    };
    ajax.open("POST", "../php/cancellaLivello.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send('_id='+_id);
}

/***********************************/

function listaLivelli(page,_id,_nome,_like,_dislike,_user,_image){

    if(page=='gioca'){

        if(_id=='0'){

            document.getElementById('livelloPrinc').childNodes[5].childNodes[2].textContent=_like;
            document.getElementById('livelloPrinc').childNodes[7].childNodes[1].textContent=_dislike;   
            return;
        }

        let nodeP=document.createElement('div');
        let play=document.createElement('div');
        let like=document.createElement('div');
        let dislike=document.createElement('div');
        let stat=document.createElement('div');
        let gamepad=document.createElement('i');
        let manoSu=document.createElement('i');
        let manoGiu=document.createElement('i');
        let grafico=document.createElement('i');

        gamepad.setAttribute('class',"fas fa-gamepad");
        manoSu.setAttribute('class',"far fa-thumbs-up");
        manoGiu.setAttribute('class',"far fa-thumbs-down");
        grafico.setAttribute('class',"far fa-chart-bar");

        nodeP.setAttribute('class','livello');
        play.setAttribute('class','play');
        like.setAttribute('class','like');
        dislike.setAttribute('class','dislike');
        stat.setAttribute('class','stat');

        play.appendChild(gamepad);
        like.appendChild(manoSu);
        dislike.appendChild(manoGiu);
        stat.appendChild(grafico);

        let nome=document.createElement('div');
        nome.setAttribute('class','nomeLiv');
        nome.textContent=_nome+'-'+_user;

        let nlike=document.createElement('div');
        nlike.setAttribute('class','nlike');
        nlike.textContent=_like;
        like.appendChild(nlike);

        let ndislike=document.createElement('div');
        ndislike.setAttribute('class','ndislike');
        ndislike.textContent=_dislike;
        dislike.appendChild(ndislike);
        
        nodeP.appendChild(nome);
        nodeP.appendChild(play);
        nodeP.appendChild(like);
        nodeP.appendChild(dislike);
        nodeP.appendChild(stat);

        play.onclick=function(){startGame(_id,_nome);};
        like.onclick=function(){addLike(_id,'like');};
        dislike.onclick=function(){addLike(_id,'dislike');};
        stat.onclick=function(){statLivello(_id);};

        nodeP.setAttribute('id',String(_id));

        nodeP.style.backgroundImage="url('../css/"+_image+"')";

        document.getElementById('scrollLivelli').appendChild(nodeP);
    }

	/**************************/
	
    else if(page=='editor'){

    
	
        let nodeP=document.createElement('div');
        let modifica=document.createElement('div');
        let test=document.createElement('div');
        let like=document.createElement('div');
        let dislike=document.createElement('div');
        let cancella=document.createElement('div');

        let mod=document.createElement('i');
        let play=document.createElement('i');
        let manoSu=document.createElement('i');
        let manoGiu=document.createElement('i');
        let secchio=document.createElement('i');

        mod.setAttribute('class',"material-icons");
        mod.textContent="settings";
        
        play.setAttribute('class',"fas fa-play");
        manoSu.setAttribute('class',"far fa-thumbs-up");
        manoGiu.setAttribute('class',"far fa-thumbs-down");
        secchio.setAttribute('class',"fas fa-trash-alt");

        nodeP.setAttribute('class','livello');
        modifica.setAttribute('class','modifica');
        test.setAttribute('class','test');
        like.setAttribute('class','like');
        dislike.setAttribute('class','dislike');
        cancella.setAttribute('class','cancella');

        modifica.appendChild(mod);
        test.appendChild(play);
        like.appendChild(manoSu);
        dislike.appendChild(manoGiu);
        cancella.appendChild(secchio);
        
        nodeP.appendChild(modifica);
        nodeP.appendChild(test);
        nodeP.appendChild(like);
        nodeP.appendChild(dislike);
        nodeP.appendChild(cancella);

        test.onclick=function(){startGame(_id,_nome);};
        modifica.onclick=function(){startEditor(_id,_nome);};
        cancella.onclick=function(){cancellaLivello(_id);};

        let nome=document.createElement('div');
        nome.setAttribute('class','nomeLiv');
        nome.textContent=_nome;
        nodeP.appendChild(nome);

        let nlike=document.createElement('div');
        nlike.setAttribute('class','nlike');
        nlike.textContent=_like;
        like.appendChild(nlike);

        let ndislike=document.createElement('div');
        ndislike.setAttribute('class','ndislike');
        ndislike.textContent=_dislike;
        dislike.appendChild(ndislike);

        nodeP.style.backgroundImage="url('../css/"+_image+"')";
        document.getElementById('scrollLivelli_editor').appendChild(nodeP);

    }
}