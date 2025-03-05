import { Link } from "@/modules/translations/i18n/routing";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Verdata | Security",
  description: "Verdata website",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left section - Sign In Form */}
      <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-12 flex flex-col animate-slide-up">
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
        <div className="my-auto max-w-md mx-auto w-full">{children}</div>
      </div>
      {/* Right section - Purple Background with Floating Elements */}
      <div className="hidden md:block w-1/2 bg-purple-500 relative overflow-hidden purple-shape">
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center text-white p-12">
          <div className="max-w-md text-center">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Consultas{" "}
              <span className="relative inline-block">
                diseñadas
                <span className="absolute -top-1 left-0 right-0 mx-auto w-full h-[1.5px] bg-white/70 rounded-full"></span>
                <span className="absolute -bottom-1 left-0 right-0 mx-auto w-full h-[1.5px] bg-white/70 rounded-full"></span>
              </span>
              <br /> con base en tus <br />
              necesidades***
            </h2>
          </div>

          {/* Floating elements */}
          <div
            className="absolute bottom-36 left-44 !-rotate-[20deg] bg-black text-white px-6 py-3 rounded-full floating-tag z-20"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ "--index": "0" } as any}
          >
            <span className="text-3xl font-semibold">verdata.co</span>
          </div>

          <div
            className="absolute bottom-24 left-80 !rotate-[20deg] bg-white text-purple-400 px-5 py-3 rounded-full floating-tag z-10"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ "--index": "1" } as any}
          >
            <span className="text-2xl font-medium">Conoce a tu cliente</span>
          </div>

          <div
            className="absolute bottom-8 left-64 max-w-52 !rotate-12 text-center bg-yellow-300 text-black px-5 py-3 rounded-lg floating-tag"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            style={{ "--index": "2" } as any}
          >
            <span className="text-2xl font-medium">
              Una solución integral para tí
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
