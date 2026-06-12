"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  // 1. Form Field State
  const [formData, setFormData] = useState({
    ownerName: "",
    contactNumber: "",
    emailAddress: "",
    companyName: "",
    industryType: "",
    companyAddress: "",
    totalEmployees: "",
  });

  // 2. Validation Error Message State
  const [errors, setErrors] = useState({});

  // 3. Dropdown UI States
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);

  // Industry Select Options Matrix
  const industries = [
    "Technology & Software",
    "Healthcare & Medical",
    "Finance & Banking",
    "Education & E-Learning",
    "Real Estate & Construction",
    "Retail & E-Commerce",
  ];

  // Employee Range Options Matrix
  const employeeRanges = ["5-10", "10-50", "50-150", "150+"];

  // 4. Real-Time Field Verification Engine
  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "ownerName":
        if (!value.trim()) errorMsg = "Owner name is required.";
        break;
      case "contactNumber":
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
        if (!value.trim()) {
          errorMsg = "Contact number is required.";
        } else if (!phoneRegex.test(value)) {
          errorMsg = "Please enter a valid telephone context.";
        }
        break;
      case "emailAddress":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          errorMsg = "Email address is required.";
        } else if (!emailRegex.test(value)) {
          errorMsg = "Please enter a valid corporate email configuration.";
        }
        break;
      case "companyName":
        if (!value.trim()) errorMsg = "Company name is required.";
        break;
      case "industryType":
        if (!value) errorMsg = "Please select your operation domain.";
        break;
      case "companyAddress":
        if (!value.trim()) errorMsg = "Company structural address is required.";
        break;
      case "totalEmployees":
        if (!value) errorMsg = "Please select your staff distribution tier.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Input Data Handler Hook
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  // Dropdown Selection Hook Evaluator
  const handleSelectOption = (fieldName, optionValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: optionValue }));
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    if (fieldName === "industryType") setIsIndustryOpen(false);
    if (fieldName === "totalEmployees") setIsEmployeesOpen(false);
  };

  // 5. Explicit Submit Verification Router Execution
  const handleSubmit = (event) => {
    event.preventDefault();

    // Trigger full baseline layout pass
    const executionErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim?.() && !formData[key]) {
        if (key === "ownerName") executionErrors.ownerName = "Owner name is required.";
        if (key === "contactNumber") executionErrors.contactNumber = "Contact number is required.";
        if (key === "emailAddress") executionErrors.emailAddress = "Email address is required.";
        if (key === "companyName") executionErrors.companyName = "Company name is required.";
        if (key === "industryType") executionErrors.industryType = "Please select your operation domain.";
        if (key === "companyAddress") executionErrors.companyAddress = "Company structural address is required.";
        if (key === "totalEmployees") executionErrors.totalEmployees = "Please select your staff distribution tier.";
      }
    });

    // Check email logic structure if field has input
    if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
      executionErrors.emailAddress = "Please enter a valid corporate email configuration.";
    }

    if (Object.keys(executionErrors).length > 0) {
      setErrors(executionErrors);
      return;
    }

    // Pass verification check - Route immediately to Workspace Setup Panel
    router.replace("/manager/workspace-setup");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f3f6ff] via-[#f9faff] to-[#ffffff] text-slate-800 antialiased flex flex-col justify-between py-12 px-6">
      
      {/* Upper Brand Icon Layout */}
      <div className="text-center w-full mb-6">
        <h2 className="text-2xl font-black tracking-tight text-blue-600">Vantage</h2>
        <p className="text-xs font-medium text-slate-500 mt-1 max-w-sm mx-auto">
          Empowering visionary leaders with high-stakes precision and immersive operational clarity.
        </p>
      </div>

      {/* Main Framework Form Card Segment */}
      <div className="w-full max-w-2xl mx-auto rounded-[2.5rem] border border-slate-200/60 bg-white p-10 shadow-2xl shadow-blue-900/5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 text-center">Create Workspace</h1>
        <p className="mt-1.5 text-xs text-slate-500 text-center">
          Setup your executive environment to begin managing projects and teams.
        </p>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          
          {/* Row 1: Owner Name & Contact Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Name</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.ownerName ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
                }`}
                placeholder="Johnathan Sterling"
              />
              {errors.ownerName && (
                <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.ownerName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.contactNumber ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.contactNumber && (
                <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.contactNumber}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
            <input
              type="text"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.emailAddress ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
              }`}
              placeholder="executive@vantage.corp"
            />
            {errors.emailAddress && (
              <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.emailAddress}</p>
            )}
          </div>

          {/* Row 3: Company Name & Industry Selection Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.companyName ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
                }`}
                placeholder="Vantage Solutions Ltd."
              />
              {errors.companyName && (
                <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.companyName}</p>
              )}
            </div>

            {/* Custom Styled Interactive Industry Dropdown Component */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Industry Type</label>
              <button
                type="button"
                onClick={() => {
                  setIsIndustryOpen(!isIndustryOpen);
                  setIsEmployeesOpen(false);
                }}
                className={`mt-2 flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.industryType ? "border-rose-500" : "border-slate-200 focus:border-blue-500"
                } ${formData.industryType ? "text-slate-900" : "text-slate-400"}`}
              >
                <span>{formData.industryType || "Select Industry"}</span>
                <span className="pointer-events-none text-slate-400 transition-transform duration-200">▼</span>
              </button>

              {isIndustryOpen && (
                <div className="absolute z-30 mt-2 w-full max-h-56 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    {industries.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelectOption("industryType", item)}
                        className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {errors.industryType && (
                <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.industryType}</p>
              )}
            </div>
          </div>

          {/* Row 4: Company Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Company Address</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className={`mt-2 w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.companyAddress ? "border-rose-500 focus:border-rose-500" : "border-slate-200 focus:border-blue-500"
              }`}
              placeholder="One World Trade Center, Suite 85, New York, NY"
            />
            {errors.companyAddress && (
              <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.companyAddress}</p>
            )}
          </div>

          {/* Row 5: LinkedIn-Style Total Employee Selector Dropdown */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Total Employees</label>
            <button
              type="button"
              onClick={() => {
                setIsEmployeesOpen(!isEmployeesOpen);
                setIsIndustryOpen(false);
              }}
              className={`mt-2 flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-3 text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.totalEmployees ? "border-rose-500" : "border-slate-200 focus:border-blue-500"
              } ${formData.totalEmployees ? "text-slate-900" : "text-slate-400"}`}
            >
              <span>{formData.totalEmployees ? `${formData.totalEmployees} employees` : "Select scale tier"}</span>
              <span className="pointer-events-none text-slate-400">▼</span>
            </button>

            {isEmployeesOpen && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  {employeeRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => handleSelectOption("totalEmployees", range)}
                      className="block w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      {range} employees
                    </button>
                  ))}
                </div>
              </div>
            )}
            {errors.totalEmployees && (
              <p className="mt-1.5 text-xs font-semibold text-rose-500 flex items-center gap-1">⚠ {errors.totalEmployees}</p>
            )}
          </div>

          {/* Primary Activation Call-to-Action Submit Trigger */}
          <button
            type="submit"
            className="w-full mt-4 rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            Create Workspace <span>→</span>
          </button>
        </form>

        {/* Existing Route Direct Subtext Link */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Sign In
          </Link>
        </p>
      </div>

      {/* Social Verification Footer Asset Section */}
      <div className="mt-10 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
        <div className="flex -space-x-1">
          <div className="h-4 w-4 rounded-full bg-slate-300 ring-2 ring-white" />
          <div className="h-4 w-4 rounded-full bg-slate-400 ring-2 ring-white" />
          <div className="h-4 w-4 rounded-full bg-slate-500 ring-2 ring-white" />
        </div>
        <span>Trusted by over 15,000+ visionary founders globally.</span>
      </div>

    </main>
  );
};

export default SignupPage;