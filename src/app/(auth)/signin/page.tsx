"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import Google from "../../../../public/assets/images/google.png";
import {
  setEmail,
  setPassword,
  setError,
  setIsLoading,
} from "@/redux/slice/authSlice";
import Image from "next/image";

const SignIn = () => {
  const dispatch = useDispatch();
  const { email, password, error, isLoading } = useSelector(
    (state: RootState) => state.auth
  );
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      dispatch(setEmail(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    dispatch(setError(""));

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }
      router?.push("/");
    } catch (error: any) {
      dispatch(setError(error.message || "Login failed"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="flex justify-center text-2xl font-extrabold text-3xl">
            swift<span className="text-purple">CRM</span>
          </h2>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <button
                type="button"
                onClick={handleSignInWithGoogle}
                className="group relative mb-3  w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-purple hover:bg-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Image src={Google} width={30} alt="mr-4" />
                Continue with Google
              </button>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-4 py-4 mb-3 border my-3 border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                autoComplete="current-password"
                required
                value={password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

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
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="forgotPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`relative w-full flex justify-center px-4 py-4 border border-transparent text-lg font-medium rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-purple"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
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
                  href="signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up now
                </Link>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
