"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";

import { WorkoutContext } from "@/context/WorkoutContext";

const ListedWorkouts = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "ListedWorkouts must be used inside WorkoutProvider"
    );
  }

  const {
    addWorkouts,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    moveToPlan,
    isLoaded,
  } = context;

  const [activeTab, setActiveTab] =
    useState<"today" | "saved">("today");

  // ========================================
  // CURRENT LIST
  // ========================================

  const workouts =
    activeTab === "today"
      ? addWorkouts
      : savedWorkouts;

  // ========================================
  // SUMMARY
  // ========================================

  const totalExercises = addWorkouts.length;

  const totalMinutes = addWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.duration || 0),
    0
  );

  const totalCalories = addWorkouts.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  // ========================================
  // LOADING
  // ========================================

  if (!isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4 text-white">
        <p className="text-sm text-gray-400">
          Loading your plan...
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white">

      <main className="mx-auto w-full max-w-[1184px] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-[42px]">

        {/* =====================================
            HEADING
        ====================================== */}

        <h1 className="text-2xl font-black leading-none tracking-tight sm:text-3xl md:text-[32px]">
          MY PLAN
        </h1>

        <p className="mt-3 max-w-xl text-xs leading-relaxed text-[#8c939f] sm:text-[14px]">
          Cap of five lifts for today. Finish them,
          then load more.
        </p>

        {/* =====================================
            SUMMARY
        ====================================== */}

        <section className="mt-6 overflow-hidden rounded-[17px] border border-[#282e38] bg-[#13171d]">

          <div className="grid grid-cols-3">

            {/* EXERCISES */}

            <div className="flex min-h-[105px] flex-col justify-center border-r border-[#282e38] px-3 sm:min-h-[122px] sm:px-6">

              <span className="text-[10px] text-[#9299a5] sm:text-[12px]">
                Exercises
              </span>

              <span className="mt-1 text-2xl font-black leading-none text-[#b6ff00] sm:text-3xl md:text-[40px]">
                {totalExercises}
              </span>

            </div>

            {/* MINUTES */}

            <div className="flex min-h-[105px] flex-col justify-center border-r border-[#282e38] px-3 sm:min-h-[122px] sm:px-6 md:px-8">

              <span className="text-[10px] text-[#9299a5] sm:text-[12px]">
                Minutes
              </span>

              <span className="mt-1 text-2xl font-black leading-none sm:text-3xl md:text-[40px]">
                {totalMinutes}
              </span>

            </div>

            {/* CALORIES */}

            <div className="flex min-h-[105px] flex-col justify-center px-3 sm:min-h-[122px] sm:px-6 md:px-8">

              <span className="text-[10px] text-[#9299a5] sm:text-[12px]">
                Calories
              </span>

              <span className="mt-1 text-2xl font-black leading-none sm:text-3xl md:text-[40px]">
                {totalCalories}
              </span>

            </div>

          </div>

        </section>

        {/* =====================================
            TABS + SORT
        ====================================== */}

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">

          {/* TABS */}

          <div className="flex h-[40px] w-fit rounded-[11px] border border-[#292f39] bg-[#151920] p-[4px]">

            <button
              onClick={() =>
                setActiveTab("today")
              }
              className={`rounded-[8px] px-3 text-[11px] transition sm:px-4 sm:text-[12px] ${
                activeTab === "today"
                  ? "bg-[#242a35] font-semibold text-white"
                  : "text-[#7e8693]"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() =>
                setActiveTab("saved")
              }
              className={`rounded-[8px] px-4 text-[11px] transition sm:px-5 sm:text-[12px] ${
                activeTab === "saved"
                  ? "bg-[#242a35] font-semibold text-white"
                  : "text-[#7e8693]"
              }`}
            >
              Saved
            </button>

          </div>

          {/* SORT */}

          <div className="flex items-center gap-3">

            <span className="text-[11px] text-[#8a919c] sm:text-[12px]">
              Sort By
            </span>

            <button className="flex h-[34px] items-center gap-3 rounded-[9px] border border-[#2b313b] bg-[#11151a] px-3 text-[11px] sm:text-[12px]">
              Duration

              <span className="text-[#858c97]">
                ⌄
              </span>
            </button>

          </div>

        </div>

        {/* =====================================
            EMPTY STATE
        ====================================== */}

        {workouts.length === 0 ? (

          <div className="mt-6 rounded-[16px] border border-[#282e38] bg-[#13171d] p-8 text-center sm:p-12">

            <p className="text-[13px] font-semibold sm:text-[14px]">
              NOTHING HERE YET
            </p>

            <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[#737b87] sm:text-[13px]">
              {activeTab === "today"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout to see it here later."}
            </p>

          </div>

        ) : (

          /* =====================================
             WORKOUT CARDS
          ====================================== */

          <div className="mt-6 flex flex-col gap-4">

            {workouts.map((workout) => (

              <div
                key={workout.id}
                className="flex flex-col gap-4 rounded-[16px] border border-[#282e38] bg-[#13171d] p-3 sm:p-4 md:min-h-[114px] md:flex-row md:items-center md:gap-0"
              >

                {/* IMAGE */}

                <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[10px] sm:h-[200px] md:h-[80px] md:w-[144px]">

                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 144px"
                    className="object-cover"
                  />

                </div>

                {/* INFO */}

                <div className="min-w-0 flex-1 md:ml-4">

                  <h2 className="truncate text-[15px] font-black uppercase sm:text-[16px]">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-[11px] text-[#8c939f] sm:text-[12px]">
                    {workout.equipment}
                  </p>

                  {/* META */}

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#a4aab4] sm:text-[12px]">

                    <span>
                      <span className="text-[#b6ff00]">
                        🕒
                      </span>{" "}
                      {workout.duration} min
                    </span>

                    <span>
                      <span className="text-[#b6ff00]">
                        🔥
                      </span>{" "}
                      {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      <span className="text-[#b6ff00]">
                        ☆
                      </span>{" "}
                      {workout.rating}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex w-full flex-wrap items-center gap-2 md:ml-5 md:w-auto md:shrink-0 md:gap-3">

                  {/* DETAILS */}

                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex h-[35px] flex-1 items-center justify-center rounded-full border border-[#38404d] px-4 text-[11px] text-[#e0e3e7] transition hover:border-[#b6ff00] hover:text-[#b6ff00] sm:flex-none sm:px-5 sm:text-[12px]"
                  >
                    View Details
                  </Link>

                  {/* TODAY */}

                  {activeTab === "today" && (

                    <button
                      onClick={() => {
                        removeFromPlan(
                          workout.id
                        );
                      }}
                      className="flex h-[35px] flex-1 items-center justify-center gap-2 rounded-full bg-[#b6ff00] px-4 text-[11px] font-bold text-black transition hover:bg-[#c8ff45] sm:flex-none sm:px-5 sm:text-[12px]"
                    >
                      <span>✓</span>
                      Mark as Done
                    </button>

                  )}

                  {/* SAVED */}

                  {activeTab === "saved" && (

                    <button
                      onClick={() => {
                        moveToPlan(
                          workout.id
                        );
                      }}
                      className="flex h-[35px] flex-1 items-center justify-center gap-2 rounded-full bg-[#b6ff00] px-4 text-[11px] font-bold text-black transition hover:bg-[#c8ff45] sm:flex-none sm:px-5 sm:text-[12px]"
                    >
                      Add to Plan
                    </button>

                  )}

                  {/* REMOVE */}

                  <button
                    onClick={() => {
                      if (
                        activeTab ===
                        "today"
                      ) {
                        removeFromPlan(
                          workout.id
                        );
                      } else {
                        removeFromSaved(
                          workout.id
                        );
                      }
                    }}
                    aria-label="Remove workout"
                    className="flex h-8 w-8 shrink-0 items-center justify-center text-[19px] text-[#68717f] transition hover:text-red-400"
                  >
                    ×
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default ListedWorkouts;