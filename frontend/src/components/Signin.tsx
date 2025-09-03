


// import { useState } from "react";
// import logo from '../assets/logo.png';
// import Bg from '../assets/bg.jpg';
// import { Link } from "react-router-dom";

// export default function Signin() {
//     const [name, setName] = useState("");
//     const [dob, setDob] = useState("");
//     const [email, setEmail] = useState("");

//     const handleGetOtp = () => {
//         console.log({ name, dob, email });
//         alert("OTP sent to " + email);
//     };

//     return (
//         <div className="min-h-screen flex flex-col lg:flex-row justify-center">
//             {/* Left Form Section */}
//             <div className="flex flex-col justify-center items-center lg:items-start lg:w-[41%] p-8 lg:p-16 bg-white ">
//                 {/* Logo */}
//                 <div className="flex items-center mb-8 gap-3">
//                     <img src={logo} alt="Logo" className="w-12 h-12" />
//                     <span className="text-black font-bold text-lg font-text">HD</span>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-3xl font-bold text-center lg:text-left mb-2 font-text">Sign in</h1>
//                 <p className="text-gray-400 text-center lg:text-left mb-6 font-text">
//                     Sign up to enjoy the feature of HD
//                 </p>

//                 {/* Form */}
//                 <form className="space-y-6 w-full">
//                     {/* Name */}
                   
//                     {/* Email */}
//                     <div className="relative">
//                     <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
//                     Email
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="jonas_kahnwald@gmail.com"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     {/* Get OTP Button */}
//                     <button
//                         type="button"
//                         onClick={handleGetOtp}
//                         className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
//                     >
//                         Get OTP
//                     </button>
//                 </form>

//                 {/* Sign In Link */}
//                 <p className="text-center lg:text-left text-gray-600 text-sm mt-4">
//                 Need an account?{" "}
//                     <Link to="/signup" className="text-blue-500 font-medium hover:underline">
//                         Create one
//                     </Link>
//                 </p>
//             </div>

//             {/* Right Image Section */}
//             <div className="hidden lg:block lg:w-[59%] p-2">
//                 <img
//                     src={Bg}
//                     alt="Sign Up Visual"
//                     className="w-full h-full object-cover rounded-3xl"
//                 />
//             </div>
//         </div>
//     );
// }


// import { useEffect, useRef, useState } from "react";
// import { useForm } from "react-hook-form"
// import type { SubmitHandler } from "react-hook-form"
// import logo from '../assets/logo.png';
// import Bg from '../assets/bg.jpg';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import OtpTimer from "./otpTime";
// // import { auth } from "../firebase";



// type Inputs = {
//     name: string,
//     dateofbirth: Date,
//     email: string,
//     otp?: string,
// }
// export default function Signup() {

//     const otpVerification = useRef(false)
//     const [otpValue, setOtpValue] = useState("");
//     const [user, setUserdetails] = useState<{email: string, name: string, dateofbirth: Date} | undefined>();


//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm<Inputs>()

//     const onSubmit: SubmitHandler<Inputs> = async (data) => {
//         const { email, name, dateofbirth } = data
//         setUserdetails({
//             email,
//             name,
//             dateofbirth
//         })
//         try {
//             const res = await axios.post("http://localhost:5000/api/send-otp", { email })
//             console.log(res);

//             if (res.data.success) {
//                 // setMessage("OTP sent successfully!");
//                 otpVerification.current = true
//                 console.log("OTP:", res.data.otp); // only for testing
//             } else {
//                 // setMessage("Failed to send OTP");
//             }

//         } catch (error) {
//             console.log(error);

//         }
//     }


//     const handleVerifyOtp = async (email: string) => {
//         try {
//             const res = await axios.post("http://localhost:5000/api/verify-otp", { email, otp: otpValue })
//             if (res.data.success) {
//                 alert("OTP verified! Signup successful 🚀");
//             } else {
//                 alert(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }






//     // const handleGetOtp = () => {
//     //     console.log({ name, dob, email });
//     //     alert("OTP sent to " + email);
//     // };

//     const handelSignup = async () => {
//         try {

//         } catch (error) {

//         }
//     }

//     return (
//         <div className="min-h-screen flex flex-col lg:flex-row justify-center">
//             {/* Left Form Section */}
//             <div className="flex flex-col justify-center items-center lg:items-start lg:w-[41%] p-8 lg:p-16 bg-white ">
//                 {/* Logo */}
//                 <div className="flex items-center mb-8 gap-3">
//                     <img src={logo} alt="Logo" className="w-12 h-12" />
//                     <span className="text-black font-bold text-lg font-text">HD</span>
//                 </div>

//                 {/* Title */}
//                 <h1 className="text-3xl font-bold text-center lg:text-left mb-2 font-text">Sign up</h1>
//                 <p className="text-gray-400 text-center lg:text-left mb-6 font-text">
//                     Sign up to enjoy the feature of HD
//                 </p>

//                 {/* Form */}
//                 <form className="space-y-6 w-full" >
//                     {/* Name */}
//                     <div className="relative">
//                         <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
//                             Your Name
//                         </label>
//                         <input
//                             {...register("name", {
//                                 required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" },
//                                 maxLength: { value: 30, message: "Name must be at most 30 characters" }
//                             })}
//                             type="text"
//                             placeholder="Jonas Khanwald"
//                             className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//                     </div>

//                     {/* DOB */}
//                     <div className="relative">
//                         <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
//                             Date of Birth
//                         </label>
//                         <input
//                             {...register("dateofbirth", { required: "Date of Birth is required" })}
//                             type="date"

//                             className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />


