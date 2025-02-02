import { style } from "@vanilla-extract/css";
import { vars } from "../../App.css";

export const wrapper = style({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  zIndex: 10000,
});

export const modalWindow = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "800px",
  height: "max-content",
  maxHeight: "500px",
  overflowY: "auto",
  borderRadius: "14px",
  padding: 20,
  boxShadow: vars.shadow.basic,
  backgroundColor: vars.color.mainDarker,
  color: vars.color.brightText,
  opacity: 0.95,
});

export const header = style({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
  marginBottom: "40px",
});

export const title = style({
  fontSize: vars.fontSizing.T2,
  color: vars.color.brightText,
  marginRight: "auto",
  marginBottom: vars.spacing.medium,
});

export const closeButton = style({
  fontSize: vars.fontSizing.T2,
  marginTop: "-20px",
  cursor: "pointer",
  ":hover": {
    opacity: 0.8,
  },
});

export const body = style({
  maxHeight: "400px",
  overflowY: "auto",
  width: "100%",
});
