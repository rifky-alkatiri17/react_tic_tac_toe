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


function Square({value, handleClick}){  
  return <button className='square' onClick={handleClick} > {value} </button>
}


function Board() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(n){
    if(squares[n] || calculateWinner(squares)) return;

    const nextSquares = squares.slice(); // <<= copy/duplicate array/immutability
    nextSquares[n] = xIsNext? 'X' : 'O';
    setSquares(nextSquares); //timpa
    //console.log(squares);
    setXIsNext(!xIsNext); //dibalik    
  }

  let status = ''; 
  let winner = calculateWinner(squares);
  if(winner){
    status = `Winner: ${winner}`
  }else{
    status = `Next Player: ${xIsNext? 'X' : 'O'}`
  };
  console.log(status)

  return (
    <>
      <h4>{status}</h4>
      <div className='board'>
        <Square value={squares[0]} handleClick={ () => handleClick(0)} /> {/*perlu dibungkus dg anonymus func*/}
        <Square value={squares[1]} handleClick={ () => handleClick(1)} />
        <Square value={squares[2]} handleClick={ () => handleClick(2)} />
        <Square value={squares[3]} handleClick={ () => handleClick(3)} />
        <Square value={squares[4]} handleClick={ () => handleClick(4)} />
        <Square value={squares[5]} handleClick={ () => handleClick(5)} />
        <Square value={squares[6]} handleClick={ () => handleClick(6)} />
        <Square value={squares[7]} handleClick={ () => handleClick(7)} />
        <Square value={squares[8]} handleClick={ () => handleClick(8)} />
      </div>
    </>
  );
}


export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquare = history[history.length - 1]; //ambil index terakhir

  function handlePlay(){

  }

  return(
    <>
      <div>
        {/*3 props*/}
        <Board  xIsNext={xIsNext} squares={currentSquare} onPlay={handlePlay}  /> 
      </div>
      <div>
        <ol>{/*TO DO*/}</ol>
      </div>
    </>
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



