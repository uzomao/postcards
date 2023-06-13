import React from 'react'

import styles from '../styles/image.module.css'

const images = [
    'https://i.postimg.cc/L83Tk4cw/uzz-a-futuristic-local-market-square-with-diverse-african-peopl-115cca1b-3591-4c42-8068-5225fe8b865d.png',
    'https://i.postimg.cc/d1LjK2hc/nomd8.png',
    'https://i.postimg.cc/Y0FNvtNX/nomd-4.png',
    'https://i.postimg.cc/26MFj1Wb/uzz-futuristic-nigerian-one-naira-note-golden-images-of-fishing-edeab32e-b68c-427f-98b6-4a57eee6d0e4.png',
    'https://i.postimg.cc/Bn45v9jg/uzz-African-city-in-the-future-hyperrealistic-770b3a36-7795-42d1-8209-a929fb166397.png',
    'https://i.postimg.cc/GmKF87Y1/uzz-futuristic-african-city-with-many-trees-flying-cars-mono-ra-7cdedb88-7bf1-4eac-90f9-59986aaab44a.png',
]

const Images = ({ setSelectedImage }) => {
  return (
    <div className={styles.container}>
        {
            images.map((image, index) => <img src={image} key={index} alt='postcard' onClick={() => setSelectedImage(image)} />)
        }
    </div>
  )
}

export default Images