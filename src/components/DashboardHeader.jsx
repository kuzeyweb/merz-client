import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { logOut } from '../redux/UserSlice';

export const DashboardHeader = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const logout = () =>{
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
    Toast.fire({
      icon: 'success',
      title: `You've logged out!`
    })
    
    dispatch(logOut())
  }


  return (
    <header>
        <div className="logo">
        <a href="/">
        <img height={'60px'} src="https://merzigo.com/wp-content/uploads/2019/10/m-logo.png" alt="logo" />
        </a>
        </div>
        <div className="user-info">
        <i onClick={() => logout() } className="fa-solid fa-arrow-right-from-bracket" />
        <i className="fa-solid fa-user" /> 
        <span>Merhaba {user.currentUser && user.currentUser.firstName}!</span>
        </div>
    </header>
  )
}
