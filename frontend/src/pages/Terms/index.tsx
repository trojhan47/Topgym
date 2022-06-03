import React from "react";
import { Button } from "antd";

import style from './style.module.scss';


const index = () => (
<div className={style.container}>
    
    <div className={style.paragraph}>
        <h1 className={style.header}>TERMS AND CONDITONS</h1>
        <img
            src={`${process.env.PUBLIC_URL}/resources/images/terms-prv.png`}
            alt="group"
            width={300}
            height={300}
            // className={style.img}
          />

        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
        </p>
    </div>

    <div className={style.paragraph}>
        <h3>Privacy Obligations</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
        </p>
    </div>

    <div className={style.paragraph}>
        <h3>Personal Information</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
        </p>
    </div>

    <div className={style.paragraph}>
        <h3>Website, Digital & Online Privacy</h3>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil, 
            vel recusandae in autem obcaecati excepturi, accusamus iure eos repellendus
            dolores nostrum quae enim quibusdam at cupiditate delectus sit. Distinctio.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ex sunt,
            dolores atque at sapiente cumque facere quae dignissimos ipsum nisi minus 
            dolorem deleniti molestias cum eius vero optio? Sequi ut, expedita sapiente 
            veniam deleniti, qui distinctio libero recusandae aperiam eveniet velit 
            itaque sint et, adipisci ducimus. Alias, veniam itaque!
        </p>
    </div>

    <div className={style.btn}>
        <Button className={style.btn1}> Not Now</Button>
        
        <Button className={style.btn2}> Accept </Button>
    </div>
</div>


);

 export default index;
