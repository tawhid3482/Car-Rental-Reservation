// src/pages/ErrorPage.tsx
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError() as Error;

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
      <p className="text-xl mt-4">কিছু একটা ভুল হয়েছে।</p>
      <p className="mt-2 text-gray-600">
        {error?.message || "অনুগ্রহ করে পরে আবার চেষ্টা করুন।"}
      </p>
    </div>
  );
};

export default ErrorPage;
