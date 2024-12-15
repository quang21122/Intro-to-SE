import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { IoTrashOutline } from "react-icons/io5";
import ExerciseInputField from "./ExerciseInputFieldProps";

interface Exercise {
  id: string;
  interval: string;
  reps: string;
  restTime: string;
  sets: number;
}

interface ExerciseWithName extends Exercise {
  name?: string;
  muscleName?: string;
  image?: string;
}

type ExerciseField = "sets" | "reps" | "interval" | "restTime";

interface ExerciseCardProps {
  exercise: ExerciseWithName;
  index: number;
  dayId: string;
  onValueChange: (field: ExerciseField, value: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  index,
  dayId,
  onValueChange,
}) => {
  const [localValues, setLocalValues] = useState({
    sets: exercise.sets.toString(),
    reps: exercise.reps,
    interval: exercise.interval,
    restTime: exercise.restTime,
  });

  const handleLocalChange = (field: ExerciseField, value: string) => {
    setLocalValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (field: ExerciseField) => {
    onValueChange(field, localValues[field]);
  };

  return (
    <Draggable draggableId={`${dayId}-${exercise.id}-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex flex-col bg-[#D9D9D9] px-4 py-6 mt-6 mx-2 rounded-xl transition-colors ${
            snapshot.isDragging ? "bg-opacity-70 shadow-lg" : ""
          }`}
          style={{
            ...provided.draggableProps.style,
            top: "auto",
            left: "auto",
            right: "auto",
            bottom: "auto",
          }}
        >
          <div className="grid grid-cols-[1fr_3fr_1fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center">
            <img
              src={exercise.image}
              alt=""
              className="rounded-full w-20 h-20"
            />
            <div className="flex flex-col ml-5">
              <h2 className="text-[1.4rem] text-black ml-4">{exercise.name}</h2>
              <p className="text-xl text-[#686D76] ml-4">
                {exercise.muscleName}
              </p>
            </div>
            <ExerciseInputField
              label="Sets"
              value={localValues.sets}
              onChange={(value) => handleLocalChange("sets", value)}
              onBlur={() => handleBlur("sets")}
              type="number"
            />
            <ExerciseInputField
              label="Reps"
              value={localValues.reps}
              onChange={(value) => handleLocalChange("reps", value)}
              onBlur={() => handleBlur("reps")}
              width="w-32"
            />
            <ExerciseInputField
              label="Intervals"
              value={localValues.interval}
              onChange={(value) => handleLocalChange("interval", value)}
              onBlur={() => handleBlur("interval")}
            />
            <ExerciseInputField
              label="Rest time"
              value={localValues.restTime}
              onChange={(value) => handleLocalChange("restTime", value)}
              onBlur={() => handleBlur("restTime")}
            />
            <IoTrashOutline className="text-3xl ml-3 text-black cursor-pointer" />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ExerciseCard;
