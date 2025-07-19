// This file helps with TypeScript module resolution
import type { NextComponentType } from "next";
import type { AppProps } from "next/app";

declare module "@/components/BreadcrumbNav" {
  const BreadcrumbNav: NextComponentType<
    any,
    any,
    { links: Array<{ href: string; text: string }> }
  >;
  export default BreadcrumbNav;
}

declare module "@/components/Documentation" {
  export const Documentation: NextComponentType;
}
