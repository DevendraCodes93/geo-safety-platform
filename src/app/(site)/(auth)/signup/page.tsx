import { SignUp } from "@/components/Auth";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Safe Haven Locator",
};

const SignupPage = () => {
  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", text: "Home" },
          { href: "/signup", text: "Sign Up" },
        ]}
      />

      <SignUp />
    </>
  );
};

export default SignupPage;
