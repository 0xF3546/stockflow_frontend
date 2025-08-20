import { JSX, useContext, useMemo } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { authContext } from "./contexts/authContext";
import NotFoundPage from "./pages/NotFound";
import DashboardPage from "./pages/Dashboard";
import BaseLayout from "./layouts/BaseLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { IFunctionRoute } from "./types/IFunctionRoute";
import { RouteConfig } from "./types/RouteConfig";
import StockPage from "./pages/Stock";
import { MarketsPage } from "./components/markets-page";
import PortfolioPage from "./pages/Portfolio";
import AnalyticsPage from "./pages/Analytics";
import WatchlistPage from "./pages/Watchlist";
import NewsPage from "./pages/News";

interface AuthContextType {
  currentUser: { id: string } | null;
}

export const AppRoutes = {
  HOME: {
    path: "/",
    element: <DashboardPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  LOGIN: {
    path: "/login",
    element: <LoginPage />,
    auth: false,
    layout: <BaseLayout />,
  },
  REGISTER: {
    path: "/register",
    element: <RegisterPage />,
    auth: false,
    layout: <BaseLayout />,
  },
  STOCK: {
    path: "/stock/:symbol",
    element: <StockPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  MARKETS: {
    path: "/markets",
    element: <MarketsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  PORTFOLIO: {
    path: "/portfolio",
    element: <PortfolioPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  NEWS: {
    path: "/news",
    element: <NewsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  ANALYTICS: {
    path: "/analytics",
    element: <AnalyticsPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  WATCHLIST: {
    path: "/watchlist",
    element: <WatchlistPage />,
    auth: true,
    layout: <DashboardLayout />,
  },
  NOT_FOUND: {
    path: "*",
    element: <NotFoundPage />,
    auth: false,
    layout: <BaseLayout />,
  },
};

export default function AppRouter(): JSX.Element {
  const renderRoutes = useMemo((): JSX.Element[] => {
    const routesByLayout = new Map<JSX.Element, RouteConfig[]>();

    Object.values(AppRoutes).forEach(route => {
      const layout = route.layout ?? <></>;
      if (!routesByLayout.has(layout)) routesByLayout.set(layout, []);
      routesByLayout.get(layout)!.push(route);
    });

    return Array.from(routesByLayout.entries()).map(([layout, routes], i) => (
      <Route
        key={`layout-${i}`}
        element={
          routes.some(route => route.auth) ? (
            <AuthRoutes redirectTo="/login">
              {layout}
            </AuthRoutes>
          ) : (
            layout
          )
        }
      >
        {routes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    ));
  }, []);

  return (
    <BrowserRouter>
      <Routes>{renderRoutes}</Routes>
    </BrowserRouter>
  );
}

const AuthRoutes = ({ redirectTo = "/auth/login", children }: IFunctionRoute & { children?: React.ReactNode }) => {
  const { currentUser } = useContext(authContext) as AuthContextType;
  return currentUser ? <>{children ? children : <Outlet />}</> : <Navigate to={redirectTo} replace />;
};
