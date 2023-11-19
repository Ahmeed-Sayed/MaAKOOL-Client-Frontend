import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ForgetPasswordConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/accounts/reset-password/confirm/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: newPassword }),
      });

      if (response.ok) {
        console.log('Password reset successful.');
        navigate('/PasswordResetSuccess');
      } else {
        const data = await response.json();
        setError(data.error || 'Password reset failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while resetting the password.');
    }
  };

  useEffect(() => {
    handleSubmit('newPasswordValue');
  }, [uidb64, token]);

  return (
    <>
      <div className="d-flex justify-content-center p-5">
        <div className="col-md-5">
          <h1 className="text-center">Reset Password</h1>
          <div className="mt-0 mb-3 w-25 mx-auto border-1 rounded border-danger text-center text-danger fw-bold">
            ________
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label htmlFor="floatingInput">New Password</label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
            <button
              type="submit"
              className="mt-3 btn btn-lg btn-danger w-100"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordConfirm;
