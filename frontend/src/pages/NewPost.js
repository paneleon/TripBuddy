import React, { useState }  from 'react';
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Post.module.css';
import Select from 'react-select'

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
  return (
    <Formik
      initialValues={{
        photo: '',
        description: '',
        date: '',
        country: '',
        city: '',
        rating: '',
        categories: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
      <div>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"400px"}
              height={"300px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
      <br />
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
      
        <br />
        <Select options={options} />
        <br />

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

        <textarea name="description" rows={6} cols={50} />

        <br/>
        <button type="Add Post" className={styles.addPostButton}>Add Post</button>
        <button type="Cancel Post" className={styles.cancelButton}>Cancel</button>

      </Form>
    </Formik>
  );
};

export default NewPost;
