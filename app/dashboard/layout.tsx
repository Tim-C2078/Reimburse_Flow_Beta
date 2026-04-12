import Image from "next/image";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="bg-muted overflow-auto p-4 flex flex-col">
        <div className="my-4 flex justify-center items-center font-bold text-lg py-2 pb-4">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
          Reimburse Flow
        </div>
        <div>
          <hr />
        </div>
        <div>
          <ul>
            <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
              <Link href="/dashboard" className="flex items-center">
                <Image
                  className="px-1 pr-2"
                  src="/dashboard.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Dashboard
              </Link>
            </li>

            <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
              <Link
                href="/dashboard/generate-report"
                className="flex items-center"
              >
                <Image
                  className="px-1 pr-2"
                  src="/PettyCash.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Generate Report
              </Link>
            </li>

            <li className="hover:bg-white rounded-b-sm  my-4 p-4 flex items-center cursor-pointer">
              <Link href="/dashboard/users" className="flex items-center">
                <Image
                  className="px-1 pr-2"
                  src="/users.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                User Management
              </Link>
            </li>

            <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
              <Link href="/dashboard/shops" className="flex items-center">
                <Image
                  className="px-1 pr-2"
                  src="/user.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Stores
              </Link>
            </li>

            <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
              <Link
                href="/dashboard/notification"
                className="flex items-center"
              >
                <Image
                  className="px-1 pr-2"
                  src="/notification.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Notification
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-auto px-2 py-4">
        <h1 className="pb-4 text-3xl font-extrabold">
          Welcome back Atta Kofi!
        </h1>
        {children}
      </div>
    </div>
  );
}
