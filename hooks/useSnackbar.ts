import { SnackbarContext } from "@/context/SnackbarProvider";
import { SnackbarContextType } from "@/models/Snackbar";
import { useContext } from "react";

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
