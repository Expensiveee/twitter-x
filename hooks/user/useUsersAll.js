"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUsers = (size) => {
  const url = size ? `user/all/${size}` : "user/all";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useUsers;
