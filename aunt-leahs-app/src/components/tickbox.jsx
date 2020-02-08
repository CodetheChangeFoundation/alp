import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import "../styles.css";

// Two different colors: primary (teal) and secondary (red)
// Comes with title (label) built in; can be sent in as React Component (e.g., Typography)
const Tickbox = ({ title, color, onChange, checked }) => {

  return (
    <div className={"checkbox"}>
      <FormControlLabel
        control={
          <Checkbox
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

export default Tickbox;
