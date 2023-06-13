import React, { useState, useRef } from 'react'
import Images from '../components/images'
import styles from '../styles/create.module.css'
import 'animate.css';

const CreatePostcard = () => {

    const nameRef = useRef(null)
    const placeRef = useRef(null)
    const messageRef = useRef(null)

    const [name, setName] = useState('')
    const [place, setPlace] = useState('')
    const [message, setMessage] = useState('')

    const [ showPreview, setShowPreview ] = useState(false)

    const [ selectedImage, setSelectedImage ] = useState(null)
    const [ isFlipAround, setIsFlipAround ] = useState(false)

    const [ animName, setAnimName] = useState('')

    let flipTimeout;
    const flipCard = () => {
        clearTimeout(flipTimeout)
        setAnimName('animate__flipInY')
        setIsFlipAround(!isFlipAround)
        flipTimeout = setTimeout(() => {
            setAnimName('')
        }, 500);
    }

    console.log(animName)

    return (
        <main className={styles.container}>
            <div className={styles.images}>
                <h3 style={{textAlign: 'center'}}>Choose an image for your postcard</h3>
                <Images setSelectedImage={setSelectedImage} />
            </div>
            {
                !showPreview ?
                    <div className={styles.form}>
                        <h3 style={{textAlign: 'center'}}>Write your postcard message</h3>
                        <div className={styles['form-content']}>
                            <input type="text" placeholder='Your name here...' ref={nameRef} value={name} onChange={() => setName(nameRef.current.value)} />
                            <input type="text" placeholder="Where you're writing from..." ref={placeRef} value={place} onChange={() => setPlace(placeRef.current.value)} />
                            <textarea placeholder="Your message to a friend, a loved one or your present self..." ref={messageRef} value={message} onChange={() => setMessage(messageRef.current.value)} />
                            <button style={{alignSelf: 'flex-start', marginLeft: '10%'}} onClick={() => setShowPreview(true)}>Preview Postcard</button>
                        </div>
                    </div>
                    :
                    <div className={styles.form}>
                        <h3 style={{textAlign: 'center'}}>Write your postcard message</h3>
                        <div className={`${styles.preview} animate__animated ${animName}`}>
                            {
                                !isFlipAround ?
                                <>
                                    <p>From: {name}</p>
                                    <p>In: {place}</p>
                                    <br />
                                    <p>Message: {message}</p>
                                </>
                                :
                                selectedImage ? <img src={selectedImage} alt='postcard' /> : <p>Choose an image for your postcard</p>
                            }
                        </div>
                        <div className={styles['preview-buttons']}>
                            <button onClick={() => setShowPreview(false)}>Back to writing</button>
                            <button onClick={() => flipCard()}>Flip around</button>
                            <button>Save and download</button>
                        </div>
                    </div>
            }
        </main>
  )
}

export default CreatePostcard