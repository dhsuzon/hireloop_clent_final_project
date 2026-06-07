import SignupForm from "@/components/auth/SignupForm";

export const metadata = {
  title: "Sign up | HireLoop",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#1E1E1E] px-4 py-12">
      <SignupForm />
    </div>
  );
}
