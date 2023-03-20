import React, { useState }  from 'react';
import { Formik, Field, Form, useFormikContext } from 'formik';
import styles from '../styles/Post.module.css';
import Select from 'react-select'
import axios from 'axios'
import { useAuth } from '../context/authContext';
import ImageUpload from '../components/ImageUpload'
import { IKImage } from 'imagekitio-react'
import cn from 'classnames'
import { useNavigate } from "react-router-dom";
import {Container} from 'react-bootstrap'
import ConfirmationPopup from '../components/ConfirmationPopup';

const options = [
  { value: 'Restaurant', label: 'Restaurant' },
  { value: 'Residence', label: 'Residence' },
  { value: 'Attractions', label: 'Attractions' },
  { value: 'Educational', label: 'Educational' },
  { value: 'Outdoors', label: 'Outdoors' },
  { value: 'Cultural', label: 'Cultural' },
  { value: 'Religious', label: 'Religious' },
  { value: 'Other', label: 'Other' }
]

const NewPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState(null);
  const {token} = useAuth()
  const url = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
 
  const saveNewPost = async (values) => {
    try {
      const post = {...values, image: selectedImage, category: category}
      const response = await axios.post(`${url}/posts`, post, { headers: {
          'Authorization': 'Bearer ' + token
        }})
      setError(null)
      setShowPopup(true)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
    <h2 className='text-center mb-5'>Publish Post</h2>
    <Formik
      initialValues={{
        title: '',
        description: '',
        date: '',
        country: '',
        city: '',
        rating: ''
      }}
      onSubmit={async (values) => {
        saveNewPost(values)
      }}
    >
      <Form>
      <div>
        {selectedImage && (
          <div>
            <IKImage path={`posts/${selectedImage}`} width={400} height={300}/>
            <br />
            <button className="btn btn-warning" onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      <br />
        <ImageUpload imageFolder={'posts'} setImageName={setSelectedImage} />
      </div>
    
            <Field 
            id="title" 
            name="title" 
            placeholder="Title" className="form-control"/>

        <Field className="form-control" name="description" placeholder="Description" rows={6} cols={50} />

        <br />
        <Select id="category" name="category" options={options} onChange={(e) => setCategory(e.value)}/>
        <br /> 

        <div className={styles.wrap}>
          <div className={styles.country}>
            <Field 
            className="form-control" 
            id="country" 
            name="country" 
            placeholder="Country" />
          <br/>
          </div>

          <div className={styles.city}>
            <Field 
            className="form-control" 
            id="city" 
            name="city" 
            placeholder="City" />
          <br/>
          </div>
        </div>

        <div className={styles.wrap}>
          <div className={styles.date}>
            <Field 
            className="form-control" 
            id="date" 
            name="date" 
            placeholder="MM/DD/YYYY" />
          <br/>
          </div>

          <div className={styles.rating}>
            <Field 
            className="form-control" 
            id="rating" 
            name="rating" 
            placeholder="Rating" />
          <br/>
          </div>
        </div>



        <br/>
        <div className='text-center'>
        <button type="submit" className={cn(styles.addPostButton, 'btn btn-success')}>Add Post</button>
        <button onClick={() => navigate('/my-posts')} type="reset" className={cn(styles.cancelButton, 'btn btn-danger')}>Cancel</button>
        </div>

      </Form>

    </Formik>
    <Container>{error && <div className='alert alert-danger my-3'>{`Error happened: ${error?.message}`}</div>}</Container>
    <ConfirmationPopup doAction={() => navigate('/my-posts')} title={"Done!"} message={"Your post was successfully published"} show={showPopup} setShow={setShowPopup}/>

    </div>
  );
};

export default NewPost;