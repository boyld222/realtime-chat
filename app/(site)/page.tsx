import Image from "next/image";
import { AuthForm } from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-45 from-purple-500 to-pink-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height={72}
          width={72}
          className="mx-auto w-auto"
          src={"/images/logo-messenger.png"}
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Welcome to Messenger
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
