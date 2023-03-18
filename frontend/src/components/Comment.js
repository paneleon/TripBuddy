import React from 'react'
import styles from '../styles/Comment.module.css'

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>
        <p>{comment?.body}</p>
        <span>{comment?.postedBy}</span>
        <span>{comment?.date}</span>
    </div>
  )
}

export default Comment