import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Row,
  Col,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MobileFilled,
  EnvironmentFilled,
  MailFilled,
} from "@ant-design/icons";

import contactUs from "../../services/api/public";
import style from "./style.module.scss";

const { TextArea } = Input;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Index = () => {
  const [messageCredential, setMessageCredential] = useState({
    name: "",
    email: "",
    phone: 0,
    message: "",
  });

  const handleInput = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setMessageCredential({ ...messageCredential, [name]: value });
  };

  const handleNumberInput = (number: number) => {
    setMessageCredential({ ...messageCredential, phone: number });
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    let res;
    try {
      res = await contactUs({
        name: messageCredential.name,
        email: messageCredential.email,
        telephone: `${messageCredential.phone}`,
        message: messageCredential.message,
      });
    } catch (error) {
      setIsLoading(false);
      notification.warning({
        message: "your message could not be delivered",
      });
    }
    setIsLoading(false);

    if (res) {
      notification.success({
        message: "you have successfully submitted your message",
      });
      console.log("Success:", res);
    }
  };

  return (
    <div className="text-black">
      <div className={style.section1}>
        <h2>Get in Touch!</h2>
        <p>Contact us, help us serve you better</p>
      </div>
      <Row className="align-items-center vw-100 ">
        <Col xs={24} lg={24} className="d-flex justify-content-center">
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
                  name="name"
                  onChange={handleInput}
                  // value="name"
                  prefix={
                    <UserOutlined
                      style={{ fontSize: "25px", padding: "8px" }}
                    />
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
                  name="email"
                  onChange={handleInput}
                  prefix={
                    <MailOutlined
                      style={{ fontSize: "25px", padding: "8px" }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name={["user", "phoneNumber"]}
                rules={[
                  {
                    required: true,

                    message: "enter your mobile number!",
                  },
                ]}
              >
                <InputNumber
                  // size="large"
                  style={{ width: "100%" }}
                  placeholder="Enter your Phone Number"
                  type="number"
                  name="phone"
                  onChange={handleNumberInput}
                  // onChange={handleInput}
                  prefix={
                    <PhoneOutlined
                      style={{ fontSize: "25px", padding: "8px" }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input your Message!" },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="enter your Message"
                  name="message"
                  onChange={handleInput}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }} className="text-center">
                <Button
                  loading={isLoading}
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
        </Col>
        {/* <Col xs={0} lg={12} className="d-flex justify-content-center">
          <div className="">
            <MobileFilled style={{ fontSize: "40px" }} />
            <EnvironmentFilled
              style={{ fontSize: "40px", marginTop: "25px" }}
            />
            <MailFilled style={{ fontSize: "40px", marginTop: "25px" }} />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default Index;
