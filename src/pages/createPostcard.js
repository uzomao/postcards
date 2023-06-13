import React, { useState, useRef } from 'react'
import Images from '../components/images'
import styles from '../styles/create.module.css'
import 'animate.css';
import { supabase } from '../supabase';
import { Link, useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas"

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

    const [ isSaved, setIsSaved ] = useState(false)
    const navigate = useNavigate()

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

    let navigateTimeout;
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
                setIsSaved(true)
                download('postcard-preview')
                // download('postcard-preview-download')
                clearTimeout(navigateTimeout)
                navigateTimeout = setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        }
    }

    const download = async (elementId) => {
        const element = document.getElementById(elementId)
        const canvas = await html2canvas(element)
        const image = canvas.toDataURL('image/jpg')
        const fileName = 'postcard.jpg'

        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;

        fakeLink.href = image;

        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);

        fakeLink.remove();
    }

    return (
        <div>
            <Link to='/' className='button'>Home</Link>
            { isSaved && <p className={styles['is-saved']}>Your postcard has been saved successfully</p>}
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
                            <>
                            {
                                !isFlipAround ?
                                    <div className={`${styles.preview} animate__animated ${animName}`} id='postcard-preview'>
                                        <p>From: {name}</p>
                                        <p>In: {place}</p>
                                        <br />
                                        <p>Message: {message}</p>
                                    </div>
                                :
                                selectedImage ? <div className={`${styles.preview} ${styles['preview-image']} animate__animated ${animName}`} style={{backgroundImage: `url(${selectedImage})`}}></div> : <div className={`${styles.preview} animate__animated ${animName}`}><p>Your image shows here</p></div>
                            }
                            </>
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