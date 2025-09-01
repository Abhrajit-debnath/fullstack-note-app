import { useState } from "react";
import logo from '../assets/logo.png';
import Bg from '../assets/bg.jpg';
import { Link } from "react-router-dom";

import { auth } from "../firebase";

import { sendSignInLinkToEmail } from "firebase/auth";
export default function Signup() {
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
                <h1 className="text-3xl font-bold text-center lg:text-left mb-2 font-text">Sign up</h1>
                <p className="text-gray-400 text-center lg:text-left mb-6 font-text">
                    Sign up to enjoy the feature of HD
                </p>

                {/* Form */}
                <form className="space-y-6 w-full">
                    {/* Name */}
                    <div className="relative">
                    <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
                    Your Name
                        </label>
                        <input
                            type="text"
                            placeholder="Jonas Khanwald"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* DOB */}
                    <div className="relative">
                    <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
                    Date of Birth
                        </label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 font-medium hover:underline">
                        Sign in
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

// //     <div className="min-h-screen flex flex-col desktop:flex-row">
// //       {/* Left side - Form */}
// //       <div className="flex flex-col justify-center items-start md:w-1/2 p-8 md:p-16 bg-white">
// //         {/* Logo */}
// //         <div className="flex items-center mb-8">
// //           <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
// //           <span className="font-inter font-bold text-2xl text-blue-500">HD</span>
// //         </div>

// //         {/* Form Header */}
// //         <h1 className="text-3xl font-bold mb-2 font-inter">Sign up</h1>
// //         <p className="text-gray-500 mb-6 font-inter">
// //           Sign up to enjoy the feature of HD
// //         </p>

// //         {/* Form */}
// //         <form className="w-full space-y-4">
// //           <div className="flex flex-col">
// //             <label className="mb-1 font-inter text-gray-700">Your Name</label>
// //             <input
// //               type="text"
// //               placeholder="Jonas Khanwald"
// //               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <label className="mb-1 font-inter text-gray-700">Date of Birth</label>
// //             <input
// //               type="date"
// //               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <label className="mb-1 font-inter text-gray-700">Email</label>
// //             <input
// //               type="email"
// //               placeholder="jonas_khanwald@gmail.com"
// //               className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-500 text-white py-2 rounded-md font-inter font-semibold hover:bg-blue-600 transition"
// //           >
// //             Get OTP
// //           </button>

// //           <p className="text-gray-500 text-sm text-center font-inter">
// //             Already have an account??{" "}
// //             <span className="text-blue-500 underline cursor-pointer">Sign in</span>
// //           </p>
// //         </form>
// //       </div>

// //       {/* Right side - Image */}
// //       <div className="hidden md:block md:w-1/2">
// //         <img
// //           src="/assets/signup-image.png" // replace with your right-side image
// //           alt="Sign Up Visual"
// //           className="w-full h-full object-cover"
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;
