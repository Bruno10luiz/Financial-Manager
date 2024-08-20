import { Link, Outlet, useLocation } from "react-router-dom";

export default function ItemsLayout() {
    const { pathname } = useLocation()
    return (
        <main>
            <h1>Gerenciamento React</h1>
            <div className="tabs">
                <Link
                    to="/items"
                    className={`tab ${pathname === "/items" ? "active" : ""}`}
                >
                    Todas as transações
                </Link>
                <Link
                    to="/items/new"
                    className={`tab ${pathname === "/items/new" ? "active" : ""} `}>Nova transação
                </Link>
            </div>
            <Outlet />

        </main>
    )
}