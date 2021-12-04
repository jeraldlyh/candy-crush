import { addDoc, collection } from "firebase/firestore"
import firebaseApp from "../../database"


class NewUser {
    username!: string;
    score!: number;
}

export const addNewUser = async ({ username, score }: NewUser) => {
    if (!username || !score) {
        throw new Error("Fields are missing!")
    }
    const leaderboardCollection = collection(firebaseApp, "leaderboards")
    const newUser = await addDoc(leaderboardCollection, {
        username: username,
        score: score
    })
    return newUser
}