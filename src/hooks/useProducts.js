import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async () => {
  try {
    const { data } = await axios.get('https://fakestoreapi.com/products'); 
    return data;
  } catch (error) {
    throw new Error('Error fetching products'); 
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, 
    retry: 2, 
    onError: (error) => console.error(error), 
  });
};
