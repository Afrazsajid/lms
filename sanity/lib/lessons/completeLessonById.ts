import groq from "groq";
import { client } from "../adminClient";
import { getStudentByClerkId } from "../student/getStudentByClerkId";

export async function completeLessonById({
  lessonId,
  clerkId,
}: {
  lessonId: string;
  clerkId: string;
}) {
  try {
    // Get Sanity student ID from Clerk ID
    const student = await getStudentByClerkId(clerkId);

    if (!student?._id) {
      throw new Error("Student not found");
    }

    const studentId = student._id;

    // Check if lesson is already completed
    const existingCompletion = await client.fetch(
      groq`*[_type == "lessonCompletion" && student._ref == $studentId && lesson._ref == $lessonId][0]`,
      { studentId, lessonId }
    );

    if (existingCompletion) {
      return existingCompletion;
    }

    // Fetch lesson details to get module and course
    const lesson = await client.fetch(
      groq`*[_type == "lesson" && _id == $lessonId][0]{
        _id,
        "module": *[_type == "module" && references(^._id)][0]{
          _id,
          "course": *[_type == "course" && references(^._id)][0]._id
        }
      }`,
      { lessonId }
    );

    if (!lesson?.module?._id || !lesson?.module?.course) {
      throw new Error("Could not find module or course for lesson");
    }

    // Create new completion record
    const completion = await client.create({
      _type: "lessonCompletion",
      student: {
        _type: "reference",
        _ref: studentId,
      },
      lesson: {
        _type: "reference",
        _ref: lessonId,
      },
      module: {
        _type: "reference",
        _ref: lesson.module._id,
      },
      course: {
        _type: "reference",
        _ref: lesson.module.course,
      },
      completedAt: new Date().toISOString(),
    });

    return completion;
  } catch (error) {
    console.error("Error completing lesson:", error);
    throw error;
  }
}
