"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { Button, Input } from "@heroui/react";

export const Header = () => {
  return (
    <header className=" bg-background border-b border-primary py-4 w-full backdrop-blur-md">
      <div className="container mx-auto w-full flex items-center justify-between">
        <form className="flex items-center gap-x-8 flex-1">
          <div className="flex items-center *:border-r border-black/35 last:border-none">
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
              classNames={{
                inputWrapper: "bg-background shadow-none",
              }}
            />
          </div>
          <Button
            variant="solid"
            radius="none"
            color="primary"
            startContent={
              <i
                className="icon-[tdesign--search]"
                role="img"
                aria-hidden="true"
              />
            }
          >
            Buscar
          </Button>
        </form>
        <SignedIn>
          <div className="p-1 flex items-center justify-center rounded-full border bg-blue-50 border-blue-200">
            <UserButton showName />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};
