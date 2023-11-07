import React from 'react';
import signin_img from '../../assets/Images/SignIn_img.png';

function SignIn() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7">
            <img src={signin_img} alt="signin image" style={{ width: '100%', height: '600px', objectFit: 'fill', objectPosition: 'center', borderRadius: '15px' }} />
          </div>
          <div className="col-md-5 mt-5">
            <h1 className="text-center mb-0">Login</h1>
            {/* <hr className=' w-25 mx-auto bg-danger text-danger ' /> */}
            <div className="mt-0 mb-3 w-25 mx-auto  border-1 rounded border-danger text-center text-danger fw-bold">________</div>
            <form>
              <div className="form-floating mb-3">
                <input type="email" className="form-control " id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Email address</label>
              </div>
              <div className="mb-3 form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Password</label>
              </div>

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input " id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">remember me</label>
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
