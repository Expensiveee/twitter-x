"use client";
import useSWRImmutable from "swr/immutable";

import fetcher from "@libs/fetcher";
import { toast } from "react-hot-toast";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    "current",
    fetcher,
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        toast.success(
          <div>
            Welcome back{" "}
            <span className="font-semibold capitalize">{data.username}</span> !
          </div>
        );
      },
    }
  );

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useCurrentUser;
