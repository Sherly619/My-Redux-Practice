import React from "react";

export const Spinner = ({ text }: { text: string }) => {
  return (
    <div className="spinner">
      {text}
    </div>
  )
}