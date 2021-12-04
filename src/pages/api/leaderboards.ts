import type { NextApiRequest, NextApiResponse } from 'next'
import { addNewUser } from '../../database/actions/leaderboard'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case "GET":
                break
            case "POST":
                console.log(req.body)
                const response = await addNewUser(req.body)
                return res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}
