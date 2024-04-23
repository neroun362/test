import { Typography } from "@mui/material";

export const Toast = (description) => {
  console.log("123");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "auto",
      }}
    >
      <Typography
        variant="body2"
        style={{
          marginLeft: "10px",
          whiteSpace: "break-spaces",
          fontWeight: "normal",
        }}
      >
        {description}
      </Typography>
    </div>
  );
};
