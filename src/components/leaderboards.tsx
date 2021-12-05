import firebaseApp from "../database"
import { onSnapshot, collection, query, where, orderBy, limit } from "firebase/firestore"
import { useState, useEffect } from "react"


const Leaderboards: React.FC = () => {
    const [players, setPlayers] = useState<{ username: string, score: number }[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firebaseApp, "leaderboards"), orderBy("score", "desc"), limit(5)),
            collection => {
                console.log(collection.docs)
                setPlayers(collection.docs.map(doc => {
                    const data = doc.data()
                    return { username: data.username, score: data.score }
                }))
            })

        return () => unsubscribe()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <span className="font-semibold text-3xl">Leaderboards</span>
            <div className="space-y-4 text-xl mt-3">
                {
                    players && players.length !== 0
                        ? players.map((player, index) =>
                            <div key={index} className="flex space-x-4 items-center justify-center">
                                <span>{player.username}</span>
                                <span>{player.score}</span>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    )
}

export default Leaderboards