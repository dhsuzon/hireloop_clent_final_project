import SigninForm from "@/components/auth/SigninForm";
import { Suspense } from "react";

export const metadata = {
  title: "Sign in | HireLoop",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[#1E1E1E] px-4 py-12">
      <Suspense fallback={<p>Loadding</p>}>
        <SigninForm />
      </Suspense>
    </div>
  );
}
