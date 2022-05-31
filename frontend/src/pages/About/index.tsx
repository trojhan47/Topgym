import React from "react";
import { Button } from "antd";
// import icon from "./public/resources/images/friends-workout.jpg";

import style from "./style.module.scss";

const index = () => (
  <div className={style.container}>
    <div className={style.section1}>
      <h2 className={style.heading}>Our Story</h2>
      <div className={style.pContainer}>
        <p className={style.p}>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>

        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>
      </div>
    </div>
    <div className={style.section2}>
      <h2 className={style.heading}>Our Team</h2>
      <div className={style.images}>
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
    </div>
    <div className={style.section2}>
      <h2 className={style.heading}>Our Values</h2>
      <div className={style.pContainer}>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>

        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>
      </div>
    </div>
    <div className={style.section2}>
      <h2 className={style.heading}> Our Culture </h2>
      <div className={style.pContainer}>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>

        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eu orci
          ligula. Donec efficitur ligula ligula, ut semper magna interdum vel.
          Donec quis lacus et odio mollis porttitor vel sit amet magna. Nullam
          odio orci, tempus vitae mollis id, rhoncus vel lacus. Suspendisse
          dictum dui nec fermentum auctor. Fusce euismod rhoncus rhoncus.
          Suspendisse eleifend consequat{" "}
        </p>
      </div>
    </div>
    <Button
      type="primary"
      htmlType="submit"
      className={style.Button}
      style={{ padding: "10px", height: "40px" }}
    >
      Get in Touch
    </Button>
  </div>
);

export default index;
