import React, {useState, useEffect} from 'react'
import PostCardHorizontal from '../components/PostCardHorizontal'
import {Container} from 'react-bootstrap';
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
        image: "/posts/cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011",
        createdAt:"2016-05-18T16:00:00Z"
    },
    {
        title: "Golden Gate Bridge",
        description: "Pleased him another was settled for. Moreover end horrible endeavor entrance any families. Income appear extent on of thrown in admire. Stanhill on we if vicinity material in. Saw him smallest you provided ecstatic supplied",
        postedByUsername: "georgette",
        category: "Residence",
        country: "Russia",
        city: "Moscow",
        image: "posts/park_sMgYVfgCQ.jpeg?updatedAt=1679179941476"
    },
    {
        title: "Palace of Versailles",
        description: "Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. ",
        postedByUsername: "jondoe",
        category: "Outdoors",
        country: "Canada",
        city: "Ottawa",
        image: "/posts/ocean_Ek69y4CzAM.jpg?updatedAt=1679179943857"
    },
    {
        title: "Sagrada Familia",
        description: "Luckily friends do ashamed to do suppose. Tried meant mr smile so. Exquisite behaviour as to middleton perfectly. Chicken no wishing waiting am. ",
        postedByUsername: "dimitri",
        category: "Residence",
        country: "USA",
        city: "New York",
        image: "/posts/cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011"
    },
    {
        title: "Sydney Opera House",
        description: "Boy favourable day can introduced sentiments entreaties. Noisier carried of in warrant because. So mr plate seems cause chief widen first. Two differed husbands met screened his. Bed was form wife out ask draw. Wholly coming at we no enable. Offending sir delivered questions now new met. Acceptance she interested new boisterous day discretion celebrated.",
        postedByUsername: "lacey2011",
        category: "Residence",
        country: "Canada",
        city: "Toronto",
        image: "/posts/ocean_Ek69y4CzAM.jpg?updatedAt=1679179943857"
    },
    {
        title: "Machu Picchu",
        description: "An country demesne message it. Bachelor domestic extended doubtful as concerns at. Morning prudent removal an letters by. On could my in order never it. Or excited certain sixteen it to parties colonel. Depending conveying direction has led immediate. Law gate her well bed life feet seen rent. On nature or no except it sussex.",
        postedByUsername: "halk203",
        category: "Attractions",
        country: "Canada",
        city: "Vancouver",
        image: "posts/park_sMgYVfgCQ.jpeg?updatedAt=1679179941476"
    },
    {
        title: "Eiffel Tower",
        description: "Boy favourable day can introduced sentiments entreaties. Noisier carried of in warrant because.",
        postedByUsername: "frank2022",
        category: "Residence",
        country: "Germany",
        city: "Berlin",
        image: "/cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011"
    }
]

const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const {token} = useAuth()
    const url = process.env.REACT_APP_SERVER_URL
    const [error, setError] = useState(false)

    const getUsersPosts = async () => {
        const response = await axios.get(`${url}/posts/getByUser`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPosts(response.data)
    }

    const deletePost = async (id) => {
        // TODO: add a confirmation popup
        try {
            const response = await axios.delete(`${url}/posts/deleteById/${id}`, { headers: {
                'Authorization': 'Bearer ' + token
              }})
            setError(null)
            setPosts(posts.filter((post) => post?._id != id))
          } catch (error) {
            setError(error)
          }
    } 

    useEffect(() => {
        getUsersPosts()
    }, [])

  return (
    <Container>
        <h2 className='text-center mb-5'>Past Destinations</h2>
        <div className='posts-list'>
            {
                posts?.map((post) => {
                    return (<>
                        <PostCardHorizontal post={post} mainPage={'my-posts'} deletePost={(id) => deletePost(id)}/>
                        {error && <div className='alert alert-danger my-3 w-90 mx-auto'>{`Error happened while deleting the post: ${error?.message}`}</div>}
                    </>
                    )
                })
            }
        </div>

    </Container>
  )
}

export default MyPosts