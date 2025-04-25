import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { useForm } from "react-hook-form";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  interface IRegisterData {
    name: string;
    role: string;
    address: string;
    phone: string;
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterData>({
    defaultValues: {
      role: "user",
    },
  });

  const onSubmit = async (data: IRegisterData) => {
    try {
      const result = await signup(data).unwrap();
      if (result) {
        const user = (await verifyToken(result.token)) as TUser;
        dispatch(setUser({ user, token: result.token }));
        toast.success("Logged in");
        navigate("/");
      }
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#ffffff] to-[#3DEEB7] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#00194A]">
          Create Account
        </h2>
        <p className="text-center text-gray-600">Join us and get started!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

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
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
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
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Address..."
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Phone Number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#833d47] hover:bg-[#6c2e3b] text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-[#833d47] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
