import React, { useState } from "react";
import '../index.css'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route,useNavigate, Link,useLocation } from 'react-router-dom';


const Register = () => {

  var [Appobj,setobj]=useState({
    name:"",
    email:"",
    contact:"",
    ResiAdress:"",
    businessExp:"",
    yearsInBus:"",
    siteloc:"",
    city:"",
    district:"",
    pincode:"",
    LArea:"",
    BArea:"",
    ownership:"",
})

var redirecter = useNavigate();
  function fnavigate(path)
  {
    redirecter(path);
  }
  
function doupdate(event)
{
  var {name,value}=event.target
  setobj({...Appobj,[name]:value})
}

async function dosave(){
  alert(Appobj)
  let url="http://localhost:2008/user/doSaveUserPost"
  let resp=await axios.post(url,Appobj,{
    headers:{"Content-Type":"application/x-www-form-urlencoded"}
  });

  if(resp.data.status==true){
    alert(resp.data.msg)
  }
  else{
    alert(resp.data.msg)
  }

  
}
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center w-full h-[150vh] bg-[#282D2D] px-5">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label class="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode); 
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        }  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          APPLY FOR FRANCHISE
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="name"
                onChange={doupdate}
                placeholder="Name"
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="email"
                name="email"
                onChange={doupdate}
                placeholder="Email"
              />
            </div>
            <input
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="text"
              name="contact"
              onChange={doupdate}
              placeholder="Contact Number"
            />
            <input
              className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                darkMode
                  ? "bg-[#302E30] text-white focus:border-white"
                  : "bg-gray-100 text-black focus:border-black"
              }`}
              type="text"
              name="ResiAdress"
              onChange={doupdate}
              placeholder="Residental Address"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="businessExp"
                onChange={doupdate}
                placeholder="Any Business Experience? "
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="yearsInBus"
                onChange={doupdate}
                placeholder="Years in Business"
              /> 
              
            </div>
            <h2 className={`text-center text-xl sm:text-xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}>Site Details</h2>

<div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="siteloc"
                onChange={doupdate}
                placeholder="Site Location "
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="city"
                onChange={doupdate}
                placeholder="City"
              /> 
             </div>
             <div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="district"
                onChange={doupdate}
                placeholder="District"
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="pincode"
                onChange={doupdate}
                placeholder="PinCode"
              /> 
             </div>
             <div className="flex flex-col sm:flex-row gap-3">
              <input
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="LArea"
                onChange={doupdate}
                placeholder="Length of shop in Feet"
              />
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                name="BArea"
                onChange={doupdate}
                placeholder="Breadth of shop in Feet"
              /> 
             </div>
             <div className="flex justify-center items-center flex-col gap-1">
             <div className="flex justify-center gap-3 py-5">
             <h4  className={`text-center text-md sm:text-md font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}>OwnerShip </h4>
         <div>
            <input
              className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white align-top checked:border-4 checked:border-blue-600"
              type="radio"
              name="ownership"
              value='owner'
              onChange={doupdate}
              id="radioidthree"
            />
            <label className="text-gray-600" htmlFor="radioidthree">
              Owned
            </label>
          </div>
          <div>
            <input
              className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white  align-top checked:border-4 checked:border-blue-600  disabled:border-blue-400"
              type="radio"
              name="ownership"
              value='Rented'
              onChange={doupdate}
              id="radioidfour"
            />
            <label className="text-gray-600" htmlFor="radioidfour">
              Rented
            </label>
          </div>
        </div>
      </div>
      <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer checked:gray"
              />
              <span className="hover:cursor-pointer">Agreed in all Terms & Conditions</span>
            </label>
            <button onClick={dosave} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Register</span>
              
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <button onClick={()=>fnavigate("/login")} className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">login</span>
              
            </button>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register