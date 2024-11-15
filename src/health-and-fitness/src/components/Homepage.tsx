import React from "react";
import GymBanner from "../assets/homepage/gym_banner.png";
import GymPic from "../assets/homepage/gym_pic.png";
import Food from "../assets/homepage/food.png";
import FooterPic from "../assets/homepage/footer_pic.png";

function Homepage() {
  return (
    <>
      <div className="mx-24 py-10 font-raleway">
        <div className="grid grid-cols-[4.5fr_5.5fr] mt-10">
          <div>
            <img src={GymBanner} alt="Gym Banner" />
          </div>
          <div className="mx-20 -mt-6">
            <p className="text-3xl font-semibold tracking-[0.23rem]">
              CREATE A CUSTOM <br />
              WORKOUT PLAN
            </p>
            <p className="w-full text-[1.8rem] text-[#A7A2A2] mt-8 tracking-[0.25rem]">
              Personalize your training by choosing exercises, adjusting rest
              times, and incorporating equipment to meet your fitness goals.
            </p>
            <button className="bg-[#F24B4B] rounded-lg text-[1.5rem] text-black px-6 py-1 font-semibold my-6 hover:text-white">
              <a href="#">Try it</a>
            </button>
          </div>
        </div>

        <div className="flex flex-row mt-10 items-center">
          <div className="w-[45%] rounded-[3rem] bg-[#D9D9D9] h-full">
            <p className="text-3xl font-semibold tracking-[0.23rem] uppercase text-black mx-10 my-8">
              Explore various <br /> exercises
            </p>
            <p className="w-[85%] text-[1.3rem] text-[#827D7D] mt-8 tracking-[0.25rem] flex items-center mx-10">
              Discover a variety of workouts tailored to your fitness goals.
              Learn the benefits and techniques of each exercise to enhance your
              training.
            </p>
            <button className="bg-black text-white rounded-lg text-[1.5rem] px-6 py-1 font-semibold my-7 hover:text-black hover:bg-[#F24B4B] mx-10">
              <a href="#">Try it</a>
            </button>
          </div>
          <div className="ml-80">
            <img src={GymPic} alt="Gym Pic" />
          </div>
        </div>

        <div className="grid grid-cols-[4.5fr_5.5fr] mt-24">
          <div>
            <img src={Food} alt="Food" />
          </div>
          <div className="mx-24 -mt-6">
            <p className="text-3xl font-semibold tracking-[0.23rem] uppercase">
              generate Nutrition <br />
              and Meal Plans
            </p>
            <p className="w-full text-[1.6rem] text-[#A7A2A2] mt-8 tracking-[0.25rem]">
              Create personalized meal plans tailored to your fitness goals.
              Access nutritious recipes to fuel your body for optimal
              performance.
            </p>
            <button className="bg-[#F24B4B] rounded-lg text-[1.5rem] text-black px-6 py-1 font-semibold my-8 hover:text-white">
              <a href="#">Try it</a>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-[8fr_2fr] mt-44 items-center">
          <div className="text-2xl text-white tracking-[0.3rem]">
            <p>
              Become part of our community and start your fitness journey today!{" "}
              <br />
              Enjoy personalized plans, expert guidance, and a supportive
              environment to help you achieve your goals.
            </p>
          </div>
          <div>
            <button className="bg-white rounded-lg text-[1.5rem] text-black px-7 py-3 font-semibold my-8 hover:text-white hover:bg-[#F24B4B] ml-24">
              <a href="#">Join now</a>
            </button>
          </div>
        </div>
      </div>

      <img src={FooterPic} alt="Footer Picture" className="w-full" />
    </>
  );
}

export default Homepage;
