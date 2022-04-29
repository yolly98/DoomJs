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
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link href="https://fonts.googleapis.com/css?family=Anton&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="../css/font-awesome/css/all.min.css">
        <link rel="stylesheet" href="../css/material-icons/iconfont/material-icons.css">
        
        <link rel="stylesheet" href="../css/styleMenuEditor.css" type="text/css" media="screen">
        <script type="text/javascript" src="../js/menuEditor.js"></script> 
        <script type="text/javascript" src="../js/filtri_ricerca.js"></script>
        <script type="text/javascript" src="../js/image.js"></script>
    </head>
    <body onload=caricaLivelli('editor')>
    
        <div class='indietro' onclick='back()'><i class="fas fa-angle-double-left"></i></div>
        <div class='aggiungi' onclick='aggiungiLivello()'><i class="fas fa-plus"></i></div>
       <!-- <div class='esci' onclick='exit()'><i class="fa fa-close"></i></div>-->
      
     
        <div id='scrollLivelli_editor'></div>

        <div id='textData'></div>

        <div id='filtri-ricerca'>
            <div class="dropdown">
    			<div class="dropButton">ORDINA</div>
    			<div class="dropdown-content">
     				<a onclick="ordina(1,'editor')">Per nome</a>
     				<a onclick="ordina(3,'editor')">Per valutazione</a>
     				<a onclick="ordina(4,'editor')">Per data</a>
    			</div>
  			</div> 

            <div id='ricerca'>
                <input id='inputCerca' type='text' onkeyup="cerca('editor')" placeholder='cerca...'>
                <i id='iconCerca' class='fas fa-search'></i>
            </div>
        </div>
       

    </body>

    <script type='text/javascript'>


        precaricaImagesLivelli('../css/');

        /**************************/
        var LIVELLI=null;
        

        function back(){

            window.history.go(-1);
        }

        /**********************/

        function startGame(_id,_nome){

            let ajax = new XMLHttpRequest();
             ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //alert('salvateggio avvenuto con successo');
                    document.getElementById('textData').innerHTML=this.responseText;
               //     console.log(this.responseText);
                    window.location.href ='./gamePlay.php';
                }
            };
            
            ajax.open("POST", "./gamePlay.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("id="+_id+"&nomeLivello="+_nome);

      
            
            
        }

        /**********************/

        function startEditor(_id,_nome){

            let ajax = new XMLHttpRequest();
             ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //alert('salvateggio avvenuto con successo');
                    document.getElementById('textData').innerHTML=this.responseText;
                   // console.log(this.responseText);
                   window.location.href ='./gameEditor.php';
                }
            };
            ajax.open("POST", "./gameEditor.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("id="+_id+"&nomeLivello="+_nome);

           
        }

        /****************/

        function aggiungiLivello(){
            let ajax = new XMLHttpRequest();
             ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //alert('salvateggio avvenuto con successo');
                    document.getElementById('textData').innerHTML=this.responseText;
                    window.location.href ='./gameEditor.php';
                }
            };
            ajax.open("POST", "./gameEditor.php", true);
          //  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send();

           
        }

         
       
    
    </script>
</html>