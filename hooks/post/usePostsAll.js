"use client";

import useSWR from "swr";

import fetcher from "@libs/fetcher";

const usePostsAll = (size) => {
  const url = size ? `posts/all/${size}` : "posts/all";
  const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    revalidateOnMount: true,
  });

  return {
    data,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
};

export default usePostsAll;
