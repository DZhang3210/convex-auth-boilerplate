import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  // Your other tables...
  products: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    image: v.string(),
    stripeProductId: v.string(),
  }).index("name", ["name"]),
  orders: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    pricePaidInCents: v.number(),
    receiptUrl: v.optional(v.string()),
  }).index("userId", ["userId"]),
  subscriptions: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
  }).index("userId", ["userId"]),
});

export default schema;
