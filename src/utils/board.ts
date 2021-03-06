import { BOARD_SIZE, CANDY_COLORS, getBlank } from "../constants"


export const createBoard = (): object[] => {
    const randomBoard: object[] = []

    for (var i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        randomBoard.push(getRandomColor())
    }
    return randomBoard
}

export const moveCandiesDown = (board: object[]): void => {
    const endIndex = BOARD_SIZE * BOARD_SIZE - BOARD_SIZE       // Prevent ArrayOutOfBounds from accessing beyond last row

    for (var i = 0; i < endIndex; i++) {
        if (isCurrentSquareEmpty(board, i)) {
            generateCandies(board, i)
        }

        if (isCurrentSquareEmpty(board, i + BOARD_SIZE)) {
            board[i + BOARD_SIZE] = board[i]
            board[i] = getBlank()
        }
    }
}

const generateCandies = (board: object[], index: number): void => {
    const firstRowIndices = [...Array(10).keys()]

    if (firstRowIndices.includes(index) && isCurrentSquareEmpty(board, index)) {
        board[index] = getRandomColor()
    }
}

const isCurrentSquareEmpty = (board: object[], index: number): boolean => {
    return board[index] === getBlank()
}

const getRandomColor = (): object => {
    const randomNum = Math.floor(Math.random() * CANDY_COLORS.length)
    return CANDY_COLORS[randomNum]
}