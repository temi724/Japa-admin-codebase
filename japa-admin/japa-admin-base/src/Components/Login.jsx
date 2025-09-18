import { useQuery } from "@tanstack/react-query";
import japaLogo from "../assets/JAPALOGO.png";
import { Eye, ArrowLeft } from "iconsax-react";
import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";

import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [loginState, setLoginState] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maskedPassword, setMaskedPassword] = useState("");
  const [isMasked, setIsMasked] = useState(true);
  const [logged, setLogged] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (logged === "yes") {
      window.location.href = "/admin";
    }
  }, [logged]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login_call = async (email, password) => {

    try {
      //extract to env..
      setLoading(true)
      const { data } = await axios.post(
        "https://server.japatalent.com/japa/v1/admin/login",
        { email, password }
      );
      if (data.message !== "Invalid details") {

        // console.log(data.data.message);
        sessionStorage.setItem("tokken", JSON.stringify(data.message));
        sessionStorage.setItem("details", JSON.stringify(data.user_data));
        setLogged("yes");
        setLoading(false)
        return data;
      } else {
        toast.error("please your check credentials")
        setLoading(false)
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false)
    }
  };


  const handle_login = () => {
    if ((email !== "") & (password !== "")) {
      login_call(email, password);
    }
    else {
      console.log("invalid details")
    }
  };

  const LoginOrReset = () => {
    switch (loginState) {
      case 1:
        return (
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Brand Section */}
            <div className="gradient-animation flex items-center justify-center h-64 lg:h-screen w-full lg:w-[50%] relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10 text-center px-8 animate-slideInLeft">
                <div className="animate-fadeIn">
                  <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-wide">
                    Hello <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      Japa!
                    </span>
                  </h1>
                  <p className="text-white/90 text-base md:text-lg lg:text-[20px] font-medium mt-4 lg:mt-6 leading-relaxed">
                    Unlock your potential for global success with <br className="hidden sm:block" /> 
                    <span className="text-purple-200 font-semibold">Japa Talent</span>
                  </p>
                  <div className="mt-6 lg:mt-8 w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 lg:w-24 lg:h-24 bg-purple-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center w-full lg:w-[50%] bg-gray-50/50 px-4 sm:px-8 py-8 lg:py-0 animate-slideInRight">
              <div className="w-full max-w-md space-y-6 lg:space-y-8">
                {/* Logo */}
                <div className="text-center">
                  <img src={japaLogo} alt="Japa Logo" className="mx-auto h-12 sm:h-16 w-auto animate-float" />
                </div>

                {/* Welcome Section */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back!</h1>
                  <p className="text-gray-600 text-sm sm:text-base">Please sign in to your account</p>
                </div>

                {/* Login Form */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      placeholder="Enter your email"
                      className="w-full h-12 sm:h-14 px-4 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        onChange={(e) => handlePasswordChange(e)}
                        className="w-full h-12 sm:h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                        type={isMasked ? "password" : "text"}
                        value={password}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setIsMasked(!isMasked)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        <Eye size="20" color="#6B7280" />
                      </button>
                    </div>
                  </div>

                  {/* Submit Button or Error Message */}
                  {(email !== "") & (password !== "") ? (
                    <button
                      onClick={handle_login}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
                    >
                      {loading ? (
                        <>
                          <FourSquare color="#ffffff" size="small" text="" textColor="" />
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </button>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-red-500 bg-red-50 py-2 px-4 rounded-lg border border-red-200">
                        Please enter both email and password
                      </p>
                    </div>
                  )}

                  {/* Forgot Password Link */}
                  <div className="text-center">
                    <button
                      onClick={() => setLoginState(2)}
                      className="text-[#5922A9] text-sm font-medium hover:text-[#4A1D96] transition-colors duration-200 hover:underline"
                    >
                      Forgot your password?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Brand Section */}
            <div className="gradient-animation flex items-center justify-center h-64 lg:h-screen w-full lg:w-[50%] relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10 text-center px-8 animate-slideInLeft">
                <div className="animate-fadeIn">
                  <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-wide">
                    Reset <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      Password
                    </span>
                  </h1>
                  <p className="text-white/90 text-base md:text-lg lg:text-[20px] font-medium mt-4 lg:mt-6 leading-relaxed">
                    Don't worry, we'll help you get back <br className="hidden sm:block" /> 
                    <span className="text-purple-200 font-semibold">into your account</span>
                  </p>
                  <div className="mt-6 lg:mt-8 w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 lg:w-24 lg:h-24 bg-purple-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Right Side - Reset Form */}
            <div className="flex items-center justify-center w-full lg:w-[50%] bg-gray-50/50 px-4 sm:px-8 py-8 lg:py-0 animate-slideInRight">
              <div className="w-full max-w-md space-y-6 lg:space-y-8">
                {/* Logo */}
                <div className="text-center">
                  <img src={japaLogo} alt="Japa Logo" className="mx-auto h-12 sm:h-16 w-auto animate-float" />
                </div>

                {/* Back Button */}
                <div>
                  <button
                    onClick={() => setLoginState(1)}
                    className="flex items-center text-gray-600 hover:text-[#5922A9] transition-colors duration-200 group"
                  >
                    <ArrowLeft 
                      size="20" 
                      className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
                    />
                    <span className="text-sm font-medium">Back to login</span>
                  </button>
                </div>

                {/* Reset Section */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reset Password</h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Enter your email address and we'll send you a verification code
                  </p>
                </div>

                {/* Reset Form */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="reset-email" className="block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="reset-email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      placeholder="Enter your email address"
                      className="w-full h-12 sm:h-14 px-4 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={() => setLoginState(3)}
                    className="w-full bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Send Verification Code
                  </button>

                  {/* Additional Help */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      Remember your password?{" "}
                      <button
                        onClick={() => setLoginState(1)}
                        className="text-[#5922A9] font-medium hover:text-[#4A1D96] transition-colors duration-200 hover:underline"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Brand Section */}
            <div className="gradient-animation flex items-center justify-center h-64 lg:h-screen w-full lg:w-[50%] relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10 text-center px-8 animate-slideInLeft">
                <div className="animate-fadeIn">
                  <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-wide">
                    Verify <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      Code
                    </span>
                  </h1>
                  <p className="text-white/90 text-base md:text-lg lg:text-[20px] font-medium mt-4 lg:mt-6 leading-relaxed">
                    Check your email for the <br className="hidden sm:block" /> 
                    <span className="text-purple-200 font-semibold">verification code</span>
                  </p>
                  <div className="mt-6 lg:mt-8 w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 lg:w-24 lg:h-24 bg-purple-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Right Side - Verification Form */}
            <div className="flex items-center justify-center w-full lg:w-[50%] bg-gray-50/50 px-4 sm:px-8 py-8 lg:py-0 animate-slideInRight">
              <div className="w-full max-w-md space-y-6 lg:space-y-8">
                {/* Logo */}
                <div className="text-center">
                  <img src={japaLogo} alt="Japa Logo" className="mx-auto h-12 sm:h-16 w-auto animate-float" />
                </div>

                {/* Back Button */}
                <div>
                  <button
                    onClick={() => setLoginState(2)}
                    className="flex items-center text-gray-600 hover:text-[#5922A9] transition-colors duration-200 group"
                  >
                    <ArrowLeft 
                      size="20" 
                      className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
                    />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>

                {/* Verification Section */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Enter Verification Code</h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-[#5922A9] break-all">{email}</span>
                  </p>
                </div>

                {/* Verification Form */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Verification Code Field */}
                  <div className="space-y-2">
                    <label htmlFor="verification-code" className="block text-sm font-semibold text-gray-700">
                      Verification Code
                    </label>
                    <input
                      id="verification-code"
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength="6"
                      className="w-full h-12 sm:h-14 px-4 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white text-center text-lg font-mono tracking-widest"
                    />
                  </div>

                  {/* Verify Button */}
                  <button
                    onClick={() => setLoginState(4)}
                    className="w-full bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Verify Code
                  </button>

                  {/* Resend Code */}
                  <div className="text-center space-y-4">
                    <p className="text-sm text-gray-500">
                      Didn't receive the code?
                    </p>
                    <button
                      onClick={() => setLoginState(3)}
                      className="text-[#5922A9] font-medium hover:text-[#4A1D96] transition-colors duration-200 hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Left Side - Brand Section */}
            <div className="gradient-animation flex items-center justify-center h-64 lg:h-screen w-full lg:w-[50%] relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative z-10 text-center px-8 animate-slideInLeft">
                <div className="animate-fadeIn">
                  <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[64px] leading-tight tracking-wide">
                    Create <br /> 
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                      Password
                    </span>
                  </h1>
                  <p className="text-white/90 text-base md:text-lg lg:text-[20px] font-medium mt-4 lg:mt-6 leading-relaxed">
                    Almost done! Create your <br className="hidden sm:block" /> 
                    <span className="text-purple-200 font-semibold">new secure password</span>
                  </p>
                  <div className="mt-6 lg:mt-8 w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-10 right-10 w-20 h-20 lg:w-32 lg:h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 left-10 w-16 h-16 lg:w-24 lg:h-24 bg-purple-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Right Side - New Password Form */}
            <div className="flex items-center justify-center w-full lg:w-[50%] bg-gray-50/50 px-4 sm:px-8 py-8 lg:py-0 animate-slideInRight">
              <div className="w-full max-w-md space-y-6 lg:space-y-8">
                {/* Logo */}
                <div className="text-center">
                  <img src={japaLogo} alt="Japa Logo" className="mx-auto h-12 sm:h-16 w-auto animate-float" />
                </div>

                {/* Back Button */}
                <div>
                  <button
                    onClick={() => setLoginState(3)}
                    className="flex items-center text-gray-600 hover:text-[#5922A9] transition-colors duration-200 group"
                  >
                    <ArrowLeft 
                      size="20" 
                      className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" 
                    />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                </div>

                {/* New Password Section */}
                <div className="text-center space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Create New Password</h1>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Choose a strong password for your account
                  </p>
                </div>

                {/* New Password Form */}
                <div className="space-y-4 sm:space-y-6">
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        type={isMasked ? "password" : "text"}
                        placeholder="Enter new password"
                        className="w-full h-12 sm:h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setIsMasked(!isMasked)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        <Eye size="20" color="#6B7280" />
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      id="confirm-password"
                      onChange={(e) => setEmail(e.target.value)}
                      type="password"
                      placeholder="Re-enter new password"
                      className="w-full h-12 sm:h-14 px-4 border-2 border-gray-200 rounded-xl mt-2 focus:border-[#5922A9] focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none bg-white"
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="text-sm font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  {/* Update Password Button */}
                  <button
                    onClick={() => setLoginState(1)}
                    className="w-full bg-gradient-to-r from-[#5922A9] to-[#7B3EC4] text-white font-semibold py-3 sm:py-4 rounded-xl hover:from-[#4A1D96] hover:to-[#6B35B1] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Update Password
                  </button>

                  {/* Success Message */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500">
                      After updating, you'll be redirected to the login page
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return LoginOrReset();
};

export default Login;
