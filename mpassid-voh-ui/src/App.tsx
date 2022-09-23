import IntlProvider from "@/components/IntlProvider";
import Routes from "@/routes";
import MUIThemeProvider from "@/utils/mui-theme/ThemeProvider";
import createTheme from "@opetushallitus/virkailija-ui-components/createTheme";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MUIThemeProvider>
        <Suspense>
          <IntlProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <BrowserRouter basename={(ENV.PROD && ENV.BASENAME) || undefined}>
                <Routes />
              </BrowserRouter>
            </ErrorBoundary>
          </IntlProvider>
        </Suspense>
      </MUIThemeProvider>
    </ThemeProvider>
  );
}

const ErrorFallback = () => null;
