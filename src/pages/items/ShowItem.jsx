import { Link, useParams } from "react-router-dom"
import useStock from "../../hooks/useStock"
import DeleteButton from "../../components/DeleteButton"

export default function ShowItems() {
    const { getItem } = useStock()
    const { id } = useParams()
    const item = getItem(id)

    return (
        <div className="item">
            <h2>{item.name}</h2>
            <Link to={`/items/${item.id}/update`} className="button is-small">Atualizar</Link>
            <DeleteButton itemId={item.id} itemName={item.name} />
            <div className="row">
                <span>Categoria: {item.category}</span>
                <span>Tipo: {`${item.expense ? 'Saída' : 'Entrada'}`}</span>
                <span>Valor: R$ {item.amount}</span>
            </div>
            <p>{item.expense}</p>
            <div className="row">
                <p>Cadastrado em: {item.createdAt.toLocaleDateString()}</p>
                <p>Atualizado em: {item.updatedAt.toLocaleDateString()}</p>

            </div>
        </div>
    )
}