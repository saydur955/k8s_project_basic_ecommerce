import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';

export const Icon_Home: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      without_viewBox={true}
      path="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"
    />
  )
};