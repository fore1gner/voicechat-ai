import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/agents/supportAgent";
import { components } from "../_generated/api";
export const getOne = query({
    args: {
        conversationId: v.id("conversations"),
        contactSessionId: v.id("contactSessions"),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId);
        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: " UNAUTHORIZED",
                message: "Contact session is invalid or has expired.",
            });
        }
        const conversation = await ctx.db.get(args.conversationId);
        if (!conversation) {
            throw new ConvexError({
                code: " NOT_FOUND",
                message: "Conversation not found.",
            });
        }

        if (conversation.contactSessionId !== session._id) {
            throw new ConvexError({
                code: " UNAUTHORIZED",
                message: "Conversation does not belong to the contact session.",
            });
        }

        return {
            _id: conversation._id,
            status: conversation.status,
            threadId: conversation.threadId,
        };
    }
});
export const create = mutation({
    args: {
        organizationId: v.string(),
        contactSessionId: v.id("contactSessions"),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId);
        if (!session || session.expiresAt < Date.now()) {
            throw new ConvexError({
                code: " UNAUTHORIZED",
                message: "Contact session is invalid or has expired.",
            });
        }


        const { threadId } = await supportAgent.createThread(ctx, {
            userId: args.organizationId
        });

        await ctx.runMutation(components.agent.messages.addMessages, {
            threadId,
            messages: [{
                message: {
                    role: "assistant",
                    //TODO: customer set etsin
                    content: " Hello! How can I assist you today?"
                }
            }]
        });

        const conversationId = await ctx.db.insert("conversations", {
            contactSessionId: session._id,
            status: "unresolved",
            organizationId: args.organizationId,
            threadId,
            createdAt: Date.now()
        });

        return conversationId;
    }
});