import { AuthParams } from 'types/auth';
import { supabase } from 'utils/supabaseClient';

export const signin = async ({ email, password }: AuthParams) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return error;
};
