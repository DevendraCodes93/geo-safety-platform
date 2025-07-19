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
  const CreateRef = useRef(null);
  const TrackRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (CreateRef.current && !CreateRef.current.contains(event.target)) {
      setIsCreateURLOpen(false);
    }
    if (TrackRef.current && !TrackRef.current.contains(event.target)) {
      setIsTrackLocationOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  const generateRandomId = () => {
    //10 digit random id
    return Math.random()*10000000000;
  };
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      const userId = generateRandomId();
      localStorage.setItem("userId", userId);
    }
  }, []);
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
              <Image
                src={`${getImagePrefix()}images/icons/icon-Services.svg`}
                alt="icon"
                width={40}
                height={40}
              />
              <p className="text-white sm:text-28 text-18 mb-0">
                Location Tracker <span className="text-primary">Pro</span>
              </p>
            </div>
            <h1 className="font-medium lg:text-76 md:text-70 text-54 lg:text-start text-center text-white mb-10">
              Track <span className="text-primary">Locations</span> with custom{" "}
              <span className="text-primary">URLs</span>!
            </h1>
            <p className="text-gray-300 text-18 lg:text-start text-center mb-10 max-w-lg">
              Create secure, custom URLs that reveal user locations when
              clicked. Perfect for delivery tracking, event management, and
              location-based services.
            </p>
            <div className="flex items-center md:justify-start justify-center gap-8">
              <button
                className="bg-primary border border-primary rounded-lg text-21 font-medium hover:bg-transparent hover:text-primary text-darkmode py-2 px-7 z-50"
                onClick={() => setIsCreateURLOpen(true)}
              >
                Create URL
              </button>
              <button
                className="bg-transparent border border-primary rounded-lg text-21 font-medium hover:bg-primary hover:text-darkmode text-primary py-2 px-7"
                onClick={() => setIsTrackLocationOpen(true)}
              >
                Track Location
              </button>
            </div>
            <div className="flex items-center md:justify-start justify-center gap-8 mt-12">
              <div className="bg-gray-800 rounded-lg px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">
                  Secure & GDPR Compliant
                </span>
              </div>
              <div className="bg-gray-800 rounded-lg px-6 py-3 flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Real-time Tracking</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            {...rightAnimation}
            className="col-span-7 lg:block hidden"
          >
            <div className="ml-20 -mr-64">
              <Image
                src={`${getImagePrefix()}images/hero/banner-image.png`}
                alt="Banner"
                width={1150}
                height={1150}
              />
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
