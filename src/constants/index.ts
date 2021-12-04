import BlueCandy from "../public/blue-candy.png"
import RedCandy from "../public/red-candy.png"
import GreenCandy from "../public/green-candy.png"
import OrangeCandy from "../public/orange-candy.png"
import YellowCandy from "../public/yellow-candy.png"
import PurpleCandy from "../public/purple-candy.png"
import Blank from "../public/blank.png"


export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.NEXT_PUBLIC_URL
export const BOARD_SIZE: number = 9
export const CANDY_COLORS: object[] = [
    { "blue": BlueCandy },
    { "red": RedCandy },
    { "green": GreenCandy },
    { "orange": OrangeCandy },
    { "yellow": YellowCandy },
    { "purple": PurpleCandy },
    { "blank": Blank },
]

export const getBlank = () => {
    return CANDY_COLORS[CANDY_COLORS.length - 1]
}
