<?php

    session_start();

    $conn=new mysqli('localHost','doomjs','','my_doomjs');
    if(!$conn){
      echo("connessione fallita:".$conn->connect_error);
    }       

    $sql0="DELETE FROM proprietario_livello where user='".$_SESSION['user']."' and id=".$_POST['_id'].";";
    $conn->query($sql0);

    //di questi se ne dovrebbero occupare i vincoli
    $sql00="DELETE FROM livello where id=".$_POST['_id'].";";
    $conn->query($sql00);

    $sql00F="DELETE FROM oggetto_floor where id=".$_POST['_id'].";";
    $conn->query($sql00F);

    $sql00E="DELETE FROM oggetto_enemy where id=".$_POST['_id'].";";
    $conn->query($sql00E);

    $sql00B="DELETE FROM oggetto_box where id=".$_POST['_id'].";";
    $conn->query($sql00B);

    $conn->close();

    //echo $_SESSION['user'].' '.$_POST['_id'];

?>