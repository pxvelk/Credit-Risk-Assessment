"use client";
import { useState } from "react";
import Link from "next/link";

const Page3 = () => {
  interface PredictionResult {
    prediction: "Yes" | "No";
  }

  const occupationMapping: Record<string, string> = {
    Accountants: "Accounting & Finance",
    "Cleaning staff": "Cleaning & Maintenance",
    "Cooking staff": "Food & Hospitality",
    "Core staff": "General Administration & Support",
    Drivers: "Transportation & Delivery",
    "HR staff": "Human Resources (HR) & Recruitment",
    "High skill tech staff": "Skilled Trades & Technical Services",
    "IT staff": "Information Technology (IT) & Software",
    Laborers: "General Labor & Manufacturing",
  };

  const initialFormData = {
    age: "",
    gender: "Male",
    owns_car: "Yes",
    owns_house: "Yes",
    no_of_children: "",
    net_yearly_income: "",
    no_of_days_employed: "",
    occupation_type: "Accountants",
    total_family_members: "",
    migrant_worker: "Yes",
    yearly_debt_payments: "",
    credit_limit: "",
    credit_limit_used: "",
    credit_score: "",
    prev_defaults: "",
    default_in_last_6months: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showNamePopup, setShowNamePopup] = useState<boolean>(false);
  const [showResultPopup, setShowResultPopup] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({
      ...fieldErrors,
      [name]: value ? "" : "This field is required",
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        errors[key] = "This field is required";
        isValid = false;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    if (!validateForm()) {
      setError("Please fill in all fields before submitting.");
      setLoading(false);
      return;
    }

    setShowNamePopup(true);
    setLoading(false);
  };

  const handleNameSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://abdullah0307.pythonanywhere.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPrediction(data);
      setShowNamePopup(false);
      setShowResultPopup(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError("Error fetching prediction: " + error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPrediction(null);
    setLoading(false);
    setError(null);
    setFieldErrors({});
    setShowNamePopup(false);
    setShowResultPopup(false);
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl">
        <Link href="/" className="flex items-center space-x-2 mb-6">
          <p className="p-3 bg-blue-600 text-white rounded-lg">Back to Home</p>
        </Link>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-300">
        <h1 className="text-3xl font-serif text-center text-blue-700 mb-6">
          Enter Applicant Information for Credit Risk Assessment
        </h1>

        <form className="space-y-8 font-serif" onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
          {/* ... */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min="18"
              max="100"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-700 font-sans"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="owns_car"
            >
              Owns a Car
            </label>
            <select
              id="owns_car"
              name="owns_car"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-700 font-sans"
              value={formData.owns_car}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="owns_house"
            >
              Owns a House
            </label>
            <select
              id="owns_house"
              name="owns_house"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-700 font-sans"
              value={formData.owns_house}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="no_of_children"
            >
              Number of Dependants
            </label>
            <input
              id="no_of_children"
              name="no_of_children"
              type="number"
              min="0"
              max="50000000"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.no_of_children}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="net_yearly_income"
            >
              Net Year Income ($)
            </label>
            <input
              id="net_yearly_income"
              name="net_yearly_income"
              type="number"
              min="0"
              max="1000000000000000"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.net_yearly_income}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="no_of_days_employed"
            >
              Number of Days Employed
            </label>
            <input
              id="no_of_days_employed"
              name="no_of_days_employed"
              type="number"
              min="0"
              max="50000000"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.no_of_days_employed}
              onChange={handleChange}
            />
          </div>

          {/* Occupation Type Dropdown */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">
              Occupation Type
            </label>
            <select
              name="occupation_type"
              className="w-full text-gray-600 p-3 border border-gray-300 rounded-lg"
              value={formData.occupation_type}
              onChange={handleChange}
            >
              {Object.entries(occupationMapping).map(
                ([modelValue, displayName]) => (
                  <option key={modelValue} value={modelValue}>
                    {displayName}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="total_family_members"
            >
              Total Family Members
            </label>
            <input
              id="total_family_members"
              name="total_family_members"
              type="number"
              min="1"
              max="9"
              // placeholder="1"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.total_family_members}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="migrant_worker"
            >
              Migrant Worker
            </label>
            <select
              id="migrant_worker"
              name="migrant_worker"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none text-gray-700 font-sans"
              value={formData.migrant_worker}
              onChange={handleChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="yearly_debt_payments"
            >
              Yearly Debt Payments
            </label>
            <input
              id="yearly_debt_payments"
              name="yearly_debt_payments"
              type="number"
              min="0"
              max="50000000"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.yearly_debt_payments}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="credit_limit"
            >
              Credit Limit
            </label>
            <input
              id="credit_limit"
              name="credit_limit"
              type="number"
              min="0"
              max="50000000"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.credit_limit}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="credit_limit_used"
            >
              Credit Limit Used (%)
            </label>
            <input
              id="credit_limit_used"
              name="credit_limit_used"
              type="number"
              min="0"
              max="100"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.credit_limit_used}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="credit_score"
            >
              Credit Score
            </label>
            <input
              id="credit_score"
              name="credit_score"
              type="number"
              min="0"
              max="850"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.credit_score}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="prev_defaults"
            >
              Previous Defaults
            </label>
            <input
              id="prev_defaults"
              name="prev_defaults"
              type="number"
              min="0"
              max="20000"
              // placeholder="0"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.prev_defaults}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label
              className="block text-gray-700 font-medium"
              htmlFor="default_in_last_6months"
            >
              Default in Last 6 Months
            </label>
            <input
              id="default_in_last_6months"
              name="default_in_last_6months"
              type="number"
              min="0"
              max="50000000"
              // placeholder="98980980980"
              className="w-full font-sans placeholder-gray-600 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
              value={formData.default_in_last_6months}
              onChange={handleChange}
            />
          </div>
          <div className="font-semibold">
            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all"
            >
              {loading ? "Loading..." : "Predict Credit Risk"}
            </button>
          </div>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>

      {showNamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-semibold mb-1 text-center">
              Credit Risk Analysis
            </h2>
            <p className="mb-5 text-center">
              Please enter your information below
            </p>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-gray-900 font-semibold"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  value={firstName}
                  placeholder="Enter your first name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-gray-900 font-semibold"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                  value={lastName}
                  placeholder="Enter your last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 w-full space-x-4">
              <button
                onClick={handleNameSubmit}
                className="bg-blue-700 w-full text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-800 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showResultPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className=" text-blue-400 mb-2 text-sm">
              Credit Risk Prediction Result
            </h2>
            <p className="font-semibold text-2xl text-black mb-8">
              Credit Risk Analysis for {firstName} {lastName}
            </p>
            <p className="mt-2">
              Our advanced machine learning model has analyzed the information
              to predict credit risk.
            </p>
            {prediction?.prediction === "Yes" ? (
              <div className="text-center">
                <button className="mb-6 mt-4 border border-gray-200 rounded-full bg-green-200 text-green-700 px-4 py-1 font-medium shadow-md transition-all">
                  Approved – Low Risk
                </button>
                <br />
                Based on the model’s analysis, the credit risk is classified as
                low. The applicant is highly likely to be approved for credit
                based on the data provided.
              </div>
            ) : (
              <div>
                <button className=" mb-6 mt-4 border border-gray-200 rounded-full bg-red-200 text-red-500 px-4 py-1 font-medium shadow-md transition-all">
                  Declined – High Risk
                </button>
                <br />
                Based on the model’s analysis, the credit risk is classified as
                high. The applicant is highly likely to be denied credit.
                Consider improving the financial profile for better chances in
                the future.
              </div>
            )}
            <button
              onClick={resetForm}
              className="mt-8 border border-gray-200 rounded-full text-black px-4 py-1 font-medium shadow-md transition-all"
            >
              Start New Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page3;