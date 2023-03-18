import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Payment.module.css';

const Payment = () => {

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
				cardNumber: '',
				expirationDate: '',
        CVC: '',
        nameOnCard: '',
				address: '',
				phone: '',
				country: '',
				city: '',
				postalCode: '',
				date: '',
			}}
			onSubmit={async (values) => {
				await new Promise((r) => setTimeout(r, 500));
				alert(JSON.stringify(values, null, 2));
			}}
    	>
		
		<Form>
			<h1>Payment Info</h1>
			<br />
				<Field 
				id="cardNumber" 
				name="cardNumber" 
				placeholder="Card Number"
				/>
				<Field 
        type="month"
				id="expirationDate" 
				name="expirationDate" 
				placeholder="MM/YY"
				/>
				<Field 
				id="CVC" 
				name="CVC" 
				placeholder="CVC"
				/>
      <br />
        <Field 
				id="nameOnCard" 
				name="nameOnCard" 
				placeholder="Name On Card"
				/>
				<Field
        type="email" 
				id="email" 
				name="email" 
				placeholder="Email"
				/>
			<br />
      <Field 
				id="phone" 
				name="phone" 
				placeholder="Phone"
				/>
				<Field 
				id="address" 
				name="address" 
				placeholder="Address"
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
				<button type="submit" className={styles.savePaymentButton}>Save</button>
				<button type="button" className={styles.cancelPaymentButton} onClick={event =>  window.location.href='/home'} >Cancel</button>
				</Form>
    		</Formik>
	);
};

export default Payment