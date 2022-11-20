import './App.css'
import Currency from './Currency'
import React, { useEffect, useState } from 'react'
import Crypto from './Crypto'
import 'react-alice-carousel/lib/alice-carousel.css'


const BASE_URL = 'https://api.exchangerate.host/latest';
const CRYPTO_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';

export default function App() {

const [trending, setTrending] = useState([])
  
 useEffect(() => {
    fetch(CRYPTO_URL)
    .then(res => res.json())
    .then(data => {
      setTrending(data)
    })
   },[])
  
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
              <Crypto
        trending={trending} />
                <div className="currency">
                <h1>Currency Converter</h1>
                </div>
              <div className="currency">
                <Currency
                    currencyOptions={currencyOptions}
                    selectCurrency={fromCurrency}
                    onChangeCurrency={e => setFromCurrency(e.target.value)}
                    amount={fromAmount}
                    OnChangeAmount={fromAmountChange} /></div>
                <div className='selector'>=</div>
              <div className="currency">
                <Currency
                    currencyOptions={currencyOptions}
                    selectCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    amount={toAmount}
                    OnChangeAmount={toAmountChange} />
                </div>
            </main>

  )}