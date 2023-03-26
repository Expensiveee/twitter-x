"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const usePostsUser = (username) => {
  const { data, error, isLoading, mutate } = useSWR(
    `posts/find/${username}`,
    fetcher,
    {
      revalidateOnMount: true,

      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default usePostsUser;
