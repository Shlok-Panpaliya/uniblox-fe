/* eslint-disable max-len */
import React, { memo } from "react";

type Props = {
  id?: string;
  children: any;
  onClick?: any;
  type?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
  loading?: boolean;
  disabled?: boolean;
  greenDot?: boolean;
  appearance?: string;
  testid?: string;
};

// Different button styles can be added here
const appearances:any = {
  Primary:
    "flex active:scale-95 cursor-pointer text-sm transition ease-in-out duration-300 bg-[#5359ea] text-white font-semibold px-4 py-3 text-center items-center justify-center",
};

const Button = ({
  children,
  loading,
  onClick,
  width = "",
  height = "",
  id = "button",
  type = "button",
  rounded = false,
  greenDot = false,
  disabled = false,
  appearance = "Default",
  testid = "button",
}: Props) => {
  if (id) {
    return (
      <button
        data-testid={testid}
        id={id}
        disabled={loading || disabled}
        type={type === "button" ? "button" : "submit"}
        onClick={onClick}
        className={
          disabled
            ? " " +
              appearances[appearance] +
              " opacity-50 " +
              width +
              " " +
              height +
              ` relative ${rounded ? "rounded-full" : "rounded-lg"}`
            : " " +
              appearances[appearance] +
              " " +
              width +
              " " +
              height +
              ` relative ${rounded ? "rounded-full" : "rounded-lg"}`
        }
      >
        {loading && (
          <div className="w-4 h-4 rounded-full my-1 border-2 border-y-white border-l-white border-r-gray-400 animate-spin" />
        )}
        {!loading && (
          <div className="">
            {children}
            {greenDot && (
              <div className="bg-green-500 rounded-full w-3 h-3 border border-white absolute -top-1 -right-1" />
            )}
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      data-testid={testid}
      disabled={loading || disabled}
      type={type === "button" ? "button" : "submit"}
      onClick={onClick}
      className={
        disabled
          ? " " +
            appearances[appearance] +
            " opacity-50 " +
            width +
            " " +
            height +
            ` relative cursor-not-allowed ${rounded ? "rounded-full" : "rounded-lg"}`
          : " " +
            appearances[appearance] +
            " " +
            width +
            " " +
            height +
            ` relative ${rounded ? "rounded-full" : "rounded-lg"}`
      }
    >
      {loading && (
        <div className="w-4 h-4 rounded-full my-1 border-2 border-y-white border-l-white border-r-gray-400 animate-spin" />
      )}
      {!loading && (
        <div className="">
          {children}
          {greenDot && (
            <div className="bg-green-500 rounded-full w-3 h-3 border border-white absolute -top-1 -right-1" />
          )}
        </div>
      )}
    </button>
  );
};

export default memo(Button);
