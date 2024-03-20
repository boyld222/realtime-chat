"use client";

import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/input/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AuthSocialButton } from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const [loading, setIsLoading] = useState<boolean>(false);

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else setVariant("LOGIN");
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    return () => {
      setIsLoading(true);
      signIn(action, {
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!");
          }
        })
        .finally(() => setIsLoading(false));
    };
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form action="" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}
          <Input
            id="email"
            label="Email address"
            register={register}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            errors={errors}
            type="password"
          />
          <div className="">
            <Button
              fullWidth
              type="submit"
              disabled={loading}
              isLoading={loading}
            >
              {variant === "LOGIN"
                ? loading
                  ? "Logging in..."
                  : "Login"
                : "Sign up"}
            </Button>
          </div>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <AuthSocialButton
                icon={BsGithub}
                onClick={socialAction("github")}
                label="Github"
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={socialAction("google")}
                label="Google"
              />
            </div>
            <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
              <div>
                {" "}
                {variant === "LOGIN"
                  ? "New to Messenger ?"
                  : "Already have an account ?"}
              </div>
              <div className="underline cursor-pointer" onClick={toggleVariant}>
                {variant === "LOGIN" ? "Create an account" : "Login"}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
