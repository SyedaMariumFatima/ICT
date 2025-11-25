let playerRed= 'r';
let playerYellow='y';
let currPlayer=playerRed;

let gameOver=false;
let board;
let currCol;

let rows=6;
let col=7;

window.onload=function()
{
    setGame();
}

function setGame()
{
    board=[];
    currCol=[5, 5, 5, 5, 5, 5, 5];

    for(let r=0; r<rows ; r++)
    {
        let row=[];
        for(let c=0; c<col; c++)
        {
            row.push(' ');

            //html
            let tile=document.createElement("div");
            tile.id = r.toString() + '-'+ c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById('board').append(tile);
        }
        board.push(row);
    }
}

function setPiece()
{
    if(gameOver)
    {
        return;
    }
    let coords=this.id.split('-');
    let r= parseInt(coords[0]);
    let c= parseInt(coords[1]);

    r=currCol[c];
    if(r<0)
    {
        return;
    }

    board[r][c]=currPlayer;
    let tile=document.getElementById(r.toString()+'-'+c.toString());
    if(currPlayer==playerRed)
    {
        tile.classList.add("redPiece");
        currPlayer=playerYellow;
    }
    else 
    {
        tile.classList.add("yellowPiece");
        currPlayer=playerRed;
    }

    //updating row height for column
    currCol[c]-=1;

    checkWinner();
}

function checkWinner() {

    //horizontally
    let count;
    for(let r=0; r<rows; r++)
    {
        for(let c=0; c<col-3; c++)
        {
            if(board[r][c]!=' ')
            {
                count=0;
                for(let i=1; i<4; i++)
                {
                    if(board[r][c]==board[r][c+i]) count++;
                    else break;
                }
                if(count==3) 
                {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }


    //vertically
    for(let c=0; c<col; c++)
    {  
        for(let r=0; r<rows-3; r++)
        {
            if(board[r][c]!=' ')
            {
                count=0;
                for(let i=1; i<4; i++)
                {
                    if(board[r][c]==board[r+i][c]) count++;
                    else break;
                }
                if(count==3) 
                {
                    setWinner(r, c);
                    return;
                }    
            }
        }
    }

    //anti Diagonally
    for(let r=0; r<rows-3; r++)
    {
        for(let c=0; c<col-3; c++)
        {
            if(board[r][c]!=' ')
            {
                count=0;
                for(let i=1; i<4; i++)
                {
                    if(board[r][c]==board[r+i][c+i]) count++;
                    else break;
                }
                if(count==3)
                {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for(let r=3; r<rows; r++)
    {
        for(let c=0; c<col-3; c++)
        {
            if(board[r][c]!=' ')
            {
                count=0;
                for(let i=1; i<4; i++)
                {
                    if(board[r][c]==board[r-i][c+i]) count++;
                    else break;
                }
                if(count==3)
                {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c)
{
    let winner=document.getElementById("winner");
    if(board[r][c]==playerRed)
    {
        winner.innerText='Red Wins';
    }
    else winner.innerText='Yellow Wins';

    gameOver=true;
    
}






