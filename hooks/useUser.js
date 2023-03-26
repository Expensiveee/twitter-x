"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUser = (username) => {
  const { data, error, isLoading, mutate } = useSWR(
    username ? `user/find/${username}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  );

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
