import { Snackbar } from "@/components/Snackbar";
import { ERROR_TEXTS } from "@/constants/errors/errorTexts";
import { SnackbarConfig, SnackbarContextType } from "@/models/Snackbar";
import React, { createContext, ReactNode, useState } from "react";

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

const SnackbarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarConfig | null>(
    null,
  );

  const showSnackbar = ({
    message,
    type = "success",
    duration = 3000,
  }: Partial<SnackbarConfig> = {}) => {
    setSnackbarConfig({ message, type, duration });

    setTimeout(() => {
      setSnackbarConfig(null);
    }, duration);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbarConfig && (
        <Snackbar
          message={snackbarConfig.message || ERROR_TEXTS.ALERT_REQUIRED_FIELD}
          visible={!!snackbarConfig}
          onDismiss={() => setSnackbarConfig(null)}
          duration={snackbarConfig.duration}
          type={snackbarConfig.type}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
