import React, { createContext, useState } from 'react'
import { food_items } from '../food';

// eslint-disable-next-line react-refresh/only-export-components
export const dataContext = createContext()


function UserContext({ children }) {
    let [input, setInput] = useState('');
    const [cat, setCat] = useState(food_items);
    const [showCart, setShowCart] = useState(false)
    let data = {
        input, setInput,
        cat, setCat,
        showCart, setShowCart,
    }

    return (
        <div>
            <dataContext.Provider value={data}>
                {children}
            </dataContext.Provider>


        </div>
    )
}

export default UserContext
