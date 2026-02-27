import React, { createContext, useContext, useState, useEffect } from "react";

interface ApiKeyContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyContext = createContext<ApiKeyContextType>({
  apiKey: "",
  setApiKey: () => {},
});

export function ApiKeyProvider({ children }: { children: React.ReactNode }) {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    return localStorage.getItem("openai_api_key") || "";
  });

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    localStorage.setItem("openai_api_key", key);
  };

  return (
    <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export function useApiKey() {
  return useContext(ApiKeyContext);
}
