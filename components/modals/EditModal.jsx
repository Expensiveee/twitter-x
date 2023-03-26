"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import useUserCurrent from "@hooks/user/useUserCurrent";
import useModalEdit from "@hooks/modal/useModalEdit";

import Modal from "@components/Modal";
import ImageUpload from "@components/ImageUpload";

export default function () {
  const editModal = useModalEdit();
  const currentUser = useUserCurrent();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    setName(currentUser.data?.name);
    setBio(currentUser.data?.bio);
    setAvatar(currentUser.data?.avatar);
    setBanner(currentUser.data?.banner);
  }, [
    currentUser.data?.name,
    currentUser.data?.username,
    currentUser.data?.bio,
    currentUser.data?.avatar,
    currentUser.data?.banner,
  ]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/user/edit", {
        name,
        bio,
        avatar,
        banner,
      });

      await currentUser.mutate();
      toast.success("Updated");

      editModal.onClose();
    } catch (error) {
      console.log(error);
      if (error.response) return toast.error(error.response.data.error);

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={avatar}
        disabled={isLoading}
        onChange={(i) => setAvatar(i)}
        label="Upload profile image"
      />
      <ImageUpload
        value={banner}
        disabled={isLoading}
        onChange={(i) => setBanner(i)}
        label="Upload profile banner"
      />
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <input
        className="w-full ml-2 px-4 h-12 rounded bg-twitter-200 text-white text-md font-medium outline-none"
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
      body={bodyContent}
    />
  );
}
