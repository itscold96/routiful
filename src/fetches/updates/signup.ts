import { AuthParams } from 'types/auth';
import { supabase } from 'utils/supabaseClient';

export const signup = async ({ email, password }: AuthParams) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return error;
};
