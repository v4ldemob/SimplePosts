import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_POSTS_FEED_URL } from "../constants/config";

const POSTS_LIMITS = 10;

type Post = {
  id: string;
  title: string;
  content: string;
}

export const usePosts = (token: string) => {
  return useInfiniteQuery<
    Post[],             
    Error,              
    Post[],             
    [string, string],   
    number              
  >({
    queryKey: ['posts', token],
    enabled: !!token,
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get<Post[]>(API_POSTS_FEED_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          count: POSTS_LIMITS,
          offset: pageParam * POSTS_LIMITS,
        },
      });

      return response.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === POSTS_LIMITS ? allPages.length : undefined,
  });
};