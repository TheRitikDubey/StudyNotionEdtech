import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightedText from "../components/core/HomePage/HighlightedText";
import CLButton from "../components/core/HomePage/Button";
import bannerMp4 from "../assets/Images/banner.mp4";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import ExploreCatalog from "../components/core/HomePage/ExploreCatalog";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearninglanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import "./Pages.css";
import "../App.css";
function HomePage() {
  return (
    <div className="text-white mt-16 mx-auto">
      {/* Section 1 */}

      <div className="flex flex-col relative mx-auto w-11/12 items-center max-w-maxContent  justify-between">
        <Link to={"/singup"}>
          <div className="rounded-full text-richblack-200 bg-richblack-800 font-base p-2 transition-all duration-200 hover:scale-95 w-fit">
            <button className="flex gap-2 px-10 py-[5px] items-center text-md">
              Became an instructor <FaArrowRight />{" "}
            </button>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-12">
          Empower Your Future with <HighlightedText text="Coding Skills" />
        </div>
        <div className="mt-4 text-richblack-300 w-[90%] text-center font-base text-lg">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex gap-8 mt-8 align-baseline">
          <div>
            <CLButton active={true} linkto={"/signup"}>
              Learn More
            </CLButton>
          </div>
          <div>
            <CLButton active={false} linkto={"/login"}>
              Book a demo
            </CLButton>
          </div>
        </div>
      </div>

      {/* Section 2 video component */}
      <div className="w-[75%] mt-16 mx-auto">
        <div className="my-10 videoPlayer mx-6 shadow-blue-200  w-11/12">
          <video className="demoVideo" muted loop autoPlay>
            <source src={bannerMp4} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Unlock your coding potential */}
      <div className="w-11/12 mx-auto">
        <CodeBlock
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your
              <HighlightedText text={"coding potential "} />
              with our online courses
            </div>
          }
          subHeading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          helperButton1={{
            btnText: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          helperButton2={{
            btnText: "learn more",
            linkto: "/login",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
              <h1>Study Notion edtech</h1>
          </body>
          </html>`}
          codeColor={"text-yellow-25"}
        />
      </div>

      {/* Start Coding in secs */}
      <div className="w-11/12 mx-auto mt-48">
        <CodeBlock
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Start
              <HighlightedText text={"Coding in seconds"} />
            </div>
          }
          subHeading={
            "Go ahead, Give it a try.Our hands on learning environment means you will be learning real code from your first learning"
          }
          helperButton1={{
            btnText: "Continue Lesson",
            linkto: "/signup",
            active: true,
          }}
          helperButton2={{
            btnText: "learn more",
            linkto: "/login",
            active: false,
          }}
          codeBlock={`<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
              <h1>Study Notion edtech</h1>
          </body>
          </html>`}
          codeColor={"text-yellow-25"}
        />
      </div>

      {/*Course Card section  */}
      <div className="w-11/12 mx-auto mt-[6rem] relative">
        <ExploreCatalog />
      </div>

      {/* Get the skills you need for a job */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg w-full h-[310px]">
          <div className="flex pt-[10%] justify-center gap-8 mt-8">
            <div>
              <CLButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CLButton>
            </div>
            <div>
              <CLButton active={false} linkto={"/login"}>
                <div className="text-white">Learn more</div>
              </CLButton>
            </div>
          </div>
        </div>
        {/* Get skill & job demand section */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex mt-[6rem] items-baseline gap-4">
            <div>
              <div className="text-4xl font-semibold w-[75%]">
                Get the Skills you need for a
                <HighlightedText text={"Job that is in demand"} />
              </div>
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CLButton active={true} linkto={"/signup"}>
                <div>Learn more</div>
              </CLButton>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>

      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection />

            <h2 className='text-center text-4xl font-semobold mt-10'>review from Other Learners</h2>
            {/* Review Slider here */}
            
      </div>
    </div>
  );
}

export default HomePage;
