import React from "react"
import { BOARD_SIZE } from "../constants"
import { checkForLinkedCandies } from "./validate"


export const dragDrop = (e: React.DragEvent<HTMLImageElement>, setReplacedSquare: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>): void => {
    setReplacedSquare(e.target as HTMLImageElement)
}

export const dragStart = (e: React.DragEvent<HTMLImageElement>, setCurrentSquare: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>): void => {
    setCurrentSquare(e.target as HTMLImageElement)
}

export const dragEnd = (e: React.DragEvent<HTMLImageElement>, currentSquare: HTMLImageElement | undefined, replacedSquare: HTMLImageElement | undefined, board: object[], setCurrentSquare: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>, setReplacedSquare: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>, setBoard: React.Dispatch<React.SetStateAction<object[]>>, setMoves: React.Dispatch<React.SetStateAction<number>>, setScore: React.Dispatch<React.SetStateAction<number>>): void => {
    if (!(currentSquare && replacedSquare)) return

    const currentSquareId = parseInt(currentSquare.getAttribute("data-id")!)
    const replacedSquareId = parseInt(replacedSquare.getAttribute("data-id")!)
    swapSquares(board, currentSquareId, replacedSquareId)

    if (isValidMove(currentSquareId, replacedSquareId) &&
        (checkForLinkedCandies(5, board, setScore) || checkForLinkedCandies(4, board, setScore) || checkForLinkedCandies(3, board, setScore))
    ) {                                                         // Reset state for next move
        setCurrentSquare(undefined)
        setReplacedSquare(undefined)
        setMoves(number => number - 1)
    } else {
        swapSquares(board, currentSquareId, replacedSquareId)   // Revert the swaps
        setBoard([...board])                                    // Update the board to its original placements
    }
}

/**
 * Checks if the index where the box goes into is valid within [up, down, left, right]
 * @param currentSquareId Index of the square being dragged
 */
const isValidMove = (currentSquareId: number, replacedSquareId: number) => {
    const validMoves = [
        currentSquareId - BOARD_SIZE,
        currentSquareId + BOARD_SIZE,
        currentSquareId - 1,
        currentSquareId + 1,
    ]
    return validMoves.includes(replacedSquareId)
}

const swapSquares = (board: object[], currentSquareId: number, replacedSquareId: number) => {
    const tempSquare = board[currentSquareId]
    board[currentSquareId] = board[replacedSquareId]
    board[replacedSquareId] = tempSquare
}
