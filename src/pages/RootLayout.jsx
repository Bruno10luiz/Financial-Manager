import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <header>
                <Link to="/" className="logo"> GESTOR DE TRANSAÇÕES</Link>
                <nav>
                    <Link to="/">INÍCIO</Link>
                    <Link to="/items">TRANSAÇÕES</Link>
                </nav>
            </header>
            <div>
                <Outlet />

            </div>

        </>
    )
}