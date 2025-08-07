import { FC } from 'react';
import { Button } from './button';
import { cls_join } from '@/functions/cls_join.func';
import { Icon_Arrow_Left } from '@/components/icons/arrow_left';
import { Icon_Arrow_Right } from '@/components/icons/arrow_right';
import classes from '@/styles/shared/button/button_slider.module.css';

interface IComp {
  clsName: string;
  leftHanlder: () => void;
  rightHanlder: () => void;
  combo?: 'black'| 'red'
}

export const ButtonSlider: FC<IComp> = ({ clsName, leftHanlder, rightHanlder, combo }) => {

  let cls_btn_left = classes.slider_btn_left_default;
  let cls_btn_right = classes.slider_btn_right_default;
  let cls_btn_left_svg = classes.slider_btn_left_default_svg;
  let cls_btn_right_svg = classes.slider_btn_right_default_svg;

  if (combo === 'red') {
    cls_btn_left = classes.slider_btn_left_red;
    cls_btn_right = classes.slider_btn_right_red;
    cls_btn_left_svg = classes.slider_btn_left_red_svg;
    cls_btn_right_svg = classes.slider_btn_right_red_svg;
  }

  return (
    <div className={cls_join([classes.btn_list, clsName])} >

      <Button onClick={leftHanlder}
        clsName={cls_btn_left}
        Sx={{ width: '4.5rem', height: '4.5rem', borderRadius: '50%', padding: '1rem' }}
      >
        <Icon_Arrow_Left scale={0.7} clsName={cls_btn_left_svg} />

      </Button>

      <Button onClick={rightHanlder}
        clsName={cls_btn_right}
        Sx={{ width: '6rem', height: '6rem', borderRadius: '50%', padding: '1rem' }}
      >
        <Icon_Arrow_Right clsName={cls_btn_right_svg} fill="var(--color_white)" />

      </Button>

    </div>
  )

};