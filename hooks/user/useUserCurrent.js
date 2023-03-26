"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("user/current", fetcher, {
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

export default useCurrentUser;
