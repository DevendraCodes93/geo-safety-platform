import { perksData } from "@/app/api/data";
import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";

const Perks = () => {
  return (
    <section className="pb-28 relative overflow-hidden ">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <div className="text-center mt-10">
          <p className="text-muted sm:text-28 text-18 mb-4 pb-6 relative after:content-[''] after:w-8 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
            Always By <span className="text-primary">your side</span>
          </p>
          <h2 className="text-white sm:text-40 text-30 font-medium">
            Start helping with Safe{" "}
            <span className="text-primary">Haven Locator</span>!
          </h2>
          <div className="mt-16 border border-border grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 border-opacity-20 py-8 sm:py-16 gap-6 sm:gap-10 px-4 sm:px-6 lg:px-20 rounded-3xl sm:bg-perk bg-dark_grey bg-opacity-35 lg:bg-bottom bg-center bg-no-repeat mx-auto max-w-full">
            {perksData.map((item: any, index: number) => (
              <div
                key={index}
                className="text-center flex items-center justify-center flex-col px-2"
              >
                <div className="bg-primary bg-opacity-25 backdrop-blur-sm p-4 rounded-full w-fit mb-4">
                  <Image
                    src={`${getImagePrefix()}${item.icon}`}
                    alt={item.title}
                    width={44}
                    height={44}
                  />
                </div>
                <h4
                  className={`text-white text-20 sm:text-24 lg:text-28 mb-4 ${item.space}`}
                >
                  {item.title}
                </h4>
                <div
                  className="text-muted text-opacity-60 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-tealGreen to-charcoalGray w-64 sm:w-96 lg:w-50 h-64 sm:h-96 lg:h-50 rounded-full sm:-bottom-80 -bottom-32 blur-400 z-0 absolute -left-32 sm:-left-48 opacity-60"></div>
    </section>
  );
};

export default Perks;
