"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CreateURLForm from "./create-url-form";
import TrackLocationForm from "./track-location-form";
import { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getImagePrefix } from "@/utils/utils";

const Hero = () => {
  const [isCreateURL, setIsCreateURLOpen] = useState(false);
  const [isTrackLocation, setIsTrackLocationOpen] = useState(false);
  const CreateRef = useRef<HTMLDivElement>(null);
  const TrackRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      CreateRef.current &&
      !CreateRef.current.contains(event.target as Node)
    ) {
      setIsCreateURLOpen(false);
    }
    if (TrackRef.current && !TrackRef.current.contains(event.target as Node)) {
      setIsTrackLocationOpen(false);
    }
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      const userId = generateRandomId();
      localStorage.setItem("userId", userId);
    }
  }, []);
  const generateRandomId = () => {
    //10 digit random id
    return Math.random().toFixed(10).substring(2, 8);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    document.body.style.overflow =
      isCreateURL || isTrackLocation ? "hidden" : "";
  }, [isCreateURL, isTrackLocation]);

  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section
      className="relative md:pt-40 md:pb-28 py-20 overflow-hidden z-1"
      id="main-banner"
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="grid grid-cols-12">
          <motion.div {...leftAnimation} className="lg:col-span-5 col-span-12">
            <div className="flex gap-6 items-center lg:justify-start justify-center mb-5 mt-24">
              <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="text-white sm:text-28 text-18 mb-0">
                Location Tracker <span className="text-primary">Plus</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              Track <span className="text-primary">Locations</span> & Help Lost{" "}
              <span className="text-primary">People</span>
            </h1>
            <p className="text-gray-300 text-18 lg:text-start text-center mb-10 max-w-lg">
              Create custom location tracking URLs for business needs, delivery
              tracking, and help lost people find their way. Secure location
              sharing with emergency assistance features for those who need
              help.
            </p>
            <div className="flex items-center md:justify-start justify-center gap-4 sm:gap-8">
              <button
                className="bg-primary border border-primary rounded-lg sm:text-21 text-18 font-medium hover:bg-transparent hover:text-primary text-darkmode sm:py-2 py-3 sm:px-7 px-5 z-50 transition-all duration-200 active:scale-95"
                onClick={() => setIsCreateURLOpen(true)}
                onTouchStart={() => {}} // Enable touch support
              >
                Create URL
              </button>
              <Link
                href={"/track"}
                className="bg-transparent border border-primary rounded-lg sm:text-21 text-18 font-medium hover:bg-primary hover:text-darkmode text-primary sm:py-2 py-3 sm:px-7 px-5 transition-all duration-200 active:scale-95 block text-center"
                // onClick={() => setIsTrackLocationOpen(true)}
              >
                Track Location
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 sm:gap-8 mt-12">
              <div className="bg-gray-800 rounded-lg px-4 sm:px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm">
                  Secure & GDPR Compliant
                </span>
              </div>
              <div className="bg-gray-800 rounded-lg px-4 sm:px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm">
                  Real-time Tracking
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={`${getImagePrefix()}images/main.png`}
                  alt="Location Tracker Pro Dashboard Interface"
                  width={1150}
                  height={1150}
                  className="object-cover w-[85%] object-bottom -mt-[300px]"
                  style={{
                    clipPath: "inset(200px 0 0 0)",
                    filter: "blur(0px)",
                    borderRadius: "16px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-darkmode opacity-20 rounded-2xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute w-50 h-50 bg-gradient-to-bl from-tealGreen from-50% to-charcoalGray to-60% blur-400 rounded-full -top-64 -right-14 -z-1"></div>

      {/* Modals */}
      {isCreateURL && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={CreateRef}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg px-4 sm:px-8 pt-14 pb-8 z-999 text-center bg-dark_grey bg-opacity-90 backdrop-blur-md"
          >
            <button
              onClick={() => setIsCreateURLOpen(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 dark:invert"
              aria-label="Close Create URL Modal"
            >
              <Icon
                icon="tabler:x"
                className="text-white hover:text-primary text-20 sm:text-24 inline-block"
              />
            </button>
            <CreateURLForm />
          </div>
        </div>
      )}
      {isTrackLocation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={TrackRef}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg px-4 sm:px-8 pt-14 pb-8 z-999 text-center bg-dark_grey bg-opacity-90 backdrop-blur-md"
          >
            <button
              onClick={() => setIsTrackLocationOpen(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 dark:invert"
              aria-label="Close Track Location Modal"
            >
              <Icon
                icon="tabler:x"
                className="text-white hover:text-primary text-20 sm:text-24 inline-block"
              />
            </button>
            <TrackLocationForm />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
