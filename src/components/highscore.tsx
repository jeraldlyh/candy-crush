import React, { useState } from "react"
import { createUser } from "../utils/leaderboards"


interface Props {
    score: number,
    resetBoard: () => void
}

const HighScore: React.FC<Props> = ({ score, resetBoard }) => {
    const [username, setUsername] = useState<string>("")

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        await createUser(username, score)
        resetBoard()
    }

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        resetBoard()
    }

    return (
        <div className="absolute flex flex-col items-center justify-center w-full h-full bg-opacity-75 bg-gray-200 z-10 text-black">
            <span className="text-3xl font-semibold">OOPS!</span>
            <span className="text-xl font-semibold">You&#39;ve just ran out of moves!</span>
            <div className="flex flex-col mt-5 space-y-4">
                <span className="self-center uppercase">Highscore</span>
                <div className="relative">
                    <input
                        name="username"
                        id="username"
                        className="peer p-2 rounded-md placeholder-transparent"
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <label
                        htmlFor="username"
                        className="
                                absolute 
                                left-2 
                                -top-5 
                                text-sm 
                                text-gray-800 
                                transition-all
                                peer-placeholder-shown:text-base 
                                peer-placeholder-shown:text-gray-600 
                                peer-placeholder-shown:top-2 
                                peer-focus:-top-5
                                peer-focus:text-gray-800
                                peer-focus:text-sm
                                ">
                        Username
                    </label>
                </div>
                <div className="flex justify-around mt-2">
                    <button className="hover:bg-green-400 p-2 rounded-md" onClick={handleSubmit}>Submit</button>
                    <button className="hover:bg-red-400 p-2 rounded-md" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default HighScore