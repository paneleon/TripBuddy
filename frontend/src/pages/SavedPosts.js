import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ConfirmationPopup from '../components/ConfirmationPopup'
import PostCardHorizontal from '../components/PostCardHorizontal'
import styles from '../styles/Posts.module.css'

const samplePosts = [
    {
        _id: 'sdksdjflr',
        title: "Pyramids of Giza",
        description: "The him father parish looked has sooner. Attachment frequently gay terminated son. You greater nay use prudent placing. Passage to so distant behaved natural between do talking. Friends off her windows painful. ",
        postedByUsername: "gilbert.dic",
        category: "Restaurant",
        country: "USA",
        city: "New York",
        image: "cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        _id: 'jkjkjkjkjk',
        title: "Golden Gate Bridge",
        description: "Pleased him another was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provided ecstatic supplied",
        postedByUsername: "georgette",
        category: "Residence",
        country: "Russia",
        city: "Moscow",
        image: "park_sMgYVfgCQ.jpeg?updatedAt=1679179941476",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        _id: 'fdfdfdfdf',
        title: "Sagrada Familia",
        description: "Luckily friends do ashamed to do suppose. Tried meant mr smile so. Exquisite behaviour as to middleton perfectly. Chicken no wishing waiting am. ",
        postedByUsername: "dimitri",
        category: "Residence",
        country: "USA",
        city: "New York",
        image: "cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        _id: 'vbvbgfhfgbvb',
        title: "Sydney Opera House",
        description: "Boy favourable day can introduced sentiments entreaties. Noisier carried of in warrant because. So mr plate seems cause chief widen first. Two differed husbands met screened his. Bed was form wife out ask draw. Wholly coming at we no enable. Offending sir delivered questions now new met. Acceptance she interested new boisterous day discretion celebrated.",
        postedByUsername: "lacey2011",
        category: "Residence",
        country: "Canada",
        city: "Toronto",
        image: "ocean_Ek69y4CzAM.jpg?updatedAt=1679179943857",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        _id: 'asasasass',
        title: "Machu Picchu",
        description: "An country demesne message it. Bachelor domestic extended doubtful as concerns at. Morning prudent removal an letters by. On could my in order never it. Or excited certain sixteen it to parties colonel. Depending conveying direction has led immediate. Law gate her well bed life feet seen rent. On nature or no except it sussex.",
        postedByUsername: "halk203",
        category: "Attractions",
        country: "Canada",
        city: "Vancouver",
        image: "park_sMgYVfgCQ.jpeg?updatedAt=1679179941476",
        createdAt:"2016-05-18T16:00:00Z"
    },
]

const SavedPosts = () => {
    const [savedPosts, setSavedPosts] = useState([])
    const navigate = useNavigate()
    const [showPopup, setShowPopup] = useState(false)
    const [error, setError] = useState(false)

    const removeFromSaved = async (id) => {
        const confirmed = window.confirm("Are you sure you want to remove this post from saved?");
        if (confirmed){
            try { 
            console.log("post to be removed ", id)
            } catch (error) {
                setError(error)
            }
        }
    }

    const getSavedPosts = async () => {

    }

    useEffect(() => {
        setSavedPosts(samplePosts)
    }, [])

  return (
    <Container>
        <h2 className='text-center mb-5'>Saved Destinations</h2>
        <div className='posts-list'>
            {
                savedPosts?.map((post) => {
                    return (<div className={styles["post-horizontal-container"]}>
                        <PostCardHorizontal post={post} mainPage={'saved'} showPostedBy={true}/>
                        {error && <div className='alert alert-danger my-3 w-90 mx-auto'>{`Error happened while removing the post from saved list: ${error?.message}`}</div>}
                        <ConfirmationPopup doAction={() => navigate('/saved')} title={"Successful !"} message={"Post removed from saved list !"} show={showPopup} setShow={setShowPopup}/>
                        <div className={styles['remove-btn']} onClick={() => removeFromSaved(post?._id)}><img src="remove.png"/></div>
                    </div>
                    )
                })
            }
        </div>

    </Container>
  )
}

export default SavedPosts