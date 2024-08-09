import AuthProvider from './Auth.provider';
import { EnvVariablesClientProvider } from './EnvVariablesClient.provider';
import ProfileProvider from './Profile.provider';
import ReactQueryProvider from './ReactQuery.provider';
import ToastProvider from './Toast.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EnvVariablesClientProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <ProfileProvider>
            <ToastProvider>{children}</ToastProvider>
          </ProfileProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </EnvVariablesClientProvider>
  );
}
