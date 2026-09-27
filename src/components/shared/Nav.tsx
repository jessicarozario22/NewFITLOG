"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import { WorkoutContext } from "@/context/WorkoutContext";

const Nav = () => {
  const pathname = usePathname();

  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("Nav must be used inside WorkoutProvider");
  }

  const { addWorkouts, savedWorkouts } = context;

  const isWorkoutsActive = pathname === "/workouts";
  const isMyPlanActive = pathname === "/listedworkouts";

  return (
    <div className="navbar min-h-[64px] bg-[#0F1115] px-3 shadow-sm sm:px-4 lg:px-8">

      {/* =====================================
          MOBILE NAV
      ====================================== */}

      <div className="flex w-full items-center justify-between lg:hidden">

        {/* LEFT — HAMBURGER */}

        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-sm h-9 min-h-9 px-2 text-lg"
          >
            ☰
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content z-[10] mt-3 w-48 rounded-box border border-[#292f39] bg-[#151920] p-2 text-white shadow-xl"
          >

            <li>
              <Link
                href="/workouts"
                className={
                  isWorkoutsActive
                    ? "font-semibold text-lime-400 bg-lime-400/5"
                    : "hover:text-lime-400"
                }
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/listedworkouts"
                className={
                  isMyPlanActive
                    ? "font-semibold text-lime-400 bg-lime-400/5"
                    : "hover:text-lime-400"
                }
              >
                My Plan
              </Link>
            </li>

          </ul>

        </div>

        {/* CENTER — LOGO */}

        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5"
        >
          <Image
            src={logo}
            alt="FITLOG Logo"
            width={40}
            height={40}
            className="h-8 w-8"
          />

          <h2 className="text-lg font-bold">
            FITLOG
          </h2>
        </Link>

        {/* RIGHT — PLAN + SAVED */}

        <div className="ml-auto flex items-center gap-2 text-[11px]">

          {/* PLAN */}

          <div className="flex items-center gap-1 text-[#d0d4da]">

            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[10px] font-bold text-black">
              {addWorkouts.length}
            </span>

          </div>

          {/* SAVED */}

          <div className="flex items-center gap-1 text-[#9299a5]">

            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#303640] px-1 text-[10px]">
              {savedWorkouts.length}
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          DESKTOP NAV
      ====================================== */}

      <div className="hidden w-full lg:flex lg:items-center">

        {/* LEFT — LOGO */}

        <div className="navbar-start">

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="FITLOG Logo"
              width={40}
              height={40}
            />

            <h2 className="text-2xl font-bold">
              FITLOG
            </h2>
          </Link>

        </div>


        {/* CENTER — NAVIGATION */}

        <div className="navbar-center">

          <ul className="menu menu-horizontal gap-2">

            <li>
              <Link
                href="/workouts"
                className={`rounded-full px-4 ${
                  isWorkoutsActive
                    ? "font-semibold text-lime-400 bg-lime-400/5"
                    : "hover:bg-lime-400/5 hover:text-lime-400"
                }`}
              >
                Workouts
              </Link>
            </li>

            <li>
              <Link
                href="/listedworkouts"
                className={`rounded-full px-4 ${
                  isMyPlanActive
                    ? "font-semibold text-lime-400 bg-lime-400/5"
                    : "hover:bg-lime-400/5 hover:text-lime-400"
                }`}
              >
                My Plan
              </Link>
            </li>

          </ul>

        </div>


        {/* RIGHT — PLAN + SAVED */}

        <div className="navbar-end">

          <div className="flex items-center gap-6 text-[13px]">

            <div className="flex items-center gap-2 text-[#d0d4da]">

              <span>Plan</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b6ff00] px-1 text-[11px] font-bold text-black">
                {addWorkouts.length}
              </span>

            </div>

            <div className="flex items-center gap-2 text-[#9299a5]">

              <span>Saved</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#303640] px-1 text-[11px]">
                {savedWorkouts.length}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Nav;