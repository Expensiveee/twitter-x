"use client";
import { useState } from "react";

import useLoginModal from "@hooks/useLoginModal";
import useRegiserModal from "@hooks/useRegisterModal";

import Modal from "@components/Modal";
import { signIn } from "next-auth/react";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegiserModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose();
    } catch (e) {
      console.log(e);
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
