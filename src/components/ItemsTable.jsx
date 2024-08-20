import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";
import DeleteButton from "./DeleteButton";

export default function ItemsTable() {
    const { items } = useStock()

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Quantia</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                    <th>Entrada/Saída</th>
                    <th>Data</th>

                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td> R$ {item.amount} </td>
                        <td>{item.category}</td>
                        <td>
                            <Link to={`/items/${item.id}`} className="button is-primary is-small">
                                Ver
                            </Link>
                            <Link to={`/items/${item.id}/update`} className="button is-small">
                                Atualizar
                            </Link>
                            <DeleteButton itemId={item.id} itemName={item.name} />
                        </td>
                        <td>{(item.expense ? 'Saída' : 'Entrada')}</td>
                        <td>{item.createdAt.toLocaleDateString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}