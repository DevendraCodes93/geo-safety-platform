import { SignIn } from "@/components/Auth";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Safe Haven Locator",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", text: "Home" },
          { href: "/signin", text: "Sign In" },
        ]}
      />

      <SignIn />
    </>
  );
};

export default SigninPage;
