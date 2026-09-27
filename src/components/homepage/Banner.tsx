import Image from "next/image";
import Link from "next/link";
import React from "react";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#15171D] rounded-2xl mx-4 my-6 md:m-8 py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center container mx-auto px-5 md:p-4 rounded-4xl">
        
        <div className="space-y-4 text-center md:text-left">
          <h4 className="text-sm md:text-base font-medium">
            WORKOUT LIBRARY
          </h4>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <Link href="/workouts">
            <button className="bg-lime-300 rounded-md h-10 w-full sm:w-52 font-semibold text-black hover:bg-lime-400 hover:font-bold transition">
              BROWSE WORKOUTS
            </button>
          </Link>
        </div>

        <div className="w-full">
          <Image
            src={bannerImg}
            alt="Workout Banner"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;