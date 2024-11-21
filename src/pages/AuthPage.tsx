import { Auth } from '@/components/Auth';

export default function AuthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sign In or Create Account</h1>
      <Auth />
    </div>
  );
}