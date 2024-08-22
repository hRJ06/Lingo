import {boolean, integer, pgEnum, pgTable, serial, text} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

/* COURSE SCHEMA */
export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull()
});

/* UNIT SCHEMA */
export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

/* LESSON SCHEMA */
export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

/* CHALLENGE ENUM */
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST"]);

/* CHALLENGE SCHEMA */
export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, {onDelete: "cascade"}).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(),
});

/* CHALLENGE OPTIONS SCHEMA */
export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

/* USER PROGRESS SCHEMA */
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, {onDelete: "cascade"}).notNull(),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0)
});

/* CHALLENGE PROGRESS SCHEMA */
export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, {onDelete: "cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false)
});

/* UNIT RELATIONS */
export const unitRelations = relations(units, ({many, one}) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id]
    }),
    lessons: many(lessons)
}));

/* LESSON RELATIONS */
export const lessonRelations = relations(lessons, ({one, many}) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges)
}));

/* CHALLENGE RELATIONS */
export const challengesRelation = relations(challenges, ({one, many}) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id]
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress)
}));

/* CHALLENGE OPTIONS RELATIONS */
export const challengeOptionRelations = relations(challengeOptions, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id]
    })
}));

/* COURSE RELATIONS */
export const coursesRelations = relations(courses, ({many}) => ({
    userProgress: many(userProgress),
    units: many(units)
}));

/* USER PROGRESS RELATIONS */
export const userProgressRelations = relations(userProgress, ({one}) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id]
    })
}));

/* CHALLENGE PROGRESS RELATIONS */
export const challengeProgressRelations = relations(challengeProgress, ({one}) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id]
    })
}));
