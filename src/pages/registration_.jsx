import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HomeButton from "../components/neumaniaticosButton";
import { useAuth } from '../hooks/useAuth';


export default function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    taxId: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function validate() {
    let err = {};
    if (!form.name) err.name = "Name required";
    if (!form.email) err.email = "Email required";
    if (!form.password) err.password = "Password required";
    if (!form.confirmPassword) err.confirmPassword = "Please re-enter password";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";
    return err;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        console.log("Registering user with data:", form);
        await register({
          name: form.name,
          email: form.email,
          password: form.password,
          tax_id: form.taxId, // opcional
          phone: form.phone    // opcional
        });
        // Si todo sale bien, rediriges al login
        alert("Registration successful! Redirecting to login...");
        navigate("/login");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  function handleGoogleRegister() {
    alert("Google registration not implemented in this demo.");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-brand-base"
    >
      <div
        className="w-full max-w-md rounded-lg shadow-lg p-8 bg-gray-100"
      >
        <HomeButton />
        <h2 className="text-2xl mb-6 font-bold text-center ">
          Register
        </h2>
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center mb-6 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-brand-base text-gray-700 font-semibold"
        >
          <img src="src/assets/logos/google-icon.png" className="w-4 h-4 mx-2" alt="Google" />
          Register with Google
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
              required
            />
            {errors.name && <p className="text-red-500 mt-1 text-xs">{errors.name}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
              required
            />
            {errors.email && <p className="text-red-500 mt-1 text-xs">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
              required
            />
            {errors.password && <p className="text-red-500 mt-1 text-xs ">{errors.password}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium ">
              Re-enter Password <span className="text-red-600">*</span>
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 mt-1 text-xs bg-brand-base">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">
              Phone (Optional)
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" >
              Tax ID (Optional)
            </label>
            <input
              name="taxId"
              value={form.taxId}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-brand-light"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 rounded bg-black text-white font-semibold hover:bg-brand-dark transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}