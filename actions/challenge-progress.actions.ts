import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const currentUserProgress = await getUserProgress();
  if (!currentUserProgress) {
    throw new Error("User Progress not found");
  }
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });
  if (!challenge) {
    throw new Error("Challenge not found");
  }
  const lessonId = challenge.id;
  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });
  const isPractice = !!existingChallengeProgress;
  /* TODO: HANDLE SUBSCRIPTION CASE */
  if (!currentUserProgress.hearts && !isPractice) {
    return { error: "hearts" };
  }
  if (isPractice) {
    await db
      .update(challengeProgress)
      .set({
        completed: true,
      })
      .where(eq(challengeProgress.id, existingChallengeProgress.id));
    await db
      .update(userProgress)
      .set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points + 10,
      })
      .where(eq(userProgress.userId, userId));
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/lesson/${lessonId}`);
    return;
  }
  await db.insert(challengeProgress).values({
    challengeId,
    userId,
    completed: true,
  });
  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId));
  revalidatePath("/learn");
  revalidatePath("/lesson");
  revalidatePath("/quests");
  revalidatePath("/quests");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);
};
