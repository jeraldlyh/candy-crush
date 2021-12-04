import { BOARD_SIZE } from "./board"

/**
 * Checks for candies that are chained consecutively
 * @param chain Length of candies consecutively in a row/col
 * @param board Candy crush board
 */
export const checkForLinkedCandies = (chain: number, board: object[]): boolean => {
    const maxBoardSize = BOARD_SIZE * BOARD_SIZE
    var foundMatch = false

    for (var i = 0; i < maxBoardSize; i++) {
        checkForColumn(board, i, chain, maxBoardSize) ? foundMatch = true : null
        checkForRow(board, i, chain) ? foundMatch = true : null
    }
    return foundMatch
}

/**
 * Checks for candies that are chain consecutively in a column
 * Last x rows of the board will be invalid to prevent ArrayOutOfBounds
 * @param board Candy crush board
 * @param index Current index in the board
 * @param chain Length of candies consecutively in a row/col
 * @param maxBoardSize Size of the whole board
 */
const checkForColumn = (board: object[], index: number, chain: number, maxBoardSize: number): boolean => {
    const invalidIndices = []

    for (var i = 0; i < BOARD_SIZE * (chain - 1); i++) {        // Last x rows will be invalid
        invalidIndices.push(maxBoardSize - 1 - i)
    }

    if (invalidIndices.includes(index)) return false

    const column = [index]
    for (var j = 1; j < chain; j++) {           // Fencepost
        column.push(index + BOARD_SIZE * j)     // Multiply by j to obtain next row in the same column
    }

    return validate(board, index, column)
}


/**
 * Checks for candies that are chain consecutively in a row
 * Last x columns of the board will be invalid to prevent ArrayOutOfBounds
 * @param board Candy crush board
 * @param index Current index in the board
 * @param chain Length of candies consecutively in a row/col
 */
const checkForRow = (board: object[], index: number, chain: number): boolean => {
    const invalidIndices = []
    var power = 1

    for (var i = 0; i < BOARD_SIZE; i++) {          // Last x columns will be invalid
        const startIndex = (BOARD_SIZE * power) - 1

        for (var j = 0; j < chain - 1; j++) {
            invalidIndices.push(startIndex - j)
        }
        power++
    }

    // Ignore cases where index is at the end -> unable to populate next few squares in line
    if (invalidIndices.includes(index)) return false

    const row = [index]                     // Fencepost
    for (var j = 1; j < chain; j++) {
        row.push(index + j)
    }
    return validate(board, index, row)
}

/**
 * Checks if the candies on the board are matched
 * @param board Candy crush board
 * @param index Current index in the board
 * @param rowColumn Consecutive indices to check if there's an actual match
 */
const validate = (board: object[], index: number, rowColumn: number[]): boolean => {
    const color = board[index]

    if (rowColumn.every(square => board[square] === color)) {
        rowColumn.forEach(square => board[square] = {})         // TODO: Do something
        return true
    }
    return false
}