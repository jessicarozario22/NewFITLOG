
// "use client";

// import React, {
//   createContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";

// import { IWorkout } from "@/types/workout.types";

// interface WorkoutContextType {
//   addWorkouts: IWorkout[];
//   setAddWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;

//   savedWorkouts: IWorkout[];
//   setSavedWorkouts: React.Dispatch<React.SetStateAction<IWorkout[]>>;

//   addToPlan: (workout: IWorkout) => void;
//   saveForLater: (workout: IWorkout) => void;
//   moveToPlan: (id: number, index: number) => void;

//   isLoaded: boolean;
// }

// interface WorkoutProviderProps {
//   children: ReactNode;
// }

// export const WorkoutContext = createContext<WorkoutContextType | null>(null);

// const WorkoutProvider = ({
//   children,
// }: WorkoutProviderProps) => {
//   const [addWorkouts, setAddWorkouts] = useState<IWorkout[]>([]);
//   const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[]>([]);
//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   // --------------------------------
//   // Load data from localStorage
//   // --------------------------------

//   useEffect(() => {
//     try {
//       const storedPlan = localStorage.getItem("fitlog-plan");
//       const storedSaved = localStorage.getItem("fitlog-saved");

//       if (storedPlan) {
//         setAddWorkouts(JSON.parse(storedPlan));
//       }

//       if (storedSaved) {
//         setSavedWorkouts(JSON.parse(storedSaved));
//       }
//     } catch (error) {
//       console.error("Failed to load FitLog data:", error);
//     } finally {
//       setIsLoaded(true);
//     }
//   }, []);

//   // --------------------------------
//   // Save My Plan
//   // --------------------------------

//   useEffect(() => {
//     if (!isLoaded) return;

//     localStorage.setItem(
//       "fitlog-plan",
//       JSON.stringify(addWorkouts)
//     );
//   }, [addWorkouts, isLoaded]);

//   // --------------------------------
//   // Save Saved Workouts
//   // --------------------------------

//   useEffect(() => {
//     if (!isLoaded) return;

//     localStorage.setItem(
//       "fitlog-saved",
//       JSON.stringify(savedWorkouts)
//     );
//   }, [savedWorkouts, isLoaded]);

//   // --------------------------------
//   // Add workout to My Plan
//   // --------------------------------

//   const addToPlan = (workout: IWorkout) => {
//     setAddWorkouts((prev) => {
//       const alreadyAdded = prev.some(
//         (item) => item.id === workout.id
//       );

//       if (alreadyAdded) {
//         return prev;
//       }

//       return [...prev, workout];
//     });
//   };

//   // --------------------------------
//   // Save workout for later
//   // --------------------------------

//   const saveForLater = (workout: IWorkout) => {
//     setSavedWorkouts((prev) => {
//       const alreadySaved = prev.some(
//         (item) => item.id === workout.id
//       );

//       if (alreadySaved) {
//         return prev;
//       }

//       return [...prev, workout];
//     });
//   };

//   // --------------------------------
//   // Saved → My Plan
//   // --------------------------------

//   const moveToPlan = (id: number, index: number) => {
//     const workout = savedWorkouts[index];

//     if (!workout) return;

//     setAddWorkouts((prev) => {
//       const alreadyAdded = prev.some(
//         (item) => item.id === workout.id
//       );

//       if (alreadyAdded) {
//         return prev;
//       }

//       return [...prev, workout];
//     });

//     setSavedWorkouts((prev) =>
//       prev.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <WorkoutContext.Provider
//       value={{
//         addWorkouts,
//         setAddWorkouts,

//         savedWorkouts,
//         setSavedWorkouts,

//         addToPlan,
//         saveForLater,
//         moveToPlan,

//         isLoaded,
//       }}
//     >
//       {children}
//     </WorkoutContext.Provider>
//   );
// };

// export default WorkoutProvider;

"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { IWorkout } from "@/types/workout.types";

interface WorkoutContextType {
  addWorkouts: IWorkout[];
  setAddWorkouts: React.Dispatch<
    React.SetStateAction<IWorkout[]>
  >;

  savedWorkouts: IWorkout[];
  setSavedWorkouts: React.Dispatch<
    React.SetStateAction<IWorkout[]>
  >;

  addToPlan: (workout: IWorkout) => void;
  saveForLater: (workout: IWorkout) => void;

  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;

  moveToPlan: (id: number) => void;

  isLoaded: boolean;
}

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutContext =
  createContext<WorkoutContextType | null>(null);

const WorkoutProvider = ({
  children,
}: WorkoutProviderProps) => {
  const [addWorkouts, setAddWorkouts] =
    useState<IWorkout[]>([]);

  const [savedWorkouts, setSavedWorkouts] =
    useState<IWorkout[]>([]);

  const [isLoaded, setIsLoaded] =
    useState<boolean>(false);

  // ========================================
  // LOAD FROM LOCAL STORAGE
  // ========================================

  useEffect(() => {
    try {
      const storedPlan =
        localStorage.getItem("fitlog-plan");

      const storedSaved =
        localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setAddWorkouts(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSavedWorkouts(JSON.parse(storedSaved));
      }
    } catch (error) {
      console.error(
        "Failed to load FitLog data:",
        error
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // ========================================
  // SAVE PLAN
  // ========================================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(addWorkouts)
    );
  }, [addWorkouts, isLoaded]);

  // ========================================
  // SAVE FOR LATER
  // ========================================

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isLoaded]);

  // ========================================
  // ADD TO PLAN
  // ========================================

  const addToPlan = (workout: IWorkout) => {
    setAddWorkouts((prev) => {
      const alreadyExists = prev.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  // ========================================
  // SAVE FOR LATER
  // ========================================

  const saveForLater = (workout: IWorkout) => {
    setSavedWorkouts((prev) => {
      const alreadyExists = prev.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, workout];
    });
  };

  // ========================================
  // REMOVE FROM TODAY'S PLAN
  // ========================================

  const removeFromPlan = (id: number) => {
    setAddWorkouts((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // ========================================
  // REMOVE FROM SAVED
  // ========================================

  const removeFromSaved = (id: number) => {
    setSavedWorkouts((prev) =>
      prev.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // ========================================
  // SAVED → TODAY'S PLAN
  // ========================================

  const moveToPlan = (id: number) => {
    const workout = savedWorkouts.find(
      (item) => item.id === id
    );

    if (!workout) return;

    setAddWorkouts((prev) => {
      const alreadyExists = prev.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, workout];
    });

    setSavedWorkouts((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        addWorkouts,
        setAddWorkouts,

        savedWorkouts,
        setSavedWorkouts,

        addToPlan,
        saveForLater,

        removeFromPlan,
        removeFromSaved,

        moveToPlan,

        isLoaded,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutProvider;