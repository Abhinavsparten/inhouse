import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./GoogleAuth/GoogleAuth";

provider

export const Home = () => {
    // Redirect function
  const navigate = useNavigate();

  const [value,setValue] = useState('')

  const handleClick =()=>{
    signInWithPopup(auth,provider).then((data) =>{
      setValue(data.user.email)
      localStorage.setItem("email",data.user.email)
    })
  }

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  })

  return (
    <section style={{ height: "100vh" }} className="position-relative pb-5">
      <div className="container-fluid">
        <div className="row pt-5">
          {/* Image Column */}
          <div className="col-12 col-lg-6" style={{ marginLeft: "50px" }}>
            <img
              className="img-fluid w-90"
              style={{
                marginBottom: "100px",
                height: "600px",
                marginLeft: "0",
                borderRadius:'15px' 
              }}
              src='https://i.postimg.cc/CxQsKqSn/in-house.png'
              alt=""
            />
          </div>

          {/* Text Column */}
          <div className="col-12 col-lg-6 d-flex align-items-center" style={{ width:'450px'}}>
            <div className="container">
              <h4
                className="display-4 fw-bold mb-5"
                style={{ fontSize: "40px" }}
              >
                Welcome to techjays project tracker!
              </h4>
              <h4 className="lead fw-bold mb-5">Continue With</h4>
              <div
                className="d-flex flex-row mb-5 button"
                style={{
                  justifyContent: "center",
                  gap: "50px",
                }}
              >
                {value?navigate('/profile'):
                <button
                  className="btn btn1 color mb-2 custom-button"
                  onClick={handleClick}
                >
                  <span className="button-text1">Google</span>
                  <FaGoogle className="button-icon1" />
                </button>
              }

                <button
                  className="btn btn2 color mb-2 custom-button"
                  onClick={() => console.log("Connect with Google")}
                >
                  <span className="button-text2">Facebook</span>
                  <FaFacebookF className="button-icon2"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};