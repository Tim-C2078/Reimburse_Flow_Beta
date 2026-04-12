import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.png" alt="logo" width={45} height={45} />

      <h1 className="font-bold text-5xl">Reimburse Flow</h1>
    </div>
  );
}
