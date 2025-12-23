import { useState } from 'react'
//import './App.css'


/* TAHAPAN:
1. Persiapan (kondisikan template, style css sendiri)
2. Membuat Papan Permainan (squares, board)
3. Menambah Pemain Lawan - xIsNext
4. Menampilkan Pemenang
5. Time Travel
6. Refactor
*/


function Square({value, onHandleClick}){  
  return <button className='square' onClick={onHandleClick} > {value} </button>
}


function Board({xIsNext, squares, onHandlePlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(''));
  // const [xIsNext, setXIsNext] = useState(true);

  function handleClick(n){
    if(squares[n] || calculateWinner(squares)) return;

    const nextSquares = squares.slice(); // <<= copy/duplicate array/immutability
    nextSquares[n] = xIsNext? 'X' : 'O';

    //setSquares(nextSquares); //timpa
    //setXIsNext(!xIsNext); //dibalik    

    onHandlePlay(nextSquares)
  }

  let status = ''; 
  let winner = calculateWinner(squares);
  if(winner){
    status = `Winner: ${winner}`
  }else{
    status = `Next Player: ${xIsNext? 'X' : 'O'}`
  };
  // console.log(status)

  return (
    <>
      <h4>{status}</h4>
      <div className='board'>
        <Square value={squares[0]} onHandleClick={ () => handleClick(0)} onHandlePlay={onHandlePlay} /> {/*perlu dibungkus dg anonymus func*/}
        <Square value={squares[1]} onHandleClick={ () => handleClick(1)} onHandlePlay={onHandlePlay} />
        <Square value={squares[2]} onHandleClick={ () => handleClick(2)} onHandlePlay={onHandlePlay} />
        <Square value={squares[3]} onHandleClick={ () => handleClick(3)} onHandlePlay={onHandlePlay} />
        <Square value={squares[4]} onHandleClick={ () => handleClick(4)} onHandlePlay={onHandlePlay} />
        <Square value={squares[5]} onHandleClick={ () => handleClick(5)} onHandlePlay={onHandlePlay} />
        <Square value={squares[6]} onHandleClick={ () => handleClick(6)} onHandlePlay={onHandlePlay} />
        <Square value={squares[7]} onHandleClick={ () => handleClick(7)} onHandlePlay={onHandlePlay} />
        <Square value={squares[8]} onHandleClick={ () => handleClick(8)} onHandlePlay={onHandlePlay} />
      </div>
    </>
  );
}


// mengelola/menyimpan keadaan dari board
export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState( [Array(9).fill(null)] );
  const currentSquare = history[history.length - 1]; //ambil index terakhir

  function handlePlay(arr){
    setHistory( [...history, arr] ); //copy + add
    setXIsNext(!xIsNext);


  }

  const moves = history.map( (el,i) => {
    
  } );

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={history} onHandlePlay={handlePlay} /> 
      </div>
      <div className="game-info">
        <ol>{/*to do*/}</ol>
      </div>
    </div>
    );
}


//fungsi bantuan diluar komponen
function calculateWinner(squares){
  const lines = [
    [0,1,2], 
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i=0; i < lines.length; i++) {
    /*const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];*/

    const [a,b,c] = lines[i];

    //console.log(a);

    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]  ){
      console.log(`Pemenangnya adalah: ${squares[a]}`);
      return squares[a];
    }

  }

  return false;
}



