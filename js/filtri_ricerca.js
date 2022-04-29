function ordina(i,pagina){

    //se return>0 => b prima di a, se no il contrario
    if(i==1){
        LIVELLI.sort(function(a,b){
            let x=a[1].toUpperCase();
            let y=b[1].toUpperCase();
            
            if(x>y)return 1;
            else if(x<y)
                return -1;
            else 
                return 0;    
        })
    }
    else if(i==2){
        LIVELLI.sort(function(a,b){
            let x=a[4].toUpperCase();
            let y=b[4].toUpperCase();
         
            if(x>y)return 1;
            else if(x<y)
                return -1;
            else 
                return 0;    
        })

    }  
    else if(i==3){
        LIVELLI.sort(function(a,b){
            let x=parseInt(a[2])-parseInt(a[3]);
            let y=parseInt(b[2])-parseInt(b[3]);
           
            if(x<y)return 1;
            else if(x>y)
                return -1;
            else 
                return 0;    
        })

    }
    else if(i==4){
        LIVELLI.sort(function(a,b){
            let x=parseInt(a[5]);
            let y=parseInt(b[5]);
           
            if(x<y)return 1;
            else if(x>y)
                return -1;
            else 
                return 0;    
        })

    } 

    else if(i==5){
        LIVELLI.sort(function(a,b){
            let x=parseInt(a[7]);
            let y=parseInt(b[7]);
            if(isNaN(x))
                x=0;
            if(isNaN(y))
                y=0;    

                
            if(x<y)return 1;
            else if(x>y)
                return -1;
            else 
                return 0;    
        })

    } 

    let nodo=null;

    if(pagina=='gioca')
        nodo=document.getElementById("scrollLivelli");
    else if(pagina=='editor')
        nodo=document.getElementById("scrollLivelli_editor");
        
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }

    for(let i=0;i<LIVELLI.length;i++)
        listaLivelli(pagina,LIVELLI[i][0],LIVELLI[i][1],LIVELLI[i][2],LIVELLI[i][3],LIVELLI[i][4],LIVELLI[i][6])
       
}

/*************/

function cerca(pagina){
    
    let nodo=null;
    if(pagina=='gioca')
        nodo=document.getElementById("scrollLivelli");
    else if(pagina=='editor')
        nodo=document.getElementById("scrollLivelli_editor");
        
    while (nodo.firstChild) {
        nodo.removeChild(nodo.firstChild);
    }

    for(let i=0;i<LIVELLI.length;i++){
        let nome=LIVELLI[i][1];
        let utente=LIVELLI[i][4];
        let filtro=document.getElementById('inputCerca').value;
        if(nome.search(filtro)==0 || utente.search(filtro)==0)
            listaLivelli(pagina,LIVELLI[i][0],LIVELLI[i][1],LIVELLI[i][2],LIVELLI[i][3],LIVELLI[i][4],LIVELLI[i][6]);
           

    }           
}
