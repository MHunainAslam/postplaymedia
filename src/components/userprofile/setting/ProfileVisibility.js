import React from 'react'

const ProfileVisibility = () => {
  return (
    <>
      <p className="heading mt-3 clr-text">Profile Visibility Settings</p>
      <p className="para text-dark">Select who may see your profile details.</p>

      <div className="border-bottom "></div>
      <form action="">
        <div className="d-flex justify-content-between align-items-center border-bottom py-3">
          <p className="para clr-text mb-0 fw-bold">
            Base
          </p>
          <div className='col-md-3 col-lg-2'>
            <p className="para clr-text mb-0 fw-bold">
              Visibility
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Name
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Member Type
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Date of Birth
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Gender
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            City
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Country
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between border-bottom py-3 align-items-center">
          <p className="para clr-text mb-0">
            Group Invites
          </p>
          <div className='col-4 col-lg-2'>
            <select name="" id="" className='form-select slct'>
              <option value="">Everyone</option>
              <option value="">Only Me</option>
              <option value="">All Member</option>
              <option value="">My Friend</option>
            </select>
          </div>
        </div>
        <button className='btn primary-btn mt-4' type={"submit"}><p>Save Changes</p></button>
      </form>
    </>
  )
}

export default ProfileVisibility