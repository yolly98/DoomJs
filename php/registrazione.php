<?php


session_start();

    

        $user=$nome=$cognome=$password='';
        $userErr=$nomeErr=$cognomeErr=$passwordErr='';

      if($_SERVER['REQUEST_METHOD']=='POST'){

       
        if(empty($_POST['userReg'])){
            $userErr="'Nome Utente obbligatorio!'";
        }
        else{
            $user=test($_POST['userReg']);
        }

        if(empty($_POST['passwordReg'])){
            $passwordErr="'password obbligatoria!'";
        }
        else{
            $password=test($_POST['passwordReg']);
        }


        $nome=test($_POST['nomeReg']);
        $cognome=test($_POST['cognomeReg']);

        if(!empty($user)){
            if(!preg_match("/^[a-zA-Z0-9@&^?-_]*$/",$user)){
                $userErr="'inserimento di caratteri non consentiti nel nome utente'";
            }
        }

        if(!empty($nome)){
            if(!preg_match("/^[a-zA-Z]*$/",$nome)){
                $nomeErr="'inserimento di caratteri non consentiti nel nome'";
            }
        }

        if(!empty($cognome)){
            if(!preg_match("/^[a-zA-Z]*$/",$cognome)){
                $cognomeErr="'inserimento di caratteri non consentiti in cognome'";
            }
        }

        if(!empty($user)){
            if(!preg_match("/^[a-zA-Z0-9@&^?-_]*$/",$password)){
                $userErr="'inserimento di caratteri non consentiti in password'";
            }
        }

        $errore=0;
        if($userErr!=""){
           $_SESSION['userErr']=$userErr;
           $errore=1;
        }

        if($nomeErr!=""){
            $_SESSION['nomeErr']=$nomeErr;
            $errore=1;
        }

        if($cognomeErr!=""){
            $_SESSION['cognomeErr']=$cognomeErr;
            $errore=1;
        }

        if($passwordErr!=""){
            $_SESSION['passwordErr']=$passwordErr;
            $errore=1;
        }
 

        if($errore==0){

            $conn=mysqli_connect('localHost','doomjs','');
            if(!$conn){
                die("connessione fallita:".$conn->connect_error);
            }
            
            $sql="USE my_doomjs;";
            if(!$conn->query($sql)){
                echo "connession non riuscita a my_doomjs";
            }

            $sql="SELECT*FROM UTENTE WHERE user='".$user."';";
            $result=$conn->query($sql);
           
            if($result->num_rows==0){

                $stmt=$conn->prepare("INSERT INTO UTENTE(user,nome,cognome,password) VALUES(?,?,?,?);");
                $stmt->bind_param('ssss',$user,$nome,$cognome,md5($password));
                $status=$stmt->execute();
                
               /* if($status==true)
                    $_SESSION['user']=$user;*/
                
                $stmt->close();

                if(isset($_SESSION['user']))
                    unset($_SESSION['user']);
                
            }
            else{
                $_SESSION['sqlError']="'nome utente non disponibile'";
            }
    
            $conn->close();
        }


    }

    

    function test($data){

        $data=trim($data);
        $data=stripslashes($data);
        $data=htmlspecialchars($data);
        return $data;
    }


    header('Location: ' . $_SERVER['HTTP_REFERER']);
?>