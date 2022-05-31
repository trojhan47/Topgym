import React /* , { useReducer, FC }  */ from "react";
import classNames from "classnames";
import { Row, Col, Layout, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ResponsiveAntMenu from "responsive-ant-menu";

import style from "./style.module.scss";

type PublicLayoutProps = {
  children: JSX.Element;
};
const dropDown = DownOutlined;

const { SubMenu } = Menu;

function PublicLayout({ children }: PublicLayoutProps) {
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
            <Col span={8} className={style.logo}>
              <img
                src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
                className="mr-2 "
                alt="top-gym-public"
                width={40}
              />
              <div className={style.logoText}>TopGym</div>
            </Col>
            <Col span={16} className={style.navCol}>
              <Menu mode="horizontal" defaultSelectedKeys={["item4"]}>
                <Menu.Item key="item1">Booking</Menu.Item>
                {/* <Menu.Item key="item2">About</Menu.Item>
                <Menu.Item key="item3">Centers</Menu.Item>
                <Menu.Item key="item4" className={style.button}>Sign in</Menu.Item>  */}
                <SubMenu key="item2" icon={<DownOutlined />}>
                  <Menu.Item key="item3">About</Menu.Item>
                  <Menu.Item key="item4">Centers</Menu.Item>
                  <Menu.Item key="item5">Sign in</Menu.Item>
                </SubMenu>
              </Menu>

              {/* <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={new Array(4).fill(null).map((_, index) => {
                  const key = index + 1;
                  return {
                    key,
                    label: `Booking ${key}`,
                  };
                })}
              /> */}
              {/* <ul className={style.listItems}>
                <li>Booking</li>
                <li>About</li>
                <li>Center</li>
                <li className={style.button}>Sign in</li>
              </ul> */}
            </Col>
          </Row>

          <div className={style.containerInner}>{children}</div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default PublicLayout;
