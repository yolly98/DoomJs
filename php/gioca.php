<?php
    session_start();

    if(isset($_SESSION['id']))
    unset($_SESSION['id']);

    if(isset($_SESSION['nomeLivello']))
        unset($_SESSION['nomeLivello']);    

    if(isset($_SESSION['arrayFloor']))
        unset($_SESSION['arrayFloor']);
        
    if(isset($_SESSION['arrayEnemy']))
        unset($_SESSION['arrayEnemy']);
    
    if(isset($_SESSION['arrayBox']))
        unset($_SESSION['arrayBox']);    

    if(isset($_SESSION['datiIniziali']))
        unset($_SESSION['datiIniziali']);

    if(isset($_SESSION['oldRecord']))
        unset($_SESSION['oldRecord']);

    echo "<script type=text/javascript>var UTENTE='".$_SESSION['user']."';</script>";    

?>

<!DOCTYPE html>
<html lang="it">

	<head>
	
		<meta charset="utf-8">

		<!--<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="pragma" content="no-cache">-->

		<title>DOOM_js</title>
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Anton&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../css/font-awesome/css/all.min.css">
        <link rel="stylesheet" href="../css/styleGioca.css" type="text/css" media="screen">
        <script type="text/javascript" src="../js/menuEditor.js"></script> <!--contiene funzione caricaLivelli-->
        <script type="text/javascript" src="../js/filtri_ricerca.js"></script>
        <script type="text/javascript" src="../js/image.js"></script>

    </head>
    <body onload=caricaLivelli('gioca')>
        <h1 id='inizioPagina'></h1>
        <div id='navGioca'>
            <div class='indietro' onclick='back()'><i class="fas fa-angle-double-left"></i></div>
            <div class='arrowUp'><a href='#inizioPagina' class="fas fa-angle-up"></a></div>
        </div>    
       <!-- <div class='esci' onclick='exit()'><i class="fa fa-close"></i></div>-->
      
        <div id='livelloPrinc'>
            <div class='nome'>DOOM.JS</div>
            <div class='play' onclick="startGame(0,'amministratore')"><i class="fas fa-gamepad"></i></div>
            <div class='like' onclick="addLike(0,'like')"><i class="far fa-thumbs-up"></i> <div class='nlike'>0</div></div>
            <div class='dislike' onclick="addLike(0,'dislike')"><i class="far fa-thumbs-down"></i><div class='ndislike'>0</div></div>
            <div class='stat' onclick="statLivello(0)"><i class="far fa-chart-bar"></i></div>
        </div>

        <div id='filtri-ricerca'>
            <div class="dropdown">
    			<div class="dropButton">ORDINA</div>
    			<div class="dropdown-content">
     				<a onclick="ordina(1,'gioca')">Per nome</a>
     				<a onclick="ordina(2,'gioca')">Per utente</a>
     				<a onclick="ordina(3,'gioca')">Per valutazione</a>
     				<a onclick="ordina(4,'gioca')">Per data</a>
                    <a onclick="ordina(5,'gioca')">Per livelli giocati</a>
    			</div>
  			</div> 

            <div id='ricerca'>
                <input id='inputCerca' type='text' onkeyup="cerca('gioca')" placeholder='cerca...'>
                <i id='iconCerca' class='fas fa-search'></i>
            </div>
        </div>
        <div id='scrollLivelli'>
            <div id='mostraLivelli' onclick='mostraLivelli()'>
                <i class="fas fa-angle-down"></i>
                <i class="fas fa-angle-up" style='display:none;'></i>
            </div>
        </div>
        

        <div id='textData'></div>

        <div id='statLivello'>
            <div id='chiudiStat' onclick=chiudiStat();><i class='fa fa-close'></i></div>
            <div id='statTable'>
            </div>
        </div>    

    </body>


    <script type='text/javascript'>

        var LIVELLI=null;

        precaricaImagesLivelli('../css/');
        /***************************/

        function chiudiStat(){

            document.getElementById('statLivello').style.display='none';
        }

        /***********************/
    

        function back(){

            window.history.go(-1);
        }

        /********************/

         function startGame(_id,_nome){

            let ajax = new XMLHttpRequest();
             ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //alert('salvateggio avvenuto con successo');
                    document.getElementById('textData').textContent=this.responseText
                    window.location.href ='./gamePlay.php';
                }
            };
            ajax.open("POST", "./gamePlay.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("id="+_id+"&nomeLivello="+_nome);

           // window.location.href ='./gamePlay.php';
            
            
        }

        /************************/

        function addLike(_id,_string){

            let ajax = new XMLHttpRequest();
             ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //alert('salvateggio avvenuto con successo');
                   
                    let result=this.responseText;

                    if( result=='caso2'){
                        if(_id!='0'){
                            document.getElementById(String(_id)).childNodes[2].childNodes[1].textContent++;
                            document.getElementById(String(_id)).childNodes[3].childNodes[1].textContent--;
                        }
                        else{
                            document.getElementById('livelloPrinc').childNodes[5].childNodes[2].textContent++;
                            document.getElementById('livelloPrinc').childNodes[7].childNodes[1].textContent--;   
                        }    
                        for(let i=0;i<LIVELLI.length;i++)
                            if(LIVELLI[i][0]==String(_id)){
                                LIVELLI[i][2]=String(parseInt(LIVELLI[i][2])+1);
                                LIVELLI[i][3]=String(parseInt(LIVELLI[i][3])-1);
                            }
                    }
                    else if(result=='caso1'){
                        if(_id!='0'){
                            document.getElementById(String(_id)).childNodes[2].childNodes[1].textContent--;
                            document.getElementById(String(_id)).childNodes[3].childNodes[1].textContent++;
                        }
                        else{
                            document.getElementById('livelloPrinc').childNodes[5].childNodes[2].textContent--;
                            document.getElementById('livelloPrinc').childNodes[7].childNodes[1].textContent++;   
                        }    
                        for(let i=0;i<LIVELLI.length;i++)
                            if(LIVELLI[i][0]==String(_id)){
                                LIVELLI[i][2]=String(parseInt(LIVELLI[i][2])-1);
                                LIVELLI[i][3]=String(parseInt(LIVELLI[i][3])+1);
                            }
                    }
                    else if(_string=='like' && result=='caso3')
                        if(_id!='0')
                            document.getElementById(String(_id)).childNodes[2].childNodes[1].textContent++;
                        else
                            document.getElementById('livelloPrinc').childNodes[5].childNodes[2].textContent++;
                                
                    else if(_string=='dislike' && result=='caso3')
                        if(_id!='0')
                            document.getElementById(String(_id)).childNodes[3].childNodes[1].textContent++;
                        else
                            document.getElementById('livelloPrinc').childNodes[7].childNodes[1].textContent++;     

                    else if(result=='Non hai ancora giocato questo livello' || result=='Livello già votato')
                        alert(result);
                    else
                        document.getElementById('textData').textContent=result;
                }
            };
            ajax.open("POST", "./like.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("id="+_id+"&voto="+_string);

        }

                
        /***********************/

        function statLivello(_id){


            document.getElementById('statLivello').style.display='block';

           let ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                   document.getElementById('statTable').innerHTML=this.responseText;
                 //console.log(this.responseText);
                }
            };
            ajax.open("POST", "./statistiche.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("tipoRichiesta="+'statLivello'+"&idLivello="+_id);



        }

        /***************************/
        function mostraLivelli(){
        
            let nodo=document.getElementById('scrollLivelli');
            let arrow=document.getElementById('mostraLivelli');
            if(arrow.childNodes[3].style.display=='none'){
                nodo.style.maxHeight='none';
                arrow.childNodes[1].style.display='none';
                arrow.childNodes[3].style.display='block';
            }
            else{
                nodo.style.maxHeight=73+'vw';
                arrow.childNodes[1].style.display='block';
                arrow.childNodes[3].style.display='none';
            }

           
        }

    
    
    </script>
</html>