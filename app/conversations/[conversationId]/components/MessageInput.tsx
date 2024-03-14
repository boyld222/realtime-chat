"use client";

import { FunctionComponent } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  errors: FieldErrors;
}

const MessageInput: FunctionComponent<MessageInputProps> = ({
  placeholder,
  id,
  type,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;