import React from "react";
import { Button, Row, Col } from "antd";
// import icon from "./public/resources/images/friends-workout.jpg";

import style from "./style.module.scss";

const index = () => (
  <Row style={{ justifyContent: "center", color: "black" }}>
    <Col lg={15} xs={20} className="mt-5">
      <h2 className={style.heading}>Our Story</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
    </Col>

    <Col lg={15} xs={20} className="mt-5">
      <h2 className={style.heading}>Our Team</h2>
      <div className="d-flex justify-content-center">
        <div className={style.imageItems}>
          <img
            src={`${process.env.PUBLIC_URL}/resources/images/johnDoe.jpg`}
            alt="group"
            width={70}
            height={70}
            className={style.img}
          />
          <h4 className={style.subText}> Director </h4>
          <p> John Doe </p>
        </div>
        <div className={style.imageItems}>
          <img
            src={`${process.env.PUBLIC_URL}/resources/images/johnDoe.jpg`}
            alt="group"
            width={70}
            height={70}
            className={style.img}
          />
          <h4 className={style.subText}> Director </h4>
          <p> John Doe </p>
        </div>
        <div className={style.imageItems}>
          <img
            src={`${process.env.PUBLIC_URL}/resources/images/johnDoe.jpg`}
            alt="group"
            width={70}
            height={70}
            className={style.img}
          />
          <h4 className={style.subText}> Director </h4>
          <p> John Doe </p>
        </div>
        <div className={style.imageItems}>
          <img
            src={`${process.env.PUBLIC_URL}/resources/images/johnDoe.jpg`}
            alt="group"
            width={70}
            height={70}
            className={style.img}
          />
          <h4 className={style.subText}> Director </h4>
          <p> John Doe </p>
        </div>
      </div>
    </Col>

    <Col lg={15} xs={20} className="mt-5">
      <h2 className={style.heading}>Our Values</h2>
      <p className={style.p}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
    </Col>

    <Col lg={15} xs={20} className="mt-5">
      <h2 className={style.heading}> Our Culture </h2>
      <p className={style.p}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
        ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
        Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
        odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse dictum
        dui nec fermentum auctor. Fusce euismod rhoncus rhoncus. Suspendisse
        eleifend consequat
      </p>
    </Col>
    <Col lg={15} xs={20} className="mt-4 p-4 text-center">
      <Button
        type="primary"
        htmlType="submit"
        className="px-5"
        style={{ padding: "10px", height: "40px" }}
      >
        Get in Touch
      </Button>
    </Col>
  </Row>
);

export default index;
