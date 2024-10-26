"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Google from "../../../../public/assets/images/google.png";
import Image from "next/image";
import {
  setEmail,
  setPassword,
  setName,
  setError,
  setLoading,
  clearState,
} from "@/redux/slice/userSlice";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { email, password, name, error, isLoading } = useSelector(
    (state: RootState) => state?.user
  );

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        dispatch(setEmail(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "name":
        dispatch(setName(value));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const response = await axios.post(
        "/api/register",
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201) {
        router?.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      let errorMessage = "Error registering user";
      if (error.response) {
        if (error.response.data && typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="flex justify-center text-2xl font-extrabold text-3xl">
            swift<span className="text-purple">CRM</span>
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <button
                type="button"
                onClick={loginWithGoogle}
                className="group relative mb-3 w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-purple hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Image src={Google} width={30} alt="mr-4" />
                Continue with Google
              </button>
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={name}
                required
                className="appearance-none rounded-none relative block w-full py-4 px-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-3"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                autoComplete="email"
                value={email}
                required
                className="appearance-none rounded-none relative block w-full py-4 px-4 mb-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete="current-password"
                value={password}
                required
                className="appearance-none rounded-none relative block w-full py-4 px-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex items-center justify-between"></div>
          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-purple hover:bg-purple"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? "Signup..." : "Sign up"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Already have an account?
                <Link
                  href="signin"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in now
                </Link>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