//                         {errors.dateofbirth && <p className="text-red-500 text-sm">{errors.dateofbirth.message}</p>}
//                     </div>

//                     {/* Email */}
//                     <div className="relative">
//                         <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
//                             Email
//                         </label>
//                         <input
//                             {...register("email", {
//                                 required: "Email is required",
//                                 pattern: {
//                                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                                     message: "Enter a valid email address"
//                                 }
//                             })}
//                             type="email"
//                             placeholder="jonas_kahnwald@gmail.com"
//                             className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                     </div>

//                     {
//                         otpVerification.current && (
//                             <div className="relative">

//                                 <input
//                                     value={otpValue}
//                                     onChange={(e) => setOtpValue(e.target.value)}
//                                     type="text"
//                                     placeholder="OTP"

//                                     className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//                                 <OtpTimer />
//                             </div>
//                         )
//                     }

//                     {/* Get OTP Button */}
//                     {!otpVerification.current ? (
//                         <button
//                             type="submit"
//                             onClick={handleSubmit(onSubmit)}
//                             className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
//                         >
//                             Get OTP
//                         </button>
//                     ) : (
//                         <button
//                             type="button"
//                             onClick={() => user?.email && handleVerifyOtp(user.email)}
//                             className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
//                         >
//                             Verify OTP
//                         </button>
//                     )}
//                 </form>

//                 {/* Sign In Link */}
//                 <p className="text-center lg:text-left text-gray-600 text-sm mt-4">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-blue-500 font-medium hover:underline">
//                         Sign in
//                     </Link>
//                 </p>
//             </div>

//             {/* Right Image Section */}
//             <div className="hidden lg:block lg:w-[59%] p-2">
//                 <img
//                     src={Bg}
//                     alt="Sign Up Visual"
//                     className="w-full h-full object-cover rounded-3xl"
//                 />
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import logo from '../assets/logo.png';
import Bg from '../assets/bg.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { EyeOff } from 'lucide-react'; 
import { auth } from "../firebase";
type Inputs = {
    name: string,
    dateofbirth: Date,
    email: string,
    otp?: string,
}

type OtpTimerProps = {
    duration: number;
    onExpire: () => void;
}

function OtpTimer({ duration, onExpire }: OtpTimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onExpire();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <p className="text-sm text-gray-500 mt-2">
            OTP expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
    );
}

export default function Signin() {
    const [otpSent, setOtpSent] = useState(false);
    const [otpExpired, setOtpExpired] = useState(false);
    const [otpValue, setOtpValue] = useState("");
    const [user, setUserdetails] = useState<{ email: string, name: string, dateofbirth: Date } | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email, name, dateofbirth } = data;
        setUserdetails({ email, name, dateofbirth });

        try {
            const res = await axios.post("http://localhost:5000/api/send-otp", { email,mode:"signin" });
            if (res.data.success) {
                setOtpSent(true);
                setOtpExpired(false);
                setOtpValue("");
                console.log("OTP:", res.data.otp); // Only for testing
            } else {
                alert("Failed to send OTP");
            }
        } catch (error: any) {
            console.error("Send OTP error:", error.response?.data || error.message);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to send OTP. Please try again.");
            }
        }
    }

    const handleVerifyOtp = async () => {
        if (!user) return;
        try {
            const res = await axios.post("http://localhost:5000/api/verify-otp", { 
                email: user.email, 
                otp: otpValue,
                mode:"signin"
            });
            
            console.log("Backend response:", res.data);
            
            if (res.data.success && res.data.token) {
                console.log("Token received:", res.data.token);
                await signInWithCustomToken(auth, res.data.token);
                alert("OTP verified! Signup successful 🚀");
                setOtpSent(false);
                setOtpValue("");
            } else {
                alert(res.data.message || "No token received");
            }
        } catch (error: any) {
            console.error("Error in handleVerifyOtp:", error);
            console.error("Response data:", error.response?.data);
            console.error("Error message:", error.response?.data?.message);
            alert(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row justify-center">
            {/* Left Form Section */}
            <div className="flex flex-col justify-center items-center lg:items-start lg:w-[41%] p-8 lg:p-16 bg-white">
                {/* Logo */}
                <div className="flex items-center mb-8 gap-3">
                    <img src={logo} alt="Logo" className="w-12 h-12" />
                    <span className="text-black font-bold text-lg font-text">HD</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center lg:text-left mb-2 font-text">Sign in</h1>
                <p className="text-gray-400 text-center lg:text-left mb-6 font-text">
                    Please login continue to your account
                </p>

                {/* Form */}
                <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}> 
                   

                    {/* Email */}
                    <div className="relative">
                        <label className="absolute text-sm text-gray-500 left-3 -top-2 bg-white px-1 font-text">
                            Email
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address"
                                }
                            })}
                            type="email"
                            placeholder="jonas_kahnwald@gmail.com"
                            className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* OTP Input */}
                    {otpSent && !otpExpired && (
                        <div className="relative">
                            <input
                                value={otpValue}
                                onChange={(e) => setOtpValue(e.target.value)}
                                type="text"
                                placeholder="OTP"
                                className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <OtpTimer duration={300} onExpire={() => setOtpExpired(true)} />
                        </div>
                    )}

                    {/* Buttons */}
                    {(!otpSent || otpExpired) ? (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                        >
                            Get OTP
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
                        >
                            Verify OTP
                        </button>
                    )}
                </form>

                {/* Sign In Link */}
                <p className="text-center lg:text-left text-gray-600 text-sm mt-4">
                     Need an account?{" "}
                     <Link to="/signup" className="capitalize text-blue-500 underline font-medium hover:underline">
                         create one
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

