import React, { useState, useRef } from 'react'
import Images from '../components/images'
import styles from '../styles/create.module.css'
import 'animate.css';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

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

    const checkSubmission = () => {
        if(!name) { alert('Your postcard needs a name'); return false }
        if(!place) { alert("Please tell your recipient where you are writing from"); return false }
        if(!message) { alert('Your postcard needs a message'); return false }
        if(!selectedImage) { alert('Your postcard needs an image'); return false }
        
        return true
    }

    const savePostcard = async () => {

        if(checkSubmission()){
            console.log('submitting...')
            const { data, error } = await supabase
            .from('postcards')
            .insert([
            { name, place, message, image: selectedImage }])
            if(error) console.log(error)
            else {
                console.log('Postcard submitted successfully ', data)
            }
        }
    }

    return (
        <div>
            <Link to='/'>Home</Link>
            <div className={styles.container}>
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
                                <button onClick={() => savePostcard()}>Save and download</button>
                            </div>
                        </div>
                }
            </div>
        </div>
  )
}

export default CreatePostcard