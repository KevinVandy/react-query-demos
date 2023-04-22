import { AppRoutes } from "./AppRoutes";
import { AppProviders } from "./AppProviders";

export const App = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
};
