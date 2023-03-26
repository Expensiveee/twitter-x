import Image from "next/image";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ({ onChange, value, label, disabled }) {
  const [base64, setBase64] = useState(value);

  const handleChange = (base64) => {
    onChange(base64);
  };

  const handleDrop = (files) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "imag/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full cursor-pointer p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
}
