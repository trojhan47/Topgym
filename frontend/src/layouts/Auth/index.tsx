import React from "react";
import { Layout } from "antd";
import classNames from "classnames";
import style from "./style.module.scss";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Layout>
      <Layout.Content>
        <div
          className={classNames(`${style.container}`)}
          style={{
            backgroundImage: `${process.env.PUBLIC_URL}/resources/images/logo.png`,
          }}
        >
          <div className={classNames(`${style.topbar}`)}>
            <div className={style.logoContainer}>
              <div className={style.logo}>
                <img
                  src={`${process.env.PUBLIC_URL}/resources/images/logo.png`}
                  className="mr-2"
                  alt="top-gym-auth"
                  width={150}
                />
              </div>
            </div>
          </div>

          <div className={style.containerInner}>{children}</div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default AuthLayout;
