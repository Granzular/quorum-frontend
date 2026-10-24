import { Link } from "react-router-dom";
import { RippleBackground } from "../components/ui/custom-anim";
import {
  AnnouncementsPreview,
  CommunityPreview,
  EventsPreview,
  LibraryPreview,
  MemberStatistics,
} from "../components/home/HomeSections";
import {
  sampleAnnouncements,
  sampleCommunityPosts,
  sampleEvents,
  sampleMemberStatistics,
} from "../data/homePreview";

function Home() {
  return (
    <>
      <div className="relative -mt-15 mb-20 w-full bg-gradient-to-b from-blue-700 to-blue-200 pt-0 pb-24 text-white">
        <RippleBackground className="mx-auto max-w-4xl text-center">
          <p className="p-2 pb-10 text-4xl leading-18">
            <br />
            <span className="text-6xl font-extrabold text-white sm:text-7xl">Quorum</span>
            <br />
            <span className="text-2xl text-gray-100 italic"> of Computer scientists</span>
          </p>
        </RippleBackground>

        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-[80px] w-full md:h-[140px]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="var(--bg)"
              d="M 0,120 C 360,-40 540,120 720,120 C 900,120 1080,-40 1440,120 Z"
            />
          </svg>
        </div>

        <Link
          className="absolute -bottom-1/12 left-[8%] m-2 rounded-2xl border bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 px-4 py-2 text-lg font-medium tracking-wider text-gray-50 backdrop-blur-sm hover:bg-none hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:left-1/8 sm:text-xl md:left-1/6"
          to="/library"
        >
          Library
        </Link>
        <a
          className="absolute right-[5%] -bottom-1/12 m-2 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 px-4 py-2 text-lg font-medium tracking-wider text-white backdrop-blur-sm hover:bg-none hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:right-1/10 sm:text-xl md:right-1/6"
          href="#community-preview"
          aria-label="Community preview"
        >
          Community
        </a>
      </div>

        
      <div className="mx-auto max-w-7xl space-y-14 pt-16 lg:pt-12 px-4 pb-4 sm:px-6 lg:px-8">
        <p className="text-center text-xl pb-12 text-gray-700">A space exclusively for students and staff of the Computer Science Department.</p>
        <hr className="border-gray-300"></hr>
        <LibraryPreview />
        <CommunityPreview posts={sampleCommunityPosts} />
        <div className="grid gap-14 xl:grid-cols-2 xl:gap-8">
          <AnnouncementsPreview announcements={sampleAnnouncements} />
          <EventsPreview events={sampleEvents} />
        </div>
        <MemberStatistics statistics={sampleMemberStatistics} />
      </div>
    </>
  );
}

export default Home;
