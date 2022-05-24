import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NProgress from "nprogress";
import { Helmet } from "react-helmet";

import PublicLayout from "./Public";
import AuthLayout from "./Auth";
import MainLayout from "./Main";
import { IRootState } from "../redux/reducers";

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  main: MainLayout,
};

let previousPath = "";

const Layout: React.FC<any> = function ({ history, children }) {
  const { location } = history;
  const { pathname, search } = location;
  // NProgress & ScrollTop management
  const currentPath = pathname + search;
  if (currentPath !== previousPath) {
    window.scrollTo(0, 0);
    NProgress.start();
  }

  setTimeout(() => {
    NProgress.done();
    previousPath = currentPath;
  }, 300);

  return (
    <>
      <Helmet titleTemplate="Top Gym " title="App" />
      <BootstappedLayout history={history} pathname={pathname}>
        {children}
      </BootstappedLayout>
    </>
  );
};

const BootstappedLayout: React.FC<{
  pathname: string;
  history: string;
  children: React.ReactNode;
}> = function BootstappedLayout({ pathname, children }: any) {
  const { /** user, */ authorized, /* ac, */ loading } = useSelector<
    IRootState,
    any
  >((state) => state.account);

  // Layout Rendering
  const getLayout = () => {
    if (["/", "/about", "/contact", "terms"].includes(pathname)) {
      return "public";
    }
    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return "auth";
    }
    return "main";
  };

  const Container = Layouts[getLayout()];
  const isUserAuthorized = authorized;
  // const isRoleLoaded = ac && ac.grants;
  const isUserLoading = loading.user;
  const isAuthLayout = getLayout() === "auth";

  // show loader when the user in check authorization processs, not authorized yet, role not loaded yet
  if (isUserLoading && !isUserAuthorized && !isAuthLayout) {
    return null;
  }

  // redirect to login page if current page is not login page and user is not authorized
  if (!isAuthLayout && !isUserAuthorized) {
    history.replaceState(null, "", "/auth/login");
  }

  return <Container>{children}</Container>;
};

export default Layout;
