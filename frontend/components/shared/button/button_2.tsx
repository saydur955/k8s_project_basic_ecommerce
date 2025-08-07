import { CSSProperties, FC, ReactNode } from 'react';
import { cls_join } from '@/functions/cls_join.func';
import classes from '@/styles/shared/button/button_2.module.css';

type btnVariant = 'contained'| 'outlined'| 'text';
type TbtnSize = 'large'| 'medium'| 'small';

interface IComp {
  children: ReactNode;
  variant?: btnVariant;
  bgColor?: string;
  color?: string;
  Sx?: CSSProperties;
  iconButton?: boolean;
  onClick?: () => void;
  size?: TbtnSize;
  clsName?: string;
}

export const ButtonSecond: FC<IComp> = ({
  children, variant, Sx, bgColor, color, iconButton, onClick, size, clsName
}) => {

  const btnSize: TbtnSize = size || 'medium';

  let additionalStyle: CSSProperties = {
    ...(color && { color }),
    ...(bgColor && { backgroundColor: bgColor }),
    ...(bgColor && { borderColor: bgColor }),
    ...( (variant === 'outlined' || variant === 'text') && 
      { backgroundColor: 'transparent' } 
      ),
    padding: btnSize === 'small' ? '0.5rem 1.2rem' : 
             btnSize === 'medium' ? '0.8rem 1.2rem' : '1rem 1.8rem',
    fontSize: btnSize === 'small' ? '1rem':
              btnSize === 'medium' ? '1.3rem': '1.6rem'
  }

  if(variant === 'text') {
    additionalStyle = {
      ...additionalStyle,
      border: 'none'
    }
  }

  let clsList = [classes.btn];
  if(iconButton === true) {
    clsList = [classes.btn, classes.icon];
  }

  if(clsName) {
    clsList = [clsName, ...clsList];
  }

  return (
    <button className={cls_join(clsList)}
      style={Sx? {...additionalStyle, ...Sx}: additionalStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
};