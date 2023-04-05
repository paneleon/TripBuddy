import React from 'react'
import Suggestions from '../components/Suggestions'
import styles from '../styles/Home.module.css'
import Notifications from '../components/Notifications'

const Home = () => {
  return (
    <div className={styles.homeLayout}>
      <h2 className={styles.title}>Welcome to Trip Buddy</h2>
      <div className={styles.suggestions}><Suggestions /></div>
      <div className={styles.notifications}><Notifications /></div>
      <div className={styles.checklist}>Checklist</div>

    </div>
  )
}

export default Home