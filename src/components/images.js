import React from 'react'

import image1 from '../images/image1.png'
import image2 from '../images/image1.png'
import image3 from '../images/image1.png'
import image4 from '../images/image1.png'
import image5 from '../images/image1.png'
import image6 from '../images/image1.png'

import styles from '../styles/image.module.css'

const images = [image1, image2, image3, image4, image5, image6]

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