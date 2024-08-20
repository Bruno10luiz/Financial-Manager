import { useParams } from "react-router-dom";
import ItemForm from "../../components/ItemForm";
import useStock from "../../hooks/useStock";

export default function UpdateItems() {
    const { getItem } = useStock()
    const { id } = useParams()

    const item = getItem(id)

    return (
        <>
            <h2>Atualizar Transação</h2>
            <ItemForm itemToUpdate={item} />
        </>
    )
}