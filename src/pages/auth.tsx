import Input from "@/Components/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const Auth = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/profile",
    });
    router.push("/profile");
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        password,
        userName,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [userName, password, email, login]);

  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-5 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}{" "}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  label="UserName"
                  onChange={(e: any) => setUserName(e.target.value)}
                  type="username"
                  value={userName}
                />
              )}

              <Input
                id="email"
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 w-full rounded-md py-3 text-white mt-5 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-5 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-75 transition"
              >
                <FcGoogle />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-75 transition"
              >
                <FaGithub />
              </div>
            </div>
            <p className=" text-neutral-500 mt-5">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className=" text-white ml:1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
