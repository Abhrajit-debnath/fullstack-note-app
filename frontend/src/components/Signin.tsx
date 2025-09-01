


import { useState } from "react";
import logo from '../assets/logo.png';
import Bg from '../assets/bg.jpg';
import { Link } from "react-router-dom";

export default function Signin() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");

    const handleGetOtp = () => {
        console.log({ name, dob, email });
        alert("OTP sent to " + email);
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center">
            {/* Left Form Section */}
            <div className="flex flex-col justify-center items-center lg:items-start lg:w-[41%] p-8 lg:p-16 bg-white ">
                {/* Logo */}
                <div className="flex items-center mb-8 gap-3">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <span className="text-black font-bold text-lg font-text">HD</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center lg:text-left mb-2 font-text">Sign in</h1>
                <p className="text-gray-400 text-center lg:text-left mb-6 font-text">
                    Sign up to enjoy the feature of HD
                </p>

                {/* Form */}
                <form className="space-y-6 w-full">
                    {/* Name */}
                   
                    {/* Email */}
                    <div className="relative">
                    <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
                    Email
                        </label>
                        <input
                            type="email"
                            placeholder="jonas_kahnwald@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Get OTP Button */}
                    <button
                        type="button"
                        onClick={handleGetOtp}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                    >
                        Get OTP
                    </button>
                </form>

                {/* Sign In Link */}
                <p className="text-center lg:text-left text-gray-600 text-sm mt-4">
                Need an account?{" "}
                    <Link to="/signup" className="text-blue-500 font-medium hover:underline">
                        Create one
                    </Link>
                </p>
            </div>

            {/* Right Image Section */}
            <div className="hidden lg:block lg:w-[59%] p-2">
                <img
                    src={Bg}
                    alt="Sign Up Visual"
                    className="w-full h-full object-cover rounded-3xl"
                />
            </div>
        </div>
    );
}


