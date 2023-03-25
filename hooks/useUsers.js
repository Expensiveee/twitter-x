"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUsers = (size) => {
  const { data, error, isLoading, mutate } = useSWR(
    size ? `users/${size}` : `users/all`,
    fetcher
  );

  return {
    data,
    isLoading: isLoading,
    isError: data?.error || !data,
    mutate,
  };
};

export default useUsers;
