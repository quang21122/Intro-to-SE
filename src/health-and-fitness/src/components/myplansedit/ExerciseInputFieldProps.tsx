import React from "react";

interface ExerciseInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: string;
  width?: string;
}

const ExerciseInputField: React.FC<ExerciseInputFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  width = "w-16",
}) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl text-[#686D76]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${width} py-1 text-xl text-black text-center bg-[#CDCDCD] rounded-xl`}
      />
    </div>
  );
};

export default ExerciseInputField;
