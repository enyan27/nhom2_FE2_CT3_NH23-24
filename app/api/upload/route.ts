// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { promises as fs } from "fs";
// import path from "path";

// import db from "@/db/drizzle";
// import { courses } from "@/db/schema";
// import { isAdmin } from "@/lib/admin";

// export const GET = async () => {
//     if (!isAdmin()) {
//         return new NextResponse("Unauthorized", { status: 401 });
//     };

//     const data = await db.query.courses.findMany();

//     return NextResponse.json(data);
// };

// export const POST = async (req: Request) => {
//     if (!isAdmin()) {
//         return new NextResponse("Unauthorized", { status: 401 });
//     };

//     const formData = await req.formData();
//     const title = formData.get("title");
//     const imageFile = formData.get("image");

//     if (typeof title !== "string" || !(imageFile instanceof Blob)) {
//         return new NextResponse("Invalid input", { status: 400 });
//     }

//     // Save the image file to /public/uploads
//     const imageFilename = `${uuidv4()}-${imageFile.name}`;
//     const imagePath = path.join(process.cwd(), "public/uploads", imageFilename);

//     await fs.writeFile(imagePath, Buffer.from(await imageFile.arrayBuffer()));

//     // Save the course to the database
//     const data = await db.insert(courses).values({
//         title,
//         imageSrc: `/uploads/${imageFilename}`,
//     }).returning();

//     return NextResponse.json(data[0]);
// };
