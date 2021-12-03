import "tailwindcss/tailwind.css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-black h-screen w-screen text-white p-10">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
