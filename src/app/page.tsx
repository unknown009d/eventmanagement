import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { UserButton, currentUser } from "@clerk/nextjs";
import { SearchBox } from "@/components/home/SearchBox"
import LocationBox from "@/components/home/LocationBox";
import LGContainer from "@/components/home/LG/LGContainer";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="w-full flex flex-col justify-start items-start gap-4">
      <div className="px-6 w-full flex justify-between items-center">
        <div className="flex flex-col justify-start items-start">
          <h3 className="">Welcome, <span className="font-bold">{user ? user.firstName : "user"}</span></h3>
          <LocationBox className="opacity-80 p-1 px-0" />
        </div>
        {!user ?
          <>
            <Link href="/sign-in" className={buttonVariants()}>Sign in</Link>
          </>
          :
          <>
            <UserButton afterSignOutUrl="/" appearance={{
              elements: {
                userButtonAvatarImage: ""
              }
            }} />
          </>
        }
      </div>
      <div className="px-6 w-full">
        <SearchBox placeholder="Search for events here..." className="my-2" />
      </div>
      <LGContainer />
    </main>
  );
}
