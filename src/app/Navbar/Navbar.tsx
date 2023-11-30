import Image from "next/image";
import React from "react";
import Logo from "@/assets/Logo.png";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import UserMenuButton from "./userMenuButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          href={user ? "/categories" : "/"}
          className="flex cursor-pointer items-center"
        >
          <Image src={Logo} alt="logo" width={50} height={50} />
          <span className="text-xl">ⓎⓔⓝⓁⓘⓢⓣ</span>
        </Link>
      </div>
      <div className="navbar-end">
        <UserMenuButton session={session} />
      </div>
    </nav>
  );
}
