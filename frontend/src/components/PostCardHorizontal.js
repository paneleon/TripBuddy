import React from 'react'
import {Button, Card, Row, Col} from 'react-bootstrap';
import styles from '../styles/Posts.module.css'
import { IKImage } from 'imagekitio-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getFormattedDateTime } from '../utils/utilFunctions';

const PostCardHorizontal = ({post, mainPage}) => {

    const navigate = useNavigate()

    const deletePost = async (id) => {
        // TODO: add a confirmation popup
    } 

  return (
    <div className={styles['horizontal-card-wrapper']}>
        <div className={styles['horizontal-card']}>
            <div className={styles['image-date-div']}>
                {post?.image ? (<IKImage path={`/posts/${post?.image}`}/> || <img src="/no-image.jpg"/>) : <img src="/no-image.jpg"/> }
                <Card.Subtitle className={styles['date-tag']}>Posted on {getFormattedDateTime(post?.createdAt)}</Card.Subtitle>
            </div>
            <div>
            <Card.Body>
                <div className={styles['tag-container']}>
                    <span>
                        <Card.Title>{post?.title}</Card.Title>
                        <Card.Subtitle className={styles['location-tag']}>{post?.country}, {post?.city}</Card.Subtitle>
                    </span>
                    <span className={styles.tag}>{post?.category}</span>
                </div>
                
                
                <Card.Text>
                    {post?.description.substring(0, 100) + "..."}
                </Card.Text>

                <Button className={styles['post-button']} variant='dark' href={`/${mainPage}/${post?._id}`}>View post</Button>
            </Card.Body>
            </div>
      </div>

            <div className={styles['buttons-div']}>
                <Button variant='outline-secondary' onClick={() => navigate(`/my-posts/edit/${post?._id}`)}> Update </Button>
                <Button variant='outline-danger' onClick={() => deletePost(post?._id)}> Delete </Button>
            </div>
    </div>
  )
}

export default PostCardHorizontal