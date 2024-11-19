import { Database } from './database.types';

export type RoutineRows = Database['public']['Tables']['routine_table']['Row'];

export type UpdateRoutineParams = Pick<RoutineRows, 'id' | 'name'>;
