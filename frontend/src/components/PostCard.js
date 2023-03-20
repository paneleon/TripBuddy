import React, {useState, useEffect} from 'react'
import { Card, Button } from 'react-bootstrap'
import styles from '../styles/Browse.module.css'

const PostCard = ({post}) => {
  
    return (
    <>
        <Card className={styles['post-preview']}>
        <img variant="top" src={post?.image || '/tripbuddy_icon_lg.png'}/>
        <Card.Body>
            
            <Card.Title>{post?.title}</Card.Title>
            <div className={styles['tag-container']}>
                <Card.Subtitle className={styles['location-tag']}>{post?.country}, {post?.city}</Card.Subtitle>
                <span className={styles['tag']}>{post?.category}</span>
            </div>
            
            <Card.Text>
                {post?.description.substring(0, 80) + "..."}
            </Card.Text>
            <Card.Text className={styles['author-tag']}>By {post?.postedByUsername}</Card.Text>
            <Button className={styles["post-button"]} variant='secondary'>View post</Button>
        </Card.Body>
        </Card>
    </>
  )
}

export default PostCard