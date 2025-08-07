import { FC, Fragment } from 'react';
import { cls_join } from '@/functions/cls_join.func';
// style
import classes from '@/styles/primary/header.module.css';

interface IComp {
  txtShadow: string;
  txtList: string[];
  image: string;
  href?: string;
  leftHanlder: () => void;
  rightHanlder: () => void;
}

export const HeaderItem: FC<IComp> = ({
  txtShadow, txtList, image, leftHanlder, rightHanlder, href
}) => {

  const txtRender = () => {

    return (
      <div className={classes.txt_content}>

        <h2 className={classes.txt}>
          <span className={cls_join([classes.txt_shadow, classes.txt_span])}>
            {txtShadow}
          </span>
        </h2>

        {
          txtList.map((el, idx) => (
            <h2 className={classes.txt} key={idx}>
              <span className={classes.txt_span}>
                {el}
              </span>
            </h2>
          ))
        }

      </div>
    )
  }

  return (
    // <div  className={classes.item_root}>
    <Fragment>

      {/* ============================= text ============================= */}
      <div className={classes.txtContainer}>

        <div className={classes.txt_bg_color}>
        </div>

        <div className={classes.txt_bg_img}
          style={{
            backgroundImage: `url(${image})`
          }}
        >
        </div>

        {txtRender()}


      </div>

      {/* ============================= image ============================= */}
      <div className={classes.img_container}>

        <div className={classes.img_bg}
          style={{
            backgroundImage: `url(${image})`
          }}
        >
        </div>

      </div>

    </Fragment>
  )

};