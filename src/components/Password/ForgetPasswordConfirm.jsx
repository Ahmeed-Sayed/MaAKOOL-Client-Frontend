import React from 'react'

export default function ForgetPasswordConfirm() {
  return (
    <>
      <div className="d-flex justify-content-center p-5">
        <div className="col-md-5">
          <h1 className="text-center">Reset Password</h1>
          <div className="mt-0 mb-3 w-25 mx-auto border-1 rounded border-danger text-center text-danger fw-bold">
            ________
          </div>
          <form>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="New Password"

                // value={new_password}
                // onChange={(e) => setNewPassword(e.target.value)}

              />
              <label htmlFor="floatingInput">New Password</label>
            </div>
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
  )
}
