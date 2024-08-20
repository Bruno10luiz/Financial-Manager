import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StockContext = createContext({});



export function StockContextProvider({ children }) {

    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)
    const [total, setTotal] = useState(0)

    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('manager-finance')
        if (!storedItems) return []
        const items = JSON.parse(storedItems)

        items.forEach((item) => {
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
        })
        return items
    })

    useEffect(() => {
        const expense = items
            .filter(item => item.expense)
            .reduce((acc, cur) => acc + Number(cur.amount), 0)

        const income = items
            .filter(item => !item.expense)
            .reduce((acc, cur) => acc + Number(cur.amount), 0)

        const total = income - expense

        setIncome(income)
        setExpense(expense)
        setTotal(total)
    }, [items])



    const addItem = (item) => {
        setItems(current => {
            const updatedItems = [item, ...current]

            setItems(updatedItems)
            localStorage.setItem('manager-finance', JSON.stringify(updatedItems))

            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(current => {
            const itemIndex = current.findIndex(item => item.id === +itemId)
            const updatedItems = [...current]
            Object.assign(updatedItems[itemIndex], newAttributes, { updatedAt: new Date() })
            localStorage.setItem('manager-finance', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const deleteItem = (itemId) => {
        setItems(current => {
            const updatedItems = current.filter(item => item.id !== itemId)
            localStorage.setItem('manager-finance', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        getItem,
        updateItem,
        deleteItem,
        income,
        expense,
        total
    };

    return (
        <StockContext.Provider value={stock}>
            {children}
        </StockContext.Provider>
    )
}

StockContextProvider.propTypes = {
    children: PropTypes.node
}

