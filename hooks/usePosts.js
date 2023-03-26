"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const usePosts = (username) => {
  const url = username ? `posts/${username}` : `posts/all`;
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

export default usePosts;
