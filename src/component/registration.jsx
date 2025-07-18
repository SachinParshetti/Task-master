import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import  axios from "axios"
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
const UserRegister = () => {
    const navigate = useNavigate();
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required').matches(/^[A-Z].{2,}/,"User name must start with upper case letter"),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{6,}$/,"Password should be in (Ex.Sam@123) format"),
    });

    const onSubmit = async(values) => {
        console.log('Form data', values);
        
        try
        {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE}/user/register`,values)
            if(response.status === 201 || response.status === 200)
            {
               toast.success("User registration successfull");
               navigate("/");
            }
            else
            { 
                toast.error("User Registration Failed");
                navigate("/register")
            }
        }
        catch(error)
        {
            console.error("Registration Error:",error);
            toast.error("Something went wrong")
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center justify-between px-4">
            {/* Header */}
            <header className=" w-full bg-white/10 backdrop-blur-md shadow-md py-4 sticky top-0 z-10 mx-4 rounded-xl mt-1">
                <div>
                    <div className="flex items-center space-x-2 px-2">
                        <i className="bi bi-check2-square text-black text-2xl"></i>
                        <h1 className="text-2xl font-bold text-black">TaskMaster</h1>
                    </div>

                    <div>
                        <div>
                            <Link to='/'>
                                <button
                                    id="btn-signin"
                                    className="bi bi-house-fill absolute right-4 top-1/2 -translate-y-1/2 text-white font-semibold py-1 px-3 rounded-md 
                                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition"
                                >
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center w-full flex-1 p-2">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <div className="text-center border-b border-gray-300 pb-4 mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">User Registration</h2>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form className="space-y-5">
                            {/* Username */}
                            <div>
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Enter a username"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                                    required
                                    aria-label="Username"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                                    required
                                    aria-label="Email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Password */}
                            <div>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter a password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                                    required
                                    aria-label="Password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition-colors text-base"
                            >
                                Register
                            </button>

                            {/* Already a User Link */}
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-purple-600 hover:text-purple-800 font-medium text-base"
                                    id="btn-user-login"
                                >
                                    <Link to="/"> Already a User? Log In</Link>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </main>


        </div>
    );
};

export default UserRegister;