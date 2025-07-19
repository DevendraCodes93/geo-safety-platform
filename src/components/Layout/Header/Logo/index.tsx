import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <div className="text-2xl font-bold">
        <span className="text-white">Safe</span>
        <span className="text-green-400">Buddy</span>
      </div>
    </Link>
  );
};

export default Logo;
