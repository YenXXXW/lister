import { redirect } from "next/navigation";
import Image from "next/image";
import UserMenuButton, { AuthButton } from "./Navbar/userMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return (
      <div className="w-full pt-[15vh] gap-2">
        <div className="flex w-[70%] mx-auto">
          <div className="text-[25px] md:text-[35px] font-bold italic w-1/2">
            Track, Save, Thrive: Your Price, Your Power
          </div>
          <Image
            src={"https://voxyard.com/assets/img/content/coding.gif"}
            width={250}
            height={250}
            className="rounded-full h-[250px] w-[250px]"
            alt="LandingPage Image"
          />
        </div>
        <AuthButton user={user} />
      </div>
    );
  }

  return redirect("/categories");
}
