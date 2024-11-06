import React, { useEffect, useState } from 'react'
import Styles from './TicTacToe.module.css'
import Strike from './Components/Strike/Strike'
import Popup from './Components/Popup/Popup'
import Player from './Components/Player/Player'

const TicTacToe = () => {
    const initialboard = Array(9).fill("")
    const [board, setboard] = useState(initialboard)
    const [player, setplayer] = useState(true)
    const [gamestatus, setgamestatus] = useState(null)
    const [strike, setstrike] = useState([])
    const [playername, setplayername] = useState({
        PlayerX:'',
        PlayerO:'',
    })
    const [showPopup, setShowPopup] = useState(false);
    


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
           
               {winner === 'X' && setgamestatus(`GAME OVER: '${playername.PlayerX}' wins!`);}
               {winner === 'O' && setgamestatus(`GAME OVER: '${playername.PlayerO}' wins!`);}
           
        }
        else if (newboard.every((square) => square !== "")) {
            setgamestatus("GAME OVER: No Winners");
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
        setShowPopup(false)
    }

   const PlayerNameChange  = (e)=>{
      setplayername({
        ...playername,
        [e.target.name]:e.target.value
      })
   }



   useEffect(() => {
    if (gamestatus) {
      // Apply a delay before showing the popup
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 350); // 1000 ms (1 second) delay

      // Clear the timer if gamestatus changes or component unmounts
      return () => clearTimeout(timer);
    } else {
      setShowPopup(false); // Hide popup if gamestatus is false
    }
  }, [gamestatus]);

    return (
        <div className={Styles.body} >
            
            <div className={Styles.label}>
                <h1  className={Styles.default} >
                   Tic Tac Toe
                </h1>
            </div>
           <div className={Styles.wrapper}>
           <div className={Styles.Set_player_name}>
                    <Player 
                    type='text'
                    className={ Styles.input_name}
                    className_row={ player ? Styles.turn_to_X : Styles.default_nameStyle}
                    name='PlayerX'
                    placeholder='Player  X'
                    value={playername.PlayerX}
                    onchange={PlayerNameChange}/>

                    <Player 
                    type='text'
                    className={Styles.input_name }
                    className_row={ player ? Styles.default_nameStyle : Styles.turn_to_O}
                    name='PlayerO'
                    placeholder='Player  O'
                    value={playername.PlayerO}
                    onchange={PlayerNameChange}/>
                   
                </div>
            <div className={Styles.container}>
                 { strike && <Strike strike={strike} />} {/* calling the Strike component */}

                 {showPopup && <Popup restart={restart} gamestatus={gamestatus} playerX={playername.PlayerX} playerO={playername.PlayerO} />}      {/* calling the Popup component for the result */}
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
           
            </div>
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