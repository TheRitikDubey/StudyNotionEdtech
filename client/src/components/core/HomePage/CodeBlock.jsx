import React from "react";
import CLButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import "./HomePage.css"
function CodeBlock({
  position,
  heading,
  subHeading,
  helperButton1,
  helperButton2,
  codeBlock,
  codeColor,
}) {
  return (
    <div className={`flex justify-around ${position} my-20 mx-10 gap-10`}>
      <div className="flex flex-col gap-4 max-w-[40%]">
        <div className="text-sm">{heading}</div>
        <div className="text-richblack-300">{subHeading}</div>
        <div className="mt-6 flex gap-8">
          <CLButton active={true} linkTo={"/signup"}>
            <div className="flex gap-2 items-center">
              {helperButton1.btnText}
              <FaArrowRight />
            </div>
          </CLButton>
          <CLButton active={false} linkTo={"/login"}>
            {helperButton2.btnText}
          </CLButton>
        </div>
      </div>
      <div className="h-fit code-shadow flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px]">
      <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
        </div>

        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
           <TypeAnimation
            sequence={[codeBlock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
