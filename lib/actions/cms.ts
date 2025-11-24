"use server";

import { prisma } from "@/lib/prisma";
import { homePageContentSchema } from "@/lib/validations/cms";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getHomePageContent() {
  try {
    const content = await prisma.homePageContent.findFirst({
      where: { id: 1 },
    });
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: "Failed to fetch content" };
  }
}

export async function updateHomePageContent(
  data: z.infer<typeof homePageContentSchema>
) {
  try {
    const validated = homePageContentSchema.parse(data);

    const content = await prisma.homePageContent.upsert({
      where: { id: 1 },
      update: validated,
      create: { ...validated, id: 1 },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/cms");

    return { success: true, data: content };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to update content" };
  }
}
