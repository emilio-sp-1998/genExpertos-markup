import React from "react";

export default function PillChecked({ color, content }) {
  return (
    <span
      className={`block items-center  px-2 py-1 text-xs font-medium text-${color}-700`}
    >
      {content}
    </span>
  );
}
