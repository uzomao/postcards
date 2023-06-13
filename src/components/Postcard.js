import React from 'react'
// import styles from 'postcard.module.css'
import { FaTimesCircle } from 'react-icons/fa'

const Postcard = ({ postcard, viewPostcard, setViewPostcard }) => {

    const { name, place, message, image } = postcard

    const styles = {
        container: {
            display: 'flex',
            width: '30%',
            margin: '0 1.5%'
        },
        postcardContainer: {
            width: '100%',
            margin: '2rem 0'
        },
        postcard: {
            height: '300px',
            padding: '5px',
            borderRadius: '20px',
            backgroundColor: '#ebd3b3',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            cursor: 'pointer'
        },
        image: {
            maxWidth: '100%'
        },
        modalContainer: {
            position: 'absolute',
            width: '100%', height: '100vh',
            top: '0', left: '0',
            background: '#fff',
            opacity: '0.95',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        },
        viewPostcard: {
            width: '50%', height: '50%',
            backgroundColor: '#ebd3b3',
            borderRadius: '20px',
            padding: '20px',
            zIndex: '9',
            opacity: '1'
        },
        closeBtn: {
            position: 'absolute',
            right: '0',
            top: '-5px',
            fontSize: '24px',
            color: 'red', cursor: 'pointer'
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.postcardContainer} onClick={() => setViewPostcard(true)}>
                <div style={styles.postcard}>
                </div>
                <p style={{textAlign: 'center'}}>{name}, {place}</p>
            </div>
            {
                viewPostcard && 
                    <div style={styles.modalContainer}>
                        <div style={styles.viewPostcard} className='animate__animated animate__flipInY'>
                            <FaTimesCircle style={styles.closeBtn} onClick={() => setViewPostcard(false)} />
                            <p>From: {name}</p>
                            <p>In: {place}</p>
                            <br />
                            <p>Message: {message}</p>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Postcard