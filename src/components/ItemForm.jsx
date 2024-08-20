import PropTypes from "prop-types"
import { useState, useEffect } from "react"
import useStock from "../hooks/useStock"

ItemForm.propTypes = {
    itemToUpdate: PropTypes.object
}

const generateId = () => Math.floor(Math.random() * 100000000)

export default function ItemForm({ itemToUpdate }) {
    const defaultItem = {
        id: "",
        name: "",
        description: "",
        amount: 0,
        category: "",
        expense: false,
    }

    // Se o itemToUpdate existir será usado como valor inicial
    const [item, setItem] = useState(itemToUpdate || defaultItem)
    const { updateItem, addItem } = useStock()

    // UseEffect para inicializar o formulário com os dados do item a ser atualizado
    useEffect(() => {
        if (itemToUpdate) {
            setItem(itemToUpdate)
        }
    }, [itemToUpdate])

    // Desestruturando os valores do item
    const { name, category, amount, description, expense } = item

    const handleChange = (ev) => {
        const { name, value } = ev.target
        setItem(prevItem => ({
            ...prevItem,
            [name]: value
        }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()

        if (!name || !amount || amount < 1) {
            alert("Nome e valor positivos são obrigatórios!")
            return
        }

        else if (itemToUpdate) {
            updateItem(item.id, {
                ...item,
                updatedAt: new Date(),
            })
            alert("Item atualizado com sucesso!")
        } else {
            addItem({
                ...item,
                id: generateId(),
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            alert("Item cadastrado com sucesso!")
            setItem(defaultItem)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="amount">Valor</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={amount}
                        onChange={handleChange}
                        required
                        min={0.00}
                        step={0.01}
                    />
                </div>

                <div className="flex">
                    <input
                        type="radio"
                        id="incomeRadio"
                        name="expense"
                        checked={!expense}
                        onChange={() => setItem(prevItem => ({ ...prevItem, expense: false }))}
                    />
                    <label htmlFor="incomeRadio">Entrada</label>

                    <input
                        type="radio"
                        id="expenseRadio"
                        name="expense"
                        checked={expense}
                        onChange={() => setItem(prevItem => ({ ...prevItem, expense: true }))}
                    />
                    <label htmlFor="expenseRadio">Saída</label>
                </div>

                <div>
                    <label htmlFor="category">Categorias</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={category}
                        onChange={handleChange}
                        placeholder="Ex.: Cartão, Casa, boleto, salário, etc..."
                        required
                    />
                </div>
            </div>

            <div className="form-control">
                <label htmlFor="description">Descrição</label>
                <textarea
                    name="description"
                    id="description"
                    rows={6}
                    value={description}
                    onChange={handleChange}
                    placeholder="Escreva alguma anotação se necessário..."
                />
            </div>

            <button className="button is-primary is-large" type="submit">
                {itemToUpdate ? 'Atualizar' : 'Salvar'}
            </button>
        </form>
    )
}


