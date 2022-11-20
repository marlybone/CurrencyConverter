import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import './App.css'
import './App'

export default function Crypto(props) {
const {
    trending
} = props

        const items = trending.map((coin) => { 
          const profit = coin?.price_change_percentage_24h_in_currency >= 0;
    return (
      <div style={{
          justifyContent: "center",
          textAlign: "center",
          
      }}>
        <img 
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10,
                   marginTop: 15,
                 }}
          ></img>
        <div
          style={{
              fontWeight: 500,
              marginBottom: 50, 
              padding: "0.3rem",
              color: "white",
                }}>
          {coin?.symbol?.toUpperCase()}
          <div
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            }}>
          {profit && '+'}
          {coin?.price_change_percentage_24h_in_currency?.toFixed(2)}%
          </div>
          <div className="price">
          {"£" + coin?.current_price.toFixed(2)}
          </div>
        </div>
      </div>
    )
 })  

    const responsive = {
      0: { items: 2 },
      1024: { items: 4 },
    };

    return <div className="carousel">
    <AliceCarousel 
        mouseTracking
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        infinite
        constrolStrategy="alternative"
        autoPlay
              />
    </div>
  

}





