"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setEmail, sendResetEmail } from "@/redux/slice/forgotPasswordSlice";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { email, message, error, isLoading } = useAppSelector(
    (state) => state?.forgotPassword
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendResetEmail(email));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="flex justify-center font-extrabold text-3xl">
          swift<span className="text-purple">CRM</span>
        </h2>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot your password?
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                className="appearance-none rounded-none relative block w-full px-4 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div aria-live="polite">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {message && <div className="text-green-500 text-sm">{message}</div>}
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? "bg-gray-400" : "bg-purple hover:bg-purple"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              disabled={isLoading}
            >
              {isLoading ? "Sending email..." : "Send Password Reset Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
