import React from "react"


interface Props {
    moves: number,
    score: number,
}

const Statistics: React.FC<Props> = ({ moves, score }) => {
    return (
        <div className="flex flex-col w-full justify-center items-center mt-3">
            <div className="flex w-full items-center justify-around">
                <div className="flex flex-col items-center justify-center">
                    <span className="lg:text-lg uppercase underline">Moves</span>
                    <span className="font-semibold lg:text-xl">{moves}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <span className="lg:text-lg uppercase underline">Score</span>
                    <span className="font-semibold lg:text-xl">{score}</span>
                </div>
            </div>
        </div>
    )
}

export default Statistics