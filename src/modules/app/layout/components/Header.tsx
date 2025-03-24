import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignedOutActions } from "./SignedOutActions";

export const Header = () => {
  return (
    <header className="bg-background border-b border-primary py-6 max-h-[102px] w-full backdrop-blur-md relative">
      <div className="container px-4 md:px-8 2xl:px-0 2xl:mx-auto w-full flex items-center justify-between">
        <div></div>
        <SignedIn>
          <div className="p-1 flex items-center justify-center">
            <UserButton showName />
          </div>
        </SignedIn>
        <SignedOut>
          <SignedOutActions />
        </SignedOut>
      </div>
    </header>
  );
};
