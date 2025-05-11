/* eslint-disable @typescript-eslint/no-explicit-any */
// UpdateCarForm.tsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useGetSingleCarQuery,
  useUpdateCarMutation,
} from "../../../redux/features/car/carApi";
import toast from "react-hot-toast";
import { FaCar, FaCheckCircle, FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";

const imgbbAPIKey = import.meta.env.VITE_IMGBB_KEY;

interface CarFormInputs {
  name: string;
  type: string;
  sit: number;
  door: number;
  bag: number;
  love: number;
  color: string;
  pricePerHour: number;
  isElectric: string;
  status: string;
  features: string;
  description: string;
  images: FileList;
}

const UpdateCarForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useGetSingleCarQuery(id!, { skip: !id });
  const car = data?.data || null;
  const [updateCar] = useUpdateCarMutation();

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CarFormInputs>();

  useEffect(() => {
    if (car) {
      reset({
        ...car,
        features: car.features?.join(", ") || "",
        isElectric: String(car.isElectric),
      });
      setImageUrls(car.image);
    }
  }, [car, reset]);

  const uploadImageToImgbb = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await res.json();
    if (!result.success) {
      throw new Error(result.error.message);
    }
    return result.data.url;
  };

  const onSubmit = async (data: CarFormInputs) => {
    setUploading(true);
    let uploadedUrls = imageUrls;

    try {
      if (data.images && data.images.length > 0) {
        const imageFiles = Array.from(data.images);
        uploadedUrls = await Promise.all(
          imageFiles.map(async (file, index, array) => {
            const url = await uploadImageToImgbb(file);
            setUploadProgress(Math.round(((index + 1) / array.length) * 100));
            return url;
          })
        );
        setImageUrls(uploadedUrls);
      }

      const payload = {
        name: data.name,
        type: data.type,
        image: uploadedUrls,
        sit: Number(data.sit),
        door: Number(data.door),
        bag: Number(data.bag),
        love: Number(data.love),
        description: data.description,
        color: data.color,
        isElectric: data.isElectric === "true",
        status: data.status,
        features: data.features.split(",").map((f) => f.trim()),
        pricePerHour: Number(data.pricePerHour),
        isDeleted: false,
      };

      await updateCar({ id: id!, data: payload }).unwrap();
      toast.success("Car updated successfully!");
      navigate("/dashboard/manage-cars");
    } catch (error: any) {
      console.error("❌ Update failed:", error);
      toast.error(
        `❌ Update failed: ${error.message || "Something went wrong"}`
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-10 border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
        <FaCar className="text-blue-500" />
        Update Car
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Car Name
          </label>
          <input
            {...register("name", { required: "Car name is required" })}
            id="name"
            defaultValue={car?.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Car Type
          </label>
          <select
            {...register("type", { required: "Car type is required" })}
            id="type"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select car type</option>
            <option value="Car">Car</option>
            <option value="Van">Van</option>
            <option value="electric">Electric</option>
            <option value="Super-Car">Super-Car</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs italic">{errors.type.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="sit"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Seat Count
          </label>
          <input
            type="number"
            {...register("sit", { required: "Seat count is required", min: 1 })}
            id="sit"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number of seats"
          />
          {errors.sit && (
            <p className="text-red-500 text-xs italic">{errors.sit.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="door"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Door Count
          </label>
          <input
            type="number"
            {...register("door", {
              required: "Door count is required",
              min: 2,
            })}
            id="door"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number of doors"
          />
          {errors.door && (
            <p className="text-red-500 text-xs italic">{errors.door.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="bag"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bag Capacity
          </label>
          <input
            type="number"
            {...register("bag", {
              required: "Bag capacity is required",
              min: 0,
            })}
            id="bag"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number of bags"
          />
          {errors.bag && (
            <p className="text-red-500 text-xs italic">{errors.bag.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="love"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Love Count ❤️
          </label>
          <input
            type="number"
            {...register("love", {
              required: "Love count is required",
              min: 0,
            })}
            id="love"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number of loves"
          />
          {errors.love && (
            <p className="text-red-500 text-xs italic">{errors.love.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="color"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Color
          </label>
          <input
            {...register("color", { required: "Color is required" })}
            id="color"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Car color"
          />
          {errors.color && (
            <p className="text-red-500 text-xs italic">
              {errors.color.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="pricePerHour"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price Per Hour
          </label>
          <input
            type="number"
            step="0.01"
            {...register("pricePerHour", {
              required: "Price per hour is required",
              min: 0.01,
            })}
            id="pricePerHour"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., 25.50"
          />
          {errors.pricePerHour && (
            <p className="text-red-500 text-xs italic">
              {errors.pricePerHour.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="isElectric"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Is Electric?
          </label>
          <select
            {...register("isElectric")}
            id="isElectric"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <select
            {...register("status", { required: "Status is required" })}
            id="status"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs italic">
              {errors.status.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="features"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Features (comma-separated)
          </label>
          <input
            {...register("features", { required: "Features are required" })}
            id="features"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., AC, GPS, Sunroof"
          />
          {errors.features && (
            <p className="text-red-500 text-xs italic">
              {errors.features.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            id="description"
            rows={3}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter car description"
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="images"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload Car Images <FaCloudUploadAlt className="inline-block ml-1" />
          </label>
          <input
            type="file"
            {...register("images")}
            id="images"
            accept="image/*"
            multiple
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          {uploading && (
            <div className="mt-2">
              <progress
                value={uploadProgress}
                max="100"
                className="w-full h-2 rounded-full bg-gray-200"
              ></progress>
              <p className="text-gray-600 text-xs mt-1">
                {uploadProgress}% Uploaded
              </p>
            </div>
          )}
          {imageUrls?.length > 0 && (
            <div className="mt-2">
              <p className="text-gray-700 text-sm font-medium">
                Uploaded Images:
              </p>
              <div className="flex space-x-2 mt-1">
                {imageUrls.map((url) => (
                  <img
                    key={url}
                    src={url}
                    alt="Uploaded Car"
                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={uploading || isLoading}
            className={`w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300 ${
              uploading || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              "Adding Car..."
            ) : uploading ? (
              "Uploading Images..."
            ) : (
              <>
                <FaCheckCircle className="inline-block mr-2" /> Add Car
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCarForm;
