import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import bg from "../assets/bg.jpg";

export default function Landing() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white/90 backdrop-blur p-10 rounded-2xl shadow-xl w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">AutoML Lite</h1>
        <p className="text-gray-600 mb-8">Upload data. Pick a task. Train models. All in your browser.</p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 rounded-lg border border-blue-600 text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}


