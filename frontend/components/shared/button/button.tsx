import { Children, CSSProperties, FC, ReactNode } from 'react';
import { cls_join } from '@/functions/cls_join.func';
import classes from '@/styles/shared/button/button.module.css';

type TbtnSize = 'large' | 'medium' | 'small';

interface IComp {
  txt?: string;
  padding?: string;
  children?: ReactNode;
  Sx?: CSSProperties;
  onClick?: () => void;
  size?: TbtnSize;
  clsName?: string;
  isFullWidth?: boolean;
}

export const Button: FC<IComp> = ({
  txt, Sx, onClick, size, children, clsName, padding, isFullWidth
}) => {

  const btnSize: TbtnSize = size || 'medium';

  let additionalStyle: CSSProperties = {
    padding: padding ? padding: btnSize === 'small' ? '0.5rem 1.2rem' :
      btnSize === 'medium' ? '1rem 1.8rem' : '1.2rem 2.2rem',
    fontSize: btnSize === 'small' ? '1rem' :
      btnSize === 'medium' ? '1.3rem' : '1.6rem',
    ...( isFullWidth && { display: 'block', width: '100%' } )
  }

  const cls_name = clsName ? cls_join([classes.btn, clsName]):
  cls_join([classes.btn, classes.btn_default]);

  const rednerComp = () => {
    if(children) return children;
    if(txt) return txt;
    return ''
  }

  return (
    <button
      className={cls_name}
      style={Sx ? { ...additionalStyle, ...Sx } : additionalStyle}
      onClick={onClick}
    >

    {rednerComp()}

    </button>
  )
};