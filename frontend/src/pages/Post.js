import React, {useState, useEffect} from 'react'
import styles from '../styles/Posts.module.css'
import { IKImage } from 'imagekitio-react'
import Comment from '../components/Comment'
import { Button, FormControl } from 'react-bootstrap'
import cn from 'classnames'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useParams } from 'react-router-dom'

const samplePost = {
    title: "Grazzie Restaurant",
    description: "The him father parish looked has sooner. Attachment frequently terminated son. You greater nay use prudent placing. Passage to so distant behaved natural between do talking. Friends off her windows painful. ",
    postedByUsername: "gilbert.dic",
    category: "Restaurant",
    country: "USA",
    city: "New York",
    rating: 4.2,
    createdAt:"2016-05-18T16:00:00Z",
    image: "/posts/cafe_tsSN1NUTbp.jpeg?updatedAt=1679179541011",
    comments: [
        {
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit", 
            date: new Date().toDateString(), 
            postedBy: "ewewewe" 
        },
        {
            body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui dignissimos ducimus", 
            date: new Date().toDateString(),
            postedBy: "tyrtyrty" 
        },
        {
            body: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit", 
            date: new Date().toDateString(),
            postedBy: "jkjkjkk" 
        },
    ],
    likes: ["dskdjlsjfd", "djsldjkslf", "djklsdjsl", "lsjdlskjd"]
}


const Post = () => {

    // get the id from query paramaters and make the request
    const { postId } = useParams()
    const {token} = useAuth()
    const url = process.env.REACT_APP_SERVER_URL
    const [post, setPost] = useState(null)
    const [liked, setLiked] = useState(false)
    const [newCommentBody, setNewCommentBody] = useState(null)

    const getPost = async () => {
        const response = await axios.get(`${url}/posts/getById/${postId}`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPost(response.data)
    }

    const addNewComment = () => {
        const newComment = {
            body: newCommentBody,
            postedBy: "dsjdfs", //TODO: change to userid
            date: new Date().toDateString
        }
        setNewCommentBody("")
        setPost({...post, comments: [...post?.comments, newComment]}) // TODO: connect to API to add a new comment to post
        
    }

    useEffect(() => {
        getPost(samplePost)
    }, [])

    return (
        <div>
            <div className={styles['back-button-div']}>
                <Button variant='light' href="/my-posts">Back to posts</Button>
            </div>
            
            <div className={styles['post-grid']}>
            <div className={styles['post-image-div']}>
                {post?.image ? <IKImage path={post?.image}/> : <img src="/no-image.jpg"/> }
            </div>
            <div className={styles['post-header-div']}>
                <h2>{post?.title}</h2>
                {post?.postedBy && <span className={styles['author-tag']}>Posted by {post?.postedByUser?.username}</span>}
                <span className={cn(styles['cat-tag'], 'd-block')}>{post?.category}</span>
                <span className={cn(styles['date-tag'], 'd-block')}>Posted on {post?.createdAt}</span>
                <span className={cn(styles['location-tag'], 'd-block')}>{post?.country}, {post?.city}</span>
                <span className={styles['rating-tag']}><img src='/star.png'/>{post?.rating} </span>

            </div>
            
            <div className={styles['post-body-div']}>
                <p>{post?.description}</p>
            </div>

            <div className={styles['post-footer-div']}>
                <a><img className={styles['comment-like']} src={liked ? "/like-filled.png" : "/like-empty.png"} onClick={() => setLiked(!liked)} /></a>
                <a><img className={styles['comment-like']} src={"/comment.png"}/></a>
            </div>

            
            
        </div>

        <div className={styles['post-comments-div']}>

                <div className={styles['new-comment-div']}>
                    <FormControl className={styles['new-comment']} value={newCommentBody} placeholder="New Comment ..." onChange={(e) => setNewCommentBody(e.target.value)}/>
                    <Button variant="light" onClick={() => addNewComment()}> + </Button>
                </div>
                
                <>{post?.comments?.map((comment) => {
                    return <Comment comment={comment} />
                })}
                </>
            </div>
        </div>
    )
}

export default Post