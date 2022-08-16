import { DashboardHeader } from '../components/DashboardHeader'
import React, { useEffect } from 'react'
import { UserList } from '../components/UserList'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const Dashboard = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if(user.loginStatus === false){
          navigate('/');
        }  
      })

  return (
    <div className="container">
    <DashboardHeader/>
    <UserList />
    </div>
  )
}
