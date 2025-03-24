import { ClientSideRightSection } from "@/modules/auth/ClientSideRightSection";
import { Link } from "@/modules/translations/i18n/routing";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Verdata | Security",
  description: "Verdata website",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left section - Sign In Form */}
      <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-12 flex flex-col animate-slide-up">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-gray-600 mb-12 hover:text-black transition-colors group w-fit"
        >
          <i
            className="icon-[bx--left-arrow-alt] size-4 group-hover:-translate-x-1 transition-transform"
            role="img"
            aria-hidden="true"
          />
          Volver al home
        </Link>
        <div className="my-auto mx-auto w-full flex items-center justify-center">
          {children}
        </div>
      </div>
      {/* Right section - Purple Background with Floating Elements */}
      <ClientSideRightSection />
    </div>
  );
};

export default AuthLayout;
