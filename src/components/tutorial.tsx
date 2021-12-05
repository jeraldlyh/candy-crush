

const Tutorial: React.FC = () => {
    return (
        <div className="flex flex-col mt-5 text-xs lg:text-sm">
            <span className="underline">How to play?</span>
            <span>
                Simply swap the candies to make a match of three or more (max 5) of the same color.
                <br />
                Each candy is worth 50 points. Submit your score and stand a chance to be on the leaderboards!
            </span>
        </div>
    )
}

export default Tutorial