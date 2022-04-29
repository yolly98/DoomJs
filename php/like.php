<?php

    session_start();

    if($_SERVER['REQUEST_METHOD']=='POST'){

        $conn=new mysqli('localHost','doomjs','','my_doomjs');
        if(!$conn){
          echo("connessione fallita:".$conn->connect_error);
        }       

        $sql0="SELECT* FROM  punteggio_livello where user='".$_SESSION['user']."' and id=".$_POST['id'].";";
        $result=$conn->query($sql0);
        if($result->num_rows>0){

            $row=$result->fetch_assoc();
            
            if($row['voto']==$_POST['voto']){
                echo 'Livello già votato';
            }
            else if($row['voto']=='like' && $_POST['voto']=='dislike'){
                $sql1='UPDATE livello SET miPiace=miPiace-1,nonMipiace=nonMipiace+1 where id='.$_POST['id'].';';
                $sql2="UPDATE punteggio_livello SET voto='".$_POST['voto']."'  where user='".$_SESSION['user']."' and id=".$_POST['id'].";";
                $conn->query($sql1);
                $conn->query($sql2);  
                echo 'caso1';

            }  
            else if($row['voto']=='dislike' && $_POST['voto']=='like'){
                $sql1='UPDATE livello SET miPiace=miPiace+1,nonMipiace=nonMipiace-1 where id='.$_POST['id'].';';
                $sql2="UPDATE punteggio_livello SET voto='".$_POST['voto']."'  where user='".$_SESSION['user']."' and id=".$_POST['id'].";";
                $conn->query($sql1);
                $conn->query($sql2);  
                echo 'caso2';

            } 
            else if($row['voto']==null){

                if($_POST['voto']=='like'){
                    $sql1='UPDATE livello SET miPiace=miPiace+1 where id='.$_POST['id'].';';
                    $sql2="UPDATE punteggio_livello SET voto='".$_POST['voto']."'  where user='".$_SESSION['user']."' and id=".$_POST['id'].";";
                    $conn->query($sql1);
                    $conn->query($sql2);
                }
                else if($_POST['voto']=='dislike'){
                    $sql1='UPDATE livello SET nonMipiace=nonMipiace+1 where id='.$_POST['id'].';';
                    $sql2="UPDATE punteggio_livello SET voto='".$_POST['voto']."'  where user='".$_SESSION['user']."' and id=".$_POST['id'].";";
                    $conn->query($sql1);
                    $conn->query($sql2);
                }

                echo 'caso3';


            }
                
        }
        else 
            echo 'Non hai ancora giocato questo livello';
        
        $conn->close();
    }
?>