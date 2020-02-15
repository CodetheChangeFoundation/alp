import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

// Two different colors: primary (teal) and secondary (red)
// Comes with title (label) built in; can be sent in as React Component (e.g., Typography)
const TickBox = ({ id, title, color, onChange, checked }) => {

  return (
    <div className={"checkbox"}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            onChange={onChange}
            checked={checked}
            color={color}
          />
        }
        label={title}
      />
    </div>
  );
};

export default TickBox;
