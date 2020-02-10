import React from "react";
import {
  Checkbox,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";
import "../styles.css";

const useStyles = makeStyles({
  root: {
    color: "#00A19B", // If unspecified, default color is primary
    "&$checked": {
      color: "#00A19B"
    }
  },

  colorPrimary: {
    "&$checked": {
      color: "#00A19B",
      "&:hover": {
        backgroundColor: "transparent",
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    "&:hover": {
      backgroundColor: "transparent",
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  },

  colorSecondary: {
    //"#7B303E"
    "&$checked": {
      color: "#7B303E",
      "&:hover": {
        backgroundColor: "transparent",
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    color: "#7B303E",
    "&:hover": {
      backgroundColor: "transparent",
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }
  },

  checked: {} // Needed to overwrite default behaviour of checked
});


// Two different colors: primary (teal) and secondary (red)
// Comes with title (label) built in; can be sent in as React Component (e.g., Typography)
const TickBox = ({ id, title, color, onChange, checked }) => {
  const classes = useStyles();

  return (
    <div className={"checkbox"}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            onChange={onChange}
            checked={checked}
            color={color}
            classes={{
              root: classes.root,
              colorPrimary: classes.colorPrimary,
              colorSecondary: classes.colorSecondary,
              checked: classes.checked
            }}
          />
        }
        label={title}
      />
    </div>
  );
};

export default TickBox;
