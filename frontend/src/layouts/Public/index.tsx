import React, { useState } from "react";
import MediaQuery, { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { Row, Col, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { MenuUnfoldOutlined, MacCommandFilled } from "@ant-design/icons";

import style from "./style.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	children?: MenuItem[],
	icon?: React.ReactNode,
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem(<MenuUnfoldOutlined />, "sub1", [
		getItem("Booking", "1"),
		getItem("About", "2"),
		getItem("Centers", "3"),
		getItem("Sign up", "4"),
	]),
];

type PublicLayoutProps = {
	children: JSX.Element;
	history: any;
};

function PublicLayout({ children, history }: PublicLayoutProps) {
	const [current, setCurrent] = useState("1");

	// const isMobile = useMediaQuery{{ maxWidth : 768}}

	const onClick: MenuProps["onClick"] = (e) => {
		// console.log("click ", e);
		setCurrent(e.key);
	};

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
						<Col lg={8} xs={20} className={style.logo}>
							<img
								src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
								className="mr-2 "
								alt="top-gym-public"
								width={40}
							/>
							<div className={style.logoText}>TopGym</div>
						</Col>
						<Col
							lg={16}
							xs={4}
							style={{
								display: "flex",
								justifyContent: "end",
							}}
						>
							<MediaQuery minWidth={768}>
								<Menu
									style={{
										width: 400,
										border: "unset",
									}}
									mode="horizontal"
									// defaultSelectedKeys={["item4"]}
								>
									<Menu.Item key="item1">Booking</Menu.Item>
									<Menu.Item key="item2" onClick={() => history.push("/about")}>
										About
									</Menu.Item>
									<Menu.Item key="item3">Centers</Menu.Item>
									<Menu.Item className={style.button} key="item4">
										Sign up
									</Menu.Item>
								</Menu>
							</MediaQuery>

							<MediaQuery maxWidth={768}>
								<Menu
									className={style.dropDown}
									onClick={onClick}
									style={{ width: 256 }}
									selectedKeys={[current]}
									mode="inline"
									items={items}
									triggerSubMenuAction="click"
									inlineCollapsed
								/>
							</MediaQuery>
						</Col>
					</Row>

					<div className={style.containerInner}>{children}</div>
				</div>
			</Layout.Content>
		</Layout>
	);
}

export default PublicLayout;
