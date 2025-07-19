"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsentModalProps {
  isOpen: boolean;
  onConsent: () => void;
  onDecline: () => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onConsent,
  onDecline,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-gray-800 p-6 text-left shadow-xl transition-all"
          >
            {/* Header */}
            <div className="flex items-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <h3 className="ml-4 text-xl font-semibold text-white">
                Location Tracking Consent
              </h3>
            </div>

            {/* Content */}
            <div className="space-y-4 text-gray-300">
              <p className="text-sm">
                This service will collect your precise location information for
                tracking purposes. Your location data will be used to:
              </p>

              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Provide accurate location tracking services</li>
                <li>Generate detailed location reports</li>
                <li>Improve service accuracy and performance</li>
              </ul>

              <div className="bg-gray-700 rounded-lg p-3">
                <h4 className="font-medium text-white text-sm mb-2">
                  Information We Collect:
                </h4>
                <ul className="text-xs space-y-1 text-gray-300">
                  <li>• GPS coordinates (latitude, longitude)</li>
                  <li>• Location accuracy information</li>
                  <li>• Device and browser information</li>
                  <li>• Timestamp of location access</li>
                </ul>
              </div>

              <p className="text-xs text-gray-400">
                By clicking "Allow Location Tracking," you consent to the
                collection and processing of your location data as described in
                our{" "}
                <a
                  href="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300 underline"
                  target="_blank"
                >
                  Privacy Policy
                </a>
                .
              </p>

              <div className="bg-yellow-900/20 border border-yellow-600/20 rounded-lg p-3">
                <div className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs text-yellow-200">
                    <strong>Your Rights:</strong> You can withdraw consent at
                    any time and request deletion of your data by contacting us.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onDecline}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={onConsent}
                className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors"
              >
                Allow Location Tracking
              </button>
            </div>

            {/* Legal Links */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <div className="flex justify-center space-x-4 text-xs">
                <a
                  href="/privacy-policy"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-of-service"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ConsentModal;
