import { useQuery } from '@tanstack/react-query';
import { SEARCH_ROUTINE_QUERY_KEY } from 'constants/queryKeys';
import { getRoutineList } from 'fetches/getRoutineList';

interface UseSearchRoutineParams {
  keyword: string;
}

export const useSearchRoutine = ({ keyword }: UseSearchRoutineParams) => {
  return useQuery({
    queryKey: [SEARCH_ROUTINE_QUERY_KEY, keyword],
    queryFn: () => getRoutineList(keyword),
    staleTime: 60 * 5 * 1000,
    enabled: !!keyword.trim(),
  });
};
