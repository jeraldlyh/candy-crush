import axiosInstance from "../axios"


export const createUser = async (username: string, score: number) => {
    console.log(username, score)
    await axiosInstance.post("/api/leaderboards", { username: username, score: score })
}