import { FC } from 'react';
import { ty_comp_icon } from '@/types/component';
import { Icon_HOC } from './hoc';


export const Icon_Sidebar_Expand: FC<ty_comp_icon> = (props) => {

  return (
    <Icon_HOC
      {...props}
      without_viewBox={true}
      path="m4 3c-.478 0-1 .379-1 1v16c0 .62.519 1 1 1h16c.621 0 1-.52 1-1v-16c0-.478-.379-1-1-1zm15.5 1.5v15h-4v-15zm-15 15v-15h9.5v15zm6.342-3.679c.137.124.299.179.458.179.358 0 .7-.284.7-.705v-6.59c0-.422-.342-.705-.7-.705-.159 0-.321.055-.458.178-1.089.982-2.684 2.417-3.576 3.22-.17.153-.266.371-.266.601 0 .229.096.448.265.601.893.803 2.487 2.239 3.577 3.221zm-.342-5.317v2.991l-1.66-1.496z"
    />
  )
};