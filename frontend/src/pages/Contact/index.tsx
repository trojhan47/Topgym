import React from "react";
import { Form, Input, Button, Space } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MobileFilled,
  EnvironmentFilled,
  MailFilled,
  ContactsFilled,
} from "@ant-design/icons";

import style from "./style.module.scss";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const index = () => (
  <div className="text-black">
    <div className={style.section1}>
      <h2>Get in Touch!</h2>
      <p>Contact us, help us serve you better</p>
    </div>
    <div className={style.gridContainer}>
      <div className={style.formContainer}>
        <Form
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Space direction="vertical" size="middle">
            <Form.Item
              style={{ width: "400px" }}
              name="username"
              rules={[
                { required: true, message: "Please input your Full Name!" },
              ]}
            >
              <Input
                placeholder="Enter your Full Name"
                prefix={
                  <UserOutlined style={{ fontSize: "25px", padding: "8px" }} />
                }
              />
            </Form.Item>

            <Form.Item
              name={["user", "email"]}
              rules={[
                {
                  required: true,
                  type: "email",
                  message: " a valid email is required",
                },
              ]}
            >
              <Input
                placeholder="Enter your Email Address"
                prefix={
                  <MailOutlined style={{ fontSize: "25px", padding: "8px" }} />
                }
              />
            </Form.Item>

            <Form.Item
              name={["user", "phoneNumber"]}
              rules={[
                {
                  required: true,
                  type: "number",
                  message: "enter your mobile number!",
                },
              ]}
            >
              <Input
                placeholder="Enter your Phone Number"
                prefix={
                  <PhoneOutlined style={{ fontSize: "25px", padding: "8px" }} />
                }
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Message!" },
              ]}
            >
              <Input
                placeholder="Your Message"
                prefix={
                  <ContactsFilled
                    style={{ fontSize: "25px", padding: "8px" }}
                  />
                }
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={style.Button}
                style={{ padding: "10px", height: "40px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
      <div className={style.iconContainer}>
        <MobileFilled style={{ fontSize: "40px" }} />
        <EnvironmentFilled style={{ fontSize: "40px", marginTop: "25px" }} />
        <MailFilled style={{ fontSize: "40px", marginTop: "25px" }} />
      </div>
    </div>
  </div>
);

export default index;
