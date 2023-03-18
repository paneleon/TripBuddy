import React from 'react'
import styles from '../styles/Comment.module.css'

const Comment = ({comment}) => {
  return (
    <div className={styles.comment}>
        <span className='d-block' style={{fontWeight: "bold"}}>{comment?.postedBy}</span>
        <p>{comment?.body}</p>
        <span className='d-block'  style={{fontStyle: "italic"}}>{comment?.date}</span>
    </div>
  )
}

export default Comment