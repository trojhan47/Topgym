import React from "react";
import classNames from "classnames";
import { Layout, Row, Col } from "antd";

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
            backgroundImage: `${process.env.PUBLIC_URL}/resources/images/Vector.svg`,
          }}
        >
          <Row className={`${style["p-header"]} w-100`}>
            <Col className={style.logo}>
              <img
                src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
                className="mr-2 "
                alt="top-gym-public"
                width={40}
              />
              <div className={style.logoText}>TopGym</div>
            </Col>
          </Row>

          <div className={style.containerInner}>{children}</div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default AuthLayout;
