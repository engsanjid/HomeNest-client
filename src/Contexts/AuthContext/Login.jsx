import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.init";
import useTitle from "../../hooks/useTitle";

export default function Login() {
  useTitle("Login | HomeNest");
  const [loading, setLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email) return toast.error("Email is required.");
    if (!password) return toast.error("Password is required.");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome back!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error(mapFirebaseError(err?.code) || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error(mapFirebaseError(err?.code) || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">

        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold text-primary">Welcome Back</h1>
          <p className="py-6 text-gray-500 leading-relaxed">
            Sign in to your <span className="font-semibold text-primary">HomeNest</span> account to
            manage, post, or explore real estate listings.
          </p>
        </div>

   
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl border border-gray-100">
          <div className="card-body">
            <form onSubmit={handleEmailLogin} noValidate>
              <fieldset className="fieldset space-y-3">
                <div>
                  <label className="label font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    disabled={loading}
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label font-medium" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    disabled={loading}
                  />
                </div>

                
                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary text-white w-full"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </fieldset>
            </form>

            <div className="divider my-5">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center"
              disabled={loading}
              type="button"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Continue with Google
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-primary underline font-medium hover:opacity-80"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapFirebaseError(code) {
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/popup-blocked":
      return "Your browser blocked the popup. Please allow popups for this site.";
    case "auth/popup-closed-by-user":
      return "Google popup was closed before completing sign in.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Try again later.";
    default:
      return null;
  }
}
