import { styled } from "@mui/material/styles";
import { colors } from "utils";

export const SidebarContainer = styled("div")<{ showSidebar: boolean }>(
  ({ theme, showSidebar }) => ({
    position: "fixed",
    background: colors.colorWhite,
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    zIndex: 100,
    right: 0,
    top: 0,
    bottom: 0,
    width: "440px",
    minHeight: "100%",
    transform: showSidebar ? "translateX(0)" : "translateX(100%)",
    opacity: showSidebar ? "1" : "0",
    transitionProperty:
      "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms",
    padding: "30px 35px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "15px",
    },
    "&::-webkit-scrollbar-track": {
      background: colors.colorWhite,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: colors.gray,
      borderRadius: "10px",
    },
  })
);
