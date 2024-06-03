import { AuthProvider } from '@/contexts/auth.context';
import { ProfileProvider } from '@/contexts/profile.context';
import ReactQueryProvider from './reactQuery.provider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
}

export default ProvidersLayout;
