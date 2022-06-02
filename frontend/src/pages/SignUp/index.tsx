import React from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, Button, Row, Col } from "antd";

import style from './style.module.scss';


const index = () => (
    <Row> 
    {/*     <Col span={12}>
            <img
            className={style.image}
            alt="subBackground"
            width={400}
            src={`${process.env.PUBLIC_URL}/resources/images/signup.png`}
            />
        
        </Col> */}

        {/* <Col span={12}>
            <Form
            name="nest-messages"

            validateMessages={validateMessage}
            wrapperCol={{ span: 16 }}
            >
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                name="firstName"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                <Input placeholder="First name" />
                </Form.Item>
                <Form.Item
                name="lastName"
                rules={[{ required: true }]}
                style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                }}
                >
                <Input placeholder="Last name" />
                </Form.Item>
            </Form.Item>
            <Form.Item
                name={["user", "phoneNumber"]}
                rules={[{ required: true, type: "number" }]}
            >
                <Input placeholder="phone number" />
            </Form.Item>
            <Form.Item name={["user", "email"]} rules={[{ type: "email" }]}>
                <Input placeholder="email address" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                name="password"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                <Input.Password
                    placeholder="password"
                    // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true }]}
                style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                }}
                >
                <Input placeholder="confirm" />
                </Form.Item>
            </Form.Item>
            </Form>

        </Col> */}
        
    </Row>
);

const validateMessage = {
  required: "${placeholder} is required",
  types: {
    email: "${placeholder} is not a valid email!",
    number: "${placeholder} is not a valid number!",
  },
};

function InputForm() {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessage}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="firstName"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="Last name" />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={["user", "phoneNumber"]}
        rules={[{ required: true, type: "number" }]}
      >
        <Input placeholder="phone number" />
      </Form.Item>
      <Form.Item name={["user", "email"]} rules={[{ type: "email" }]}>
        <Input placeholder="email address" />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input.Password
            placeholder="password"
            // iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
            margin: "0 8px",
          }}
        >
          <Input placeholder="confirm" />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};
export default index;

