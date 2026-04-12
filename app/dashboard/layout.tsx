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
            <Link href="/dashboard">
              <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
                <Image
                  className="px-1 pr-2"
                  src="/dashboard.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Dashboard
              </li>
            </Link>

            <Link href="/dashboard/generate-report">
              <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
                <Image
                  className="px-1 pr-2"
                  src="/PettyCash.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Generate Report
              </li>
            </Link>

            <Link href="/dashboard/users">
              <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
                <Image
                  className="px-1 pr-2"
                  src="/users.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                User Management
              </li>
            </Link>

            <Link href="/dashboard/shops">
              <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
                <Image
                  className="px-1 pr-2"
                  src="/user.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Stores
              </li>
            </Link>

            <Link href="/dashboard/notification">
              <li className="hover:bg-white rounded-b-sm my-4 p-4 flex items-center cursor-pointer">
                <Image
                  className="px-1 pr-2"
                  src="/notification.png"
                  alt="logo"
                  width={30}
                  height={30}
                />
                Notification
              </li>
            </Link>
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
