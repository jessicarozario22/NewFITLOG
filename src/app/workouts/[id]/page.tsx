import AddToPlan from "@/components/WorkoutDetails/AddToPlan";
import SaveForLater from "@/components/WorkoutDetails/SaveForLater";
import { IWorkout } from "@/types/workout.types";
import Image from "next/image";
import React from "react";
import fs from "fs/promises";
import path from "path";

interface IWorkoutDetailsPage {
  params: Promise<{
    id: string;
  }>;
}

const listworkouts = async (): Promise<IWorkout[]> => {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "workoutsData.json"
    );

    const fileData = await fs.readFile(filePath, "utf-8");

    const data: IWorkout[] = JSON.parse(fileData);

    console.log("Workout data:", data);

    return data;
  } catch (error) {
    console.error("Error reading workouts data:", error);

    return [];
  }
};

const WorkoutDetailsPage = async ({
  params,
}: IWorkoutDetailsPage) => {
  const { id } = await params;

  console.log("URL ID:", id);

  const workoutsData = await listworkouts();

  console.log("All workouts:", workoutsData);

  const workout = workoutsData.find(
    (item: IWorkout) => String(item.id) === String(id)
  );

  console.log("Selected workout:", workout);

  if (!workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Workout not found
          </h1>

          <p className="mt-2 text-gray-400">
            Workout ID: {id}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <section className="mx-auto max-w-[1220px] px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="w-full">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={workout.image}
                alt={workout.name}
                width={800}
                height={1200}
                priority
                className="h-auto max-h-[735px] w-full object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            <h1 className="text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-6 text-gray-400">
              {workout.description}
            </p>

            {/* MUSCLE GROUPS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map(
                (group: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full bg-[#b7ff00] px-4 py-1 text-sm font-bold text-black"
                  >
                    {group}
                  </span>
                )
              )}
            </div>

            {/* STATS */}
            <div className="mt-7 overflow-hidden rounded-2xl border border-[#272c35] bg-[#151920]">

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Equipment
                </span>
                <span className="text-sm text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Difficulty
                </span>
                <span className="text-sm text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Sets
                </span>
                <span className="text-sm text-gray-200">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Reps
                </span>
                <span className="text-sm text-gray-200">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Duration
                </span>
                <span className="text-sm text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#272c35] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Calories
                </span>
                <span className="text-sm text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Rating
                </span>
                <span className="text-sm text-gray-200">
                  {workout.rating}
                </span>
              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-8">
              <h2 className="text-lg font-black uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map(
                  (
                    instruction: string,
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="flex gap-4 text-sm leading-6 text-gray-300"
                    >
                      <span className="shrink-0 text-gray-400">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-9 flex flex-wrap gap-4">
              <AddToPlan workout={workout} />
              <SaveForLater workout={workout} />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default WorkoutDetailsPage;