import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import React, { useState } from "react";

export default function EditForm({
  index,
  name,
  value,
  setValue,
  options,
	status,
	styles
}) {
  const [isLabel, setIsLabel] = useState(false);

  const handleOnChange = (e) => {
    setValue(index, e.target.value);
	};
	
	const handleClick = () => {
		if (value === "0" || value === "4") return;
		setIsLabel(true);
	}

  return (
    <div>
      {!isLabel ? (
				<div onDoubleClick={handleClick} >
					<Tooltip title="You are not allow to change once the order has been canceled or delivered" arrow>
						<p style={styles}>{status}</p>
					</Tooltip>
				</div>
      ) : (
        <FormControl margin="normal" variant="outlined" size="small">
          <Select
            defaultValue={value}
            value={value}
            name={name}
            onChange={handleOnChange}
            onBlur={() => setIsLabel(false)}
            style={{ width: 180 }}
          >
            {options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
