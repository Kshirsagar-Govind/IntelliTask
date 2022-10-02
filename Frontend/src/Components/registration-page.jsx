// import { Button } from "bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Pic_1 from "./Assets/Images/pic-1.svg";
import Pic_2 from "./Assets/Images/pic-2.svg";
import Pic_3 from "./Assets/Images/pic-3.svg";
import Pic_4 from "./Assets/Images/pic-4.svg";
import Pic_5 from "./Assets/Images/pic-5.svg";

import {
    Card,
} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

export default function RegistrationPage() {
    const {register, handleSubmit, watch, formState: {
            errors
        }} = useForm();

    const [propic, _setProPic] = useState("pic-1");

    const onSubmit = async (data, e) => {
        let payload = {
            ...data,
            propic
        }

        try {
            const res = await axios.post(`${
                process.env.REACT_APP_HOST
            }/user-registration`, payload);
            console.log(res.data);
            if (res.data.code == 201) {
                return alert("User Account Created");
            } else if (res.data.code == 202) {
              return alert("User with this email already exists");
            }
            else {
              return alert("SERVER ERROR");
            }

        } catch (error) {
            console.log(error);
            alert("SERVER ERROR");
        }
        e.preventDefault();
    };

    return (
        <div className="full-page">
            <div className="just-center">
                <div className="mt-4 ">
                    <h1>User Sign Up Page</h1>
                </div>
                <Card className="mt-4 px-4 py-4"
                    style={
                        {width: "55rem"}
                }>
                    <form onSubmit={
                        handleSubmit(onSubmit)
                    }>
                        <div className="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter name" {...register("name", {
                                                  required: true,
                                                })}/> {
                            errors.name ?. type === "required" && (
                                <p className="form_errors">name is required</p>
                            )
                        } </div>

                        <div className="mt-3 form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" {...register("email", {
                                                  required: true,
                                                  pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Enter Valid email",
                                                  },
                                                })}/> {
                            errors.email ?. type === "required" && (
                                <p className="form_errors">email is required</p>
                            )
                        } </div>
                        <div className="mt-3 form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" {...register("password", {
                                                  required: true,
                                                  pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                                                    message:
                                                      "Password should be combination of alphabets, numbers and special characters and having length more than 8.",
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

                        <div className="mt-3  form-group">
                            <label for="exampleInputPassword1">Confirm Password</label>
                            <input type="password" className="form-control" placeholder="Password" {...register("c_password", {
                                                  required: true,
                                                  pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
                                                    message:
                                                      "Password should be combination of alphabets, numbers and special characters and having length more than 8.",
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
                        <div className="mt-3  form-group">
                            <label for="exampleInputEmail1">Choose Your Profile Photo</label>
                            <br/>
                            <br/>
                            <div className=" just-space">
                                <img src={Pic_1}
                                    className={
                                        propic == "pic-1" ? "pic-div selected-pic" : "pic-div"
                                    }
                                    alt=""
                                    onClick={
                                        () => _setProPic("pic-1")
                                    }/>
                                <img className={
                                        propic == "pic-2" ? "pic-div selected-pic" : "pic-div"
                                    }
                                    src={Pic_2}
                                    alt=""
                                    onClick={
                                        () => _setProPic("pic-2")
                                    }/>
                                <img className={
                                        propic == "pic-3" ? "pic-div selected-pic" : "pic-div"
                                    }
                                    src={Pic_3}
                                    alt=""
                                    onClick={
                                        () => _setProPic("pic-3")
                                    }/>
                                <img className={
                                        propic == "pic-4" ? "pic-div selected-pic" : "pic-div"
                                    }
                                    src={Pic_4}
                                    alt=""
                                    onClick={
                                        () => _setProPic("pic-4")
                                    }/>
                                <img className={
                                        propic == "pic-5" ? "pic-div selected-pic" : "pic-div"
                                    }
                                    src={Pic_5}
                                    alt=""
                                    onClick={
                                        () => _setProPic("pic-5")
                                    }/>
                            </div>
                        </div>

                        <button type="submit" className="mt-3 btn btn-warning">
                            Signup
                        </button>
                    </form>
                    <p className="mt-2">
                        Already A User?
                        <Link to="/">Signin</Link>
                    </p>
                </Card>
            </div>
        </div>
    );
}
