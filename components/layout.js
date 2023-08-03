
export const Layout = ({ children }) => {

    return (
        <>
            <main>
                {children}
            </main>
            <footer className="site-footer">
                <p>Footer text, all rights reserved &copy;</p>
            </footer>
        </>
    )
}
