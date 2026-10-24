// These are presentation samples, not backend response models or live department data.
export interface CommunityPostPreview {
  id: string;
  author: string;
  initials: string;
  authorDetail: string;
  category: string;
  publishedAt: string;
  title: string;
  excerpt: string;
}

export interface AnnouncementPreview {
  id: string;
  category: string;
  title: string;
  description: string;
  publishedAt: string;
}

export interface EventPreview {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  venue: string;
}

export interface MemberStatisticsPreview {
  registeredMembers: number;
  students: number;
  staff: number;
}

export const sampleCommunityPosts: readonly CommunityPostPreview[] = [
  {
    id: "sample-post-1",
    author: "Ada Okafor",
    initials: "AO",
    authorDetail: "Student · 300 level",
    category: "Study group",
    publishedAt: "2026-10-22T15:30:00+01:00",
    title: "Working through trees and graphs together",
    excerpt:
      "I'm putting together a small study group for data structures. Let's compare our approaches to the practice questions and learn from each other.",
  },
  {
    id: "sample-post-2",
    author: "Daniel Ibrahim",
    initials: "DI",
    authorDetail: "Student · 200 level",
    category: "Question",
    publishedAt: "2026-10-21T10:15:00+01:00",
    title: "How do you practise beyond the classroom?",
    excerpt:
      "Which small programming projects helped you understand what we covered in class? I'm looking for ideas to build between lectures.",
  },
  {
    id: "sample-post-3",
    author: "Dr. Amina Yusuf",
    initials: "AY",
    authorDetail: "Department staff",
    category: "Project advice",
    publishedAt: "2026-10-20T09:00:00+01:00",
    title: "Start with a problem you can explain clearly",
    excerpt:
      "A useful first step for your project is a short problem statement. Describe who faces the problem, what happens today, and how you could improve it.",
  },
];

export const sampleAnnouncements: readonly AnnouncementPreview[] = [
  {
    id: "sample-announcement-1",
    category: "Academic",
    title: "Course registration checklist",
    description:
      "Review your course selection and credit units with your level adviser before submitting your registration.",
    publishedAt: "2026-10-22T09:00:00+01:00",
  },
  {
    id: "sample-announcement-2",
    category: "Library",
    title: "Make the most of your reading lists",
    description:
      "Keep recommended texts, course outlines, and useful references together as you prepare for the semester.",
    publishedAt: "2026-10-21T09:00:00+01:00",
  },
  {
    id: "sample-announcement-3",
    category: "Projects",
    title: "Prepare for your project discussion",
    description:
      "Bring a short problem statement and a few possible topics to your next conversation with your supervisor.",
    publishedAt: "2026-10-20T09:00:00+01:00",
  },
];

export const sampleEvents: readonly EventPreview[] = [
  {
    id: "sample-event-1",
    title: "Programming practice clinic",
    description: "Work through programming problems with fellow department members.",
    startsAt: "2026-11-04T11:00:00+01:00",
    venue: "Computer laboratory",
  },
  {
    id: "sample-event-2",
    title: "Student project showcase",
    description: "An afternoon of project demos, shared ideas, and constructive feedback.",
    startsAt: "2026-11-13T14:00:00+01:00",
    venue: "Department seminar room",
  },
  {
    id: "sample-event-3",
    title: "Research conversation",
    description: "Explore research questions and approaches with students and staff.",
    startsAt: "2026-11-20T12:00:00+01:00",
    venue: "Department seminar room",
  },
];

export const sampleMemberStatistics: MemberStatisticsPreview = {
  registeredMembers: 452,
  students: 428,
  staff: 24,
};
