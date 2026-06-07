"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Eye from "@gravity-ui/icons/Eye";
import EyeSlash from "@gravity-ui/icons/EyeSlash";
import { authClient } from "@/lib/auth-client";

const SigninForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setFormError("");
    setSuccessMessage("");

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString().trim() ?? "";
    const password = data.get("password")?.toString() ?? "";

    const nextErrors = {};
    if (!email) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!password) {
      nextErrors.password = "Password is required";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await authClient.signIn.email({
      email,
      password,
    });
    setIsSubmitting(false);

    if (error) {
      setFormError(error.message ?? "Invalid email or password.");
      return;
    }

    setSuccessMessage("Signed in successfully! Redirecting...");
    setTimeout(() => router.push("/"), 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md space-y-5 rounded-2xl border border-white/10 bg-[#1E1E1E]/80 p-6 backdrop-blur sm:p-8"
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="text-sm text-white/55">
          Sign in to continue your HireLoop journey.
        </p>
      </div>

      {formError ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          {formError}
        </p>
      ) : null}

      {successMessage ? (
        <p
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"
        >
          {successMessage}
        </p>
      ) : null}

      <TextField
        name="email"
        type="email"
        autoComplete="email"
        isRequired
        isInvalid={Boolean(errors.email)}
        className="flex w-full flex-col gap-1.5"
      >
        <Label className="text-sm font-medium text-white/80">Email</Label>
        <Input
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:border-[#5C53FE] focus:outline-none data-[invalid=true]:border-red-500/60"
        />
        <FieldError className="text-xs text-red-400">{errors.email}</FieldError>
      </TextField>

      <TextField
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        isRequired
        isInvalid={Boolean(errors.password)}
        className="flex w-full flex-col gap-1.5"
      >
        <Label className="text-sm font-medium text-white/80">Password</Label>
        <div className="relative">
          <Input
            placeholder="Your password"
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 pr-10 text-sm text-white placeholder:text-white/35 focus:border-[#5C53FE] focus:outline-none data-[invalid=true]:border-red-500/60"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 grid w-7 place-items-center text-white/55 hover:text-white"
          >
            {showPassword ? (
              <EyeSlash width={18} height={18} />
            ) : (
              <Eye width={18} height={18} />
            )}
          </button>
        </div>
        <FieldError className="text-xs text-red-400">{errors.password}</FieldError>
      </TextField>

      <Button
        type="submit"
        isDisabled={isSubmitting}
        className="w-full rounded-xl bg-[#5C53FE] py-2.5 text-sm font-semibold text-white hover:bg-[#5C53FE]/90 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>

      <p className="text-center text-sm text-white/55">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-[#5C53FE] hover:text-[#5C53FE]/80"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SigninForm;
