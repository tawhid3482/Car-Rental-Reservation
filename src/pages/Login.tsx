/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/features/hooks";
import { verifyToken } from "../utils/verifyToken";

interface ILoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const [login] = useLoginMutation();

  const onSubmit = async (data: ILoginData) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userData).unwrap();

      const user = (await verifyToken(res.token)) as TUser;
      dispatch(setUser({ user, token: res.token }));
      toast.success("Logged in");
      navigate("/");
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3DEEB7] to-[#ffffff] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#00194A]">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600">Login to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#833d47]"
              placeholder="you@example.com"
              required
              {...register("email", { required: true })}
            />
            {errors.email && <span>Email field is required</span>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#833d47]"
              placeholder="enter your password"
              required
              {...register("password", { required: true })}
            />
            {errors.password && <span>Password field is required</span>}
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-[#833d47] hover:bg-[#6c2e3b] text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-[#833d47] hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
