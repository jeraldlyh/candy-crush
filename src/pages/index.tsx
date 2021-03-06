import type { NextPage } from "next"
import Image from "next/image"
import { useState, useEffect } from "react"
import HighScore from "../components/highscore"
import Leaderboards from "../components/leaderboards"
import Statistics from "../components/statistics"
import Tutorial from "../components/tutorial"
import { dragDrop, dragEnd, dragStart } from "../utils/action"
import { createBoard, moveCandiesDown } from "../utils/board"
import { checkForLinkedCandies } from "../utils/validate"


const Home: NextPage = () => {
    const [board, setBoard] = useState<object[]>([])
    const [score, setScore] = useState<number>(0)
    const [moves, setMoves] = useState<number>(10)
    const [currentSquare, setCurrentSquare] = useState<HTMLImageElement>()
    const [replacedSquare, setReplacedSquare] = useState<HTMLImageElement>()

    useEffect(() => {
        setBoard(createBoard())
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            checkForLinkedCandies(5, board, setScore)
            checkForLinkedCandies(4, board, setScore)
            checkForLinkedCandies(3, board, setScore)
            moveCandiesDown(board)
            setBoard([...board])            // Update current board with updated data called above
        }, 100)
        return () => clearInterval(timer)
    }, [board])

    const resetBoard = () => {
        setMoves(10)
        setScore(0)
        setBoard(createBoard())
    }

    return (
        <div className="flex flex-col h-full lg:flex-row justify-around items-center">
            <div className="lg:w-board">
                <Statistics moves={moves} score={score} />
                <div className="relative flex flex-wrap mt-3">
                    {
                        moves === 0
                            ? <HighScore score={score} resetBoard={resetBoard} />
                            : null
                    }
                    {
                        board && board.length !== 0
                            ? board.map((candyColor, index) => {
                                return (
                                    <div key={index} className="w-8 h-8 lg:w-box lg:h-box relative transition duration-100 hover:bg-gray-700">
                                        <Image
                                            src={Object.values(candyColor)[0]}
                                            key={index}
                                            layout="fill"
                                            data-id={index}
                                            draggable={moves !== 0}
                                            onDragOver={e => e.preventDefault()}
                                            onDragEnter={e => e.preventDefault()}
                                            onDragLeave={e => e.preventDefault()}
                                            onDragStart={e => dragStart(e, setCurrentSquare)}
                                            onDrop={e => dragDrop(e, setReplacedSquare)}
                                            onDragEnd={e => dragEnd(e, currentSquare, replacedSquare, board, setCurrentSquare, setReplacedSquare, setBoard, setMoves, setScore)}       // Logic goes into here
                                            alt={Object.keys(candyColor)[0]}
                                        />
                                    </div>
                                )
                            })
                            : <span className="italic">An error occurred</span>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <Leaderboards />
                <Tutorial />
            </div>
        </div>
    )
}

export default Home
