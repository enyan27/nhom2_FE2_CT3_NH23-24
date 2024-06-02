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

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "English",
        imageSrc: "/en.svg",
      },
      {
        id: 2,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // English
        title: "Unit 1",
        description: "Learn the basics of English",
        order: 1,
      },
      {
        id: 2,
        courseId: 2, // Japanese
        title: "Unit 1",
        description: "Learn the basics of Japanese",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (English)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (English)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 2, // Unit 1 (Japanese)
        order: 1,
        title: "Nouns",
      },
      {
        id: 4,
        unitId: 2, // Unit 1 (Japanese)
        order: 2,
        title: "Verbs",
      }
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns (English)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 2,
        lessonId: 1, // Nouns (English)
        type: "ASSIST",
        order: 2,
        question: '"the man"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns (English)
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
      {
        id: 4,
        lessonId: 2, // Verbs (English)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "run"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs (English)
        type: "ASSIST",
        order: 2,
        question: '"run"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs (English)
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "eat"?',
      },
      {
        id: 7,
        lessonId: 3, // Nouns (Japanese)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "water"?',
      },
      {
        id: 8,
        lessonId: 3, // Nouns (Japanese)
        type: "SELECT",
        order: 2,
        question: 'Which one of these is "man"?',
      },
      {
        id: 9,
        lessonId: 3, // Nouns (Japanese)
        type: "ASSIST",
        order: 3,
        question: '"男の人"',
      },
      {
        id: 10,
        lessonId: 4, // Verbs (Japanese)
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "women"?',
      },
      {
        id: 11,
        lessonId: 4, // Verbs (Japanese)
        type: "ASSIST",
        order: 2,
        question: '"走る"',
      },
      {
        id: 12,
        lessonId: 4, // Verbs (Japanese)
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "食べる"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/man.svg",
        correct: true,
        text: "the man",
        audioSrc: "/man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "the woman",
        audioSrc: "/woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "the robot",
        audioSrc: "/robot.mp3",
      },
      {
        challengeId: 2, // "the man"?
        correct: true,
        text: "the man",
        audioSrc: "/man.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "the woman",
        audioSrc: "/woman.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "the robot",
        audioSrc: "/robot.mp3",
      },
      {
        challengeId: 3, // Which one of these is "the robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "the man",
        audioSrc: "/man.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "the woman",
        audioSrc: "/woman.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "the robot",
        audioSrc: "/robot.mp3",
      },
      {
        challengeId: 7, // Which one of these is "water"?
        imageSrc: "/water.svg",
        correct: true,
        text: "水",
        audioSrc: "/water.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/sushi.svg",
        correct: false,
        text: "寿司",
        audioSrc: "/sushi.mp3",
      },
      {
        challengeId: 7,
        imageSrc: "/tea.svg",
        correct: false,
        text: "お茶",
        audioSrc: "/tea.mp3",
      },
      {
        challengeId: 8, // Which one of these is "男の人"?
        imageSrc: "/man.svg",
        correct: true,
        text: "男の人",
        audioSrc: "/man.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/woman.svg",
        correct: false,
        text: "女の人",
        audioSrc: "/woman.mp3",
      },
      {
        challengeId: 8,
        imageSrc: "/robot.svg",
        correct: false,
        text: "ロボット",
        audioSrc: "/robot.mp3",
      },
      {
        challengeId: 9, // "男の人"?
        correct: true,
        text: "男の人",
        audioSrc: "/man.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "女の人",
        audioSrc: "/woman.mp3",
      },
      {
        challengeId: 9,
        correct: false,
        text: "ロボット",
        audioSrc: "/robot.mp3",
      }
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
