import React, { useEffect, useState } from 'react'
import Styles from './Popup.module.css'
const Popup = ({ restart, gamestatus, playerO, playerX }) => {




    return (
        <div className={Styles.Popup_box}>
            <div className={Styles.Status_msg}>
                <h1 className={
                    gamestatus === 'GAME OVER: No Winners'
                        ? Styles.draw
                        : gamestatus.includes(`'${playerO}' wins!`)
                            ? Styles.Owinnertext
                            : gamestatus.includes(`'${playerX}' wins!`)
                                ? Styles.Xwinnertext
                                : Styles.default
                }>
                    {gamestatus}
                </h1>

            </div>
            <div className={Styles.G_status_name}></div>
            <div className={Styles.restart}>
                <button onClick={restart}>Play Again</button>
            </div>
        </div>
    )
}

export default Popup