import { AuthProvider } from '@/contexts/auth.context';
import { ProfileProvider } from '@/contexts/profile.context';
import ReactQueryProvider from './_providers/reactQuery.provider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}

export default ProvidersLayout;
