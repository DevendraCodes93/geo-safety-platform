"use client";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getImagePrefix } from "@/utils/utils";

const Work = () => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const bottomAnimation = {
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  };

  const services = [
    {
      icon: "/images/icons/icon-Services.svg",
      text: "Emergency Location Sharing",
    },
    {
      icon: "/images/icons/icon-consulting.svg",
      text: "Family Reunification",
    },
    {
      icon: "/images/icons/icon-blockchain.svg",
      text: "Child-Safe Platform",
    },
  ];

  return (
    <section className="relative flex bottom-15 " id="work">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div ref={ref} className="grid grid-cols-12 items-center">
          <motion.div
            {...bottomAnimation}
            className="lg:col-span-7 col-span-12"
          >
            <p className="sm:text-28 text-18 text-white">
              How we <span className="text-primary">help</span>
            </p>
            <h2 className="sm:text-40 text-30 text-white lg:w-full md:w-70% font-medium">
              Compassionate technology to reunite families and help lost people
              find their way home.
            </h2>
            <div className="grid md:grid-cols-2 gap-7 mt-11">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-5">
                  <div className="px-5 py-5 bg-light_grey bg-opacity-30 rounded-full">
                    <Image
                      src={`${getImagePrefix()}${service.icon}`}
                      alt={`${service.text} icon`}
                      width={40}
                      height={40}
                    />
                  </div>
                  <p className="text-24 text-muted">{service.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className="lg:col-span-5 col-span-12">
            <div className="2xl:-mr-40 mt-9 flex justify-center">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image
                  src={`${getImagePrefix()}images/work/img-work-with-us.png`}
                  alt="Work with us - Location Tracking Services"
                  width={600}
                  height={425}
                  className="lg:w-full object-cover rounded-3xl"
                  style={{
                    filter: "contrast(1.1) brightness(1.05) saturate(1.1)",
                    borderRadius: "24px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-600/20 rounded-3xl blur-sm -z-10"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Work;
