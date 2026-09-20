import React from "react";
import { TelegramButton } from "./TelegramButton";

// Backward-compatible export redirecting to TelegramButton
export const WhatsAppButton: React.FC = () => {
  return <TelegramButton />;
};
