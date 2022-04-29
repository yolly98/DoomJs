<?php

    session_start();
    //session_unset();
   
   
?>   


<!DOCTYPE html>
<html lang="it">

	<head>
	
		<meta charset="utf-8">

		<!--<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="pragma" content="no-cache">-->

		<title>DOOM_js_login</title>
        <link rel="stylesheet" href="./css/styleLogin.css" type="text/css" media="screen"/>
        <link href="https://fonts.googleapis.com/css?family=Anton&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
        
        <link rel="stylesheet" href="./css/font-awesome/css/all.min.css">
        <script type="text/javascript" src="./js/image.js"></script>
        
               
		
	</head>

	<body>
		<form id='login' method='POST' action="./php/login.php">
            Nome Utente: <br>
            <input class='inputLogin' type='text' name='userLogin'><br>
            Password: <br>
            <input class='inputLogin' type='password' name='passwordLogin'><br>
            <input class='buttonLogin' type='button' value='Registrati' onclick="switchLoginForm()">
            <input class='submitLogin' type='submit' value='Login'>
        </form>

        <form id='registrazione' method='POST' action="./php/registrazione.php" >
            Nome Utente<br>
            <input class='inputReg' type='text' name='userReg'><label style='color:grey; font-size:3vw;'>*</label><br>
            Nome<br>
            <input class='inputReg' type='text' name='nomeReg'><br>
            Cognome<br>
            <input class='inputReg' type='text' name='cognomeReg'><br>
            Password<br>
            <input class='inputReg' type='password' name='passwordReg'><label style='color:grey; font-size:3vw;'>*</label><br>
            <input class='submitReg' type='submit' value='Registrati' >
        </form>

        <div id='menuPrincipale'>

            <button onclick='gioca()'>Gioca</button><br>
            <button onclick='stat()'>Statistiche</button><br>
            <button onclick='editor()'>Editor</button><br>
            <button onclick=switchMenuPrincipale('esci');>Esci</button><br>

        </div>

        <div id='stat'>
            <div id='chiudiStat' onclick=chiudiStat();><i class='fa fa-close'></i></div>
            <div id='statTable'>
            </div>
        </div>    

        <button id='infoMenu' onclick="window.location.href ='./documentazione.html';">INFO</button>


    <script type='text/javascript'>

    precaricaImagesLivelli('./css/');

        /**********************************/


        function switchLoginForm(){
            document.getElementById('login').style.display='none';
            document.getElementById('registrazione').style.display='block';

        }

        /***************************/

        function switchMenuPrincipale(operazione){
            if(operazione=='entra'){
                document.getElementById('login').style.display='none';
                document.getElementById('menuPrincipale').style.display='block';

            }
            else if(operazione=='esci'){
                document.getElementById('login').style.display='block';
                document.getElementById('menuPrincipale').style.display='none';
               

            }


        }

        /*************************************/

        function gioca(){

            window.location.href ='./php/gioca.php';
        }

        /*********************************/

        function editor(){
            window.location.href ='./php/editor.php';
        }

        /*********************************/

        function stat(){
            document.getElementById('stat').style.display='block';

            let ajax = new XMLHttpRequest();
            ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                document.getElementById('statTable').innerHTML=this.responseText;
               // console.log(this.responseText);
                }
            };
            ajax.open("POST", "./php/statistiche.php", true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("tipoRichiesta="+'stat');
            
        }

        /************************************/

        function chiudiStat(){

            document.getElementById('stat').style.display='none';
        }



        
    </script>

    <?php
       
        /*gesione errori*/
        $errore=0;
         if(isset($_SESSION['userErr']) && !empty($_SESSION['userErr'])){
            echo "<script type='text/javascript'>alert(".$_SESSION['userErr'].");</script>";
            $errore=1;
        }

        if(isset($_SESSION['nomeErr']) && !empty($_SESSION['nomeErr'])){
            echo "<script type='text/javascript'>alert(".$_SESSION['nomeErr'].");</script>";
            $errore=1;
        }

        if(isset($_SESSION['cognomeErr']) && !empty($_SESSION['cognomeErr'])){
            echo "<script type='text/javascript'>alert(".$_SESSION['cognomeErr'].");</script>";
            $errore=1;
        }

        if(isset($_SESSION['passwordErr']) && !empty($_SESSION['passwordErr'])){
            echo "<script type='text/javascript'>alert(".$_SESSION['passwordErr'].");</script>";
            $errore=1;
        }
        
        if(isset($_SESSION['sqlError']) && !empty($_SESSION['sqlError'])){
            echo "<script type='text/javascript'>alert(".$_SESSION['sqlError'].");</script>";
            $errore=1;
        }

        /*****/
        if($errore==1 || (!isset($_SESSION['user']) || empty($_SESSION['user'])) ){
            session_unset();
        }
        else{
            $user=$_SESSION['user'];
            session_unset();
            $_SESSION['user']=$user;
            echo "<script type='text/javascript'>switchMenuPrincipale('entra');</script>";
        }    

    ?>    

	</body>
</html>
