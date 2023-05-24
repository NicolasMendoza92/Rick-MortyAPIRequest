
import Link from "next/link"
import { useRouter } from "next/router"


export const Layout = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <div className="header-nav">
                <h1>Rick & Morty Fandom</h1>
                <nav>
                            <Link className={router.pathname == "/" ? "active" : ""} href="/">
                                Personajes
                            </Link>
                            <Link className={router.pathname == "/episodes" ? "active" : ""} href="/episodes">
                                Episodios
                            </Link>
                </nav>
            </div>
            <main>
                {children}
            </main>
            <footer className="site-footer">
                <p>Footer text, all rights reserved &copy;</p>
            </footer>
        </>
    )
}
