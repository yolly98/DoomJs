<?php

    session_start();

    $conn=new mysqli('localHost','doomjs','','my_doomjs');
    if(!$conn){
      echo("connessione fallita:".$conn->connect_error);
    }       

    if($_POST['pagina']=='editor')
        $sql="SELECT PL.id,L.nome,L.miPiace,L.nonMipiace,PL.user,L.dataUltimaMod,L.sfondo from proprietario_livello PL INNER JOIN livello L on L.id=PL.id where PL.user='".$_SESSION['user']."'ORDER BY L.nome;";
    else
        $sql="SELECT PL.id,L.nome,L.miPiace,L.nonMipiace,PL.user,L.dataUltimaMod,L.sfondo from proprietario_livello PL INNER JOIN livello L on L.id=PL.id ORDER BY L.miPiace-L.nonMipiace DESC;";   
    $result=$conn->query($sql);
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            $sqlData="SELECT ultimaPartita FROM punteggio_livello WHERE user='".$_SESSION['user']."' and id=".$row['id'].";";
            $resultData=$conn->query($sqlData)->fetch_assoc()['ultimaPartita'];
            if(empty($resultData)){
                $resultData=null;
            }
            else
                $resultData=strtotime($resultData);

            echo $row['id'].' '.$row['nome'].' '.$row['miPiace'].' '.$row['nonMipiace'].' '.$row['user'].' '.strtotime($row['dataUltimaMod']).' '.$row['sfondo'].' '.$resultData;
            echo '-';
        }
    }

    $conn->close();

?>








