import Link from "next/link";

const MobileLogo: React.FC = () => {
  return (
    <Link href="/" className="mobile-logo">
      <div className="text-xl font-bold transition-all duration-200 hover:scale-105">
        <span className="text-white">Safe</span>
        <span className="text-green-400">Buddy</span>
      </div>
    </Link>
  );
};

export default MobileLogo;
