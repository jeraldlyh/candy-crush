export const BOARD_SIZE: number = 9
export const CANDY_COLORS: object[] = [
    { "blue": "bg-blue-300" },
    { "green": "bg-green-300" },
    { "gray": "bg-gray-300" },
    { "purple": "bg-purple-300" },
    { "red": "bg-red-300" },
    { "yellow": "bg-yellow-300" },
]

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
            board[i] = {}
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
    return Object.keys(board[index]).length === 0
}

const getRandomColor = (): object => {
    const randomNum = Math.floor(Math.random() * CANDY_COLORS.length)
    return CANDY_COLORS[randomNum]
}