import { AuthProvider } from '@/contexts/auth.context';
import ReactQueryProvider from './_provider/reactQuery.provider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
}

export default ProvidersLayout;
