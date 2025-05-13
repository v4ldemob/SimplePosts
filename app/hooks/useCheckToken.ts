import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_POSTS_FEED_URL } from '../constants/config';

export const useCheckToken = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      const res = await axios.get(API_POSTS_FEED_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          count: 1,
        },
      });

      return res.data;
    },
  });
};