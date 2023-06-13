import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Postcard = () => {

    let { state } = useLocation()
    const { name, place, message } = state.postcard

    const styles = {
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
            position: 'relative',
            left: '100%',
            top: '-10%',
            fontSize: '24px',
            color: 'red', cursor: 'pointer'
        },
    }

  return (
        <div style={styles.modalContainer}>
            <div style={styles.viewPostcard}>
                <Link to='/'>
                    <FaTimesCircle style={styles.closeBtn} />
                </Link>
                <p>From: {name}</p>
                <p>In: {place}</p>
                <br />
                <p>Message: {message}</p>
            </div>
        </div>
  )
}

export default Postcard