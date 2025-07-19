import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { footerlabels } from "@/app/api/data";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 lg:gap-20 md:gap-6 sm:gap-12 gap-6  pb-16">
          <div className="lg:col-span-4 md:col-span-6 col-span-6">
            <Logo />
            <p className="text-gray-300 text-16 mt-6 leading-relaxed">
              Safe Haven Locator helps people find their way home and assists in
              location tracking with privacy and security at the forefront.
            </p>
            <div className="flex gap-6 items-center mt-8">
              <Link
                href="https://linkedin.com/in/devendra-hosamani"
                target="_blank"
                className="group"
              >
                <Icon
                  icon="fa6-brands:linkedin"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary transition-colors duration-300"
                />
              </Link>
              <Link
                href="https://twitter.com/devendrahosamani"
                target="_blank"
                className="group"
              >
                <Icon
                  icon="fa6-brands:x-twitter"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary transition-colors duration-300"
                />
              </Link>
              <Link
                href="https://github.com/devendrahosamani"
                target="_blank"
                className="group"
              >
                <Icon
                  icon="fa6-brands:github"
                  width="24"
                  height="24"
                  className="text-white group-hover:text-primary transition-colors duration-300"
                />
              </Link>
            </div>

            {/* Developer Info */}
            <div className="mt-12 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Icon
                  icon="mdi:account-circle"
                  width="20"
                  height="20"
                  className="text-primary"
                />
                <h4 className="text-white text-18 font-medium">Developer</h4>
              </div>
              <p className="text-gray-300 text-16">Devendra Hosamani</p>
              <p className="text-gray-400 text-14 mt-1">
                Full Stack Developer & UI/UX Designer
              </p>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-14">
                © 2025 Safe Haven Locator. All rights reserved.
              </p>
              <p className="text-gray-500 text-12 mt-1">
                Developed with ❤️ by Devendra Hosamani
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Information</h4>
            <ul>
              {footerlabels.map((item: any, index: number) => (
                <li key={index} className="pb-4">
                  <Link
                    href={item.href}
                    className="text-white hover:text-primary text-17"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 md:col-span-4 col-span-6">
            <h3 className="text-white text-24 font-medium">Get in Touch</h3>
            <p className="text-muted text-opacity-60 text-18 mt-5">
              Have questions or need support?
              <br /> Reach out to us anytime.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Icon
                  icon="mdi:email"
                  width="20"
                  height="20"
                  className="text-primary"
                />
                <Link
                  href="mailto:devu935352@gmail.com"
                  className="text-gray-300 hover:text-primary text-16 transition-colors duration-300"
                >
                  devu@gmail.com
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Icon
                  icon="mdi:map-marker"
                  width="20"
                  height="20"
                  className="text-primary"
                />
                <span className="text-gray-300 text-16">Karnataka, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h4 className="text-white text-18 font-medium mb-4">
                Stay Updated
              </h4>
              <div className="relative">
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  placeholder="Enter your email"
                  className="bg-transparent border border-dark_border border-opacity-60 py-3 text-white rounded-lg w-full px-4 text-14 focus:border-primary focus:outline-none transition-colors duration-300"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/80 text-darkmode p-2 rounded-md transition-colors duration-300">
                  <Icon icon="tabler:send" width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
