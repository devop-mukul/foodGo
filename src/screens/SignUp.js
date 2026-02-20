import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    const [formData, setFormData] = useState({name: "", email: "", password: "", location:""});

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            // {name: formData.name, email: formData.email, password: formData.password, geoLocation: formData.geoLocation}
        });

        if(!response.ok){
            throw new Error('Server error. Try again later.');
        }

        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials");
        }
    }
    const onChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
  return (
    <>
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className = "mb-3">
                    <label htmlFor = "name" className = "form-label">Name</label>
                    <input type="text" className = "form-control" name="name" value = {formData.name} onChange={onChange}/>
                </div>
                <div className = "mb-3">
                    <label htmlFor = "exampleInputEmail1" className = "form-label">Email address</label>
                    <input type="email" className = "form-control" name="email" value = {formData.email} onChange={onChange}/>
                    <div id="emailHelp" className = "form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className = "mb-3">
                    <label htmlFor = "location" className = "form-label">Address</label>
                    <input type="text" className = "form-control" name="location" value = {formData.location}  onChange={onChange}/>
                </div>
                
                <div className = "mb-3">
                    <label htmlFor = "exampleInputPassword1" className = "form-label">Password</label>
                    <input type="password" className = "form-control" name="password" value = {formData.password} onChange={onChange}/>
                </div>
                <button type="submit" className = "m-3 btn btn-success">Submit</button>
                {/* changed to btn-success from btn-primary */}
                <Link to='/login' className='btn btn-danger'>Already a User!</Link>
            </form>
        </div>
    </>
  )
}