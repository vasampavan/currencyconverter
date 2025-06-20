import { useEffect, useState } from "react"
import './currency.css'
function Currency(){
    const URL="https://v6.exchangerate-api.com/v6/008e365653b9bf3e79eec5da/latest/USD"
    const [amount1,setAmount1]=useState('')
    const [amount2,setAmount2]=useState('')
    const [currency1,setCurrency1]=useState('USD')
    const [currency2,setCurrency2]=useState('INR')
    const [exchangerate,setExchangerate]=useState({})
    useEffect(()=>{
        async function fetchExchangeRates(){
            try {
                const response=await fetch(URL)
                if(!response.ok){
                    throw new Error('Failed to fetch exchange rates')
                }
                const data=await response.json()
                setExchangerate(data.conversion_rates || {})
            } catch (error) {
                console.log("Error fetchin error",error)
            }
        } 
        fetchExchangeRates()
    },[])
    const convertCurrency=(amount,fromCurrency,toCurrency)=>{
        if(fromCurrency===toCurrency)return amount
        const rate=exchangerate[toCurrency]/exchangerate[fromCurrency]
        return (amount*rate).toFixed(2)
    }
    useEffect(()=>{
        if(exchangerate[currency1] && exchangerate[currency2]){
            const convertedAmount=convertCurrency(amount1,currency1,currency2)
            setAmount2(convertedAmount)
        }
    },[amount1,currency1,currency2,exchangerate])
    return(
        <>
         <h1>Currency Converter</h1>
        <div>
            
            <div className="inputandselect">
                <select  name="" id="" value={currency1} onChange={(e)=>setCurrency1(e.target.value)}>{Object.keys(exchangerate).map((country)=>(
                 <option key={country} value={country}>{country}</option>   
                ))}</select>
                <input type="number" name="" id="" value={amount1} onChange={(e)=>setAmount1(e.target.value)} />
            </div>
             <div className="inputandselect">
                <select name="" id="" value={currency2} onChange={(e)=>setCurrency2(e.target.value)}>{Object.keys(exchangerate).map((country)=>(
                 <option key={country} value={country}>{country}</option>   
                ))}</select>
                <input type="number" name="" id="" value={amount2} onChange={(e)=>setAmount2(e.target.value)} />
            </div>
        </div>
        </>
    )
}
export default Currency