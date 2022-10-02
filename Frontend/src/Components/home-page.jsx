import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Pic_1 from "./Assets/Images/pic-1.svg";
import Pic_2 from "./Assets/Images/pic-2.svg";
import Pic_3 from "./Assets/Images/pic-3.svg";
import Pic_4 from "./Assets/Images/pic-4.svg";
import { useForm } from "react-hook-form";
import Pic_5 from "./Assets/Images/pic-5.svg";
export default function HomePage(props) {
  const { user_id } = useParams();
  const [ showEdit, _setShowEdit ] = useState(false);
  const [ userDetails, _setUserDetails ] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res = await axios.get(
      `${process.env.REACT_APP_HOST}/get-user-details/${user_id}`
    );
    if (!res.data.user_details.user_online) {
      navigate("/");
      return;
    }
    _setUserDetails(res.data.user_details);
  };

  const userLogout = async () => {
    try {
      let res = await axios.patch(
        `${process.env.REACT_APP_HOST}/user-logout/${userDetails._id}`
      );
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  return (
    <div className="full-page">
      <div className="just-center mt-4">
        <h1 className="primary">Welcome </h1>
      </div>
      <div className="just-center">
        <div
          class="page-content page-container"
          id="page-content"
          style={{ width: "70%" }}
        >
          <div class="padding">
            <div class="row container d-flex justify-content-center">
              <div class="col-xl-6 col-md-12">
                <div
                  class="card user-card-full"
                  style={{ padding: "20px 10px", width: "100%" }}
                >
                  <div class="row m-l-0 m-r-0">
                    <div class="col-sm-4 bg-c-lite-green user-profile">
                      <div class="card-block text-center text-white">
                        <div class="m-b-25">
                          <img
                            src={
                              userDetails.profile_photo == "pic-1" ? (
                                Pic_1
                              ) : userDetails.profile_photo == "pic-2" ? (
                                Pic_2
                              ) : userDetails.profile_photo == "pic-3" ? (
                                Pic_3
                              ) : userDetails.profile_photo == "pic-4" ? (
                                Pic_4
                              ) : userDetails.profile_photo == "pic-4" ? (
                                Pic_5
                              ) : (
                                Pic_1
                              )
                            }
                            class="img-radius"
                            alt="User-Profile-Image"
                          />
                        </div>

                        <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16" />
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="card-block">
                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                          User Details
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Name</p>
                            <h6 class="text-muted f-w-400">
                              {userDetails.name || "Loading..."}
                            </h6>
                          </div>

                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Email</p>
                            <h6 class="text-muted f-w-400">
                              {userDetails.email || "Loading..."}
                            </h6>
                          </div>
                        </div>
                        <div className="flex">
                          <Button onClick={() => _setShowEdit(!showEdit)}>
                            Edit
                          </Button>
                          <Button
                            className="m-3 btn-danger"
                            onClick={() => userLogout()}
                          >
                            Logout
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEdit ? (
        <div className="dark-back just-center">
          <EditUserDetails
            cancel={() => _setShowEdit(!showEdit)}
            reload={() => getData()}
            userDetails={userDetails}
          />
        </div>
      ) : null}
    </div>
  );
}

const EditUserDetails = ({ cancel, userDetails, reload }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [ propic, _setProPic ] = useState(userDetails.profile_photo);
  const [ email, _setEmail ] = useState(userDetails.email);
  const [ name, _setName ] = useState(userDetails.name);
  const [ password, _setPassword ] = useState("");

  const onSubmit = async e => {
    // e.preventDefault();
    try {
      console.log(email, name, propic);
      let payload = {
        email,
        name,
        profile_photo: propic,
      };
      if (password !== userDetails.password) {
        return alert("Please enter a correct password");
      }
      let res = await axios.patch(
        `${process.env.REACT_APP_HOST}/user-account-update/${userDetails._id}`,
        payload
      );
      console.log(res.data);
      if (res.data.code == 200) {
        reload();
        alert("User details updated successfully");
      }
      cancel();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="edit-popup">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="just-space">
          <h3 className="p-1">Update Your Details</h3>
          <Button type="button" className="mt-3" onClick={() => cancel()}>
            X
          </Button>
        </div>

        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={e => _setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="mt-3 form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={e => _setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mt-3 form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={e => _setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="mt-3 form-group">
          <label for="exampleInputEmail1">Choose Your New Profile Photo</label>
          <br />
          <br />
          <div className=" just-space">
            <img
              src={Pic_1}
              className={propic == "pic-1" ? "pic-div selected-pic" : "pic-div"}
              alt=""
              onClick={() => _setProPic("pic-1")}
            />
            <img
              className={propic == "pic-2" ? "pic-div selected-pic" : "pic-div"}
              src={Pic_2}
              alt=""
              onClick={() => _setProPic("pic-2")}
            />
            <img
              className={propic == "pic-3" ? "pic-div selected-pic" : "pic-div"}
              src={Pic_3}
              alt=""
              onClick={() => _setProPic("pic-3")}
            />
            <img
              className={propic == "pic-4" ? "pic-div selected-pic" : "pic-div"}
              src={Pic_4}
              alt=""
              onClick={() => _setProPic("pic-4")}
            />
            <img
              className={propic == "pic-5" ? "pic-div selected-pic" : "pic-div"}
              src={Pic_5}
              alt=""
              onClick={() => _setProPic("pic-5")}
            />
          </div>
        </div>
        <div className="just-space p-4">
          <div className="" />
          <button type="submit" className="mt-3 btn btn-success">
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
};
