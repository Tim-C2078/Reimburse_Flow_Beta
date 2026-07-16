"use client";

import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Poppins } from "next/font/google";
import ToggleDarkandLight from "@/components/ui/toggleDarkandLight";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/store", label: "Dashboard", icon: "/dashboard.png" },
    {
      href: "/store/notification",
      label: "Notification",
      icon: "/notification.png",
    },
  ];

  const currentTime = new Date().getHours();

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      {/* Sidebar */}
      <div className="bg-muted dark:bg-gray-900 dark:text-white overflow-auto p-4 flex flex-col">
        {/* Logo */}
        <div className="my-4 flex justify-center items-center font-bold text-lg py-2 pb-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={30}
            height={30}
            className="text-black dark:invert"
          />
          <span className="ml-2">Reimburse Flow</span>
        </div>

        <hr className="border-gray-300 dark:border-gray-700" />

        {/* Nav Items */}
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <li
                  className={`rounded-b-sm my-4 p-4 flex items-center cursor-pointer transition
                  ${
                    isActive
                      ? "bg-white text-black shadow-md dark:bg-gray-200 dark:text-black"
                      : "hover:bg-white dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  <Image
                    className={`px-1 pr-2 ${
                      isActive
                        ? "brightness-0 dark:brightness-0"
                        : "dark:invert dark:brightness-0"
                    }`}
                    src={item.icon}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                  {item.label}
                </li>
              </Link>
            );
          })}
        </ul>

        {/* Bottom Profile */}
        <div className="flex flex-row items-center justify-center absolute bottom-6 py-5">
          <Avatar className="mr-3">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Link href="/">
            <div
              className="
                flex gap-3 shadow-2xl rounded-2xl py-5 px-9 h-8
                bg-white text-black
                hover:bg-black hover:text-white
                dark:bg-gray-200 dark:text-black
                dark:hover:bg-white dark:hover:text-black
                justify-center items-center cursor-pointer
              "
            >
              <LogOut />
              Logout
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${poppins.className} overflow-auto px-2 py-4 bg-white dark:bg-gray-950 dark:text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight px-5 text-black dark:text-white">
            {currentTime >= 6 && currentTime < 12 ? "Good Morning! 👋" : currentTime >= 12 && currentTime < 16 ? "Good Afternoon! 👋" : "Good Evening! 👋"}
            </h1>
          </div>

          <div className="mr-5">
            <button className="rounded-full w-10 h-10 flex items-center justify-center">
              <ToggleDarkandLight />
            </button>
          </div>
        </div>

        <h3 className="px-5 text-gray-500 dark:text-gray-300">
          Store
        </h3>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
