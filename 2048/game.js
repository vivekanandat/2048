var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var breaker=0;
var control=null;
var score=0;
var checkdo=1;
var gameover=0;



function pick_random(){
    let a=Math.floor(Math.random()*16);
    while (board[a]!=0){
        a=Math.floor(Math.random()*16);
    }
    let values=[2,2,4];
    let b=values[Math.floor(Math.random()*3)];
    board[a]=b;
}

function display(){
    gameover=0;
    for (let i=0 ; i<16 ; i++){
        let string1=i.toString();
        if(board[i]==0){
            document.getElementById(string1).innerHTML="";
            document.getElementById(string1).className="0";
            gameover=1;
        }
        else{
            document.getElementById(string1).innerHTML=board[i];
            let string2="_";
            string2=string2+board[i].toString();
            document.getElementById(string1).className=string2;
        }
    }
    for(let i=0;i<16 && gameover==0;i++){
        let temp=board[i];
        if(i+1<16 && temp==board[i+1]){
            gameover=1;
            break;
        }
        else if(i-1>-1 && temp==board[i-1]){
            gameover=1;
            break;
        }
        else if(i-4>-1 && temp==board[i-4]){
            gameover=1;
            break;
        }
        else if(i+4<16 && temp==board[i+4]){
            gameover=1;
            break;
        }
    }
    if(gameover==0){
        document.getElementById("done").innerHTML="game over";
    }
    document.getElementById("score1").innerHTML=score;


}


function play(){
    if(control=='w'){
        for (let i=0 ; i<16 ; i++){
            if (board[i]!=0 && Math.floor(i/4)!=0){
                breaker=0;
                if(i-12>-1 && checkgap(i-12,i,4)){
                    place(i-12,i);
                }
                if(breaker==0 && i-8>-1 && checkgap(i-8,i,4) ){
                    place(i-8,i);
                }
                if(breaker==0 && i-4>-1){
                    place(i-4,i);
                }
            }
        }
    }
    else if(control=='a'){
        for(let i=0;i<16;i++){
            if (board[i]!=0 && i%4!=0){
                breaker=0;
                if(i%4>2 && checkgap(i-2-4,i,1)){
                    place(i-3,i);
                }
                if(breaker==0 && i%4>1 && checkgap(i-1-4,i,1)){
                    place(i-2,i);
                }
                if(breaker==0 && i%4>0){
                    place(i-1,i);
                }
            }
        }
    }
    else if(control=='d'){
        for(let i=15;i>-1;i--){
            if (board[i]!=0 && (i+1)%4!=0){
                breaker=0;
                if(i%4<1 && checkgap(i-3,i+3,1)){
                    place(i+3,i);
                }
                if(breaker==0 && i%4<2 && checkgap(i-3,i+2,1)){
                    place(i+2,i);
                }
                if(breaker==0 && i%4<3){
                    place(i+1,i);
                }
            }
        }
    }
    else if(control=='s'){
        for(let i=15;i>-1;i--){
            if (board[i]!=0 && Math.floor(i/4)!=3){
                breaker=0;
                if(i+12<16 && checkgap(i,i+12,4)){
                    place(i+12,i);
                }
                if(breaker==0 && i+8<16 && checkgap(i,i+8,4)){
                    place(i+8,i);
                }
                if(breaker==0 && i+4<16){
                    place(i+4,i);
                }
            }
        }
    }
    if (checkdo!=0){
        pick_random();
    }
    checkdo=0;
}

function run(){
    display();
    play();
    pick_random();
    display();
}

function place(a,b){
    if (board[a]==board[b] && board[a]!=0){
        board[a]=board[b]*2;
        score=score+board[a];
        board[b]=0;
        breaker=1;
        checkdo+=1;
    }
    else if(board[a]==0){
        board[a]=board[b];
        board[b]=0;
        breaker=1;
        checkdo+=1;
    }
}

function checkgap(a,b,c){
    for(let j=a+4;j<b;j+=c){
        if(board[j]!=0){
            return false;
        }
    }
    return true;
}


window.addEventListener('keydown', function(e){
    if(e.key=="w"||e.key=="a"||e.key=="s"||e.key=="d"){
        control=e.key;
        play();
        display();
    }
});