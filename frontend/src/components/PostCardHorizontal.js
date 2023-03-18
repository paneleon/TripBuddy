import React from 'react'
import {Button, Card, Row, Col} from 'react-bootstrap';
import styles from '../styles/Posts.module.css'

const PostCardHorizontal = ({post}) => {

  return (
    <div className={styles['horizontal-card-wrapper']}>
        <div className={styles['horizontal-card']}>
            <div>
                <img variant="top" src={post?.image || '/tripbuddy_icon_lg.png'}/>
                <Card.Subtitle className={styles['date-tag']}>Posted on {post?.createdAt}</Card.Subtitle>
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

                <Button className={styles['post-button']} variant='dark'>View post</Button>
            </Card.Body>
            </div>
      </div>

            <div className={styles['buttons-div']}>
                <Button variant='outline-secondary'> Update </Button>
                <Button variant='outline-danger'> Delete </Button>
            </div>
    </div>
  )
}

export default PostCardHorizontal