import React, { useEffect, useState } from 'react'
import styles from "../styles/index.module.css"
import { supabase } from '../supabase'
import Postcard from '../components/Postcard'
import { Link } from 'react-router-dom'

const Index = () => {

    const [postcards, setPostcards] = useState(null)

    const getPostcards = async () => {
        let { data: postcards, error } = await supabase
        .from('postcards')
        .select('*')
        if(error) {console.log(error)}
        else { setPostcards(postcards.reverse())}
    }

    useEffect(() => {
      
        getPostcards()
    
      return () => {}
    }, [])

    return (
        <div>
            <h1 className='center-text'>Postcards from a Progressive Present</h1>
            <Link to='/create' className={styles['create-button']}>+ Create a postcard</Link>
            {
                !postcards ?
                    <p>Loading...</p>
                    :
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        { postcards.map((postcard) => <Postcard postcard={postcard} />) }
                    </div>
            }
        </div>
    )
}

export default Index