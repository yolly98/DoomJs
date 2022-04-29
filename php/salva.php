<?php

    session_start();


   //$_SESSION['user']='yolly98';
  // $_SESSION['id']=1;

    if($_SERVER['REQUEST_METHOD']=='POST'){

        $objectArray=explode(' ^ ',$_POST['objectArray']);
        $arrayFloor=explode(' £ ',$objectArray[0]);
        $arrayEnemy=explode(' £ ',$objectArray[1]);
        $arrayBox=explode(' £ ',$objectArray[2]);
        for($i=0;$i<count($arrayFloor);$i++){
            $arrayFloor[$i]=explode(' ',$arrayFloor[$i]);
        }
        for($i=0;$i<count($arrayEnemy);$i++){
            $arrayEnemy[$i]=explode(' ',$arrayEnemy[$i]);
        }
        for($i=0;$i<count($arrayBox);$i++){
            $arrayBox[$i]=explode(' ',$arrayBox[$i]);
        }

      /*  for($i=0;$i<count($arrayFloor);$i++)
            for($j=0;$j<count($arrayFloor[$i]);$j++)
                echo $arrayFloor[$i][$j]; */
                
                
        $datiLivello=$_POST['datiLivello'];
        $datiLivello=trim($datiLivello);
        $datiLivello=stripslashes($datiLivello);
        $datiLivello=htmlspecialchars($datiLivello);
        $datiLivello=explode('§',$datiLivello);
        /*for($i=0;$i<count($datiLivello);$i++)
            echo $datiLivello[$i];*/

        $conn=new mysqli('localHost','doomjs','','my_doomjs');
        if(!$conn){
          echo("connessione fallita:".$conn->connect_error);
        }        

        /****///prima di salvare devo cancellare il salvataggio precedente
        $id=null;
        if(isset($_SESSION['id'])){

            $controlloNome="SELECT* FROM livello L INNER JOIN proprietario_livello PL on L.id=PL.id WHERE PL.user='".$_SESSION['user']."' and L.nome='".$datiLivello[0]."' and L.id<>".$_SESSION['id'].";";
            $ris=$conn->query($controlloNome);
            if($ris->num_rows>0){
                echo "nome del livello già esistente";
                return;
            }

           // $sql0="DELETE FROM proprietario_livello where user='".$_SESSION['user']."' and id=".$_SESSION['id'].";";
            //$conn->query($sql0);

            //di questi se ne dovrebbero occupare i vincoli
          //  $sql00="DELETE FROM livello where user='".$_SESSION['user']."' and id=".$_SESSION['id'].";";
          //  $conn->query($sql00);

             $id=$_SESSION['id'];

            $sql00F="DELETE FROM oggetto_floor where id=".$_SESSION['id'].";";
            $conn->query($sql00F);

            $sql00E="DELETE FROM oggetto_enemy where id=".$_SESSION['id'].";";
            $conn->query($sql00E);

            $sql00B="DELETE FROM oggetto_box where id=".$_SESSION['id'].";";
            $conn->query($sql00B);
            $id=$_SESSION['id'];

            $sql00='UPDATE livello SET nome=?,vita=?,munizioni=?,posY=?,arma=?,nVite=?,dataUltimaMod=current_timestamp,sfondo=? where id='.$id.';';
            $stmt00=$conn->prepare($sql00); 

            $nomeLivello=$datiLivello[0];
            $vita=(int)$datiLivello[1];
            $munizioni=(int)$datiLivello[2];
            $posY=(int)$datiLivello[3];
            $arma=$datiLivello[4];
            $nVite=(int)$datiLivello[5];
            $sfondo=$datiLivello[6];


            if(empty($nomeLivello) || empty($munizioni) ||
                !preg_match("/^[a-zA-Z0-9@&^?-_àùèéìò]*$/",$nomeLivello) ||
                !preg_match("/^[0-9]*$/",$munizioni)
                ){
                echo 'nome del livello o munizioni non validi';
                return;
            }

            $stmt00->bind_param("siiisis",$nomeLivello,$vita, $munizioni, $posY,$arma,$nVite,$sfondo);
            $stmt00->execute();

           // echo $id;

            //echo 'sovrascrittura';

        }
       else{ //echo 'nuovo';

            $controlloNome="SELECT* FROM livello L INNER JOIN proprietario_livello PL on L.id=PL.id WHERE PL.user='".$_SESSION['user']."' and L.nome='".$datiLivello[0]."';";
            $ris=$conn->query($controlloNome);
           if($ris->num_rows>0){
                echo "nome del livello già esistente";
                return;
           }
        
            $sql1='INSERT INTO livello VALUES(null,?,100,?,?,?,?,0,0,?,null,null,?);';
            $stmt1=$conn->prepare($sql1);

            $nomeLivello=$datiLivello[0];
            $vita=(int)$datiLivello[1];
            $munizioni=(int)$datiLivello[2];
            $posY=(int)$datiLivello[3];
            $arma=$datiLivello[4];
            $nVite=(int)$datiLivello[5];
            $sfondo=$datiLivello[6];


            if(empty($nomeLivello) || !preg_match("/^[a-zA-Z0-9@&^?-_àùèéìò]*$/",$nomeLivello)){
                echo 'nome del livello non valido';
                return;
            }

            $stmt1->bind_param("siiisis",$nomeLivello,$vita, $munizioni, $posY,$arma,$nVite,$sfondo);
            $stmt1->execute();
            $id=$conn->insert_id;

            $sql2='INSERT INTO proprietario_livello VALUES(?,'.$id.');';
            $stmt2=$conn->prepare($sql2);
            $stmt2->bind_param("s",$_SESSION['user']);
            $stmt2->execute();

            $_SESSION['id']=$id;
           
      }

        /**FLOOR***/
        $sqlFloor='INSERT INTO oggetto_floor VALUES('.$id.',?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
        $stmtFloor = $conn->prepare($sqlFloor);

        for($i=0;$i<count($arrayFloor)-1;$i++){

            $indiceF=(int)$arrayFloor[$i][1];
            $tipoF=$arrayFloor[$i][2];
            $posXF=(int)$arrayFloor[$i][3];
            $posYF=(int)$arrayFloor[$i][4];
            $wF=(int)$arrayFloor[$i][5];
            $hF=(int)$arrayFloor[$i][6];
            $dirF=$arrayFloor[$i][7];
            $xF=(int)$arrayFloor[$i][8];
            $yF=(int)$arrayFloor[$i][9];
            $maxXF=(int)$arrayFloor[$i][10];
            $maxYF=(int)$arrayFloor[$i][11];
            $counterXF=(int)$arrayFloor[$i][12];
            $counterYF=(int)$arrayFloor[$i][13]; 
            $counterVxF=(int)$arrayFloor[$i][14]; 
            $counterVyF=(int)$arrayFloor[$i][15];

            $stmtFloor->bind_param("isiiiisiiiiiiii",$indiceF,$tipoF,$posXF,$posYF,$wF,$hF,$dirF,$xF,$yF,$maxXF,$maxYF,$counterXF,$counterYF,$counterVxF,$counterVyF);   
            $stmtFloor->execute();
            $stmtFloor->reset();
        }
        /**ENEMY***/
        $sqlEnemy='INSERT INTO oggetto_enemy VALUES('.$id.',?,?,?,?,?,?,?,?,?,?,?);';
        $stmtEnemy = $conn->prepare($sqlEnemy);

        for($i=0;$i<count($arrayEnemy)-1;$i++){

            $indiceE=(int)$arrayEnemy[$i][1];
            $tipoE=$arrayEnemy[$i][2];
            $posXE=(int)$arrayEnemy[$i][3];
            $posYE=(int)$arrayEnemy[$i][4];
            $dirE=$arrayEnemy[$i][5];
            $xE=(int)$arrayEnemy[$i][6];
            $yE=(int)$arrayEnemy[$i][7];
            $maxXE=(int)$arrayEnemy[$i][8];
            $maxYE=(int)$arrayEnemy[$i][9];
            $counterXE=(int)$arrayEnemy[$i][10];
            $stepCounterE=(int)$arrayEnemy[$i][11];

            $stmtEnemy->bind_param("isiisiiiiii",$indiceE,$tipoE,$posXE,$posYE,$dirE,$xE,$yE,$maxXE,$maxYE,$counterXE,$stepCounterE);  
            $stmtEnemy->execute();
            $stmtEnemy->reset();
        }
        /**BOX***/
        $sqlBox='INSERT INTO oggetto_box VALUES('.$id.',?,?,?,?);';
        $stmtBox = $conn->prepare($sqlBox);

        for($i=0;$i<count($arrayBox)-1;$i++){

            $indiceB=(int)$arrayBox[$i][1];
            $tipoB=$arrayBox[$i][2];
            $posXB=(int)$arrayBox[$i][3];
            $posYB=(int)$arrayBox[$i][4];
            

            $stmtBox->bind_param("isii",$indiceB,$tipoB,$posXB,$posYB);  
            $stmtBox->execute();
            $stmtBox->reset();
        }
        
        //echo $stmt->get_result()->num_rows;
        //$stmt->store_result();

        $conn->close();
    }
?>