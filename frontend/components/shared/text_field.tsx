import { useState, FC, HTMLInputTypeAttribute, CSSProperties } from 'react';
import classes from '@/styles/shared/text_field.module.css';
import { cls_join } from '@/functions/cls_join.func';

interface IComp {
  label: string;
  value: string|number;
  type?: HTMLInputTypeAttribute;
  changeHandler: (value: string) => void;
  Sx?: CSSProperties;
  value_is_center?: boolean; // will text will be in the center
}

export const TextField: FC<IComp> = ({ 
  label, value, changeHandler, type, Sx, value_is_center

}) => {

  const [isFocused, setIsFocused] = useState(false);


  return (
    <div
      className={
        isFocused ?
          cls_join([classes.root, classes.rootAfterActive]) :
          cls_join([classes.root, classes.rootAfter])
      }
      style={{...(Sx && Sx)}}
    >

      <div className={classes.container}>

        {
          !value &&
          <label className={classes.label}>
            {label}
          </label>
        }


          <input className={classes.input}
            type={type||'text'} value={value}
            onChange={e => changeHandler(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              ...(value_is_center && {textAlign: 'center'})
            }}
          />

      </div>

    </div>
  )

};