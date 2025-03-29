import { Button, Image } from "@heroui/react";
import { useMessages } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const getMessages = useMessages();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (getMessages.default as Record<string, any>)["not-found"];

  return (
    <section className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex max-w-xl flex-col items-center gap-6">
        <Image
          src="/brand/logo.jpg"
          alt={messages["page-not-exists"]}
          classNames={{
            wrapper: "w-full",
          }}
          loading="lazy"
        />
        <h2 className="text-center text-2xl font-bold">
          {messages["page-not-exists"]}
        </h2>
        <p className="text-center text-lg text-gray-600">
          {messages["lets-continue"]}
        </p>
        <div className="flex justify-center">
          <Link href="/app">
            <Button radius="full" variant="light" className="font-bold">
              {messages["go-homepage"]}
              <span className="icon-[material-symbols--arrow-right-alt-rounded] ml-2"></span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
