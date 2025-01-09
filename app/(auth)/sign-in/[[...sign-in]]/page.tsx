import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn redirectUrl="/" /> {/* Redirects to home after sign-in */}
    </main>
  );
};

export default SignInPage;
