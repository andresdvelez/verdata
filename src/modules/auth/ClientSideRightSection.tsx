"use client";

import { RoundedButton } from "../common/components/RoundedButton";
import { usePathname } from "../translations/i18n/routing";
import { AnimatedCurveSvg } from "../common/components/AnimatedCurveSvg";

export const ClientSideRightSection = () => {
  const pathname = usePathname();
  const isWaitlist = pathname === "/auth/waitlist";
  const isSignIn = pathname === "/auth/sign-in";
  const isSignUp = pathname === "/auth/sign-up";

  const bgColorClass =
    isSignIn || isWaitlist ? "bg-purple-500" : "bg-[#e5e5e7]";

  return (
    <div className="purple-shape-container w-1/2 relative  hidden lg:block">
      <div className="purple-shape-border -translate-x-[1.5px]"></div>
      <div
        className={`purple-shape ${bgColorClass} flex-col items-center justify-center h-full relative overflow-hidden`}
      >
        <div className="absolute top-8 right-8 text-white z-10">
          <RoundedButton
            className="border-2 border-primary"
            onClick={() => window.open("https://verdata.co/inicio/", "_blank")}
          >
            <span className="text-sm opacity-80">verdata.co</span>
          </RoundedButton>
        </div>

        {/* Conditional content based on page */}
        {isSignIn || isWaitlist ? (
          <div className="absolute inset-0 -inset-y-[3rem] inset-x-[4rem] w-full h-full flex flex-col justify-center items-center text-white p-12">
            <div className="max-w-lg text-left">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Consultas{" "}
                <span className="relative inline-block">
                  diseñadas
                  <div className="absolute -bottom-2 left-0 right-0">
                    <AnimatedCurveSvg />
                  </div>
                </span>
                <br /> con base en tus <br />
                necesidades***
              </h2>
            </div>
          </div>
        ) : isSignUp ? (
          <div className="absolute inset-0 -inset-y-[3rem] inset-x-[4rem] w-full h-full flex flex-col justify-center items-center text-white">
            <div className="max-w-lg text-center text-primary">
              <p className="font-bold text-9xl">+130</p>
              <span className=" text-6xl font-bold">millones</span>
              <p className="text-xl"> de datos consultados.</p>
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
          className="absolute bottom-40 left-24 2xl:left-40 floating-tag z-20"
          style={
            {
              "--index": "0",
              transformOrigin: "center",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
          }
        >
          <div className="-rotate-[20deg] bg-black text-white px-10 py-6 rounded-full">
            <span className="text-4xl 2xl:text-5xl font-semibold">
              verdata.co
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-24 left-[20rem] 2xl:left-[26rem] floating-tag z-10"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "1" } as any}
        >
          <div className="rotate-[22deg] px-10 py-6 rounded-3xl text-white bg-purple-400">
            <span className="text-2xl 2xl:text-3xl font-medium">
              Conoce a tu cliente
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-40 2xl:left-60  text-center text-black  floating-tag"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "2" } as any}
        >
          <div className="px-10 py-6 rounded-3xl bg-[#E6FD70] max-w-72">
            <span className="text-2xl 2xl:text-3xl font-medium">
              Una solución integral para tí
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-28 left-[30rem] 2xl:left-[39rem] z-20  text-center text-black  floating-tag"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          style={{ "--index": "3" } as any}
        >
          <div className="rotate-[20deg] 2xl:rotate-[15deg] px-5 py-4 bg-white border border-primary rounded-full w-max">
            <span className="text-lg 2xl:text-xl font-medium">
              Reportes en WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
