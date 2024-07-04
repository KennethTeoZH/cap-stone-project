import React, { useState } from 'react'
import Form from './components/Form'
import StockList from './components/StockList'
import ScrollingText from './components/Scrollingtext'
import { StockProvider } from './context/StockContext'


function App() {
const [stockData, setStockData] = useState([]);

const handleFormSubmit = (data) => {
  setStockData((prevData) => [...prevData, data])
}
  return (
    
    <StockProvider>
      <ScrollingText/>

      <Form />
      <StockList />
    
    </StockProvider>
  )
}

export default App
