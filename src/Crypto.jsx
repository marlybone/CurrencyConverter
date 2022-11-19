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
      <div className="carouselItem">
        <img 
          src={coin?.image}
          alt={coin?.name}
          height="80"
          style={{ marginBottom: 10 }}
          ></img>
        <div style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}>
          {coin?.symbol?.toUpperCase()}
          <div>
            {profit && '+'}
            {coin?.price_change_percentage_24h_in_currency?.toFixed(2)}%
          </div>
        </div>
      </div>
    )
 })  

    const responsive = {
      0: { items: 4 },
      1024: { items: 8 },
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





