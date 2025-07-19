"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Logo from "@/components/Layout/Header/Logo";

const CreateURLForm = () => {
  const [loading, setLoading] = useState(false);
  const [generatedURL, setGeneratedURL] = useState("");

  const [formData, setFormData] = useState({
    urlName: "",
    description: "",
    expiryDays: "7",
    notifyEmail: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Remove spaces from urlName and notifyEmail fields to prevent URL and email issues
    let processedValue = value;
    if (name === "urlName" || name === "notifyEmail") {
      processedValue = value.replace(/\s/g, "");
    }

    setFormData((prevData) => ({ ...prevData, [name]: processedValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const creatorId = localStorage.getItem("userId") || "defaultCreatorId";
    const uniqueSuffix = Date.now()
      .toString(36)
      .replace(/[^a-z0-9]+/g, "");
    const url = `https://safe-buddy.vercel.app/${creatorId}/${formData.urlName}/${uniqueSuffix}`;

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userData: formData,
          creatorId,
          url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create tracking URL");
      }

      const data = await response.json();

      // If backend returns slug, use it; else fallback to local URL
      const newURL = data.slug
        ? `https://safe-buddy.vercel.app/l/${data.slug}`
        : url;

      setGeneratedURL(newURL);
      toast.success("Tracking URL created successfully!");
    } catch (error) {
      toast.error("An error occurred while creating the URL.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedURL);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="w-full mx-auto p-2 sm:p-4">
      <div className="flex justify-center mb-4 sm:mb-8">
        <Logo />
      </div>

      <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
        Create Help Link for Someone Lost
      </h3>

      {!generatedURL ? (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            id="urlName"
            type="text"
            name="urlName"
            placeholder="Link name or identifier (no spaces)"
            value={formData.urlName}
            onChange={handleChange}
            className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full text-sm sm:text-base focus:border-primary focus-visible:outline-0"
          />

          <textarea
            id="description"
            name="description"
            placeholder="Additional details"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full text-sm sm:text-base focus:border-primary focus-visible:outline-0 resize-none"
          />

          <select
            id="expiryDays"
            name="expiryDays"
            value={formData.expiryDays}
            onChange={handleChange}
            className="text-white bg-dark_grey border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full text-sm sm:text-base focus:border-primary focus-visible:outline-0"
          >
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="365">1 Year</option>
          </select>

          <input
            id="notifyEmail"
            type="email"
            name="notifyEmail"
            placeholder="Emergency contact email (optional, no spaces)"
            value={formData.notifyEmail}
            onChange={handleChange}
            className="text-white bg-transparent border border-dark_border border-opacity-60 rounded-md px-3 py-2 w-full text-sm sm:text-base focus:border-primary focus-visible:outline-0"
          />

          <button
            type="submit"
            disabled={loading}
            className="text-darkmode font-medium text-sm sm:text-18 bg-primary w-full border border-primary rounded-lg py-2 sm:py-3 hover:text-primary hover:bg-transparent disabled:opacity-50 mt-4 sm:mt-6"
          >
            {loading ? "Creating..." : "Create Tracking URL"}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
            <p className="text-green-400 mb-2 text-sm sm:text-base">
              ✓ URL Created Successfully!
            </p>
            <p className="text-white text-xs sm:text-sm break-all">
              {generatedURL}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 text-darkmode font-medium text-sm sm:text-16 bg-primary border border-primary rounded-lg py-2 hover:text-primary hover:bg-transparent"
            >
              Copy URL
            </button>

            <button
              onClick={() => {
                setGeneratedURL("");
                setFormData({
                  urlName: "",
                  description: "",
                  expiryDays: "7",
                  notifyEmail: "",
                });
              }}
              className="flex-1 text-primary font-medium text-sm sm:text-16 bg-transparent border border-primary rounded-lg py-2 hover:bg-primary hover:text-darkmode"
            >
              Create Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateURLForm;
