import Picture from '../img/3d-illustration-of-financial-and-payment-concept-with-calculator-money-coin-and-credit-card-free-png.png'
import '../css/main.css'
import React, {useContext, useState} from 'react'
import { StockContext } from '../context/StockContext';

export default function Form(){
    const { addStock } = useContext(StockContext);
    const [formData, setFormData] = useState({ symbol: '', quantity: '', price: '' });

    const handleChange = (e)  => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addStock( formData );
        setFormData({ symbol: '', quantity: '', price: '' });
    };

    return (
        <>
        <div className='maincontainer'>
            <div className='imagecontainer'>
                <img src={Picture} alt='picture of finance' width={450} height={250}/>
            </div>
            
            <h1>Finance Dashboard</h1>
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <input 
                    id='inputs' 
                    name='symbol' 
                    type='text' 
                    placeholder='Stock Symbol' 
                    value={formData.symbol} 
                    onChange={handleChange}
                    required
                    />

                    <input 
                    id='inputs' 
                    name='quantity' 
                    type='number' 
                    placeholder='Quantity' 
                    value={formData.quantity} 
                    onChange={handleChange}
                    required
                    />

                    <input 
                    id='inputs' 
                    name='price' 
                    type='number' 
                    placeholder='Purchase Price' 
                    value={formData.price} 
                    onChange={handleChange}
                    required
                    />
                    <button id='button' type='submit'>Add Stock</button>

                </form>
            </div>

        </div>

        </>
    )
}