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
        
		<script type='text/javascript'>PAGE='editor';</script>
		

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


		?>
	</head>

	<body onload="begin(0,null);">
	
		<div id="navEditor">
  			<div class="dropdown" id="createFloor">
    			<button class="dropButton" onmouseover="buttonInfo('createFloor')" onmouseout="buttonNoInfo('createFloor')">FLOOR
					</button>
					<p id='p-createFloor'>Questo bottone permette di creare un oggetto di tipo Floor (base di appoggio),tutti gli oggetti di questa categoria non sono soggetti alla gravità
						ma reagiscono alle collisioni con gli atri oggetti(eccetto i 'RACCOGLIBILI' e le chiavi), le dimensioni sono modificabili tramite il bottone 'RIDIMENSIONA'.
						Per i pavimenti dotati di aree di movimento è possibile visualizzarle cliccando sull'oggetto creato (in editor). Possono essere spostati trascinandoli con il mouse o premendo 
						le frecce direzionali. Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.</p>
    			<div class="dropdown-content">

							
							<a onclick="GAME.createFloorEditor('standard_0')" onmouseover="buttonInfo('createFloor-F_0')" onmouseout="buttonNoInfo('createFloor-F_0')">F_0</a>
							<p id='p-createFloor-F_0'>Pavimento standard</p>
							

							<a onclick="GAME.createFloorEditor('FSX_0')" onmouseover="buttonInfo('createFloor-FSX_0')" onmouseout="buttonNoInfo('createFloor-FSX_0')">FSX_0</a>
							<p id='p-createFloor-FSX_0'>Pavimento in grado di muoversi orizzontalmente,il movimento è modificabile tramite il bottone 'CAMBIA MOVIMENTO' (consigliabili valori multipli di 5 e maggiori di 0)</p>
							

							<a onclick="GAME.createFloorEditor('FSY_0')" onmouseover="buttonInfo('createFloor-FSY_0')" onmouseout="buttonNoInfo('createFloor-FSY_0')">FSY_0</a>
							<p id='p-createFloor-FSY_0'>Pavimento in grado di muoversi verticalmente,il movimento è modificabile tramite il bottone 'CAMBIA MOVIMENTO' (consigliabili valori multipli di 10 e maggiori di 0)</p>
							

							<a onclick="GAME.createFloorEditor('FM')" onmouseover="buttonInfo('createFloor-FM')" onmouseout="buttonNoInfo('createFloor-FM')">FM</a>
							<p id='p-createFloor-FM'>Pavimento immobile il cui contatto con il giocatore e i nemici provoca danni mortali</p>
							

							<a onclick="GAME.createFloorEditor('Ascensore_0')" onmouseover="buttonInfo('createFloor-Ascensore')" onmouseout="buttonNoInfo('createFloor-Ascensore')">Ascensore</a>
							<p id='p-createFloor-Ascensore'>Pavimento in grado di muoversi verticalmente solo se il giocatore vi si trova sopra,
								se il giocatore scende dall'oggetto esso ritorna nella posizione iniziale,
								il movimento è modificabile tramite il bottone 'CAMBIA MOVIMENTO' (consigliabili valori multipli di 10  e maggiori di 0)</p>
							

							<a onclick="GAME.createFloorEditor('FPorta_Y')" onmouseover="buttonInfo('createFloor-Porta_Y')" onmouseout="buttonNoInfo('createFloor-Porta_Y')">Porta_Y</a>
							<p id='p-createFloor-Porta_Y'>Porta che si apre verticalmente dal basso verso l'alto appena entra in contatto con il giocatore</p>
							

							<a onclick="GAME.createFloorEditor('FPorta_X')" onmouseover="buttonInfo('createFloor-Porta_X')" onmouseout="buttonNoInfo('createFloor-Porta_X')">Porta_X</a>
							<p id='p-createFloor-Porta_X'>Porta che si apre orizzontalmente da destra verso sinistra appena entra in contatto con il giocatore</p>
							

							<a onclick="GAME.createFloorEditor('FPortaG_Y')" onmouseover="buttonInfo('createFloor-PortaGialla_Y')" onmouseout="buttonNoInfo('createFloor-PortaGialla_Y')">PortaGialla_Y</a>
							<p id='p-createFloor-PortaGialla_Y'>Porta che si apre verticalmente dal basso verso l'alto appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore
								(chiave reperibile nella sezione 'OGGETTI')</p>	
							

							<a onclick="GAME.createFloorEditor('FPortaG_X')" onmouseover="buttonInfo('createFloor-PortaGialla_X')" onmouseout="buttonNoInfo('createFloor-PortaGialla_X')">PortaGialla_X</a>
							<p id='p-createFloor-PortaGialla_X'>Porta che si apre orizzontalmente da destra verso sinistra appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore
								(chiave reperibile nella sezione 'OGGETTI')</p>
						

							<a onclick="GAME.createFloorEditor('FPortaB_Y')" onmouseover="buttonInfo('createFloor-PortaBlu_Y')" onmouseout="buttonNoInfo('createFloor-PortaBlu_Y')">PortaBlu_Y</a>
							<p id='p-createFloor-PortaBlu_Y'>Porta che si apre verticalmente dal basso verso l'alto appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore
								(chiave reperibile nella sezione 'OGGETTI')</p>
							

							<a onclick="GAME.createFloorEditor('FPortaB_X')" onmouseover="buttonInfo('createFloor-PortaBlu_X')" onmouseout="buttonNoInfo('createFloor-PortaBlu_X')">PortaBlu_X</a>
							<p id='p-createFloor-PortaBlu_X'>Porta che si apre orizzontalmente da destra verso sinistra appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore
								(chiave reperibile nella sezione 'OGGETTI')</p>
							

							<a onclick="GAME.createFloorEditor('FPortaR_Y')" onmouseover="buttonInfo('createFloor-PortaRossa_Y')" onmouseout="buttonNoInfo('createFloor-PortaRossa_Y')">PortaRossa_Y</a>
							<p id='p-createFloor-PortaRossa_Y'>Porta che si apre verticalmente dal basso verso l'alto appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore
								(chiave reperibile nella sezione 'OGGETTI')</p>
							

							<a onclick="GAME.createFloorEditor('FPortaR_X')" onmouseover="buttonInfo('createFloor-PortaRossa_X')" onmouseout="buttonNoInfo('createFloor-PortaRossa_X')">PortaRossa_X</a>
							<p id='p-createFloor-PortaRossa_X'>Porta che si apre orizzontalmente da destra verso sinistra appena entra in contatto con il giocatore purchè sia in possesso di una chiave del medesimo colore 
								(chiave reperibile nella sezione 'OGGETTI')</p>
							

							<a onclick="GAME.createFloorEditor('PORT')" onmouseover="buttonInfo('createFloor-Portale')" onmouseout="buttonNoInfo('createFloor-Portale')">Portale</a>
							<p id='p-createFloor-Portale'>Portale in grado di teletrasportare qualunque oggetto sensibile alla gravità in una zona che si può definire tramite il bottone 'CAMBIA MOVIMENTO' 
								(per gli spostamenti orizzontali si consiglia valori multipli di 5, per quelli verticali multipli di 10, per entrambi sono ammessi valori negativi)</p>
						

    			</div>
    		</div>
  			
  			<div class="dropdown" id="createEnemy">
    			<button class="dropButton" onmouseover="buttonInfo('createEnemy')" onmouseout="buttonNoInfo('createEnemy')">ENEMY
					</button>
					<p id='p-createEnemy'>Questo bottone permette di creare un nemico,i nemici sono soggetti alla gravità 
						e reagiscono alle collisioni con gli atri oggetti (esclusi 'RACCOGLIBILI' e chiavi), non possono essere ridimensionati.
						Se vengono uccisi possono rilascire randomicamente vita o munizioni (non grandi). Non è presente il fuoco amico e la collisione dei proiettili nemici con altri nemici.
						Per i nemici dotati di aree di movimento è possibile visualizzarle cliccando sull'oggetto creato (in editor). Possono essere spostati trascinandoli con il mouse o premendo 
						le frecce direzionali. Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.
						Nell'editor i nemici non reagiscono alla presenza del giocatore, inoltre se selezionati perdono momentaneamente la sensibilità alla gravità e alle collisioni</p>
    			<div class="dropdown-content">

						<a onclick="GAME.createEnemyEditor('standard')" onmouseover="buttonInfo('createEnemy-Standard')" onmouseout="buttonNoInfo('createEnemy-Standard')">Standard</a>
						<p id='p-createEnemy-Standard'>Questo nemico può muoversi avanti e indietro all'interno di un area definibile tramite il bottone 'CAMBIA MOVIMENTO' 
							(consigliati valori multipli di 5 e maggiori di 0), non è possibile sciegliere il suo orientamento (dx o sx) a causa della natura mobile dell'oggetto. 
							Infatti il nemico standard si muove finchè non avvista il giocatore a media o breve distanza, a questo punto si ferma e spara al bersaglio con proiettili di media velocità. 
							Possiede una resistenza modesta e provoca modesti danni, randomicamente è in grado di abbassarsi in risposta 
							all'abbassamento del giocatore </p>
					

						<a onclick="GAME.createEnemyEditor('toro')" onmouseover="buttonInfo('createEnemy-Toro')" onmouseout="buttonNoInfo('createEnemy-Toro')">Toro</a>
						<p id='p-createEnemy-Toro'>Il Toro non può sparare ed è un nemico immobile finchè non avvista il giocatoreda media o breve distanza,
							in tal caso si muove molto velocemente verso di esso cercando il contatto mortale.Il nemico ha una scarsa resistenza
							ed essendo inizialmente immobile è possibile modificarne l'orientamento tramite il bottone 'CAMBIA MOVIMENTO' </p>
						

						<a onclick="GAME.createEnemyEditor('fuso')" onmouseover="buttonInfo('createEnemy-Fuso')" onmouseout="buttonNoInfo('createEnemy-Fuso')">Fuso</a>
						<p id='p-createEnemy-Fuso'>Il Fuso è un nemico immobile il cui orientamente è fisso è modificabile dal bottone 'CAMBIA MOVIMENTO', 
							appena avvista il giocatore ad una distanza media o breve comincia a sparare colpi di media velocità e poco dannosi, tuttavia l'intervallo tra un proiettile e l'altro 
							è brevissimo e per questo il suo fuoco può provocare ingenti danni.</p>
				

						<a onclick="GAME.createEnemyEditor('corazzato')" onmouseover="buttonInfo('createEnemy-Corazzato')" onmouseout="buttonNoInfo('createEnemy-Corazzato')">Corazzato</a>
						<p id='p-createEnemy-Corazzato'>Questo nemico può muoversi avanti e indietro all'interno di un area definibile tramite il bottone 'CAMBIA MOVIMENTO' 
							(consigliati valori multipli di 5 e maggiori di 0), non è possibile sciegliere il suo orientamento (dx o sx) a causa della natura mobile dell'oggetto. 
							Infatti il corazzato si muove finchè non avvista il giocatore a BREVE distanza, a questo punto si ferma e spara al bersaglio con proiettili grandi,lenti e schivabili saltando. 
							Possiede un'alta resistenza e provoca ingenti danni</p>
						

						<a onclick="GAME.createEnemyEditor('cecchino')" onmouseover="buttonInfo('createEnemy-Cecchino')" onmouseout="buttonNoInfo('createEnemy-Cecchino')">Cecchino</a>
						<p id='p-createEnemy-Cecchino'>Il cecchino è un nemico immobile, il suo orientamento segue sempre, a qualsiasi distanza, la posizione del giocatore
							(orientamento non modificabile),appena avvista il giocatore a distanza elevata o meno, spara un proiettile sottile e lungo,molto veloce e quasi mortale, l'intervallo
							tra un proiettile e l'altro è relativamente lungo</p>
						

						<a onclick="GAME.createEnemyEditor('zombie')" onmouseover="buttonInfo('createEnemy-Zombie')" onmouseout="buttonNoInfo('createEnemy-Zombie')">Zombie</a>
						<p id='p-createEnemy-Zombie'>Lo zombie non può sparare ed è un nemico immobile finchè non avvista il giocatoreda media o breve distanza,
							in tal caso si muove molto lentamente verso di esso cercando il contatto.Il nemico ha una scarsa resistenza e provoca ingenti danni,
							essendo inizialmente immobile è possibile modificarne l'orientamento tramite il bottone 'CAMBIA MOVIMENTO'</p>
						

						<a onclick="GAME.createEnemyEditor('boss')" onmouseover="buttonInfo('createEnemy-Boss')" onmouseout="buttonNoInfo('createEnemy-Boss')">Boss</a>
						<p id='p-createEnemy-Boss'>Il Boss è un nnemico il cui utilizzo necessita del blocco dello scorrimento orizzontale del gioco
							(possibile tramite un trigger nella sezione 'TRIGGER').Ha due tipi di movimenti: inzialmente è immobile, il suo orientamento è automatico e dipende dalla posizione del giocatore,
							appena avvista il giocatore spara colpi grandi, veloci, molto dannosi ma schivabili saltando. Dopo aver accusato diversi danni da parte del giocatore o bombe
							comincia a teletrasportarsi nelle aree visibili cliccando l'oggetto creato (nell'editor). A tal punto spara proiettili sottili, quasi mortali, veloci,
							diretti orizzontalmente o verticalmente (se si trova nelle aree sopraelevate).</p>
						

    			</div>
  			</div> 
  			<div class="dropdown" id="createRaccoglibili">
    			<button class="dropButton" onmouseover="buttonInfo('createRaccoglibili')" onmouseout="buttonNoInfo('createRaccoglibili')">RACCOGLIBILI
					</button>
					<p id='p-createRaccoglibili'>Questi oggetti non sono sensibili a gravità e collisioni eccetto con il giocatore (in gioco).
						Il contatto con il giocatore aumenta vita o munizioni dello stesso. Gli oggetti di questa categoria non sono dimensionabili, possono essere spostati trascinandoli con il mouse o premendo 
						le frecce direzionali. Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.</p>
    			<div class="dropdown-content">

						<a onclick="GAME.createBoxEditor('KMS')" onmouseover="buttonInfo('createRaccoglibili-KMS')" onmouseout="buttonNoInfo('createRaccoglibili-KMS')">Kit Medico S</a>
						<p id='p-createRaccoglibili-KMS'>Aumenta la vita del giocatore di 20 unità. Può essere rilasciato dai nemici appena uccisi</p>


						<a onclick="GAME.createBoxEditor('KMM')" onmouseover="buttonInfo('createRaccoglibili-KMM')" onmouseout="buttonNoInfo('createRaccoglibili-KMM')">Kit Medico M</a>
						<p id='p-createRaccoglibili-KMM'>Aumenta la vita del giocatore di 50 unità. Può essere rilasciato dai nemici appena uccisi</p>
						

						<a onclick="GAME.createBoxEditor('KML')" onmouseover="buttonInfo('createRaccoglibili-KML')" onmouseout="buttonNoInfo('createRaccoglibili-KML')">Kit Medico L</a>
						<p id='p-createRaccoglibili-KML'>Aumenta la vita del giocatore di 80 unità</p>
						

						<a onclick="GAME.createBoxEditor('A')" onmouseover="buttonInfo('createRaccoglibili-A')" onmouseout="buttonNoInfo('createRaccoglibili-A')">Armatura</a>
						<p id='p-createRaccoglibili-A'>Porta la vita del giocatore a 100 unità se è minore di 100, a 400 se maggiore</p>
						

						<a onclick="GAME.createBoxEditor('MS')" onmouseover="buttonInfo('createRaccoglibili-MS')" onmouseout="buttonNoInfo('createRaccoglibili-MS')">Munizioni S</a>
						<p id='p-createRaccoglibili-MS'>Aumenta le munizioni del giocatore di 20 unità. Può essere rilasciato dai nemici appena uccisi</p>
						

						<a onclick="GAME.createBoxEditor('MM')" onmouseover="buttonInfo('createRaccoglibili-MM')" onmouseout="buttonNoInfo('createRaccoglibili-MM')">Munizioni M</a>
						<p id='p-createRaccoglibili-MM'>Aumenta le munizioni del giocatore di 50 unità. Può essere rilasciato dai nemici appena uccisi</p>
					

						<a onclick="GAME.createBoxEditor('ML')" onmouseover="buttonInfo('createRaccoglibili-ML')" onmouseout="buttonNoInfo('createRaccoglibili-ML')">Munizioni L</a>
						<p id='p-createRaccoglibili-ML'>Aumenta le munizioni del giocatore di 100 unità</p>
						

    			</div>
  			</div> 
  			<div class="dropdown" id="createArmi">
    			<button class="dropButton" onmouseover="buttonInfo('createArmi')" onmouseout="buttonNoInfo('createArmi')">ARMI
					</button>
					<p id='p-createArmi'>Questi oggetti non sono sensibili a gravità e collisioni eccetto con il giocatore (in gioco).
						Il contatto con il giocatore modifica l'arma dello stesso. Ogni arma consuma una quantità diversa di munizioni per proiettile (l'arma di default consuma una unità) 
						e provoca diversi danni, è possibile sparare tramite il tasto 'space', premendolo o tenendolo premuto.
						Ogni arma permette di sparare solo se completamente 'raffreddata', lo stato di raffreddamento è indicato, in gioco,
						in basso a sinistra da una barra di colore blu (se piena si può sparare).Gli oggetti di questa categoria non sono dimensionabili, possono essere spostati trascinandoli con il mouse o premendo 
						le frecce direzionali. Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.</p>
    			<div class="dropdown-content">

						<a onclick="GAME.createBoxEditor('P')" onmouseover="buttonInfo('createArmi-P')" onmouseout="buttonNoInfo('createArmi-P')">Pompa</a>
						<p id='p-createArmi-P'>Arma con un tempo di raffreddamento medio-lungo, i suoi proiettili sono a corto raggio e spessi, provocano ingenti danni e
							hanno un tempo di avanzamento rapido. Ogni proiettile consuma 5 munizioni</P>
						

						<a onclick="GAME.createBoxEditor('C')" onmouseover="buttonInfo('createArmi-C')" onmouseout="buttonNoInfo('createArmi-C')">Precisione</a>
						<p id='p-createArmi-C'>Arma con un tempo di raffreddamento lungo, i suoi proiettili sono a lungo raggio, lunghi e sottili, provocano danni solitamente mortali e
							hanno un tempo di avanzamento molto rapido. Ogni proiettile consuma 10 munizioni</P>
						

						<a onclick="GAME.createBoxEditor('M')" onmouseover="buttonInfo('createArmi-M')" onmouseout="buttonNoInfo('createArmi-M')">Mitraglia</a>
						<p id='p-createArmi-M'>Arma con un tempo di raffreddamento brevissimo, i suoi proiettili sono a lungo raggio e piccoli, provocano pochi danni e
							hanno un tempo di avanzamento medio. Ogni proiettile consuma 1 munizione</P>
						
						 
    			</div>
  			</div> 
  			<div class="dropdown" id="createOggetti">
    			<button class="dropButton" onmouseover="buttonInfo('createOggetti')" onmouseout="buttonNoInfo('createOggetti')">OGGETTI
					</button>
					<p id='p-createOggetti'>Questo bottone permette di creare chiavi,casse o bombe. Gli oggetti di questa categoria non sono dimensionabili, 
						possono essere spostati trascinandoli con il mouse o premendo le frecce direzionali. 
						Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.</p>
    			<div class="dropdown-content">

						<a onclick="GAME.createBoxEditor('CG0')" onmouseover="buttonInfo('createOggetti-CG0')" onmouseout="buttonNoInfo('createOggetti-CG0')">Chiave Gialla</a>
						<p id='p-createOggetti-CG0'>Non soggetto a gravità o collisioni eccetto con il giocatore (in gioco). Il contatto con il giocatore permette
							allo stesso di raccogliere una chiave gialla utilizzabile per aprire le porte del medesimo colore presenti nella sezione 'FLOOR'.
							Non appena il giocatore raccoglie l'oggetto in gioco viene mostrato un riquadro giallo in basso a destra.</p>
						
						 
						<a onclick="GAME.createBoxEditor('CB0')" onmouseover="buttonInfo('createOggetti-CB0')" onmouseout="buttonNoInfo('createOggetti-CB0')">Chiave Blu</a>
						<p id='p-createOggetti-CB0'>Non soggetto a gravità o collisioni eccetto con il giocatore (in gioco). Il contatto con il giocatore permette
							allo stesso di raccogliere una chiave blu utilizzabile per aprire le porte del medesimo colore presenti nella sezione 'FLOOR'.
							Non appena il giocatore raccoglie l'oggetto in gioco viene mostrato un riquadro blu in basso a destra.</p>
						

						<a onclick="GAME.createBoxEditor('CR0')" onmouseover="buttonInfo('createOggetti-CR0')" onmouseout="buttonNoInfo('createOggetti-CR0')">Chiave Rossa</a>
						<p id='p-createOggetti-CR0'>Non soggetto a gravità o collisioni eccetto con il giocatore (in gioco). Il contatto con il giocatore permette
							allo stesso di raccogliere una chiave rossa utilizzabile per aprire le porte del medesimo colore presenti nella sezione 'FLOOR'.
							Non appena il giocatore raccoglie l'oggetto in gioco viene mostrato un riquadro rosso in basso a destra.</p>
						

						<a onclick="GAME.createEnemyEditor('bomba')" onmouseover="buttonInfo('createOggetti-bomba')" onmouseout="buttonNoInfo('createOggetti-bomba')">Bomba</a>
						<p id='p-createOggetti-bomba'>Oggetto sensibile a collisioni e gravità. Se fatto cadere perde un po' della sua resistenza a seconda dell'altezza, le sua resistenza 
							diminuisce anche se colpita da dei proiettili nemici o del giocatore. Una volta esaurita la resistenza la bomba esplode uccidendo nemici,distruggendo casse o altre bombe
							(reazione a catena di esplosioni) nelle vicinanze. Le bombe possono essere trascinate, impilate e usate come pavimenti. Per posizionare la bomba al meglio evitando che esploda
							è consigliabile spuntare l'opzione 'blocca gravità enemy' nella sezione 'OPZIONI'</p>
						

						<a onclick="GAME.createEnemyEditor('cassa')" onmouseover="buttonInfo('createOggetti-cassa')" onmouseout="buttonNoInfo('createOggetti-cassa')">Cassa</a>
						<p id='p-createOggetti-cassa'>Oggetto sensibile a collisioni e gravità. Se fatto cadere perde un po' della sua resistenza a seconda dell'altezza, le sua resistenza 
							diminuisce anche se colpita da dei proiettili nemici o del giocatore. Una volta esaurita la resistenza la cassa si rompe rilasciando il suo contenuto.
							Può contenere 'RACCOGLIBILI' o può essere vuota (condizione random). Le casse possono essere trascinate, impilate e usate come pavimenti. Per posizionare la cassa al meglio 
							evitando che si rompa è consigliabile spuntare l'opzione 'blocca gravità enemy' nella sezione 'OPZIONI'</p>
						

    			</div>
  			</div> 
  			<div class="dropdown" id="createTrigger">
    			<button class="dropButton" onmouseover="buttonInfo('createTrigger')" onmouseout="buttonNoInfo('createTrigger')">TRIGGER
					</button>
					<p id='p-createTrigger'>Questo bottone permette di creare un oggetto
						 il cui contatto con il giocatore (in gioco) genera particolari azioni,
						sebbene visibile nell'editor non lo sarà durante il gioco. Gli oggetti di questa categoria non sono dimensionabili,
						possono essere spostati trascinandoli con il mouse o premendo le frecce direzionali.
						Per cancellare un oggetto basta selezionarlo e premere il pulsante 'CANCELLA'. Il tasto 'shift' annulla l'ultimo spostamento effettuato.</p>
    			<div class="dropdown-content">

						<a onclick="GAME.createBoxEditor('TR')" onmouseover="buttonInfo('createTrigger-TR')" onmouseout="buttonNoInfo('createTrigger-TR')">Blocca Scorrimento</a>
						<p id='p-createTrigger-TR'>Il contatto con questo oggetto blocca lo scorrimento laterale del gioco. Ora il giocatore è libero di raggiungere
							ogni parte dello schermo senza che lo schermo avanzi verso di lui. Per ripristinare lo scorrimento è necesserio che il giocatore
							collida con il 'TRIGGER' 'Riprendi Scorrimento'</p>
						

						<a onclick="GAME.createBoxEditor('TS')" onmouseover="buttonInfo('createTrigger-TS')" onmouseout="buttonNoInfo('createTrigger-TS')">Riprendi Scorrimento</a>
						<p id='p-createTrigger-TS'>Il contatto con questo oggetto blocca momentaneamente il movimenoto del giocatore. Tale contatto è indicato da un'icona 
							a forma di lucchetto sopra il giocatore. Lo sfondo e tutti gli oggetti (compreso il giocatore) vengono fatti scorrere verso sinistra
							finchè il giocatore non si trova all'estremo sinistro dello schermo. A questo punto lo scorrimento laterale, qualora fosse stato bloccato dal 'TRIGGER'
							'Blocca Scorrimento', è ripristinato e il giocatore è di nuovo libero di muoversi.</p>
						

						<a onclick="GAME.createBoxEditor('TC')" onmouseover="buttonInfo('createTrigger-TC')" onmouseout="buttonNoInfo('createTrigger-TC')">Checkpoint</a>
						<p id='p-createTrigger-TC'>Il contatto con questo oggetto è indicato da un'icona lampeggiante in basso a sinistra. Vengono salvati i progressi fatti fino a quel
							momento nel livello, se il giocatore dovesse morire può ripartire dall'ultima collisione con un trigger di questo tipo.
							Il salvataggio del livello è valido finchè non si esce dal gioco e finchè si hanno ancore vite da consumare (indicate in gioco nel riquadro verde in basso al centro).</p>
					

						<a onclick="GAME.createBoxEditor('TV')" onmouseover="buttonInfo('createTrigger-TV')" onmouseout="buttonNoInfo('createTrigger-TV')">Vittoria</a>
						<p id='p-createTrigger-TV'>Il contatto con questo oggetto termina la partita e indica la fine del livello</p>
						

    			</div>
  			</div> 
  			<div class="dropdown" id="options">
    			<button class="dropButton" onmouseover="buttonInfo('options')" onmouseout="buttonNoInfo('options')">OPZIONI
					</button>
					<p id='p-options'>presenta una lista di opzini 
						che rendono la creazione del livello più semplice e rapida. Tali opzioni hanno effetto esclusivamente nell'editor</p>

    			<div class='opzioniBox'>

						<input type="checkbox" id="allMoviment" value="" onmouseover="buttonInfo('options-allMoviment')" onmouseout="buttonNoInfo('options-allMoviment')"><label>No gravità</label><div style='height:0.1vw;' class='spaziatura'></div>
						<p id='p-options-allMoviment'>Spuntando questa opzione il giocatore non sarà più soggetto alla gravità
							e si potrà muovere verso l'alto premendo il tasto di salto</p>

						<input type="checkbox" id="noCollision" value="" onmouseover="buttonInfo('options-noCollision')" onmouseout="buttonNoInfo('options-noCollision')"><label>No collisioni</label><div style='height:0.1vw;' class='spaziatura'></div>	
						<p id='p-options-noCollision'>Spuntando questa opzione il giocatore non sarà più soggetto alle collisioni</p>

						<input type="checkbox" id="blockFloorMobili" value="" onmouseover="buttonInfo('options-blockFloorMobili')" onmouseout="buttonNoInfo('options-blockFloorMobili')"><label>blocca FSX/Y</label><div style='height:0.1vw;' class='spaziatura'></div>
						<p id='p-options-blockFloorMobili'>Spuntando questa opzione i 'FLOOR' in grado di muoversi rimarranno fermi</p>

						<input type="checkbox" id="blockClock" value="" onmouseover="buttonInfo('options-blockClock')" onmouseout="buttonNoInfo('options-blockClock')"><label>blocca scorrimento</label><div style='height:0.1vw;' class='spaziatura'></div>		
						<p id='p-options-blockClock'>Spuntando questa opzione viene bloccato lo scorrimento laterale dello gioco, per riprendere lo scorrimento
							sarà necessario togliere la spunta e portarsi al centro dello schermo</p>

						<input type="checkbox" id="blockEnemy" value="" onmouseover="buttonInfo('options-blockEnemy')" onmouseout="buttonNoInfo('options-blockEnemy')"><label>blocca enemy</label><div style='height:0.1vw;' class='spaziatura'></div>   
						<p id='p-options-blockEnemy'>Spuntando questa opzione tutti gli enemy di tipo 'Standard' e 'Corazzato' rimarranno fermi</p>

						<input type="checkbox" id="blockEnemyGravity" value="" onmouseover="buttonInfo('options-blockEnemyGravity')" onmouseout="buttonNoInfo('options-blockEnemyGravity')"><label>blocca gravità enemy</label><div style='height:0.1vw;' class='spaziatura'></div>  
						<p id='p-options-blockEnemyGravity'>Spuntando questa opzione tutti gli enemy non sono più sensibili alla gravità</p>

						<input type="checkbox" id="blockObject" value="" onmouseover="buttonInfo('options-blockObject')" onmouseout="buttonNoInfo('options-blockObject')"><label>blocca selezione</label><div style='height:0.1vw;' class='spaziatura'></div>
						<p id='p-options-blockObject'>Spuntando questa opzione l'oggetto dotato di movimento, modificabile con il tasto 'CAMBIA MOVIMENTO', se selezionato rimarrà fermo 
							e lo si potrà spostare con le frecce direzionali all'interno della sua area di movimento. Consigliabile l'utilizzo per sincronizzare oggetti mobili</p>

						<label style='margin-left: 1.6vw;'>dimensioni sfondo</label><br>
						<input type="number" id="dimSfondo" min='1' max='100' step='1' value='1' onchange='GAME.dimSfondo()' onmouseover="buttonInfo('options-dimSfondo')" onmouseout="buttonNoInfo('options-dimSfondo')"><div style='height:0.3vw;' class='spaziatura'></div>  
						<p id='p-options-dimSfondo'>Da questa opzione è possibile estendere o diminuire lo sfondo aggingendo ad ogni unità una ripetizione dello stesso</p>
							
						
    			</div>		
				</div> 
				

				<div class='contenitore' id='makeBoxButtonDiv'>
					<button id="makeBoxButton" onclick=GAME.makeBox(); onmouseover="buttonInfo('makeBoxButton')" onmouseout="buttonNoInfo('makeBoxButton')">CAMBIA MOVIMENTO</button>
					<p id="p-makeBoxButton">Se premuto mentre un oggetto è selezionato permette di modificare il movimento di alcuni oggetti</p>
				</div>

				<div class='contenitore' id='makeDimDiv'>
					<button id="makeDim" onclick=makeDim(); onmouseover="buttonInfo('makeDim')" onmouseout="buttonNoInfo('makeDim')">RIDIMENSIONA</button>
					<p id="p-makeDim">Se premuto mentre un oggetto è selezionato permette di modificarne le dimensioni (se posssibile). Il pulsante rimane premuto 
						fino al prossimo click e finchè non viene sbloccato le frecce direzionali non spostano più gli oggetti ma li ridimensionano 
						(è comunque possibile spostare un oggetto con il mouse)</p>
				</div>

				<div class='contenitore' id='deleteEditorDiv'>
					<button id="deleteEditor" onclick=GAME.deliteEditor(); onmouseover="buttonInfo('deleteEditor')" onmouseout="buttonNoInfo('deleteEditor')">CANCELLA</button>
					<p id="p-deleteEditor">Cancella un oggetto selezionato</p>
				</div>

				<div class='contenitore' id='respawnPlayerDiv'>
					<button id="respawnPlayer" onclick=GAME.respawnPlayer(); onmouseover="buttonInfo('respawnPlayer')" onmouseout="buttonNoInfo('respawnPlayer')">RIPOSIZIONA</button>
					<p id="p-respawnPlayer">Riposoziona il giocatore in basso a sinistra dello schermo</p>
				</div>

        <div id="makeBox">

		<label>range movimento x:</label><div style='height:0.5vw;' class='spaziatura'></div>
			<input type="text" id="inputMaxX" value="" onmouseover="buttonInfo('inputMaxX')" onmouseout="buttonNoInfo('inputMaxX')" style="width:10vw; height:1.2vw;">
			<p id="p-inputMaxX">Se abilitato permette di modificare orizzontalmente l'area di movimento di alcuni oggetti, 
				è consigliabile inserire valori maggiori di zero e multiplici di 5 (per il 'Portale' della sezione 'FLOOR' sono ammessi valori negativi)</p>
			<div style='height:0.5vw;' class='spaziatura'></div>

			<label>range movimento y:</label><div style='height:0.5vw;' class='spaziatura'></div>
			<input type="text" id="inputMaxY" value="" onmouseover="buttonInfo('inputMaxY')" onmouseout="buttonNoInfo('inputMaxY')" style="width:10vw; height:1.2vw;">
			<p id="p-inputMaxY">Se abilitato permette di modificare verticalmente l'area di movimento di alcuni oggetti, 
				è consigliabile inserire valori maggiori di zero e multiplici di 10 (per il 'Portale' della sezione 'FLOOR' sono ammessi valori negativi)</p>
			<div style='height:0.5vw;' class='spaziatura'></div>

			<label id='dirLabel'>direzione</label>
			<select id='inputDir' onmouseover="buttonInfo('inputDir')" onmouseout="buttonNoInfo('inputDir')" style="width:10vw; height:1.5vw;">
				<option value='sx'>Sx</option>
				<option value='dx'>Dx</option>
			</select>
			<p id="p-inputDir">Permette di decidere varso quale direzione deve essere rivolto un nemico (non è abilitato per tutti i nemici)</p>
			<div style='height:0.5vw;' class='spaziatura'></div>

        	<button id="exitMakeBox" onclick=exitMakeBox(); style="left:0.5vw; position:absolute; bottom:0.5vw;">chiudi</button>
        	<button id="ok" onclick=GAME.updateMakeBox(); style="right:0.5vw; position:absolute; bottom:0.5vw;">ok</button>	 

		</div>	

		</div>


		<div id="playgroundWrapper" ondragstart="return false;" ondrop="return false;" >
			<div id="playground" onmousemove='mouseTracking(event)' onmouseup='GAME.setMouseUp()' style="width:95vw; height:40vw; margin:0vw; " >

				<div class='contenitore' id='switchNavDiv'>
					<label id="switchNav" onmouseover="buttonInfo('switchNav')" onmouseout="buttonNoInfo('switchNav')">
						<input id='hideNav' type="checkbox">
						<span class="slider"></span>
					</label>
					<p id='p-switchNav'>Questo pulsante nasconde il menu di creazione</p>
				</div>

				<div class='contenitore' id='switchInfoDiv'>
					<label id="switchInfo" onmouseover="buttonInfo('switchInfo')" onmouseout="buttonNoInfo('switchInfo')">
						<input id='Info' type="checkbox">
						<span class="slider"></span>
					</label>
					<p id='p-switchInfo'>Questo pulsante attiva la modalità tutorial: passando il mouse sulle sezioni del menù di creazione verranno fornite le relative informazioni</p>
					
				</div>

			</div >
      <div id="playgroundBar" style="width:95vw/* 62.5em /*1000px*/; height:4vw/*37.5em/*600px*/; margin:0em; " >
			
          <div id="life">Vita:
				    <span id="lifeSpan">100</span>
		      </div>

			    <div id="coolingGun" style="display:none;">
				    <div id="coolingBar"></div>
			    </div>	

			    <div id="ammo" style='display:none;'>Munizioni:
				    <span id="ammoSpan">100</span>
			   </div>	

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
		
		<div id='saveForm'>
			<label>Nome livello:</label><input type="text" id="nomeLivello" value="a"><div style='height:1.5vw;' class='spaziatura'></div>
			<label style='color:maroon;'>Inserisci valori di inizio livello:</label><div style='height:1.5vw;' class='spaziatura'></div>
      		<label>Vita:</label>
			<select id='vitaIniziale'>
				<option value=100>100</option>
					<option value=200>200</option>
				<option value=300>300</option>
				<option value=400>400</option>
			</select><div style='height:0.5vw;' class='spaziatura'></div>
			<label>Numero di vite:</label><input type="number" id="nViteInput" min='0' step='1' value='3'><div style='height:0.5vw;' class='spaziatura'></div>
      		<label>Munizioni:</label><input type="number" id="munizioniIniziali" min='0' step='50' value="50"><div style='height:0.5vw;' class='spaziatura'></div>
      		<label>posizione Y:</label>
			<select id='posYiniziale'>
				<option value=60>0%</option>
					<option value=54>10%</option>
				<option value=48>20%</option>
				<option value=42>30%</option>
					<option value=36>40%</option>
					<option value=30>50%</option>
				<option value=24>60%</option>
				<option value=18>70%</option>
					<option value=12>80%</option>
					<option value=6>90%</option>
				<option value=0>100%</option>
			</select><div style='height:0.5vw;' class='spaziatura'></div>
			
			<label>arma iniziale:</label>
			<select id='armaIniziale'>
				<option value="Pistola">Pistola</option>
					<option value="Pompa">Pompa</option>
				<option value="Mitraglia">Mitraglia</option>
				<option value="Precisione">Precisione</option>
			</select>
			<div style='height:0.5vw;' class='spaziatura'></div>

			<input id='inputImageLiv' type='text' value='livello_standard.jpg' readonly>
			<button id='buttonImageLiv' onclick='scegliImmagine()' style='float:left;'>Scegli immagine</button>
			<div style='height:0.5vw;' class='spaziatura'></div>
			
			<div id='scrollImage'>
						<div class='saveImage' onclick="caricaImmagine('livello_standard.jpg');" style="background-image:url('../css/livello_standard.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo_Doom.jpg');" style="background-image:url('../css/sfondo_Doom.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo_menu.jpg');" style="background-image:url('../css/sfondo_menu.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo1.jpg');" style="background-image:url('../css/sfondo1.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo2.png');" style="background-image:url('../css/sfondo2.png');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo3.jpg');" style="background-image:url('../css/sfondo3.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo4.jpg');" style="background-image:url('../css/sfondo4.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo5.jpg');" style="background-image:url('../css/sfondo5.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo6.jpg');" style="background-image:url('../css/sfondo6.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo7.jpg');" style="background-image:url('../css/sfondo7.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo8.jpg');" style="background-image:url('../css/sfondo8.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo9.jpg');" style="background-image:url('../css/sfondo9.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo10.png');" style="background-image:url('../css/sfondo10.png');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo11.png');" style="background-image:url('../css/sfondo11.png');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo12.jpg');" style="background-image:url('../css/sfondo12.jpg');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo13.png');" style="background-image:url('../css/sfondo13.png');"></div>
						<div class='saveImage' onclick="caricaImmagine('sfondo14.jpg');" style="background-image:url('../css/sfondo14.jpg');"></div>
			</div>
				
			<button onclick=salva() style='float:right;'>Salva</button>
			<button onclick=annullaSalvataggio(); style='float:left;'>Annulla</button>
		</div>	
  


		<script type="text/javascript">

					
					function salva(){
						GAME.salva();
						document.getElementById('menu').style.display='block';
						document.getElementById('saveForm').style.display='none';

					}
					function iniziaSalvataggio(){

						document.getElementById('menu').style.display='none';
						document.getElementById('saveForm').style.display='block';
						document.getElementById('nomeLivello').value=NOME_LIVELLO;
						if(default0!=null){
							document.getElementById('posYiniziale').value=default0[0]/10;
							document.getElementById('vitaIniziale').value=default0[1];
							document.getElementById('munizioniIniziali').value=default0[2];
							document.getElementById('armaIniziale').value=default0[3];
							document.getElementById('nViteInput').value=default0[4];
							document.getElementById('inputImageLiv').value=default0[5];
						}

						


					}

					function annullaSalvataggio(){
						document.getElementById('menu').style.display='block';
						document.getElementById('saveForm').style.display='none';
					}

					function scegliImmagine(){
						document.getElementById('scrollImage').style.display='block';
					}

					function caricaImmagine(image){
						document.getElementById('scrollImage').style.display='none';
						document.getElementById('inputImageLiv').value=image;
					}

					Game.prototype.dimSfondo=function(){
						
                        let dim=document.getElementById('dimSfondo').value;
						
						if(dim==null || dim<=0 || dim==NaN){
							dim=1;
							document.getElementById('dimSfondo').value=1;
						}
                        
						for(let i=0;i<this.arrayFloor.length;i++)
							if(this.arrayFloor[i].type=='sfondo')
								this.arrayFloor[i].width=dim*5000;
					}

					function buttonInfo(type){
						if(INFO==0)
							return;
						let id='p-'+type;
						document.getElementById(id).style.display='block';
					}

					function buttonNoInfo(type){
						let id='p-'+type;
						document.getElementById(id).style.display='none';
					}
					

		</script>
	</body>
</html>
