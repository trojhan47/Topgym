import React from "react";
import { Form, Select, Button, Space, Row, Col } from "antd";

import style from "./style.module.scss";

const { Option } = Select;

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const index = () => (
  <Row className="vh-100">
    <Col xs={0} lg={12} className="h-100 w-100">
      <div className="d-flex h-100">
        <img
          style={{
            backgroundImage: `${process.env.PUBLIC_URL}/resources/images/couple_workout.png`,
          }}
          alt="subBackground"
          className="img-fluid"
          src={`${process.env.PUBLIC_URL}/resources/images/couple_workout.png`}
        />
      </div>
    </Col>
    <Col
      xs={24}
      lg={12}
      className="d-flex flex-column align-items-center text-center "
    >
      <div className="d-flex justify-contents-center align-items-center p-5 mt-5">
        <img
          src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
          alt="topgymIcon"
          className="img-fluid"
          width={40}
        />
        <h2 className="h4">TopGym</h2>
      </div>
      <div className="h2 text-black">
        <h2 className="h3 p-3">
          Subscribe to any of our plans, to enjoy our amazing Features
        </h2>
      </div>
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
            rules={[
              { required: true, message: "please pick an account type!" },
            ]}
          >
            <Select
              defaultValue="Choose an account type"
              style={{ width: 300 }}
              onChange={handleChange}
            >
              <Option value="single">Single</Option>
              <Option value="couple">Couple</Option>
              <Option value="family">Family</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "please choose a plan!" }]}
            style={{ height: 120, padding: 5 }}
          >
            <Select
              defaultValue="Choose your subscription plan"
              style={{ width: 300 }}
              onChange={handleChange}
            >
              <Option value="monthly">1 Month</Option>
              <Option value="quaterly">6 Months</Option>
              <Option value="yearly">12 Months</Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            className={style.Button}
            style={{ padding: "10px", height: "40px" }}
          >
            Proceed to payment
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>

  //   <Col xs={24} lg={12}>
  //     <div className="d-flex justify-content-center">
  //       <img
  //         src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
  //         alt="topgymIcon"
  //         className="img-fluid mw-100 h-auto"
  //       />
  //       <h2 className={style.header}>TopGym</h2>
  //     </div>
  //   </Col>
  //   <Col xs={24} sm={24} md={24} lg={12} className={style.formContainer}>
  //     <div className={style.flex}>
  //       <img
  //         src={`${process.env.PUBLIC_URL}/resources/images/Vector.svg`}
  //         alt="topgymIcon"
  //         width={40}
  //       />
  //       <h2 className={style.header}>TopGym</h2>
  //     </div>

  //

  //
  //   </Col>
  // </Row>
);

export default index;
