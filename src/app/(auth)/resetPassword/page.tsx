"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setPassword,
  setConfirmPassword,
  setToken,
  setError,
  resetPassword,
} from "@/redux/slice/resetPasswordSlice";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { password, confirmPassword, error, isLoading, token } = useAppSelector(
    (state) => state?.resetPassword
  );
  const router = useRouter();

  useEffect(() => {
    const queryToken = new URLSearchParams(window?.location?.search)?.get(
      "token"
    );
    if (queryToken) {
      dispatch(setToken(queryToken));
    }
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      dispatch(setError("Invalid or expired link"));
      return;
    }

    if (password !== confirmPassword) {
      dispatch(setError("Passwords do not match"));
      return;
    }

    try {
      await dispatch(resetPassword({ token, password }))?.unwrap();
      router?.push("/auth/signin");
    } catch (error: any) {
      dispatch(setError(error.message || "Password reset failed"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="flex justify-center text-2xl font-extrabold text-3xl">
          swift<span className="text-purple">CRM</span>
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
                className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                className="appearance-none rounded-none relative block w-full my-3 px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-purple hover:bg-purple"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? "Resetting password..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
