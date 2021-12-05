import firebaseApp from "../database"
import { onSnapshot, collection, query, orderBy, limit } from "firebase/firestore"
import { useState, useEffect, Fragment } from "react"


const Leaderboards: React.FC = () => {
    const [players, setPlayers] = useState<{ username: string, score: number }[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(firebaseApp, "leaderboards"), orderBy("score", "desc"), limit(5)),
            collection => {
                setPlayers(collection.docs.map(doc => {
                    const data = doc.data()
                    return { username: data.username, score: data.score }
                }))
            })

        return () => unsubscribe()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <span className="font-semibold lg:text-2xl text-lg">Leaderboards</span>
            <div className="grid grid-cols-3 gap-y-4 lg:text-xl text-sm mt-3">
                <span className="font-semibold underline">Rank</span>
                <span className="font-semibold underline">User</span>
                <span className="font-semibold underline ml-5">Score</span>
                {
                    players && players.length !== 0
                        ? players.map((player, index) =>
                            <Fragment key={index}>
                                <span>#{index + 1}</span>
                                <span>{player.username}</span>
                                <span className="ml-5">{player.score}</span>
                            </Fragment>
                        )
                        : null
                }
            </div>
        </div>
    )
}

export default Leaderboards