import classNames from "classnames"
import type { NextPage } from "next"
import Image from "next/image"
import { useState, useEffect } from "react"
import { onDrag, onDragEnd, onDragStart } from "../utils/action"
import { createBoard, moveCandiesDown } from "../utils/board"
import { checkForLinkedCandies } from "../utils/validate"


const Home: NextPage = () => {
    const [board, setBoard] = useState<object[]>([])
    const [score, setScore] = useState(0)
    const [currentSquare, setCurrentSquare] = useState({})
    const [replacedSquare, setReplacedSquare] = useState({})

    useEffect(() => {
        setBoard(createBoard())
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForLinkedCandies(3, board)
            moveCandiesDown(board)
            setBoard([...board])            // Update current board with updated data called above
        }, 150)
        return () => clearInterval(timer)
    }, [board])

    const resetBoard = () => {
        setBoard(createBoard())
    }

    return (
        <div className="w-board h-board">
            <div className="flex flex-wrap">
                {
                    board && board.length !== 0
                        ? board.map((candyColor, index) => {

                            return <img
                                key={index}
                                className={`${Object.values(candyColor)} w-box h-box border border-black`}
                                data-id={index}
                                draggable={true}
                            />
                        })
                        : "idk"
                }
            </div>
            <div className="flex flex-col justify-center items-center mt-3">
                <span className="text-xl uppercase underline">Score</span>
                <button onClick={resetBoard}>Reset</button>
            </div>
        </div>
    )
}

export default Home
