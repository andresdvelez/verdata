import { SignedIn, UserButton } from "@clerk/nextjs";
import { SearchBar } from "./SearchBar";

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
      </div>
    </header>
  );
};
