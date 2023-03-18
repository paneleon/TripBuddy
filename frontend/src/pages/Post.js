import React, { useState }  from 'react';
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Post.module.css';

const Post = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Formik
      initialValues={{
				photoURL: '',
        title: '',
        categories: '',
        country: '',
        city: '',
        date: '',
        rating: '',
        description: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
      <h1>Add New Post</h1>
      <div>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"100%"}
              height={"400px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button className={styles.removeButton} onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      <br />
        <input
          className={styles.photoArea}
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);          
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      
        <br />

      <div className={styles.wrap}>
        <div className={styles.title}>
              <Field 
              id="title" 
              name="title" 
              placeholder="Title" />
            <br/>
          </div>

        <div className={styles.categories}>
        <Field 
        align="center" 
        name="categories" 
        as="select">
          <option value="" selected disabled hidden>Select a Category</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Residence">Residence</option>
          <option value="Attractions">Attractions</option>
          <option value="Educational">Educational</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Cultural">Cultural</option>
          <option value="Religious">Religious</option>
          <option value="Other">Other</option>
        </Field>
        </div>
      </div>

        <div className={styles.wrap}>
          <div className={styles.country}>
            <Field 
            id="country" 
            name="country" 
            placeholder="Country" />
          <br/>
          </div>

          <div className={styles.city}>
            <Field 
            id="city" 
            name="city" 
            placeholder="City" />
          <br/>
          </div>
        </div>

        <div className={styles.wrap}>
          <div className={styles.date}>
            <Field 
            type="date"
            id="date" 
            name="date" 
            placeholder="MM/DD/YYYY" />
          <br/>
          </div>

          <div className={styles.rating}>
            <Field 
            id="rating" 
            name="rating" 
            placeholder="Rating" />
          <br/>
          </div>
        </div>
          <div align="center">
          <div className={styles.description}>
          <Field 
          id="description" 
          name="description" 
          component="textarea" 
          rows="4" />
          </div>
          </div>
        <br/>
        <button className={styles.addPostButton}>Add Post</button>
        <button type="button" className={styles.cancelButton} onClick={event =>  window.location.href='/home'} >Cancel</button>

      </Form>
    </Formik>
  );
};

export default Post;