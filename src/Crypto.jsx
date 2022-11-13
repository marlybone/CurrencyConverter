import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import './App.css'
import { Link } from 'react-dom/client'
import './App'

export default function Crypto(props) {
const {
  trending
} = props
  
        const items = trending.map((coin) => {
          
    return (
      <div className="carouselItem">
        <img 
          src={coin?.image}
          alt={coin.name}
          height="75"
          style={{ marginBottom: 10 }}
          ></img>
      </div>
    )
 })  

    return <div className="carousel">
    <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableeDotsControls
        autoPlay
        items={items}
      />
    </div>
  

}





