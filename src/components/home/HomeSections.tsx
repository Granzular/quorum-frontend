import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  MapPin,
  Megaphone,
  MessageSquare,
  Users,
} from "lucide-react";
import CourseCard from "../CourseCard";
import NotAvailableCard from "../NotAvailableCard";
import { useCourses } from "../../hooks/useCourses";
import type {
  AnnouncementPreview,
  CommunityPostPreview,
  EventPreview,
  MemberStatisticsPreview,
} from "../../data/homePreview";

const dateFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Lagos",
});

const eventDayFormatter = new Intl.DateTimeFormat("en-NG", {
  day: "2-digit",
  timeZone: "Africa/Lagos",
});

const eventMonthFormatter = new Intl.DateTimeFormat("en-NG", {
  month: "short",
  timeZone: "Africa/Lagos",
});

const timeFormatter = new Intl.DateTimeFormat("en-NG", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Africa/Lagos",
});

interface SectionHeadingProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  label?: string;
  action?: ReactNode;
}

function SectionHeading({ id, icon, title, description, label, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <h2 id={id} className="text-2xl font-semibold text-(--text-h)">{title}</h2>
            {label && (
              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {label}
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed">{description}</p>
        </div>
      </div>
      {action && <div className="shrink-0 self-end sm:self-start">{action}</div>}
    </div>
  );
}

export function LibraryPreview() {
  const { courses, status, retry } = useCourses();

  return (
    <section aria-labelledby="library-preview-heading">
      <SectionHeading
        id="library-preview-heading"
        icon={<BookOpen size={22} aria-hidden="true" />}
        title="From the Library"
        description="Find course outlines, notes, and learning resources for your level."
        action={
          <Link
            to="/library"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Open Library <ArrowRight size={18} aria-hidden="true" />
          </Link>
        }
      />
      {status === "loading" ? (
        <div role="status" aria-live="polite">
          <p className="mb-3 text-sm">Loading courses…</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-48 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 motion-reduce:animate-none" />
            ))}
          </div>
        </div>
      ) : status === "error" ? (
        <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-gray-800">
          <p className="font-medium">The Library preview is temporarily unavailable.</p>
          <p className="mt-1 text-sm">Try again to load the course list.</p>
          <button type="button" onClick={retry} className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
            Try again
          </button>
        </div>
      ) : courses.length === 0 ? (
        <NotAvailableCard message="No courses are available in the Library yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      )}
    </section>
  );
}

export function CommunityPreview({ posts }: { posts: readonly CommunityPostPreview[] }) {
  return (
    <section id="community-preview" tabIndex={-1} aria-labelledby="community-preview-heading" className="scroll-mt-36">
      <SectionHeading
        id="community-preview-heading"
        icon={<MessageSquare size={22} aria-hidden="true" />}
        title="Around the Community"
        description="Questions, ideas, and conversations within the department. Posting and the full feed are coming soon."
        label="Sample posts"
      />
      {posts.length === 0 ? (
        <NotAvailableCard message="The Community feed is coming soon." />
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex min-w-0 flex-col rounded-2xl border border-gray-300 bg-gray-50 p-5 text-gray-700 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {post.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                  <p className="text-xs text-gray-600">{post.authorDetail}</p>
                </div>
              </div>
              <span className="mb-3 self-start rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{post.category}</span>
              <h3 className="mb-3 text-lg font-semibold leading-snug text-gray-900">{post.title}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed">{post.excerpt}</p>
              <time dateTime={post.publishedAt} className="border-t border-gray-200 pt-3 text-xs text-gray-600">
                {dateFormatter.format(new Date(post.publishedAt))}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function AnnouncementsPreview({ announcements }: { announcements: readonly AnnouncementPreview[] }) {
  return (
    <section aria-labelledby="announcements-heading">
      <SectionHeading
        id="announcements-heading"
        icon={<Megaphone size={22} aria-hidden="true" />}
        title="Departmental announcements"
        description="Illustrative notices for this preview. Official department updates will appear here when available."
        label="Sample notices"
      />
      {announcements.length === 0 ? (
        <NotAvailableCard message="There are no announcements to display." />
      ) : (
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li key={announcement.id}>
              <article className="rounded-2xl border border-gray-300 border-l-4 border-l-blue-500 bg-gray-50 p-5 text-gray-700 shadow-sm">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-medium text-blue-700">{announcement.category}</span>
                  <time dateTime={announcement.publishedAt} className="text-gray-600">
                    {dateFormatter.format(new Date(announcement.publishedAt))}
                  </time>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{announcement.title}</h3>
                <p className="text-sm leading-relaxed">{announcement.description}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function EventsPreview({ events }: { events: readonly EventPreview[] }) {
  return (
    <section aria-labelledby="events-heading">
      <SectionHeading
        id="events-heading"
        icon={<CalendarDays size={22} aria-hidden="true" />}
        title="Upcoming events"
        description="An illustrative schedule. Dates and venues are samples for this preview."
        label="Sample schedule"
      />
      {events.length === 0 ? (
        <NotAvailableCard message="There are no upcoming events to display." />
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id}>
              <article className="flex min-w-0 items-start gap-4 rounded-2xl border border-gray-300 bg-gray-50 p-5 text-gray-700 shadow-sm">
                <time dateTime={event.startsAt} className="flex w-16 shrink-0 flex-col items-center rounded-xl border border-blue-200 bg-blue-50 py-3 text-blue-700">
                  <span className="text-xs font-semibold uppercase">{eventMonthFormatter.format(new Date(event.startsAt))}</span>
                  <span className="text-2xl font-bold">{eventDayFormatter.format(new Date(event.startsAt))}</span>
                  <span className="text-xs">{new Date(event.startsAt).getFullYear()}</span>
                </time>
                <div className="min-w-0">
                  <h3 className="mb-2 font-semibold text-gray-900">{event.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed">{event.description}</p>
                  <p className="mb-1 text-xs text-gray-600">{timeFormatter.format(new Date(event.startsAt))} WAT</p>
                  <p className="flex items-start gap-1 text-xs text-gray-600">
                    <MapPin size={14} aria-hidden="true" className="shrink-0" /> {event.venue}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function MemberStatistics({ statistics }: { statistics: MemberStatisticsPreview }) {
  return (
    <section aria-labelledby="members-heading" className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 p-6 text-white shadow-sm sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 id="members-heading" className="mb-2 flex items-center gap-3 text-2xl font-semibold">
            <Users size={24} aria-hidden="true" /> Our department, together
          </h2>
          <p className="text-sm text-blue-100">A shared space for Computer Science students and staff.</p>
        </div>
        <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium">Placeholder statistics</span>
      </div>
      <dl className="grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="mb-2 text-sm text-blue-100">Registered members</dt>
          <dd className="text-4xl font-bold">{statistics.registeredMembers.toLocaleString("en-NG")}</dd>
        </div>
        <div className="sm:border-l sm:border-white/25 sm:pl-6">
          <dt className="mb-2 text-sm text-blue-100">Students</dt>
          <dd className="text-4xl font-bold">{statistics.students.toLocaleString("en-NG")}</dd>
        </div>
        <div className="sm:border-l sm:border-white/25 sm:pl-6">
          <dt className="mb-2 text-sm text-blue-100">Staff</dt>
          <dd className="text-4xl font-bold">{statistics.staff.toLocaleString("en-NG")}</dd>
        </div>
      </dl>
      <p className="mt-6 border-t border-white/25 pt-4 text-xs text-blue-100">Sample figures for this preview. Live registration counts are unavailable.</p>
    </section>
  );
}
