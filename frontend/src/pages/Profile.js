import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Profile.module.css';

const Profile = () => {
	const [selectedImage, setSelectedImage] = useState(null);
  	// const navigate = useNavigate()
	// const [firstName, setFirstName] = useState('')
	// const [lastName, setLastName] = useState('')
	// const [address, setAddress] = useState('')
	// const [phone, setPhone] = useState('')
	// const [country, setCountry] = useState('')
	// const [city, setCity] = useState('')
	// const [postalCode, setPostalCode] = useState('')
	// const [date, setDate] = useState('')
	// const [sex, setSex] = useState('')
	// const [email, setEmail] = useState('')
	// const [password, setPassword] = useState('')

	// async function registerUser(event) {
	// 	event.preventDefault()

	// 	const response = await fetch('http://localhost:3000/register', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({
	// 			username,
	// 			email,
	// 			password,
	// 		}),
	// 	})

	// 	const data = await response.json()

	// 	if (data.status === 'ok') {
	// 		navigate.push('/login')
	// 	}
	// }

	return (
		<Formik
			initialValues={{
				photoURL: '',
				firstName: '',
				lastName: '',
				address: '',
				phone: '',
				country: '',
				city: '',
				postalCode: '',
				date: '',
				sex: '',
				email: '',
				password: '',
				confirmPassword: '',
			}}
			onSubmit={async (values) => {
				await new Promise((r) => setTimeout(r, 500));
				alert(JSON.stringify(values, null, 2));
			}}
    	>
		
		<Form>
			<h1>Profile</h1>
			{/* Photo Area */}
			<div>
        		{selectedImage && (
          		<div>
					<img
					alt="not found"
					width={"100%"}
					height={"400px"}
					src={URL.createObjectURL(selectedImage)}
					/>
            	<button className={styles.removeButton} onClick={() => setSelectedImage(null)}>Remove</button>
          		</div>
        		)}
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
			{/* End of Photo Area */}
			<br />
				<Field 
				id="firstName" 
				name="firstName" 
				placeholder="First Name"
				/>
				<Field 
				id="lastName" 
				name="lastName" 
				placeholder="Last Name"
				/>
			<br />
				<Field 
				id="address" 
				name="address" 
				placeholder="Address"
				/>
				<Field 
				id="phone" 
				name="phone" 
				placeholder="Phone"
				/>
			<br />
				<Field 
				id="country" 
				name="country" 
				placeholder="Country"
				/>
				<Field 
				id="city" 
				name="city" 
				placeholder="City"
				/>
			<br />
				<Field 
				id="postalCode" 
				name="postalCode" 
				placeholder="Postal Code"
				/>
				<Field 
				type="date"
				id="date" 
				name="date" 
				placeholder="YYYY/MM/DD"
				/>
			<br />
				<Field 
				align="center"
				id="sex" 
				name="sex" 
				as="select" >
				<option value="" selected disabled hidden>Sex</option>
				<option value="male">Male</option>
				<option value="female">Female</option>
				<option value="default">Prefer not to say</option>
				</Field>
				<Field 
				type="email"
				id="email" 
				name="email" 
				placeholder="Email"
				/>
			<br />
				<Field 
				type="password"
				id="password" 
				name="password" 
				placeholder="Password"
				/>
				<Field 
				type="password"
				id="confirmPassword" 
				name="confirmPassword" 
				placeholder="Confirm Password"
				/>
			<br />
				<button type="submit" className={styles.saveProfileButton}>Save</button>
				<button type="button" className={styles.cancelProfileButton} onClick={event =>  window.location.href='/home'} >Cancel</button>
				</Form>
    		</Formik>
	);
};

export default Profile