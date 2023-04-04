import React, {useState, useEffect} from 'react'
import { Carousel } from 'react-bootstrap'
import styles from '../styles/Suggestions.module.css'
import { IKImage } from 'imagekitio-react'
import { useAuth } from '../context/authContext';
import axios from 'axios';

const samplePosts = [
    {
        title: "Pyramids of Giza",
        description: "The him father parish looked has sooner. Attachment frequently gay terminated son. You greater nay use prudent placing. Passage to so distant behaved natural between do talking. Friends off her windows painful. ",
        postedByUsername: "gilbert.dic",
        category: "Restaurant",
        country: "USA",
        city: "New York",
        image: "c5974915_5_DNGtkeLZm.jpg",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        title: "Golden Gate Bridge",
        description: "Pleased him another was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provided ecstatic supplied",
        postedByUsername: "georgette",
        category: "Residence",
        country: "Russia",
        city: "Moscow",
        image: "park_sMgYVfgCQ.jpeg?updatedAt=1679179941476"
    },
    {
        title: "Palace of Versailles",
        description: "Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. ",
        postedByUsername: "jondoe",
        category: "Outdoors",
        country: "Canada",
        city: "Ottawa",
        image: "ocean_Ek69y4CzAM.jpg?updatedAt=1679179943857"
    }
]

const Suggestions = () => {

    const {getToken, user, userId} = useAuth()
    const token = getToken()
    const url = process.env.REACT_APP_SERVER_URL
    const [posts, setPosts] = useState([])
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  

    useEffect(() => {
        setPosts(samplePosts)
    }, [])

    return (
    <div>
        <h4>Suggestions</h4>
        <Carousel activeIndex={index} className={styles.carousel}  onSelect={handleSelect}>
            {
                posts.length > 0 && posts?.map((post) => {
                    return (
                        <Carousel.Item interval={2000}>
                        {post?.image ? <IKImage className={styles.image} path={`posts/${post?.image}`}/> : <img /> }
                        <div className={styles.content}>
                        <h3>{post?.title}</h3>
                        <div className={styles.tags}>
                            <span className={styles.city}>{post?.city}</span>
                            <span className={styles.category}>{post?.category}</span>
                        </div>
                        <p>{post?.description.substring(0, 80) + "..."}</p>
                        </div>
                        </Carousel.Item>
                    )
                })
            }
        </Carousel>

    </div>
  )
}

export default Suggestions