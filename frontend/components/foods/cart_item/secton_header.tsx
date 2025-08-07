import { FC } from 'react';
import { Typo } from '@/components/shared/typography';

interface IComp {
  title: string;
}

export const CartItem_Secton_Header: FC<IComp> = ({ title }) => {
  return (
    <Typo txt={title}
    variant="h5" weight={400} margin="0 0 2rem 0"
    Sx={{
      padding: '1rem', backgroundColor: 'var(--color_secondary)',
      borderRadius: '0.4rem'
    }}

  />
  )
};