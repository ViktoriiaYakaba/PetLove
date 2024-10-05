import React from 'react'
import { refreshUser } from '../redux/auth/operation'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const Profile = () => {

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div>
      
    </div>
  )
}

export default Profile
