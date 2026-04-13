"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "/dashboard.png",
    },
    {
      href: "/dashboard/generate-report",
      label: "Generate Report",
      icon: "/PettyCash.png",
    },
    {
      href: "/dashboard/users",
      label: "User Management",
      icon: "/users.png",
    },
    {
      href: "/dashboard/shops",
      label: "Stores",
      icon: "/user.png",
    },
    {
      href: "/dashboard/notification",
      label: "Notification",
      icon: "/notification.png",
    },
  ];

  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      {/* Sidebar */}
      <div className="bg-muted overflow-auto p-4 flex flex-col">
        <div className="my-4 flex justify-center items-center font-bold text-lg py-2 pb-4">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          Reimburse Flow
        </div>

        <hr />

        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <li
                  className={`rounded-b-sm my-4 p-4 flex items-center cursor-pointer transition
                  ${
                    isActive
                      ? "bg-white text-black shadow-md"
                      : "hover:bg-white"
                  }`}
                >
                  <Image
                    className="px-1 pr-2"
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
            <div className="buttonEffects shadow-2xl rounded-2xl py-5 px-9 h-8 bg-white text-black hover:bg-black hover:text-white flex justify-center items-center cursor-pointer">
              Logout
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${poppins.className} overflow-auto px-2 py-4`}>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back Atta Kofi!
        </h1>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
