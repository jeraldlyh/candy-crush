export const BOARD_SIZE = 9
export const CANDY_COLORS = [
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
        const randomNum = Math.floor(Math.random() * CANDY_COLORS.length)
        const randomColor = CANDY_COLORS[randomNum]
        randomBoard.push(randomColor)
    }

    return randomBoard
}