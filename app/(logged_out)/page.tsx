"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Logo from "@/components/logo";
import Image from "next/image";

export default function Home() {
  const [btn, setbtn] = useState(true);
  const router = useRouter();

  function handleClick() {
    setbtn(false);

    setTimeout(() => {
      router.push("/dashboard");
    }, 4000);
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex flex-col justify-center items-center bg-accent">
        <div className={styles.login}>
          <div className="flex flex-col justify-center items-center">
            <Logo />
            <h3 className="font-extrabold my-5">Simply Track, Manage, Flow</h3>
          </div>
          <form>
            <input
              className="focus:border-black shadow-lg"
              placeholder="Username"
              type="text"
            />
            <input
              className="focus:border-black shadow-lg"
              placeholder="Password"
              type="password"
            />
          </form>

          {btn ? (
            <Button
              className="w-full my-5 hover:bg-black hover:text-white shadow-lg font-extrabold"
              onClick={handleClick}
              variant="outline"
            >
              Login
            </Button>
          ) : (
            <Button
              className="w-full my-5 hover:bg-black hover:text-white shadow-lg font-extrabold"
              variant="outline"
              disabled
            >
              <Spinner />
              Loading...
            </Button>
          )}
        </div>
      </div>

      <div className="relative w-full h-full">
        <Image
          loading="lazy"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
          alt="login"
          fill
          className="object-cover brightness-50"
        />
      </div>
    </div>
  );
}
