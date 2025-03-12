"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button, Input } from "@heroui/react";

export const Header = () => {
  return (
    <header className=" bg-background border-b border-primary py-6 w-full backdrop-blur-md relative">
      <div className="container 2xl:mx-auto w-full flex items-center justify-between">
        <form className="flex items-center justify-center gap-x-8 flex-1">
          <div className="flex items-center *:border-r border-black/35">
            <Input
              label="Seleccione nacionalidad"
              classNames={{
                inputWrapper: "bg-background shadow-none",
              }}
            />
            <Input
              label="Tipo de búsqueda"
              classNames={{
                inputWrapper: "bg-background shadow-none",
              }}
            />
            <Input
              label="Documento o ID"
              className="border-none"
              classNames={{
                inputWrapper: "bg-background shadow-none",
              }}
            />
          </div>
          <Button
            variant="solid"
            radius="none"
            className="px-8 text-lg"
            color="primary"
            startContent={
              <i
                className="icon-[tdesign--search] size-4"
                role="img"
                aria-hidden="true"
              />
            }
          >
            Buscar
          </Button>
        </form>
        <SignedIn>
          <div className="p-1 flex items-center justify-center">
            <UserButton showName />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};
