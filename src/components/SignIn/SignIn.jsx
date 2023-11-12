import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import signin_img from '../../assets/Images/SignIn_img.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/account/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-7">
            <img
              src={signin_img}
              alt="signin image"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "fill",
                objectPosition: "center",
                borderRadius: "15px",
              }}
            />
          </div>
          <div className="col-md-5 mt-5">
            <h1 className="text-center mb-0">Login</h1>
            <div className="mt-0 mb-3 w-25 mx-auto  border-1 rounded border-danger text-center text-danger fw-bold">________</div>
            <form onSubmit={submit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control " id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                <label for="floatingInput">Email address</label>
              </div>
              <div className="mb-3 form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                <label for="floatingPassword">Password</label>
              </div>
              <button type="submit" className="mt-3 btn btn-lg btn-danger w-100">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
