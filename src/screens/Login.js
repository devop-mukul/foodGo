import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: formData.email, password: formData.password }))//login will have only email and password
    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        alert("Login Successful!");
        navigate('/');
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Server error or network issue. Try again later.");
    }
  }
  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          {/* changed to btn-success from btn-primary */}
          <Link to='/createuser' className='btn btn-danger'>I'm a new User!</Link>
        </form>
      </div>
    </div>
  )
}
