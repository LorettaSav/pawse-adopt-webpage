import React from 'react';
import Box from "@mui/material/Box";
import { Slider } from "@mui/material";

const marks = [
  
  {
    value: 1,
    label: "Nope!",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "A lot!",
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}




export default function DiscreteSliderValues() {
  return (
    <Box sx={{ width: "30%" }}>
    <Slider
    color="secondary"
      aria-label="Restricted values"
      defaultValue={0}
      valueLabelFormat={valueLabelFormat}
      getAriaValueText={valuetext}
      step={null}
      valueLabelDisplay="auto"
      marks={marks}
      min={1}
      max={5}
    />
  </Box>

  )
}
