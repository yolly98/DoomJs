<?php
    session_start();
	if($_SERVER['REQUEST_METHOD']=='POST'){
		 $_SESSION['id']=$_POST['id'];
		 $_SESSION['nomeLivello']=$_POST['nomeLivello'];
	}
	
?>

<!DOCTYPE html>
<html lang="it">

	<head>
	
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no">

		<!--<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="pragma" content="no-cache">-->

		<title>DOOM_js</title>
		<link rel="stylesheet" href="../css/style.css" type="text/css" media="screen"/>
		<link rel="stylesheet" href="../css/styleEditor.css" type="text/css" media="screen"/>
        <link href="https://fonts.googleapis.com/css?family=Anton&display=swap" rel="stylesheet">
		
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		
		
		<link rel="stylesheet" href="../css/font-awesome/css/all.min.css">
		<link rel="stylesheet" href="../css/material-icons/iconfont/material-icons.css">
		

	
		<script type="text/javascript" src="../js/util.js"></script>
		<script type="text/javascript" src="../js/game.js"></script> 
		<script type="text/javascript" src="../js/player.js"></script> 
		<script type="text/javascript" src="../js/playground.js"></script> 
		<script type="text/javascript" src="../js/floor.js"></script> 
		<script type="text/javascript" src="../js/sketcher.js"></script> 
		<script type="text/javascript" src="../js/bullet.js"></script> 
		<script type="text/javascript" src="../js/enemy.js"></script> 
		<script type="text/javascript" src="../js/Box.js"></script> 
		<script type="text/javascript" src="../js/image.js"></script> 
		<script type="text/javascript" src="../js/deathDiv.js"></script> 
		<script type="text/javascript" src="../js/bulletCollisionDiv.js"></script> 
		<script type="text/javascript" src="../js/menu.js"></script> 
		<script type="text/javascript" src="../js/editor.js"></script> 
		<script type="text/javascript" src="../js/clock.js"></script> 
		<script type="text/javascript" src="../js/data.js"></script> 
        <script type="text/javascript" src="../js/touch.js"></script> 


		<script type='text/javascript'>var PAGE='game';</script>
		
		<style>

			/*****TRIGGER*****/

			.box_16{

				opacity:0;

			}

			.box_17{

				opacity:0;
			}


			.box_18{

				opacity:0;

			}

			.box_19{

				opacity:0;

			}

		</style>

		<?php

			require './importaLivello.php';

			//	importaLivello();

			if(isset($_SESSION['id']))
				echo "<script type='text/javascript'> var ID=".$_SESSION['id'].";</script>";
			else	
				echo "<script type='text/javascript'> var ID=null;</script>";

			if(isset($_SESSION['nomeLivello']))
				echo "<script type='text/javascript'> var NOME_LIVELLO='".$_SESSION['nomeLivello']."';</script>";
			else	
				echo "<script type='text/javascript'> var NOME_LIVELLO='nuovo';</script>";	

			if(isset($_SESSION['arrayFloor']))
	 			echo "<script type='text/javascript'> var defaultF='".$_SESSION['arrayFloor']."';</script>";


			if(isset($_SESSION['arrayEnemy']))
	 			echo "<script type='text/javascript'> var defaultE='".$_SESSION['arrayEnemy']."';</script>";	 	 
	 
			if(isset($_SESSION['arrayBox']))
				echo "<script type='text/javascript'> var defaultB='".$_SESSION['arrayBox']."';</script>";

			if(isset($_SESSION['datiIniziali']))
				echo "<script type='text/javascript'> var default0='".$_SESSION['datiIniziali']."';</script>";	 
			else	
				echo "<script type='text/javascript'> var default0=null;</script>";		 

			if(isset($_SESSION['oldRecord']))
				echo "<script type='text/javascript'> var RECORD='".$_SESSION['oldRecord']."';</script>";	 
			else	
				echo "<script type='text/javascript'> var RECORD=null;</script>";		 
	


?>

		
	</head>

	<body onload="begin(0,null)">
	
		
	

		<div id="playgroundWrapper" ondragstart="return false;" ondrop="return false;" >
			<div id="playground" style="width:95vw/* 62.5em /*1000px*/; height:40vw/*37.5em/*600px*/; margin:0em; " >
				<div id='metri'>0</div>
				<div id='tempo'>0</div>

			</div >
      <div id="playgroundBar" style="width:95vw; height:4vw; margin:0vw; " >
			
          <div id="life">Vita:
				    <span id="lifeSpan">100</span>
		      </div>

			    <div id="coolingGun">
				    <div id="coolingBar"></div>
			    </div>	

			    <div id="ammo">Munizioni:
				    <span id="ammoSpan">100</span>
			   </div>	

		<div id='nViteDiv'>Vite:<label id='nVite'>3</label></div>
        <div id="chiaveG"></div> 
              
        <div id="chiaveB"></div> 
      
        <div id="chiaveR"></div> 
      
			</div>
			
			<div id='sfondoCaricamento'>
				<div id='caricamento'>
					<div id='barraCaricamento'></div>	
				</div>
		  	</div>	
		</div>

		<div id='textData' style='position:absolute; top:50vw;'></div>
	</body>
</html>
