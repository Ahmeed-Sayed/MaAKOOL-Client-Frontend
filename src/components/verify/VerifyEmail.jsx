import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

export default function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/verify-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, verification_code: verificationCode }),
      });

      if (response.ok) {
        handleVerificationSuccess();
      } else {
        handleVerificationError();
      }
    } catch (error) {
      console.error('Error occurred during verification:', error);
      handleVerificationError();
    }
  };

  const handleVerificationSuccess = () => {
    Swal.fire({
      icon: 'success',
      title: 'Account Verified!',
      text: 'Your account is verified and active.',
    }).then((result) => {
      if (result.isConfirmed || result.isDismissed) {
        navigate('/signin');
      }
    });
  };

  const handleVerificationError = () => {
    Swal.fire({
      icon: 'error',
      title: 'Verification Failed!',
      text: 'Something went wrong. Please check your details and try again.',
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center p-5">
        <div className="col-md-5">
          <div className="alert alert-success">We Sent Your mail a Verification code please check Your Mail.</div>
          <h1 className="text-center">Verify account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <label>Verification code</label>
            </div>
            <button type="submit" className="mt-3 btn btn-lg btn-danger w-100">
              Verify my account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


