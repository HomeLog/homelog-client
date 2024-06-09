import { AuthProvider } from '@/contexts/auth.context';
import ReactQueryProvider from './_provider/reactQuery.provider';
import { ProfileProvider } from '@/contexts/profile.context';

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
