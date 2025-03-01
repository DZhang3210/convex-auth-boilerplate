import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { stripe } from "@/lib/stripe";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { Id } from "@/convex/_generated/dataModel";
const settingUrl = absoluteUrl("/");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const token = await convexAuthNextjsToken();
    const user = await fetchQuery(api.users.current, {}, { token });

    if (!user) {
      return new NextResponse("Unathorized", { status: 401 });
    }

    const product = await fetchQuery(api.products.getById, {
      id: productId as Id<"products">,
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    // const userSubscription = await fetchQuery(api.subscription.getByUserId, {
    //   userId: user._id,
    // });

    // if (userSubscription && userSubscription.stripeCustomerId) {
    //   const stripeSession = await stripe.billingPortal.sessions.create({
    //     customer: userSubscription.stripeCustomerId,
    //     return_url: settingUrl,
    //   });
    //   return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    // }

    console.log("user._id");
    console.log(user._id);
    console.log("product._id");
    console.log(product._id);
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingUrl,
      cancel_url: settingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "USD",

            product_data: {
              name: "Recall-AI",
              description: "Unlimited AI Generations",
            },
            unit_amount: product.price * 100,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id,
        productId: product._id,
      },
      subscription_data: {
        metadata: {
          userId: user._id,
          productId: product._id,
        },
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
