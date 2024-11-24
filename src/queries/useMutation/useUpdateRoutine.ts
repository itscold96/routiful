import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTINE_LIST_QUERY_KEY } from 'constants/queryKeys';
import { updateRoutine } from 'fetches/updates/updateRoutine';
import { UpdateRoutineParams } from 'types/routine';

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: UpdateRoutineParams) => updateRoutine({ id, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ROUTINE_LIST_QUERY_KEY] });
    },
  });
};
