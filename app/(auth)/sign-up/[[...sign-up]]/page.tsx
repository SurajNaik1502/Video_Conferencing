import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignUp redirectUrl="/" /> {/* Redirects to home after sign-up */}
    </main>
  );
};

export default SignUpPage;
