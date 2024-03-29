import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateUserFromAdmin } from '../../../../../utils/axios-instance';

function AdminUpdateUsers() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [values, setValues] = useState({
        id:'',
        name: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;


    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
            .then(res => {
                setValues(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = {};

        if(values.name.length < 2) {
            validationErrors.name = "Name must be at least 2 characters";
        }

        if(!passwordRules.test(values.password)) {
            validationErrors.password = "Password must contain 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 4 characters long";
        }

        setErrors(validationErrors);

        if(Object.keys(validationErrors).length === 0) {
            try {
                await updateUserFromAdmin(id, values);
                toast.success('User updated successfully!');
                navigate('/admin-users');
            } catch (error) {
                toast.error('Error in updating the user');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <div className='flex flex-col w-[500px] sm:px-5'>
                <h1 className="text-3xl mb-5">Update User Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" autoComplete="name" required
                            value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" autoComplete="email" required
                            value={values.email}
                            onChange={e => setValues({ ...values, email: e.target.value })}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" autoComplete="new-password" required
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm" />
                        {errors.password && <p>{errors.password}</p>}
                    </div>
                    <button type="submit"
                        className="inline-block px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update
                    </button>
                    <Link to="/admin-users" className="inline-block px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ml-2">
                        Back
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default AdminUpdateUsers;
