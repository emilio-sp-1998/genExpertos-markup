import React from "react";

export default function BadgePill({ color, content }) {
  return (
    <span
      className={`block items-center rounded-md bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-700`}
    >
      {content}
    </span>
  );
}
