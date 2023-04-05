import React, {useState, useEffect} from 'react'
import {getFormattedDateTime} from '../utils/utilFunctions'
import styles from '../styles/Notification.module.css'
import { Alert, Button } from 'react-bootstrap'

const sampleNotifications = [
    {
        notification: "You have a new friend request ",
        email: "john@email.com",
        notificationBy: "fjdfjldkjfkldjlfd",
        date: new Date()
    },
    {
        notification: "You've received a new email ",
        email: "john@email.com",
        notificationBy: "fjdfjldkjfkldjlfd",
        date: new Date()
    },
    {
        notification: "A payment of $50 has been received in your account",
        email: "john@email.com",
        notificationBy: "fjdfjldkjfkldjlfd",
        date: new Date()
    },
    {
        notification: "Your subscription is expiring soon",
        email: "john@email.com",
        notificationBy: "fjdfjldkjfkldjlfd",
        date: new Date()
        },
    {
        notification: "You have a new message from Jane ",
        email: "john@email.com",
        notificationBy: "fjdfjldkjfkldjlfd",
        date: new Date()
    },
]

const Notifications = () => {

    const [notifications, setNotifications] = useState([])

    const getNotifications = async () => {
        setNotifications(sampleNotifications)
    }

    const viewNotification = async () => {
        
    }

    useEffect(() => {
        getNotifications()
    }, [])

  return (
    <div>
        <h4 className='mb-4'>Notifications</h4>
      {notifications.length > 0 
      
      ? notifications.map((not, i) => {
        return (
        <Alert key={i} variant="success" className="my-3 w-75 d-flex flex-row justify-content-between align-items-start">
            <div>
            {not.notification}
            <span className={styles.notificationDate}>{getFormattedDateTime(not.date)}</span>
            </div>
            <Button variant="light" onClick={() => viewNotification()}>OK</Button>
        </Alert>)
        })
        : <div>
            <h5 className='text-secondary mt-5'>You have no notifications</h5>
        </div>
        }
    </div>
  )
}

export default Notifications