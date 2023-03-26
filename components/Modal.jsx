"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Spinner from "./Spinner";

export default function ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
}) {
  const handleClose = () => {
    if (disabled) return;

    onClose();
  };

  const handleSubmit = () => {
    if (disabled) return;

    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          scrollbar-thin
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
    >
      <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        <div
          className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-twitter-100 
            outline-none 
            focus:outline-none
            "
        >
          <div
            className="
              flex 
              items-center 
              justify-between 
              p-10 
              rounded-t
              "
          >
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <button
              className="
                  p-1 
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
              onClick={handleClose}
            >
              <XMarkIcon className="w-8 h-8 text-neutral-200" />
            </button>
          </div>
          <div className="relative p-10 flex-auto">{body}</div>
          <div className="flex flex-col gap-2 p-10">
            {disabled ? (
              <Spinner />
            ) : (
              <button
                className="w-full disabled:cursor-not-allowed py-3 bg-white text-black rounded-full"
                disabled={disabled}
                onClick={handleSubmit}
              >
                {actionLabel}
              </button>
            )}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}
