import React, { useEffect, useState } from 'react'
import Styles from './TicTacToe.module.css'
import Strike from './Strike'

const TicTacToe = () => {
    const initialboard = Array(9).fill("")
    const [board, setboard] = useState(initialboard)
    const [player, setplayer] = useState(true)
    const [gamestatus, setgamestatus] = useState(null)
    const [strike, setstrike] = useState([])

    const handleclick = (index) => {
        if (gamestatus) {
            return
        }
        const newboard = [...board]
        if (Winnercheck(newboard) || newboard[index]) {
            return
        }
        newboard[index] = player ? 'X' : 'O';
        setboard(newboard);

        const winnerresult = Winnercheck(newboard)
        
        if (winnerresult) {
            const { winner, combination } = winnerresult;
            setstrike((combination))
            // setTimeout(() => {
                setgamestatus(`Congratulations! Player ${winner} wins!`);
            //     alert(`Congratulations! Player ${winner} wins! `);
            // }, 200); // 1000 ms = 1 second delay
        }
        else if (newboard.every((square) => square !== "")) {
            setgamestatus("Game over: No winners");
        }
        else {
            setplayer((previous) => !previous)
        }
        console.log(player);
        

    }
    const restart = () => {
        setboard(initialboard)
        setplayer(true)
        setgamestatus(null)
        setstrike([]);
    }

    return (
        <div className={Styles.body} >
            
            <div className={Styles.label}>
                <h1 className={gamestatus === 'Game over: No winners!' 
                    ? Styles.draw 
                    : gamestatus && gamestatus.includes('Congratulations!') 
                    ? Styles.winner 
                    : Styles.default
                }>
                   Tic Tac Toe
                </h1>
            </div>
            <div className={Styles.label}>
                <h2 className={
                    gamestatus === 'Game over: No winners'
                        ? Styles.draw
                        : gamestatus && gamestatus.includes('Congratulations!')
                            ? (gamestatus.includes('O') ? Styles.Owinnertext : Styles.Xwinnertext)
                            : Styles.default
                }>
                    {gamestatus}
                </h2>
            </div>
            <div className={Styles.container}>
                 { strike && <Strike strike={strike} />}
                <div className={Styles.box_row}>
                    <div className={Styles.boxs} onClick={() => handleclick(0)}><h2 className={board[0] === 'X' ? Styles.X : Styles.O}>{board[0]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(1)}><h2 className={board[1] === 'X' ? Styles.X : Styles.O}>{board[1]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(2)}><h2 className={board[2] === 'X' ? Styles.X : Styles.O}>{board[2]}</h2></div>
                </div>
                <div className={Styles.box_row}>
                    <div className={Styles.boxs} onClick={() => handleclick(3)}><h2 className={board[3] === 'X' ? Styles.X : Styles.O}>{board[3]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(4)}><h2 className={board[4] === 'X' ? Styles.X : Styles.O}>{board[4]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(5)}><h2 className={board[5] === 'X' ? Styles.X : Styles.O}>{board[5]}</h2></div>
                </div>
                <div className={Styles.box_row}>
                    <div className={Styles.boxs} onClick={() => handleclick(6)}><h2 className={board[6] === 'X' ? Styles.X : Styles.O}>{board[6]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(7)}><h2 className={board[7] === 'X' ? Styles.X : Styles.O}>{board[7]}</h2></div>
                    <div className={Styles.boxs} onClick={() => handleclick(8)}><h2 className={board[8] === 'X' ? Styles.X : Styles.O}>{board[8]}</h2></div>
                </div>
            </div>
            {gamestatus && <div className={Styles.restart}>
                <button onClick={restart}>Play Again</button>
            </div>}
            </div>
      
    )
}

const Winnercheck = (Square) => {
    const winnerlist =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    for (let i = 0; i < winnerlist.length; i++) {
        const [a, b, c] = winnerlist[i];
        if (Square[a] && Square[a] === Square[b] && Square[a] === Square[c]) {
            return { winner: Square[a], combination: [a, b, c] };
        }
    }
    return null;
}

export default TicTacToe