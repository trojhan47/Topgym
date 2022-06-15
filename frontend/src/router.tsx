import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ConnectedRouter } from "connected-react-router";
// import { History } from "history";
// import { CSSTransition, SwitchTransition } from "react-transition-group";
// import { useSelector } from "react-redux";

import CustomRouter from "./CustomRouter";
import Layout from "./layouts";
import { history } from "./redux/store";
import ErrorBoundary from "./pages/ErrorBoundary";

const routes = [
	{
		path: "/",
		key: "/landing",
		Component: lazy(() => import("./pages/Landing")),
	},
	{
		path: "/dashboard",
		key: "/dashboard",
		Component: lazy(() => import("./pages/Dashboard")),
	},
	{
		path: "/auth/signup",
		key: "/signup",
		Component: lazy(() => import("./pages/SignUp")),
	},
	{
		path: "/auth/login",
		key: "/login",
		Component: lazy(() => import("./pages/Login")),
	},
	{
		path: "/about",
		key: "/about",
		Component: lazy(() => import("./pages/About")),
	},
	{
		path: "/contact",
		key: "/contact",
		Component: lazy(() => import("./pages/Contact")),
	},
	{
		path: "/auth/subscription",
		key: "/subscription",
		Component: lazy(() => import("./pages/Subscription")),
	},
	{
		path: "/auth/passwordRequest",
		key: "/passwordRequest",
		Component: lazy(() => import("./pages/Password/passwordRequest")),
	},
	{
		path: "/auth/passwordReset",
		key: "/passwordReset",
		Component: lazy(() => import("./pages/Password/passwordReset")),
	},
	{
		path: "/error404",
		key: "/error404",
		Component: lazy(() => import("./pages/Error/error404")),
	},
	{
		path: "/error500",
		key: "/error500",
		Component: lazy(() => import("./pages/Error/error500")),
	},
	{
		path: "/profile",
		key: "/profile",
		Component: lazy(() => import("./pages/User/profile")),
	},
	{
		path: "/settings",
		key: "/settings",
		Component: lazy(() => import("./pages/User/settings")),
	},
	{
		path: "/paymentHistory",
		key: "/paymentHistory",
		Component: lazy(() => import("./pages/Payment")),
	},
	{
		path: "/terms",
		key: "/terms",
		Component: lazy(() => import("./pages/Terms")),
	},
];

function Router() {
	return (
		<CustomRouter history={history}>
			<Layout history={history}>
				<Routes>
					{routes.map((route, i) => (
						<Route
							key={route.key}
							path={route.path}
							element={
								<Suspense>
									<ErrorBoundary>
										<route.Component />
									</ErrorBoundary>
								</Suspense>
							}
						/>
					))}
					<Route path="*" element={<Navigate to="/error404" replace />} />
				</Routes>
			</Layout>
		</CustomRouter>
	);
}

export default Router;
