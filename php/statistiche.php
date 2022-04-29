<?php

    session_start();
    

    if($_SERVER['REQUEST_METHOD']=='POST'){

        if($_POST['tipoRichiesta']=='salvaStat'){

            $stat=$_POST['arrayStat'];//echo $stat;
            $stat=explode(' ',$stat);

            $metri_=(Int)$stat[0];
            $tempo_=(Int)$stat[1];
            $danniSubiti_=(Int)$stat[2];
            $vitePerse_=(Int)$stat[3];
            $viteTotali_=(Int)$stat[4];
            $nemiciUccisi_=(Int)$stat[5];
            $colpiVuoto_=(Int)$stat[6];
            $colpiTotali_=(Int)$stat[7];
            $punteggioTotale_=(Int)$stat[8];
            if($colpiTotali_==0)
                $precisione_='0';
            else    
                $precisione_=(String)(floor(($colpiTotali_-$colpiVuoto_)/($colpiTotali_/100))).'%';
            $colpiSegno_=$colpiTotali_-$colpiVuoto_;


            $conn=new mysqli('localHost','doomjs','','my_doomjs');
            if(!$conn){
              echo("connessione fallita:".$conn->connect_error);
            }        

            $sql0="SELECT * FROM punteggio_livello where id=".$_SESSION['id']." and user='".$_SESSION['user']."';";
            $oldScore=$conn->query($sql0);
            
            if($oldScore->num_rows==0){

                $sql="INSERT INTO punteggio_livello(user,id,metri,vitePerse,tempo,nemiciUccisi,danniSubiti,colpiEsplosi,colpiSegno,precisione,punteggioTotale,ultimaPartita) VALUES(?,?,?,?,?,?,?,?,?,?,?,null);";
                $stmt=$conn->prepare($sql);

                $stmt->bind_param('siiiiiiiisi',$_SESSION['user'],$_SESSION['id'],$metri_,$vitePerse_,$tempo_,$nemiciUccisi_,$danniSubiti_,$colpiTotali_,$colpiSegno_,$precisione_,$punteggioTotale_);
                $stmt->execute();
               
            }
           elseif($oldScore->fetch_assoc()['punteggioTotale']<$punteggioTotale_){
                $sql="UPDATE punteggio_livello SET metri=?,vitePerse=?,tempo=?,nemiciUccisi=?,danniSubiti=?,colpiEsplosi=?,colpiSegno=?,precisione=?,punteggioTotale=?,ultimaPartita=current_timestamp WHERE user='".$_SESSION['user']."' and id=".$_SESSION['id'].";";
                $stmt=$conn->prepare($sql);

                $stmt->bind_param('iiiiiiisi',$metri_,$vitePerse_,$tempo_,$nemiciUccisi_,$danniSubiti_,$colpiTotali_,$colpiSegno_,$precisione_,$punteggioTotale_);
                $stmt->execute();
            }
            else{
                $sql="UPDATE punteggio_livello SET ultimaPartita=current_timestamp WHERE user='".$_SESSION['user']."' and id=".$_SESSION['id'].";";
                $conn->query($sql);

            }
            

             $conn->close();



        }

        elseif($_POST['tipoRichiesta']=='statLivello'){

            $id=null;
            if($_POST['idLivello']==null)
                $id=$_SESSION['id'];
            else
                $id=$_POST['idLivello'];    

           // echo $id; 

            $conn=new mysqli('localHost','doomjs','','my_doomjs');
            if(!$conn){
              echo("connessione fallita:".$conn->connect_error);
            }        

            $sql="select P.user as Utente,P.metri as Metri, P.tempo as Tempo,P.nemiciUccisi as Uccisioni, P.danniSubiti as Danni_subiti, P.precisione as Precisione, P.punteggioTotale as Punteggio
            from punteggio_livello P inner join proprietario_livello PL on P.id=PL.id
            where P.id=".$id."
            order by P.punteggioTotale DESC";
            
            $result=$conn->query($sql);
            echo "<table><caption>Classifica Punteggi</caption>";
            echo "<th>Classifica</th><th>Utente</th><th>Metri</th><th>Tempo(s)</th><th>Uccisioni</th><th>Danni Subiti</th><th>Precisione</th><th>Punteggio</th>";
            $i=1;
            if($result->num_rows>0)
                while($row=$result->fetch_assoc()){
                    if($row['Utente']=='amministratore')
                        continue;
                    if($_SESSION['user']==$row['Utente'])
                        echo "<tr style='background-color:darkred;'>";
                    else    
                        echo "<tr>";
                    echo "<td>".$i."</td><td>".$row['Utente']."</td><td>".$row['Metri']."</td><td>".$row['Tempo']."</td><td>".$row['Uccisioni']."</td><td>".$row['Danni_subiti']."</td><td>".$row['Precisione']."</td><td>".$row['Punteggio']."</td></tr>";
                    $i++;
                }
           echo "</table>";


             $conn->close();


        }
        elseif($_POST['tipoRichiesta']=='stat'){

            $user=$_SESSION['user'];  

           // echo $id; 

            $conn=new mysqli('localHost','doomjs','','my_doomjs');
            if(!$conn){
              echo("connessione fallita:".$conn->connect_error);
            }        

            $sql="select*
            from(
                select sum(metri)as metri,sum(tempo) as tempo,sum(nemiciUccisi) as uccisioni,sum(danniSubiti)as danniSubiti,sum(colpiEsplosi)as spari,sum(colpiSegno) as segno,if(count(*)=0,null,count(*))as livelli
                from punteggio_livello
                where user='".$user."'
                ) D
            where D.livelli is not null;";

            $result=$conn->query($sql);
            echo "<table><caption>Statistiche utente</caption>";

            if($result->num_rows>0)
                while($row=$result->fetch_assoc()){
                    if($row['spari']==0)
                        $precisione=0;
                    else
                        $precisione=floor($row['segno']/($row['spari']/100));

                   echo"<tr><th>Metri Percorsi</th><td>".$row['metri']."</td></tr>";
                   echo"<tr><th>Tempo di Gioco</th><td>".$row['tempo']."</td></tr>";
                   echo"<tr><th>Nemici Uccisi</th><td>".$row['uccisioni']."</td></tr>";
                   echo"<tr><th>Danni Subiti</th><td>".$row['danniSubiti']."</td></tr>";
                   echo"<tr><th>Colpi sparati</th><td>".$row['spari']."</td></tr>";
                   echo"<tr><th>Colpi a segno</th><td>".$row['segno']."</td></tr>";
                   echo"<tr><th>Precisione</th><td>".$precisione."%</td></tr>";
                   echo"<tr><th>Livelli giocati</th><td>".$row['livelli']."</td></tr>";
                }
            else
                echo "<th>Statistiche non disponibili</th>";

           echo "</table>";


             $conn->close();


        }
        

        




    }
?>