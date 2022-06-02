import React , { useState } /* , { useReducer, FC } */ from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { DesktopOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  BankOutlined ,
  UserOutlined,
  SettingOutlined, } from '@ant-design/icons';
import type { MenuProps } from 'antd';



import classNames from "classnames";
import style from "./style.module.scss";

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '1', <AppstoreOutlined />),
  getItem('Payment History', '2', <CreditCardOutlined />),
  getItem('Subscription', '3', <BankOutlined />),
  getItem('Profile', '4', <UserOutlined />), 
  getItem('Settings', '5', <SettingOutlined />),
];



type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
      <div className={style.logo}>
        <img
          src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
          className=" m-3"
          alt="top-gym-main"
          width={50}
        />
        <div className={style.logoText}>TopGym</div>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>


      <Layout.Content>
        <div
          className={classNames(`${style.container}`)}
          style={{
            backgroundImage: `${process.env.PUBLIC_URL}/resources/images/Vector.svg`,
          }}
        >
       

          <div>{children}</div>
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default MainLayout;
