import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    NOTION_TOKEN: z.string().optional().default(""),
    NOTION_DATABASE_ID: z.string().optional().default(""),
    NOTION_PROJECTS_DATABASE_ID: z.string().optional().default(""),

    // Legacy template services. These are optional for the portfolio site.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().optional().default("local-placeholder"),
    GITHUB_CLIENT_ID: z.string().optional().default("local-placeholder"),
    GITHUB_CLIENT_SECRET: z.string().optional().default("local-placeholder"),
    GITHUB_ACCESS_TOKEN: z.string().optional().default("local-placeholder"),
    DATABASE_URL: z
      .string()
      .optional()
      .default("mysql://root:root@localhost:3306/taxonomy?schema=public"),
    SMTP_FROM: z.string().optional().default("local@example.com"),
    POSTMARK_API_TOKEN: z.string().optional().default("local-placeholder"),
    POSTMARK_SIGN_IN_TEMPLATE: z.string().optional().default("1"),
    POSTMARK_ACTIVATION_TEMPLATE: z.string().optional().default("1"),
    STRIPE_API_KEY: z.string().optional().default("local-placeholder"),
    STRIPE_WEBHOOK_SECRET: z.string().optional().default("local-placeholder"),
    STRIPE_PRO_MONTHLY_PLAN_ID: z.string().optional().default("local-placeholder"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://127.0.0.1:4317"),
  },
  runtimeEnv: {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    NOTION_PROJECTS_DATABASE_ID: process.env.NOTION_PROJECTS_DATABASE_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    SMTP_FROM: process.env.SMTP_FROM,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    POSTMARK_SIGN_IN_TEMPLATE: process.env.POSTMARK_SIGN_IN_TEMPLATE,
    POSTMARK_ACTIVATION_TEMPLATE: process.env.POSTMARK_ACTIVATION_TEMPLATE,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_PRO_MONTHLY_PLAN_ID: process.env.STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
