import Head from 'next/head'
import userInfo from "../../data/usersInfo.json"

export default function DomHead({ pageName = "Home Page" }) {

    return (
        <Head>
            <title>{userInfo.name ? `${userInfo.name}'s Portfolio - ${pageName}` : `Portfolio - ${pageName}`}</title>
            {/* meta tags begins */}
            {/* Primary Meta Tags */}
            <meta name="title" content="Zahid's Portfolio" />
            <meta name="description" content="Know more about Zahid" />
            <meta name="keywords" content="Zahid, Portfolio, Developer, Projects" />
            <meta name="author" content="Zahid Hasan Patwary" />
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://github.com/0xZahidp/" />
            <meta property="og:title" content="Zahid's Portfolio" />
            <meta property="og:description" content="Know more about Zahid" />
            <meta property="og:image" content="https://example.com/path-to-your-image.jpg" /> {/* Update with correct URL */}

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://github.com/0xZahidp/" />
            <meta property="twitter:title" content="Zahid's Portfolio" />
            <meta property="twitter:description" content="Know more about Zahid." />
            <meta property="twitter:image" content="https://example.com/path-to-your-image.jpg" /> {/* Update with correct URL */}

            {/* meta tags end */}
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
            <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        </Head>
    )
}