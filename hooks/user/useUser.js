"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUser = (username) => {
  const url = username ? `user/find/${username}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    shouldRetryOnError: false,
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

export default useUser;
