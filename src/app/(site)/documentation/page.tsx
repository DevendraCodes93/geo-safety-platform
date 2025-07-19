import { Documentation } from "@/components/Documentation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Safe Haven Locator",
};

export default function Page() {
  return (
    <>
      <Documentation />
    </>
  );
}
