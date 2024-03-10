import React from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightedText from "./HighlightedText";
function ExploreCatalog() {
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
      <div className="rounded-full my-4 p-3 text-[16px] w-[50%] flex justify-evenly mx-auto bg bg-richblack-800">
        {HomePageExplore.map((value, index) => {
          return (
            <>
              <div className="cursor-pointer">{value.tag}</div>
            </>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

export default ExploreCatalog;
