// This file helps with TypeScript module resolution
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";

declare module "@/components/Auth/SignIn" {
  const SignIn: NextComponentType;
  export default SignIn;
}

declare module "@/components/Auth/SignUp" {
  const SignUp: NextComponentType;
  export default SignUp;
}

declare module "@/components/Breadcrumb" {
  const Breadcrumb: NextComponentType<
    any,
    any,
    { links: Array<{ href: string; text: string }> }
  >;
  export default Breadcrumb;
}

declare module "@/components/Documentation" {
  export const Documentation: NextComponentType;
}
