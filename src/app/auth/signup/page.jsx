import SignupForm from "@/components/auth/SignupForm";
import { Suspense } from "react";

export const metadata = {
  title: "Sign up | HireLoop",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#1E1E1E] px-4 py-12">
      <Suspense fallback={<p>Loadding</p>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
