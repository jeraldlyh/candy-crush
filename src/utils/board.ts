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

/**
 * Checks for candies that are chained consecutively
 * @param chain Length of candies consecutively in a row/col
 * @param board Candy crush board
 */
export const checkForLinkedCandies = (chain: number, board: object[]) => {
    const maxBoardSize = BOARD_SIZE * BOARD_SIZE

    for (var i = 0; i < maxBoardSize; i++) {
        checkForColumn(board, i, chain, maxBoardSize)
        checkForRow(board, i, chain)
    }
}

/**
 * Checks for candies that are chain consecutively in a column
 * Last x rows of the board will be invalid to prevent ArrayOutOfBounds
 * @param board Candy crush board
 * @param index Current index in the board
 * @param chain Length of candies consecutively in a row/col
 * @param maxBoardSize Size of the whole board
 */
const checkForColumn = (board: object[], index: number, chain: number, maxBoardSize: number) => {
    const invalidIndices = []

    for (var i = 0; i < BOARD_SIZE * (chain - 1); i++) {        // Last x rows will be invalid
        invalidIndices.push(maxBoardSize - i)
    }

    if (invalidIndices.includes(index)) return

    const column = [index]
    for (var j = 1; j < chain; j++) {           // Fencepost
        column.push(index + BOARD_SIZE * j)     // Multiply by j to obtain next row in the same column
    }

    validate(board, index, column)
}


/**
 * Checks for candies that are chain consecutively in a row
 * Last x columns of the board will be invalid to prevent ArrayOutOfBounds
 * @param board Candy crush board
 * @param index Current index in the board
 * @param chain Length of candies consecutively in a row/col
 */
const checkForRow = (board: object[], index: number, chain: number) => {
    const invalidIndices = []
    var power = 1

    for (var i = 0; i < BOARD_SIZE; i++) {          // Last x columns will be invalid
        const startIndex = (BOARD_SIZE - 1) * power

        for (var j = 0; j < chain - 1; j++) {
            invalidIndices.push(startIndex - j)
        }
        power++
    }

    // Ignore cases where index is at the end -> unable to populate next few squares in line
    if (invalidIndices.includes(index)) return

    const row = [index]                     // Fencepost
    for (var j = 1; j < chain; j++) {
        row.push(index + j)
    }
    validate(board, index, row)
}

/**
 * Checks if the candies on the board are matched
 * @param board Candy crush board
 * @param index Current index in the board
 * @param rowColumn Consecutive indices to check if there's an actual match
 */
const validate = (board: object[], index: number, rowColumn: number[]) => {
    const color = board[index]

    if (rowColumn.every(square => board[square] === color)) {
        rowColumn.forEach(square => board[square] = {})         // TODO: Do something
    }
}

export const moveCandiesDown = (board: object[]) => {
    const endIndex = BOARD_SIZE * BOARD_SIZE - BOARD_SIZE       // Prevent ArrayOutOfBounds from accessing beyond last row

    for (var i = 0; i < endIndex; i++) {
        if (isCurrentSquareEmpty(board, i + BOARD_SIZE)) {
            board[i + BOARD_SIZE] = board[i]
            board[i] = {}
        }
    }
}

const isCurrentSquareEmpty = (board: object[], index: number): boolean => {
    return Object.keys(board[index]).length === 0
}

const getRandomColor = (): object => {
    const randomNum = Math.floor(Math.random() * CANDY_COLORS.length)
    return CANDY_COLORS[randomNum]
}