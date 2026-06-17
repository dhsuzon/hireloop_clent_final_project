import { redirect } from "next/navigation";
import Link from "next/link";
import { stripe } from "../../../lib/stripe";
import { ArrowLeft, CircleCheckFill } from "@gravity-ui/icons";
import { creatPlanSubscription } from "@/lib/actions/planSubscriptions";

const Success = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const {
    status,
    metadata,
    customer_details: { email: customerEmail } = {},
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };
    const result = await creatPlanSubscription(subsInfo);
    console.log("subscriptionInfo", result);

    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 antialiased selection:bg-purple-500/30">
        <div className="max-w-md w-full bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 p-8 text-center">
          {/* Success Icon with Green Subtle Glow */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <CircleCheckFill className="w-16 h-16 text-success bg-purple-600 rounded-full" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-3">
            Payment Successful!
          </h1>

          {/* Expanded Rich Subtitle / Description */}
          <div className="space-y-2 text-zinc-400 text-sm max-w-sm mx-auto mb-6">
            <p>
              Thank you for your order. We appreciate your business! Your
              account has been upgraded successfully.
            </p>
          </div>

          <hr className="border-zinc-800 my-6" />

          {/* Details Section */}
          <div className="text-left space-y-4 mb-8 bg-zinc-950 p-4 rounded-xl border border-zinc-800/60">
            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
                Sent Confirmation To
              </span>
              <span className="text-sm font-medium text-zinc-300 break-all">
                {customerEmail || "Your email"}
              </span>
            </div>

            <div>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-0.5">
                Have questions?
              </span>
              <a
                href="mailto:orders@example.com"
                className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center"
              >
                orders@example.com
              </a>
            </div>
          </div>

          {/* Actions Container */}
          <div className="space-y-4">
            {/* Primary Action Button */}
            <Link
              href="/dashboard"
              className="block w-full text-center bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-purple-900/20 transition-all duration-200 hover:scale-[1.01]"
            >
              Go to Workspace or Dashboard
            </Link>

            {/* Secondary Action - New Line */}
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors group"
              >
                {/* ArrowLeft Icon */}
                <ArrowLeft />
                Return to home page
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return null;
};
export default Success;
