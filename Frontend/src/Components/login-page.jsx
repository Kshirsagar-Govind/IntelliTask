// import { Button } from "bootstrap";

import React from "react";
import {useForm} from "react-hook-form";
import {
    Button,
    Card,
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown
} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const {register, handleSubmit, watch, formState: {
            errors
        }} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data, e) => {
 
        try {
            const res = await axios.post(`${
                process.env.REACT_APP_HOST
            }/user-login`, data);
        console.log(res);
            if (res.data.code == 200) {
                navigate(`/${
                    res.data.user_id
                }`);
            } else if (res.data.code == 404) {
                return alert("INVALID CREDS");
            } else {
                return alert("SERVER ERROR");
            }
            console.log(res);
        } catch (error) {
            console.log(error);
            alert("Error occured");
        }
        e.preventDefault();
    };

    return (
        <div className="full-page">
            <div className="just-center">
                <div className="mt-4 ">
                    <h1>Signin Page</h1>
                </div>

                <Card className="mt-4 px-4 py-4"
                    style={
                        {width: "42rem"}
                }>
                    <form onSubmit={
                        handleSubmit(onSubmit)
                    }>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control"  aria-describedby="emailHelp" placeholder="Enter email" {...register("email", {
                                                  required: true,
                                                  pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Enter Valid email",
                                                  },
                                                })}/> {
                            errors.username ?. type === "required" && (
                                <p className="form_errors">email is required</p>
                            )
                        }
                            <small id="emailHelp" className="form-text text-muted"></small>
                        </div>
                        <div className=" mt-3 form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password", {
                                                  required: true,
                                                  pattern: {
                                                    value:
                                                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                                                    message:
                                                      "Password should be combination of alphabets, numbers and special characters.",
                                                  },
                                                })}/> {
                            errors.password ?. type === "required" && (
                                <p className="form_errors">Password is required</p>
                            )
                        }
                            {
                            errors.password ?. type === "pattern" && (
                                <p className="form_errors">
                                    {
                                    errors.password.message
                                }</p>
                            )
                        } </div>

                        <input type="submit" value="Signin" className="mt-3 btn btn-warning"/>
                    </form>
                    <p className="mt-2">
                        New user?
                        <Link to="/signup-page">Let's Signup</Link>
                    </p>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
