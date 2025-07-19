import { getImagePrefix } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={`${getImagePrefix()}images/logo/logo.svg`}
        alt="Logo"
        width={160}
        height={50}
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default Logo;
