import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Emergency.module.css';
import { Button, Container, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useAuth } from '../context/authContext'

const Emergency = () => {
  const [email, setEmail] = useState(null)
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [updated, setUpdated] = useState(false);
  const {getToken} = useAuth();
  const token = getToken()
  const url = process.env.REACT_APP_SERVER_URL
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const getEmergencyContacts = async () => {
    try {
      const response = await axios.get(`${url}/emergency`, { headers: {
          'Authorization': 'Bearer ' + token
      }})
      setContacts(response.data)
      setError(null)
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }

  const addEmergencyContact = async () => {
    const confirmtoadd = window.confirm("Are you sure you want to add this email as your emergency contact ?")
    if (confirmtoadd)
    {
    try {
      if (email){
        setError(null)
      } else {
        return setError("Please provide a valid email")
      }
      await axios.put(`${url}/emergency/add/${email}`, {}, { headers: {
        'Authorization': 'Bearer ' + token
      }})
      setUpdated(true)
      setError(null)
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }
  }

  const removeEmergencyContact = async (id) => {
    const confirmationfordelete = window.confirm("Are you sure you want to remove this emergency contact information ?")
    if (confirmationfordelete)
    {
    try {
      await axios.put(`${url}/emergency/remove/${id}`, {}, { headers: {
        'Authorization': 'Bearer ' + token
      }})
      setUpdated(true)
      setError(null)
    } catch (error) {
      setError(error.response?.data?.message)
    }

    }
  }

  useEffect(() => {
    getEmergencyContacts()
    setUpdated(false)
  }, [updated])

  return (
    <div className={styles.form}>
      <h1>Emergency Contacts</h1>
        <Container>
          
          <div className={styles.addContact}>
          <FormGroup className='w-75 mx-auto text-start my-5'>
          <FormLabel>Enter Emergency Contact's email: </FormLabel>
          <FormControl className='mt-2 mb-4' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
          <span className='text-danger d-block mb-3'>{error}</span>
          <button className={styles.button} onClick={() => addEmergencyContact()}>Add</button>
          </FormGroup>
          </div>
          
          
          {
            contacts.length > 0 && contacts?.map((contact, index) => {
              return (
              <div className={styles.emergencyContact} key={index}>
                <h5>{contact.firstName} {contact.lastName}</h5>
                <h6>{contact.username}</h6>
                <h6>{contact.email}</h6>
                <h6>{contact.phone}</h6>
                <Button variant='danger' className='mt-4 mb-2' onClick={() => removeEmergencyContact(contact._id)}>Remove</Button>
              
                <textarea className='my-4 w-75 mx-auto form-control' placeholder='Enter your message here' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <Button variant='success' className=''>Send Message</Button>
              </div>)
            })
              
          }
          
          
        </Container>
    
    </div>
    
  );
};

export default Emergency;
