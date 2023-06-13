import React from 'react'
// import styles from 'postcard.module.css'
import { Link } from 'react-router-dom'

const Postcard = ({ postcard }) => {

    const { id, name, place, image } = postcard
    console.log(postcard)

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
        link: {
            width: '100%',
            textDecoration: 'none',
            color: 'inherit'
        }
    }

    return (
        <div style={styles.container}>
            <Link to={`/postcard/${id}`} state={{ postcard }} style={styles.link}>
                <div style={styles.postcardContainer}>
                    <div style={styles.postcard}>
                    </div>
                    <p style={{textAlign: 'center'}}>{name}, {place}</p>
                </div>
            </Link>
        </div>
    )
}

export default Postcard