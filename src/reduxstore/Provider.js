// Providers.js
'use client';
import { Provider } from "react-redux";
import { Store } from "../reduxstore/Store";

export function Providers({ children }) {
  return <Provider store={Store}>{children}</Provider>;
}