import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
import CourseCard from "./CourseCard";
function ExploreCatalog() {
  const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    console.log("Entering the dam",value);
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div className="p-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className="text-3xl">
          Unlock the <HighlightedText text={"Power of Code"} />
        </div>
        <div className="text-richblack-500">
          Learn to build anything that you imagine
        </div>
      </div>
      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 mt-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {HomePageExplore.map((ele, index) => {
          return (
            <div
              className={` text-[16px] flex flex-row items-center gap-2 ${
                currentTab === ele.tag
                  ? "bg-richblack-900 text-richblack-5 font-medium"
                  : "text-richblack-200"
              } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5`}
              key={index}
              onClick={() => setMyCards(ele.tag)}
            >

              {ele.tag}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block lg:h-[18rem] "></div>
      <div className="flex absolute mt-[18rem] flex-col lg:flex-row gap-12 lg:ml-11 w-11/12">
        {courses.map((value, index) => {
          return (
                <CourseCard cardData={value} currentCard={currentCard} setCurrentCard={setCurrentCard}  />
          );
        })}
      </div>
    </div>
  );
}

export default ExploreCatalog;
