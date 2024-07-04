import React, { createContext, useState } from "react";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [stockData, setStockData] = useState([]);

    const addStock = (newStock) => {
        setStockData([...stockData, newStock]);

    };

    return (
        <StockContext.Provider value= {{ stockData, addStock}}>
            {children}
        </StockContext.Provider>
    );
}