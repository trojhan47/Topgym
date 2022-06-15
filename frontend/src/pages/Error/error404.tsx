import React from "react";
import { Button } from "antd";

import style from "./style.module.scss";

const index = () => (
  <div className="mt-5 text-black text-center">
    <div>
      <h1 className={style.header}> 404 </h1>
      <p>Page Not Found!</p>
    </div>
    <div>
      <img
        src={`${process.env.PUBLIC_URL}/resources/images/error404.png`}
        alt="group"
        width={350}
        className={style.img}
      />
    </div>
    <div className={style.pHeader}>
      <p>We are sorry, the page you requested can not be found</p>
      <p>Please go to the Homepage</p>
    </div>
    <div>
      <Button
        type="primary"
        htmlType="submit"
        className="px-5 mt-3"
        style={{ padding: "10px", height: "40px" }}
      >
        GO HOME
      </Button>
    </div>
  </div>
);

export default index;
