import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { API_POSTS_FEED_URL } from "../constants/config";
import { Items, Posts } from "../types/postsTypes";

export const usePosts = (token: string, count: number) => {
  return useQuery<Items[]>({
    queryKey: ['growing-posts', token, count],
    enabled: !!token,
    queryFn: async () => {
      const response = await axios.get<Posts>(API_POSTS_FEED_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          count,
        },
      });
      return response.data.data.items;
    }, 
    placeholderData: keepPreviousData, 
  });
};