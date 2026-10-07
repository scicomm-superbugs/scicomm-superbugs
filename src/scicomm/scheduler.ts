/**
 * Automated Course Schedule Conflict Detector
 * Developed for Alamein International University (AIU) Faculty of Science
 * Author: Abdullah Amr Maged
 */

export interface CourseSession {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  dayOfWeek: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday";
  startTime: number; // Minutes from 00:00 (e.g., 540 for 09:00)
  endTime: number;   // Minutes from 00:00
  section: number;
}

export interface ConflictReport {
  hasConflict: boolean;
  conflictingPairs: Array<{
    sessionA: CourseSession;
    sessionB: CourseSession;
    reason: "ROOM_OVERLAP" | "INSTRUCTOR_OVERLAP" | "SECTION_TIME_OVERLAP";
  }>;
}

export function detectScheduleConflicts(sessions: CourseSession[]): ConflictReport {
  const conflicts: ConflictReport["conflictingPairs"] = [];

  for (let i = 0; i < sessions.length; i++) {
    for (let j = i + 1; j < sessions.length; j++) {
      const a = sessions[i];
      const b = sessions[j];

      if (a.dayOfWeek !== b.dayOfWeek) continue;

      const overlaps = Math.max(a.startTime, b.startTime) < Math.min(a.endTime, b.endTime);
      if (!overlaps) continue;

      if (a.room === b.room) {
        conflicts.push({ sessionA: a, sessionB: b, reason: "ROOM_OVERLAP" });
      } else if (a.instructor === b.instructor) {
        conflicts.push({ sessionA: a, sessionB: b, reason: "INSTRUCTOR_OVERLAP" });
      } else if (a.courseCode === b.courseCode && a.section === b.section) {
        conflicts.push({ sessionA: a, sessionB: b, reason: "SECTION_TIME_OVERLAP" });
      }
    }
  }

  return {
    hasConflict: conflicts.length > 0,
    conflictingPairs: conflicts,
  };
}
