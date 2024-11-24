import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { insertRoutine } from 'fetches/updates/insertRoutine';

export const useInsertRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (routineName: string) => insertRoutine(routineName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE_LIST_QUERY_KEY] });
    },
  });
};
