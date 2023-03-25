"use client";
import { useState } from "react";

import { toast } from "react-hot-toast";

import { signIn } from "next-auth/react";

import useRegiserModal from "@hooks/useRegisterModal";
import useLoginModal from "@hooks/useLoginModal";

import Modal from "@components/Modal";
import axios from "axios";

export default function RegisterModal() {
  const registerModal = useRegiserModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });

      toast.success("Account Created");
      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={loading}
      />
      <input
        type={"password"}
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={loading}
      />
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={loading}
      />
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={loading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{" "}
        <span
          onClick={toggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={submit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}
