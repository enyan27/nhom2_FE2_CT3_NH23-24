import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "English", imageSrc: "/en.svg" },
        { title: "Japanese", imageSrc: "/jp.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values(
              course.title === "English"
                ? [
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "nhà ga"?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "bệnh viện"?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "quán cafe"?',
                      order: 3,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"nhà ga"',
                      order: 4,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "trà"?',
                      order: 5,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "bánh kem"?',
                      order: 6,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "tàu siêu tốc"?',
                      order: 7,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"tàu siêu tốc"',
                      order: 8,
                    },
                  ]
                : [
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "nhà ga"?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "bệnh viện"?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "quán cafe"?',
                      order: 3,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"nhà ga"',
                      order: 4,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "trà"?',
                      order: 5,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "bánh kem"?',
                      order: 6,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Từ nào sau đây là "tàu siêu tốc"?',
                      order: 7,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"tàu siêu tốc"',
                      order: 8,
                    },
                  ]
            )
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "station",
                        imageSrc: "/station.svg",
                        audioSrc: "/en_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "hospital",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "cafeteria",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/en_cafe.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "駅",
                        imageSrc: "/station.svg",
                        audioSrc: "/jp_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "病院",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "喫茶店",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/jp_cafe.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "hospital",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "cafeteria",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/en_cafe.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "station",
                        imageSrc: "/station.svg",
                        audioSrc: "/en_station.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "病院",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "喫茶店",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/jp_cafe.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "駅",
                        imageSrc: "/station.svg",
                        audioSrc: "/jp_station.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "hospital",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "station",
                        imageSrc: "/station.svg",
                        audioSrc: "/en_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "cafeteria",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/en_cafe.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "病院",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "駅",
                        imageSrc: "/station.svg",
                        audioSrc: "/jp_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "喫茶店",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/jp_cafe.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "hospital",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "station",
                        audioSrc: "/en_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "cafeteria",
                        audioSrc: "/en_cafe.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "病院",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "駅",
                        audioSrc: "/jp_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "喫茶店",
                        audioSrc: "/jp_cafe.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "station",
                        imageSrc: "/station.svg",
                        audioSrc: "/en_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "hospital",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "tea",
                        imageSrc: "/tea.svg",
                        audioSrc: "/en_tea.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "駅",
                        imageSrc: "/station.svg",
                        audioSrc: "/jp_station.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "病院",
                        imageSrc: "/hospital.svg",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "お茶",
                        imageSrc: "/tea.svg",
                        audioSrc: "/jp_tea.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "cake",
                        imageSrc: "/cake.svg",
                        audioSrc: "/en_cake.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "tea",
                        imageSrc: "/tea.svg",
                        audioSrc: "/en_tea.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "cafeteria",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/en_cafe.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "ケーキ",
                        imageSrc: "/cake.svg",
                        audioSrc: "/jp_cake.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "お茶",
                        imageSrc: "/tea.svg",
                        audioSrc: "/jp_tea.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "喫茶店",
                        imageSrc: "/cafe.svg",
                        audioSrc: "/jp_cafe.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "bullet train",
                        imageSrc: "/bullet_train.svg",
                        audioSrc: "/en_bullet_train.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "car",
                        imageSrc: "/car.svg",
                        audioSrc: "/en_car.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "walk",
                        imageSrc: "/walk.svg",
                        audioSrc: "/en_walk.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "新幹線",
                        imageSrc: "/bullet_train.svg",
                        audioSrc: "/jp_bullet_train.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "車",
                        imageSrc: "/car.svg",
                        audioSrc: "/jp_car.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "歩く",
                        imageSrc: "/walk.svg",
                        audioSrc: "/jp_walk.mp3",
                      },
                    ]
              );
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values(
                course.title === "English"
                  ? [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "hospital",
                        audioSrc: "/en_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "bullet train",
                        audioSrc: "/en_bullet_train.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "car",
                        audioSrc: "/en_car.mp3",
                      },
                    ]
                  : [
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "病院",
                        audioSrc: "/jp_hospital.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "新幹線",
                        audioSrc: "/jp_bullet_train.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "車",
                        audioSrc: "/jp_car.mp3",
                      },
                    ]
              );
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
