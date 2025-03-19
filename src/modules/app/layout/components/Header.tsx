import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";
import { SignedOutActions } from "./SignedOutActions";

export const Header = () => {
  return (
    <header className="bg-background border-b border-primary py-6 h-[102px] w-full backdrop-blur-md relative">
      <div className="container mx-auto w-full flex items-center justify-between">
        <SearchBar />
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
