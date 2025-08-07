import { useEffect, FC } from 'react';
import classes from '@/styles/shared/snackbar.module.css';
import { Icon_Cross_Bold } from '../icons/cross_bold';
import { IconButton } from './button/icon_button';

export type ty_snackbar_type = 'success'| 'warning'| 'error';

interface IComp {
  isOpen: boolean;
  closeHandler: () => void;
  type: ty_snackbar_type;
  message: string;
}

const DELAY_TIME = 2.5 * 1000; // 2.5s

export const SnackBar: FC<IComp> = ({ isOpen, message, type, closeHandler }) => {


  let clsList = [classes.root];

  if(type === 'success') {
    clsList.push(classes.success)
  }
  else if(type === 'error') {
    clsList.push(classes.error)
  }
  else {
    clsList.push(classes.warning)
  }

  useEffect(() => {

    let timer1 = setTimeout(() => {

      closeHandler();

    }, DELAY_TIME);

    return () => {
      clearTimeout(timer1);
    };

  }, [closeHandler]);


  if(!isOpen) return null;

  return (
    <div className={clsList.join(' ')}> 

      <p className={classes.message}>
        {message}
      </p>

      <IconButton
        clsName={classes.icon_btn}
        onClick={closeHandler}
      >
        <Icon_Cross_Bold
          fill="var(--color_white)"
          Sx={{ transform: 'translateY(0.2rem) scale(0.4)', padding: '0rem' }}
        />
      </IconButton>


    </div>
  )

};