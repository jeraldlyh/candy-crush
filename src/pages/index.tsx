import classNames from "classnames"
import type { NextPage } from "next"
import Image from "next/image"
import { useState, useEffect } from "react"
import { createBoard } from "../utils/board"

const Home: NextPage = () => {
    const [board, setBoard] = useState<object[]>([])
    const [score, setScore] = useState(0)

    useEffect(() => {
        setBoard(createBoard())
    }, [])

    return (
        <div className="w-board h-board">
            <div className="flex flex-wrap">
                {
                    board && board.length !== 0
                        ? board.map((candyColor, index) => {
                            
                            return <div
                                key={index}
                                className={`${Object.values(candyColor)} w-box h-box border border-black`}
                            // alt={candyColor}
                            />
                        })
                        : "idk"
                }
            </div>
            <div className="flex flex-col justify-center items-center mt-3">
                <span className="text-xl uppercase underline">Score</span>
            </div>
        </div>
    )
}

export default Home
