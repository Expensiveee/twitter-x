"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const usePostsUser = (username, size) => {
  const url = username && size ? `posts/find/${username}/${size}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnMount: true,

    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
  });

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default usePostsUser;
