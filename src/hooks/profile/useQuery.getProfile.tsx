import api from '@/api';
import useAuth from '@/contexts/auth.context';
import { Profile } from '@/contexts/profile.context';
import { useQuery } from '@tanstack/react-query';

export default function useQueryGetProfile() {
  const { signedIn } = useAuth();
  const result = useQuery<
    Awaited<ReturnType<typeof api.user.getProfile>>,
    unknown,
    Profile
  >({
    queryKey: ['profile'],
    queryFn: api.user.getProfile,
    enabled: !!signedIn,
    retry: false,
  });

  return result;
}
