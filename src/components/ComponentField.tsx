import { memo } from "react";

export interface ComponentFieldProps {
  name: string;
  type: string;
  label: string;
  value: string | boolean;
  error: string;
  touched: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ComponentField = memo(({ 
  name, 
  type, 
  label, 
  value, 
  error, 
  touched, 
  onBlur, 
  onChange 
}: ComponentFieldProps) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label}:
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
    </label>
    {touched && error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
));

ComponentField.displayName = "ComponentField";