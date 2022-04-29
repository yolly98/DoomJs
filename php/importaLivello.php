<?php
    


    if(!isset($_SESSION['id'])){
        return;
    }
   
    $conn=new mysqli('localHost','doomjs','','my_doomjs');
    if(!$conn){
      echo("connessione fallita:".$conn->connect_error);
    }        
    
    $sql0='SELECT* FROM livello  where id='.$_SESSION['id'].';';
    $sqlF='SELECT* FROM oggetto_floor where id='.$_SESSION['id'].';';
    $sqlE='SELECT* FROM oggetto_enemy where id='.$_SESSION['id'].';';
    $sqlB='SELECT* FROM oggetto_box where id='.$_SESSION['id'].';';
    $sqlRecord="SELECT punteggioTotale FROM  punteggio_livello WHERE user='".$_SESSION['user']."' and id=".$_SESSION['id'].";";

    $result0=$conn->query($sql0);
    $resultF=$conn->query($sqlF);
    $resultE=$conn->query($sqlE);
    $resultB=$conn->query($sqlB);
    $resultRecord=$conn->query($sqlRecord);

    $a0='';
    $aF='';
    $aE='';
    $aB='';

    $record=0;
    if($resultRecord->num_rows>0)
        $record=$resultRecord->fetch_assoc()['punteggioTotale'];
    

    if($result0->num_rows>0){
        while($row=$result0->fetch_assoc()){ //ha al massimo una riga
            $a0.=(String)$row['posY'].' '.(String)$row['vita'].' '.(String)$row['munizioni'].' '.(String)$row['arma'].' '.(String)$row['nVite'].' '.(String)$row['sfondo'];
           // $a0.='£';
        }
    }
    
    if($resultF->num_rows>0){
        while($row=$resultF->fetch_assoc()){
            $aF.=(string)$row['id'].' '.(string)$row['indiceFloor'].' '.(string)$row['type'].' '.(string)$row['posX'].' '.(string)$row['posY'].' '.(string)$row['width'].' '.(string)$row['height'].' '.(string)$row['dir'].' '.(string)$row['x'].' '.(string)$row['y'].' '.(string)$row['maxX'].' '.(string)$row['maxY'].' '.(string)$row['counterX'].' '.(string)$row['counterY'].' '.(string)$row['counterVx'].' '.(string)$row['counterVy'];
            $aF.='£';
        }
    }

   // echo '-';
    
    if($resultE->num_rows>0){
        while($row=$resultE->fetch_assoc()){
            $aE.=(string)$row['id'].' '.(string)$row['indiceEnemy'].' '.(string)$row['type'].' '.(string)$row['posX'].' '.(string)$row['posY'].' '.(string)$row['dir'].' '.(string)$row['x'].' '.(string)$row['y'].' '.(string)$row['maxX'].' '.(string)$row['maxY'].' '.(string)$row['counterX'].' '.(string)$row['stepCounter'];
            $aE.= '£';
        }
    }

    //echo '-';

    if($resultB->num_rows>0){
        while($row=$resultB->fetch_assoc()){
            $aB.=(string)$row['id'].' '.(string)$row['indiceBox'].' '.(string)$row['type'].' '.(string)$row['posX'].' '.(string)$row['posY'];
            $aB.= '£';
        }
    }

    

    $_SESSION['arrayFloor']=$aF;
    $_SESSION['arrayEnemy']=$aE;
    $_SESSION['arrayBox']=$aB;
    $_SESSION['datiIniziali']=$a0;
    $_SESSION['oldRecord']=$record;

   


?>    