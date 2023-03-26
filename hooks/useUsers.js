"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUsers = (size) => {
  const { data, error, isLoading, mutate } = useSWR(
    size ? `users/${size}` : `users/all`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useUsers;
