import '../index.css'
import { useState } from 'react';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="flex flex-col mx-auto w-2/5 bg-white">
      <div className="flex flex-col items-center gap-2 w-full mt-8">
        <div className="text-[#3c009d] text-5xl font-bold">{action}</div>
        <div className="w-16 h-1.5 bg-[#3c009d] rounded-lg"></div>
      </div>

      <div className="flex gap-8 mx-auto mt-5">
        <div 
          className={`flex justify-center items-center w-56 h-14 text-lg font-bold rounded-full cursor-pointer
            ${action === "Login" ? 'bg-gray-200 text-gray-600' : 'bg-[#4c00b4] text-white'}`}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div 
          className={`flex justify-center items-center w-56 h-14 text-lg font-bold rounded-full cursor-pointer
            ${action === "Sign Up" ? 'bg-gray-200 text-gray-600' : 'bg-[#4c00b4] text-white'}`}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-6">
        {action === "Login" ? <div></div> : (
          <div className="flex items-center mx-auto w-[480px] h-20 bg-[#eaeaea] rounded-md">
            <img src={user_icon} alt="" className="mx-8" />
            <input 
              type="text" 
              placeholder="Enter Name"
              className="h-12 w-[400px] bg-transparent border-none outline-none text-gray-600 text-lg" 
            />
          </div>
        )}
        
        <div className="flex items-center mx-auto w-[480px] h-20 bg-[#eaeaea] rounded-md">
          <img src={email_icon} alt="" className="mx-8" />
          <input 
            type="email" 
            placeholder="Enter E-mail"
            className="h-12 w-[400px] bg-transparent border-none outline-none text-gray-600 text-lg" 
          />
        </div>
        
        <div className="flex items-center mx-auto w-[480px] h-20 bg-[#eaeaea] rounded-md">
          <img src={password_icon} alt="" className="mx-8" />
          <input 
            type="password" 
            placeholder="Enter Password"
            className="h-12 w-[400px] bg-transparent border-none outline-none text-gray-600 text-lg" 
          />
        </div>
      </div>

      {action === "Sign Up" ? <div></div> : (
        <div className="pl-16 mt-7 text-gray-600 text-lg">
          Lost Password? <span className="text-[#4c00b4] cursor-pointer">Click Here!</span>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button 
          className="px-8 py-3 bg-[#4c00b4] text-white rounded-full font-bold"
          onClick={() => console.log("submit")}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default LoginSignUp;