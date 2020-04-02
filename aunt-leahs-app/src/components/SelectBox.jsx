import React from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

const SelectBox = ({name, title, value, size, items, onSelectItem, isRequired, onBlur, hasError}) => {
  const length = "select-box-" + size.toLowerCase();

  return (
    <div className={`${length} select-input`}>
      <span className="select-box-label">
        {isRequired ? title + " *" : title}
      </span>
      <FormControl fullWidth={true}>
        <Select
          labelId="select-box-label"
          name={name}
          value={value || ""}
          onChange={onSelectItem}
          disableUnderline
          onBlur={onBlur}
          error={hasError}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map(item => (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

SelectBox.defaultProps = {
  title: "",
  size: "default",
  isRequired: false,
  onBlur: null,
  hasError: false
};

export default SelectBox;
