import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../redux/ApiCalls';
import { MultiSelect } from 'primereact/multiselect';
import { publicRequest } from '../requestMethods';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

export const UserList = () => {
    
    const [directors,setDirectors] = useState({});
    const [directLeads,setDirectLeads] = useState();
    const [currentGroup,setCurrentGroup] = useState();
    const [selected,setSelected] = useState()
    const [modalData,setModalData] = useState();
    const [modalGroup,setModalGroup] = useState();
    const [effect,setEffect] = useState();
    const [modalId,setModalId] = useState();
    const [newUser,setNewUser] = useState({
        "firstName" : '',
        "lastName" : '',
        "email" : '',
        "role" : '',
    })
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userList);

    useState(() => {
        getUserList(dispatch);
    })

    useEffect(() => {
        if(userList.isFetched){
            let Directors = [];
            userList.userList.forEach((user) => user.role === 'Director' && Directors.push({"name" : user.firstName + ' ' + user.lastName}));
            setDirectors(Directors);
            let Leads = [];
            userList.userList.forEach((user) => user.role === 'Lead' && Leads.push({"name" : user.firstName + ' ' + user.lastName}));
            let Editors = [];
            userList.userList.forEach((user) => user.role === 'Editor' && Editors.push({"name" : user.firstName + ' ' + user.lastName}));
            setDirectLeads(Directors.concat(Leads));
        }
    },[userList.isFetched,effect])
    const dropdownRelease = () => {
        document.querySelector('.user-add').classList.remove('hidden')
    }
    const addUser = async (e) => {
        e.preventDefault();
        document.querySelector('.user-add').classList.add('hidden');
        const res = await publicRequest.post('users/new', {...newUser,leaders : selected})
        if(res.data == 'success'){
            getUserList(dispatch);
            setEffect(uuidv4())
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
                title: 'User created successfully.'
              })}
    
    }
    const hideDropdown = (e) => {
        e.preventDefault();
        document.querySelector('.user-add').classList.add('hidden')
    }
    const setGroup = () => {
        if(currentGroup === 'Director') {
            return '';
        }else if(currentGroup === 'Lead'){
            return directors;
        }
        else if(currentGroup === 'Editor'){
            return directLeads;
        }
    }
    const setGroupModal = () => {
        if( modalGroup === 'Director') {
            return '';
        }else if(modalGroup === 'Lead'){
            return directors;
        }
        else if(modalGroup === 'Editor'){
            return directLeads;
        }
    }
    const setRole = (e) => {
        setNewUser(previousState => {return { ...previousState, role: e.target.value}})
        setCurrentGroup(e.target.value);
    }
    const submitLeaders = async () => {
        const res = await publicRequest.post('users/update', {'userId' : modalId,'leaders' : modalData});
        getUserList(dispatch);
        setEffect(uuidv4())
        if(res.data = 'success') {
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
                title: 'User updated successfully.'
              })
              document.querySelector("#manageLeaders > div > div > div.modal-footer > button.btn.btn-secondary").click()
        };

    }
    const modalSettings = (role,id) => {
        setModalGroup(role);
        setModalId(id);
    }

    return (
        <div className="user-list">
            <div className="modal fade" id="manageLeaders" tabIndex="-1" role="dialog" aria-labelledby="modal-label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-label">Manage Leaders</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="exampleFormControlSelect2">Leader</label><br />
                            <MultiSelect value={modalData} options={setGroupModal()} onChange={(e) => setModalData(e.value)} optionLabel="name" placeholder="Select Leaders" maxSelectedLabels={3} />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={() => submitLeaders()} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inn-title">
                <h4>All Users</h4>
                <span onClick={() => dropdownRelease()} style={{ cursor: 'pointer' }}><i className="fa-solid fa-circle-plus mr-1" /> New User</span>
            </div>

            <div className="user-add my-3 hidden">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="firstname">First Name</label>
                            <input onChange={(e) => setNewUser(previousState => {return { ...previousState, firstName: e.target.value}})} type="text" className="form-control" id="firstname" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="lastname">Last Name</label>
                            <input onChange={(e) => setNewUser(previousState => {return { ...previousState, lastName: e.target.value}})} type="text" className="form-control" id="lastname" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">E-mail</label>
                            <input onChange={(e) => setNewUser(previousState => {return { ...previousState, email: e.target.value}})} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputRole">Role</label>
                            <select onChange={(e) => setRole(e) }  id="inputRole" className="form-control">
                                <option disabled>Choose...</option>
                                <option>Director</option>
                                <option>Lead</option>
                                <option>Editor</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleFormControlSelect2">Leader</label><br />
                            <MultiSelect value={selected === null ? '-' : selected} options={setGroup()} onChange={(e) => setSelected(e.value)} optionLabel="name" placeholder="Select Leaders" maxSelectedLabels={3} />
                        </div>
                    </div>
                    <div className="submit">
                        <button onClick={(e) => addUser(e)} className="btn btn-primary">Add</button>
                        <button onClick={(e) => hideDropdown(e)} className="btn btn-danger ml-1">Cancel</button>
                    </div>
                </form>
            </div>
            

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Role</th>
                        <th scope="col">Leaders</th>
                        <th scope="col">Yönetici Ata</th>
                    </tr>
                </thead>
                <tbody>
                  
                       { userList.userList && userList.userList.map((user) => 
                         <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.leaders ? user.leaders.map((ld) =>  '[' + ld + '] ') : '-'}</td>
                        <td onClick={() => modalSettings(user.role,user.id)} className="text-center"><i data-toggle="modal" data-target="#manageLeaders" style={{ cursor: 'pointer' }} className="fa-solid fa-user-plus text-primary"></i></td>
                        </tr>
                       )}

               

                </tbody>
            </table>

        </div>
    )

}
