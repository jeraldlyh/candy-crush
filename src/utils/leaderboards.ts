import axiosInstance from "../axios"


export const createUser = async (username: string, score: number) => {
    await axiosInstance.post("/api/leaderboards", { username: username, score: score })
}