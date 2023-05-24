import "../styles/global.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Layout } from "../components/layout";
import Head from "next/head";


export default function App({ Component, pageProps }) {

    return (
        <>
            <Head>
                <title>Rick & Morty Fan</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="App rick and morty " />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}

