import React, {useState, useEffect} from 'react'
import styles from '../styles/Posts.module.css'
import { IKImage } from 'imagekitio-react'
import Comment from '../components/Comment'
import { Button, FormControl } from 'react-bootstrap'
import cn from 'classnames'
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { SavedPost } from '../components/Icons'

const Post = ({mainUrl, showSaved}) => {

    // get the id from query paramaters and make the request
    const { postId } = useParams()
    const {token, user} = useAuth()
    const url = process.env.REACT_APP_SERVER_URL
    const [post, setPost] = useState(null)
    const [liked, setLiked] = useState(false)
    const [newCommentBody, setNewCommentBody] = useState(null)
    const [saved, setSaved] = useState(false)

    const getPost = async () => {
        const response = await axios.get(`${url}/posts/getById/${postId}`, { headers: {
            'Authorization': 'Bearer ' + token
        }})
        setPost(response.data)
    }

    const savePost = async () => {
        if (!saved){
            await axios.put(`${url}/posts/save/${postId}`, {}, { headers: {
                'Authorization': 'Bearer ' + token
            }})
            setSaved(true)
        } else {
            await axios.put(`${url}/posts/removeSaved/${postId}`, {}, { headers: {
                'Authorization': 'Bearer ' + token
            }})
            setSaved(false)
        }
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
        setSaved(user?.savedPosts?.includes(postId))
        getPost()
    }, [user])

    return (
        <div>
            <div className={styles['back-button-div']}>
                <Button variant='light' href={mainUrl || "/my-posts"}>Back to posts</Button>
            </div>
            
            <div className={styles['post-grid']}>
            <div className={styles['post-image-div']}>
                {post?.image ? <IKImage path={`posts/${post?.image}`}/> : <img src="/no-image.jpg"/> }
            </div>
            <div className={styles['post-header-div']}>
                <h2>{post?.title}</h2>
                {post?.postedBy && <span className={styles['author-tag']}>Posted by {post?.postedByUser?.username}</span>}
                <span className={cn(styles['cat-tag'], 'd-block')}>{post?.category}</span>
                <span className={cn(styles['date-tag'], 'd-block')}>Posted on {post?.createdAt}</span>
                <span className={cn(styles['location-tag'], 'd-block')}>{post?.country}, {post?.city}</span>
                <span className={styles['rating-tag']}><img src='/star.png'/>{post?.rating} </span>
                <span className={cn(styles['date-tag'], 'd-block')}>Visisted on {post?.date}</span>

            </div>
            
            <div className={styles['post-body-div']}>
                <p>{post?.description}</p>
            </div>

            <div className={styles['post-footer-div']}>
                <div>
                <a><img className={styles['comment-like']} src={liked ? "/like-filled.png" : "/like-empty.png"} onClick={() => setLiked(!liked)} /></a>
                <a><img className={styles['comment-like']} src={"/comment.png"}/></a>
                </div>
                
                {showSaved && <SavedPost saved={saved} saveAction={savePost}/>}
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