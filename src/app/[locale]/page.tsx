"use server";

import { Header } from "@/modules/app/layout/components/Header";
import { Sidebar } from "@/modules/app/layout/components/Sidebar";
import { AnimatedCurveSvg } from "@/modules/common/components/AnimatedCurveSvg";
import { SchematicComponent } from "@/modules/core/components/schematic/SchematicComponent";
// import { BASE_URL } from "@/modules/core/constants/constants";
// import { Plan } from "@/types/app/schematic";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Verdata | Inicio",
//   description: "Inicio - Verifica y valida antecedentes penales | Verdata",
//   openGraph: {
//     title: "Verdata | Inicio",
//     description: "Inicio - Verifica y valida antecedentes penales | Verdata",
//     type: "website",
//   },
// };

export default async function Home() {
  // const plansFetched = await fetch(`${BASE_URL}/api/schematic/plans`);
  // const plans: Plan[] = await plansFetched.json();

  return (
    <main className="h-screen w-screen overflow-hidden flex">
      <Sidebar />
      <section className="w-full h-full">
        <Header />
        <aside className="py-12 px-8 w-full h-[calc(100vh-89px)] flex gap-8 bg-white overflow-auto">
          <div className="w-full h-full flex-1 flex flex-col gap-6">
            <div className="w-full h-full">
              <div className="max- text-left">
                <h2 className="text-7xl font-bold mb-6 leading-tight">
                  Consultas{" "}
                  <span className="relative inline-block">
                    diseñadas
                    <div className="absolute -bottom-3 left-0 right-0">
                      <AnimatedCurveSvg stroke="#946DF0" />
                    </div>
                  </span>
                  <br /> con base en <span className="text-[#8d64ed]">tus</span>
                  <br />
                  <span className="text-[#8d64ed]">necesidades***</span>
                </h2>
                <p className="text-xl max-w-lg">
                  Por un solo pago mensual tienes acceso a todas las consultas
                  que incluyen tu paquete personalizado. Por un precio realmente
                  bajo.
                </p>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-11">
              <h3 className="text-5xl font-semibold">Nuestros planes</h3>
              <SchematicComponent componentId="cmpn_Ra9nKu6jjSm" />

              {/* <Plans plans={plans} /> */}
            </div>
          </div>
          <div className="h-full w-[450px] flex flex-col gap-5">
            <div className="w-full h-full flex flex-col gap-6 px-8 py-6 bg-background">
              <h3 className="text-4xl font-semibold">Beneficios</h3>
              <ul className="flex flex-col gap-[9px] *:gap-4">
                <li className="flex items-center">
                  <i
                    className="icon-[material-symbols--check-circle-rounded] size-5"
                    role="img"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium max-w-xs">
                    Acceso inmediato.
                  </p>
                </li>
                <li className="flex items-center">
                  <i
                    className="icon-[material-symbols--check-circle-rounded] size-5"
                    role="img"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium max-w-xs">
                    Reportes instantáneos.
                  </p>
                </li>
                <li className="flex items-center">
                  <i
                    className="icon-[material-symbols--check-circle-rounded] size-5"
                    role="img"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium max-w-xs">
                    Reportes completos y fáciles de leer.
                  </p>
                </li>
                <li className="flex items-center">
                  <i
                    className="icon-[material-symbols--check-circle-rounded] size-5"
                    role="img"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-medium max-w-xs">
                    Consultas ilimitadas en 15 países de LATAM.
                  </p>
                </li>
              </ul>
            </div>
            <div className="w-full h-full flex flex-col gap-6 px-8 py-6 bg-background">
              <h3 className="text-4xl font-semibold">
                Accede al reporte completo:
              </h3>
              <ul className="flex flex-col gap-[9px] *:gap-4 list-disc *:text-lg *:font-medium">
                <li className="">Accede al reporte completo.</li>
                <li className="">Antecedentes penales.</li>
                <li className="">Demandas, embargos y sanciones.</li>
                <li className="">Verificación del número de ID.</li>
                <li className="">
                  Búsquedas por ID o por nombre de persona o empresa.
                </li>
                <li className="">
                  Expedientes civiles, familia, laborales y más.
                </li>
                <li className="">
                  Consulta en más de 600 listas negras locales e
                  internacionales.
                </li>
                <li className="">Personas expuestas políticamente.</li>
                <li className="">Consulta habilitada en 15 países.</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
