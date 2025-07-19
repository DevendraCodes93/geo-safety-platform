import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const MobileLogo: React.FC = () => {
  return (
    <Link href="/" className="mobile-logo">
      <Image
        src={`${getImagePrefix()}images/logo/icon.png`}
        alt="LocationTracker Logo"
        width={120}
        height={40}
        className="transition-all duration-200 hover:scale-105"
        style={{ width: "auto", height: "auto" }}
        quality={100}
        priority
      />
    </Link>
  );
};

export default MobileLogo;
