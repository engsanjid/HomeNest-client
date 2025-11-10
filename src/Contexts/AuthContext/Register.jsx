import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.init";
import useTitle from "../../hooks/useTitle";

export default function Register() {
  useTitle("Register | HomeNest");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

  const handleRegister = async (event) => {
    event.preventDefault();
    if (loading) return;

    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    if (!name) return toast.error("Please enter your name.");
    if (!email) return toast.error("Please enter your email.");
    if (!passwordPattern.test(password))
      return toast.error(
        "Password must be at least 6 characters with both uppercase and lowercase letters."
      );

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || undefined,
      });

      toast.success("Account created successfully!");
      navigate("/", { replace: true });
      form.reset();
    } catch (err) {
      toast.error(mapFirebaseError(err?.code) || "Registration failed.");
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
      toast.success("Signed in with Google!");
      navigate("/", { replace: true });
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
          <h1 className="text-5xl font-bold text-primary">Create Account</h1>
          <p className="py-6 text-gray-600">
            Join <span className="font-semibold text-primary">HomeNest</span> to
            post and explore the best real estate listings around you.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl border border-gray-100">
          <div className="card-body">
            <form onSubmit={handleRegister} noValidate>
              <fieldset className="fieldset">
                <label className="label font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  required
                  disabled={loading}
                />

                <label className="label font-medium mt-3">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                  required
                  disabled={loading}
                />

                <label className="label font-medium mt-3">Photo URL</label>
                <input
                  type="url"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full"
                  disabled={loading}
                />

                <label className="label font-medium mt-3">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  autoComplete="new-password"
                  required
                  disabled={loading}
                />

                <button
                  className="btn btn-primary text-white mt-5 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </fieldset>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
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
              Already have an account?{" "}
              <Link to="/login" className="text-primary underline font-medium">
                Login
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
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/popup-closed-by-user":
      return "Google sign-in popup closed before completion.";
    default:
      return null;
  }
}
