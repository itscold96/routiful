import { useSuspenseQuery } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { getRoutineList } from 'fetches/gets/getRoutineList';

interface UseRoutineListParams {
  keyword: string;
}

export const useRoutineList = ({ keyword }: UseRoutineListParams) => {
  return useSuspenseQuery({
    queryKey: [ROUTINE_LIST_QUERY_KEY, keyword],
    queryFn: () => getRoutineList(keyword),
    staleTime: 60 * 5 * 1000,
  });
};
