import api from '@/app/api';
import useAuth from '@/contexts/auth.context';
import { Profile } from '@/contexts/profile.context';
import { useQuery } from '@tanstack/react-query';

export default function useQueryGetProfile() {
  const { isLoggedIn } = useAuth();

  return useQuery<
    Awaited<ReturnType<typeof api.user.getProfile>>,
    unknown,
    Profile
  >({
    queryKey: ['profile'],
    queryFn: api.user.getProfile,
    enabled: isLoggedIn,
    retry: false,
  });
}
