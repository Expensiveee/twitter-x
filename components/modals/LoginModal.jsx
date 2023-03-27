"use client";
import { useState } from "react";

import { toast } from "react-hot-toast";

import useModalLogin from "@hooks/modal/useModalLogin";
import useModalRegister from "@hooks/modal/useModalRegister";

import Modal from "@components/Modal";
import { signIn } from "next-auth/react";
import useUserCurrent from "@hooks/user/useUserCurrent";

export default function LoginModal() {
  const currentUser = useUserCurrent();
  const loginModal = useModalLogin();
  const registerModal = useModalRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        toast.error(res.error);
        return;
      }

      loginModal.onClose();
      toast.success("Logged in");
      currentUser.mutate();
    } catch (e) {
      console.log("FROM LOGIN: ", e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <input
        type={"password"}
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        First time using TwitterX?{" "}
        <span
          onClick={toggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={submit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
