"use client";

import { RoundedButton } from "../common/components/RoundedButton";
import { usePathname } from "../translations/i18n/routing";

export const ClientSideRightSection = () => {
  const pathname = usePathname();
  const isWhitelist = pathname === "/auth/whitelist";
  const isSignIn = pathname === "/auth/sign-in";
  const isSignUp = pathname === "/auth/sign-up";

  const bgColorClass =
    isSignIn || isWhitelist ? "bg-purple-500" : "bg-[#e5e5e7]";

  return (
    <div className="purple-shape-container w-1/2 relative  hidden lg:block">
      <div className="purple-shape-border -translate-x-[1px]"></div>
      <div
        className={`purple-shape ${bgColorClass} flex-col items-center justify-center h-full relative overflow-hidden`}
      >
        <div className="absolute top-8 right-8 text-white z-10">
          <RoundedButton
            className="border  border-primary"
            onClick={() => window.open("https://verdata.co/inicio/", "_blank")}
          >
            <span className="text-sm opacity-80">verdata.co</span>
          </RoundedButton>
        </div>

        {/* Conditional content based on page */}
        {isSignIn ? (
          <div className="absolute inset-0 -inset-y-[3rem] inset-x-[4rem] w-full h-full flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-lg text-left">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
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
          </div>
        ) : isSignUp ? (
          <div className="max-w-md text-center px-8">
            <h2 className="text-3xl font-bold mb-6">
              Empieza tu viaje con Verdata
            </h2>
            <p className="mb-8 text-lg opacity-90">
              Crea una cuenta para acceder a todas nuestras herramientas y
              soluciones
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-medium">Conoce a tu cliente</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-medium">Gestión de riesgos</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-medium">Análisis avanzado</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="font-medium">Soporte 24/7</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 -inset-y-[3rem] inset-x-[4rem] w-full h-full flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-lg text-left">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
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
          </div>
        )}

        {/* Floating elements */}
        <div
          className="absolute bottom-36 left-52 floating-tag z-20"
          style={
            {
              "--index": "0",
              transformOrigin: "center",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        >
          <div className="-rotate-[20deg] bg-black text-white px-6 py-3 rounded-full">
            <span className="text-5xl font-semibold">verdata.co</span>
          </div>
        </div>

        <div
          className="absolute bottom-32 left-[28rem]  text-purple-400 floating-tag z-10"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "1" } as any}
        >
          <div className="rotate-[20deg] px-10 py-6 rounded-3xl bg-white">
            <span className="text-2xl font-medium">Conoce a tu cliente</span>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-60  text-center text-black  floating-tag"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "2" } as any}
        >
          <div className="-rotate-[6deg] px-5 py-3 rounded-3xl bg-yellow-300 max-w-72">
            <span className="text-3xl font-medium">
              Una solución integral para tí
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-[32rem] z-20  text-center text-black  floating-tag"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "3" } as any}
        >
          <div className="-rotate-[6deg] px-5 py-3 bg-white border border-primary rounded-full">
            <span className="text-xl font-medium">Reportes en WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  );
};
