import React from "react"
import { createBoard } from "../utils/board"


interface Props {
    moves: number,
    score: number,
    setBoard: React.Dispatch<React.SetStateAction<object[]>>,
}

const Statistics: React.FC<Props> = ({ moves, score, setBoard }) => {
    const resetBoard = () => {
        setBoard(createBoard())
    }

    return (
        <div className="flex flex-col w-full justify-center items-center mt-3">
            <div className="flex w-full items-center justify-around">
                <div className="flex flex-col items-center justify-center">
                    <span className="text-xl uppercase underline">Moves</span>
                    <span>{moves}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="text-xl uppercase underline">Score</span>
                    <span>{score}</span>
                </div>
            </div>
            <button className="uppercase" onClick={resetBoard}>Try Again</button>
        </div>
    )
}

export default Statistics