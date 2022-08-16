import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Login } from '../redux/ApiCalls';

export const Auth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const user = useSelector(((state) => state.user))

  const handleLogin = async () => {

    await Login(dispatch, { 'email': email });
  }

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    if (user.currentUser) {
      Toast.fire({
        icon: 'success',
        title: 'Welcome ' + user.currentUser.firstName + '!'
      })
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
        if(user.loginStatus === true){
          navigate('/dashboard');
        } 
    }
  }, [user])


  return (


    <div className="body">
      <div className="left">
        <img src="https://merzigo.com/wp-content/uploads/2019/10/m-logo.png" alt="" />
      </div>
      <div className="right">
        <div className="form-container">
          <h3>Login</h3>
          <input onChange={(e) => setEmail(e.target.value)} placeholder='E-mail' type="email" className="form-control" />
          <div className="submit-login">
            <button onClick={() => handleLogin()} className="btn-lgn" type="submit">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
