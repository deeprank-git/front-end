"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  
  // Form Field Configuration States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Interactive Validation Handling UI States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Field Level Real-Time Input Valuators
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFormError("");
    
    if (!value.trim()) {
      setEmailError("Email address is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Please enter a valid operational corporate email configuration.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setFormError("");
    
    if (!value) {
      setPasswordError("Security Key password is required.");
    } else {
      setPasswordError("");
    }
  };

  // Form Submission Authenticator Matrix Router
  const handleSubmit = (event) => {
    event.preventDefault();

    // Clean up input spaces
    const targetEmail = email.trim();
    const targetPassword = password.trim();

    let hasErrors = false;

    // Run absolute empty field verification pass
    if (!targetEmail) {
      setEmailError("Email address is required.");
      hasErrors = true;
    }
    if (!targetPassword) {
      setPasswordError("Security Key password is required.");
      hasErrors = true;
    }

    if (hasErrors || emailError || passwordError) return;

    // Hardcoded Authentication Configuration Matrix Path Validation
    if (targetEmail === "test@manager.com" && targetPassword === "Manager@123") {
      router.push("/manager/dashboard");
      return;
    }

    if (targetEmail === "test@employee.com" && targetPassword === "Employee@123") {
      router.push("/employee/dashboard");
      return;
    }

    // Replace alert logic with explicit card state notification
    setFormError("Invalid configuration credentials. Please check parameters and retry.");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f3f6ff] via-[#f9faff] to-[#ffffff] text-slate-800 antialiased flex flex-col justify-between py-16 px-6">
      
      {/* Upper Vantage Hub Brand Marker Layout */}
      <div className="text-center w-full mt-4">
        <div className="flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-slate-900">
          <span className="text-blue-600">VM</span>
          <span className="text-slate-400 font-light">|</span>
          <div className="flex items-center gap-1 text-slate-950">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="uppercase tracking-wider font-extrabold text-xl">Vantage</span>
          </div>
        </div>
        <p className="text-xs font-medium text-slate-500 mt-2">
          Enter the executive suite. Strategic oversight, illuminated.
        </p>
      </div>

      {/* Primary Verification Dashboard Box Node Container */}
      <div className="w-full max-w-md mx-auto rounded-[2.5rem] border border-slate-200/60 bg-white p-10 shadow-2xl shadow-blue-900/5">
        
        {/* Top level global server error node status display hook */}
        {formError && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-600 text-center animate-pulse">
            ⚠ {formError}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Utility Input Node Block */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                ✉
              </span>
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                className={`w-full rounded-2xl border bg-white pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                  emailError ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
                }`}
                placeholder="name@vantage.corp"
              />
            </div>
            {emailError && (
              <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {emailError}</p>
            )}
          </div>

          {/* Security Key / Password Node Block */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Security Key</label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Forgot Password?
              </a>
            </div>
            <div className="relative mt-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full rounded-2xl border bg-white pl-10 pr-12 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                  passwordError ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
                }`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none text-xs font-semibold"
              >
                {showPassword ? "👁" : "🙈"}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {passwordError}</p>
            )}
          </div>

          {/* Primary Action Execution Submit Button Layout Route */}
          <button
            type="submit"
            className="w-full mt-4 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Login to Dashboard <span>→</span>
          </button>
        </form>

        {/* Existing Route Direct Alternative Action Text Link Hook */}
        <p className="mt-8 text-center text-xs text-slate-500">
          New to the enterprise?{" "}
          <Link href="/signup" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Create Workspace
          </Link>
        </p>
      </div>

      {/* Environmental Compliance Framework Security Sub-Label Section */}
      <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
        <span>🛡</span>
        <span>AES-256 Encrypted Environment</span>
      </div>

    </main>
  );
};

export default LoginPage;