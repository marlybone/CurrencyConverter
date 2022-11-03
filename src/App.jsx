import './App.css'
import Currency from './Currency'
import React, { useEffect, useState } from 'react'

const BASE_URL = 'https://api.exchangerate.host/latest';

export default function App() {
const [currencyOptions, setCurrencyOptions] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [amount, setAmount] = useState(1)
const [amountFromCurrency, setAmountCurrency] = useState(true)
const [exchangeRate, setExchangeRate] = useState()

let  toAmount, fromAmount
  if (amountFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  
useEffect(() => {
  fetch(BASE_URL)
  .then(res => res.json())
  .then(data => {
    const firstCurrency = Object.keys(data.rates)[0] 
    setCurrencyOptions([...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setExchangeRate(data.rates[firstCurrency])
  })
},[])

useEffect(() => {
  if (fromCurrency != null && toCurrency != null) {
    fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])
  

function fromAmountChange(e) {
  setAmount(e.target.value)
  setAmountCurrency(true)
}  

function toAmountChange(e) {
  setAmount(e.target.value)
  setAmountCurrency(false)
}  
  
return (
    <main>
      <h1>Currency Converter</h1>
      <Currency 
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        OnChangeAmount={fromAmountChange}
        />
      <div className='selector'>=</div>
      <Currency 
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        OnChangeAmount={toAmountChange}
        />
    </main>
  )
}
