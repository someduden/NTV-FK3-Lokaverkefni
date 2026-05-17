import { getGenres } from '@/lib/getGenre';
import { useQuery } from '@tanstack/react-query';

export function useGenres() {
  return useQuery<string[]>({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 10,
  });
}
