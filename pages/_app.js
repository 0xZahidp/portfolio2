import "../styles/global.css"
import { DataContextProvider } from "../context/DataContext" // Import the provider

export default function App({ Component, pageProps }) {
    return (
        <DataContextProvider>
            <Component {...pageProps} />
        </DataContextProvider>
    )
}