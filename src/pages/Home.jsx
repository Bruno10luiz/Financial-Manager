import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import BarChart from "../components/ChartPie";

export default function Home() {
    const { items, income, expense, total } = useStock()


    const today = new Date()
    const limitDate = new Date()
    limitDate.setDate(limitDate.getDate() - 10)

    const recentItems = items.filter((item) => {
        const createdAt = new Date(item.createdAt)
        return createdAt >= limitDate && createdAt <= today
    })

    const recentTotal = recentItems.length

    const formatCurrency = (value) => {
        const numberValue = Number(value)
        return isNaN(numberValue) ? "R$ 0,00" : `R$ ${numberValue.toFixed(2).replace('.', ',')}`
    }

    return (
        <main>
            <h1>Controle de gastos</h1>

            <div className="row">
                <div className="dashboard-card">
                    <h2>Entradas</h2>
                    <span>{formatCurrency(income)}</span>
                </div>
                <div className="dashboard-card">
                    <h2>Saídas</h2>
                    <span>{formatCurrency(expense)}</span>
                </div>
                <div className="dashboard-card">
                    <h2>Total</h2>
                    <span>{formatCurrency(total)}</span>
                </div>

                <div className="dashboard-card">
                    <h2>Transações recentes</h2>
                    <span>{recentTotal}</span>
                </div>



            </div>
            <div className="chart-container">

                <BarChart />
            </div>
            <div className="row">
                <div className="recent">
                    <table>
                        <thead>
                            <tr>
                                <th>Itens Recentes</th>
                                <th>Ações</th>
                                <th>Tipo de transação</th>
                                <th>Quantia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td><Link to={`/items/${item.id}`} className="button is-small">Ver</Link></td>
                                    <td>{(item.expense ? 'Saída' : 'Entrada') || "N/A"}</td>
                                    <td>{formatCurrency(item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}


/*

import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";


export default function Home() {
    const { items, income, expense, total } = useStock();

    const inventoryTotal = items.reduce((sum, item) => +sum + +item.quantity, 0);

    const today = new Date();
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() - 10);
    const recentItems = items.filter((item) => item.createdAt >= limitDate && item.createdAt <= today);
    const recentTotal = recentItems.length;

    return (
        <main>
            <h1>Dashboard</h1>

            <div className="row">
                <div className="dashboard-card">
                    <h2>Entradas</h2>
                    <span>{income}</span>
                </div>
                <div className="dashboard-card">
                    <h2>Saídas</h2>
                    <span>{expense}</span>
                </div>

                <div className="dashboard-card">
                    <h2>Total</h2>
                    <span>{total}</span>
                </div>
                <div className="dashboard-card">
                    <h2>Total de transações</h2>
                    <span>{inventoryTotal}</span>
                </div>
                <div className="dashboard-card">
                    <h2>Total de transações</h2>
                    <span>{inventoryTotal}</span>
                </div>

                <div className="dashboard-card">
                    <h2>Compras recentes</h2>
                    <span>{recentTotal}</span>
                </div>
            </div>

            <div className="row">
                <div className="recent">
                    <table>
                        <thead>
                            <tr>
                                <th>Itens Recentes</th>
                                <th>Ações</th>
                                <th>Tipo de transação</th>
                                <th>Dinheiro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td><Link to={`/items/${item.id}`} className="button is-small">Ver</Link></td>
                                    <td>{item.balance}</td>
                                    <td>R${item.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

*/