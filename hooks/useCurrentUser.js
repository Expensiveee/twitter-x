"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";
import { toast } from "react-hot-toast";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("current", fetcher, {
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      toast.success(
        <div>
          Welcome back{" "}
          <span className="font-semibold capitalize">{data.username}</span> !
        </div>
      );
    },
  });

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useCurrentUser;
