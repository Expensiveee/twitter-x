"use client";
import useSWR from "swr";

import fetcher from "@libs/fetcher";

const useUsersAll = (size) => {
  const url = size ? `user/all/${size}` : null;

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

export default useUsersAll;
