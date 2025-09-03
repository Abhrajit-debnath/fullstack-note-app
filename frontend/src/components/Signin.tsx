

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import logo from '../assets/logo.png';
import Bg from '../assets/bg.jpg';
import { Link } from "react-router-dom";
import axios from "axios";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react'; 

type Inputs = {
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
    const [otpVisible, setOtpVisible] = useState(true);
    const [otpSentLoading, setOtpSentLoading] = useState(false);
    const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
    const [user, setUserdetails] = useState<{ email: string } | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { email } = data;
        setUserdetails({ email });

        try {
            setOtpSentLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-otp`, { email, mode: "signin" });
            if (res.data.success) {
                setOtpSent(true);
                setOtpExpired(false);
                setOtpValue("");
                toast.success("OTP Sent");
            } else {
                toast.error("Failed to send OTP");
            }
        } catch (error: any) {
            console.error("Send OTP error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setOtpSentLoading(false);
        }
    }

    const handleVerifyOtp = async () => {
        if (!user) return;
        try {
            setOtpVerifyLoading(true);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-otp`, { 
                email: user.email, 
                otp: otpValue,
                mode:"signin"
            });
            
            if (res.data.success && res.data.token) {
                await signInWithCustomToken(auth, res.data.token);
                toast.success("OTP verified! Signin successful 🚀");
                setOtpSent(false);
                setOtpValue("");
            } else {
                toast.error(res.data.message || "No token received");
            }
        } catch (error: any) {
            console.error("Error in handleVerifyOtp:", error);
            toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        } finally {
            setOtpVerifyLoading(false);
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
                                type={otpVisible ? "text" : "password"} 
                                placeholder="OTP"
                                disabled={otpExpired}
                                className="w-full border-2 rounded-lg px-3 py-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {otpVisible ? (
                                <button
                                    type="button"
                                    className="absolute right-5 top-4"
                                    onClick={() => setOtpVisible(!otpVisible)}
                                >
                                    <Eye className="text-gray-500" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="absolute right-5 top-4"
                                    onClick={() => setOtpVisible(!otpVisible)}
                                >
                                    <EyeOff className="text-gray-500" />
                                </button>
                            )}
                            <OtpTimer duration={300} onExpire={() => setOtpExpired(true)} />
                        </div>
                    )}

                    {/* Buttons */}
                    {(!otpSent || otpExpired) ? (
                        <button
                            type="submit"
                            disabled={otpSentLoading}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                           {otpSentLoading && (
                             <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                           )}
                           <span>{otpExpired ? "Resend OTP" : "Get OTP"}</span>
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleVerifyOtp}
                            disabled={otpVerifyLoading || !otpValue || otpExpired}
                            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {otpVerifyLoading && (
                              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </button>
                    )}
                </form>

                {/* Sign In Link */}
                <p className="text-center lg:text-left text-gray-600 text-sm mt-4 lg:text-[16px]">
                     Need an account?{" "}
                     <Link to="/signup" className="capitalize text-blue-500 lg:text-md underline font-medium hover:underline">
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

