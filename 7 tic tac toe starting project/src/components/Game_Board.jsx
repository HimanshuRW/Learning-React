import { useState } from "react";

export default function Game_Board({game_board,update}){

    return (
        <ol id="game-board">
            {game_board.map((row,rowIndex)=>{
                return(
                    <li>
                        <ol>
                            {row.map((playerSymbol,colIndex)=>{
                                return(
                                    <li>
                                        <button onClick={()=>update(rowIndex,colIndex)}>{playerSymbol}</button>
                                    </li>
                                )
                            })}
                        </ol>
                    </li>
                )
            })}
        </ol>
    )
}