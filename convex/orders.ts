import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllByUserId = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .collect();
    return orders;
  },
});

export const getByProductId = query({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.id);
    return order;
  },
});

export const create = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
    pricePaidInCents: v.number(),
    userId: v.id("users"),
    receiptUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("orders", {
      productId: args.productId,
      userId: args.userId,
      quantity: args.quantity,
      pricePaidInCents: args.pricePaidInCents,
      receiptUrl: args.receiptUrl,
    });
  },
});
