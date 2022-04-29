<?php


session_start();

    


       $user=$password="";
       $userErr=$passwordErr="";

    if(empty($_POST['userLogin'])){
            $userErr="'Nome Utente obbligatorio!'";
     }
     else{
         $user=test($_POST['userLogin']);
     }

    
    if(empty($_POST['passwordLogin'])){
         $passwordErr="'password obbligatoria!'";
    }
    else{
        $password=test($_POST['passwordLogin']);
     }


    $errore=0;

    if($userErr!=''){
        $_SESSION['userErr']=$userErr;
        $errore=1;
    }
    if($passwordErr!=''){
        $_SESSION['passwordErr']=$passwordErr; 
        $errore=1;
    }   
   
    if($errore==0){

        $conn=mysqli_connect('localHost','doomjs','');
        if(!$conn){
            die("connessione fallita:".$conn->connect_error);
        }
    
        $sql="USE my_doomjs";
        if(!$conn->query($sql)){
            echo "connessione non riuscita a my_doomjs";
        }

        $sql="SELECT*FROM UTENTE WHERE user LIKE BINARY '".$user."' and password LIKE BINARY '".md5($password)."';";
        $result=$conn->query($sql);
       
        if($result->num_rows>0){

            if($user!=''){
                $_SESSION['user']=$user;
            }
            if($password!=''){
                $_SESSION['password']=$password; 
            }
        }
        else{
            $_SESSION['sqlError']="'nome utente e password inesisitenti'";
        }

        $conn->close();

    }   

    

    function test($data){

        $data=trim($data);
        $data=stripslashes($data);
        $data=htmlspecialchars($data);
        return $data;
    }

    header('Location: ' . $_SERVER['HTTP_REFERER']);
?>