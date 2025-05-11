/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { useForm } from "react-hook-form";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

interface IRegisterData {
  name: string;
  role: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  image: FileList;
}

const Register = () => {
  const imgbbKey = import.meta.env.VITE_IMAGE_HOSTING_KEY as string; // Make sure you have "VITE_" prefix
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup] = useSignupMutation();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
      let imageUrl = "";

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          formData
        );

        const responseData = res.data as { data: { url: string } };
        imageUrl = responseData.data.url;
      }

      const userData = {
        name: data.name,
        role: data.role,
        address: data.address,
        phone: data.phone,
        email: data.email,
        password: data.password,
        image: imageUrl,
      };

      const result = await signup(userData).unwrap();
      if (result) {
        const user = (await verifyToken(result.token)) as TUser;
        dispatch(setUser({ user, token: result.token }));
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setImageFile(file); // ✅ You missed this line
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
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#833d47]"
              placeholder="Enter Password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Address..."
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Phone Number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {errors.image.message as string}
              </p>
            )}
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center mt-2">
              <img
                src={preview}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#833d47] hover:bg-[#6c2e3b] text-white font-semibold py-2 rounded-lg transition duration-300"
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
