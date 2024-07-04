import React, { useContext, useEffect, useState, useCallback } from 'react'
import '../css/main.css'
import { StockContext } from '../context/StockContext'

export default function StockList(){
    const { stockData } = useContext(StockContext);
    const [ currentStock, setCurrentStock ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const fetchData = useCallback(async (stockSymbol) => {
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=77Y3C2EI9VPZ2LP0`)
            const json = await res.json();

            const currentPrice = Number(json['Global Quote']["05. price"]);
            const stockQty = Number(stockData[stockData.length - 1].quantity);
            const stockPrice = Number(stockData[stockData.length - 1].price);
            const calculateProfitLoss = (stockQty * currentPrice) - (stockQty * stockPrice);

            setCurrentStock(prevStock => [
                ...prevStock,
                { currentPrice, profitLoss: calculateProfitLoss.toFixed(2) }
            ]);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(false);
        }
    }, [stockData]);

    useEffect(() => {
        if (stockData.length > 0) {
            setLoading(true);
            const stock = stockData[stockData.length - 1];
            fetchData(stock.symbol);
        }
    }, [fetchData, stockData]);

    if (loading && stockData.length !==0) {
        return (
            <>
                <h2>Stock List</h2>
                <h3>Loading.......Loading.......Loading........</h3>
            </>
        )
    }

    return (
        <>
        <div className='stocklistcontainer'>
            <h2>Stock List</h2>
            <div>
                {stockData.length === 0 ? (
                    <h3>No stocks added yet.</h3>
                ) : (
                    <ul>
                        {stockData.map((stock, index) => (
                            <li key={index}>
                                <p>Symbol: {stock.symbol}</p>
                                <p>Quantity: {stock.quantity}</p>
                                <p>Purchase Price: {stock.price}</p>
                                <p>Current Price: {currentStock[index]?.currentPrice}</p>
                                {currentStock[index] && currentStock[index]?.profitLoss <0 ?(
                                    <p className='loss'>Profit/Loss: {currentStock[index]?.profitLoss}</p>
                                ) : (
                                    <p className='profit'>Profit/Loss: +{currentStock[index]?.profitLoss}</p>
                                )}
                                
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
        </>
    )
} //https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=77Y3C2EI9VPZ2LP0