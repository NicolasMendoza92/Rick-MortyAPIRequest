import Link from 'next/link'
import React from 'react'
import { useRouter } from "next/router"

export default function Header() {

    const router = useRouter();
  return (
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
  )
}
