import { FC } from 'react';
import { NextLink } from '../shared/link';
import { Button } from '../shared/button/button';


interface IComp {
  selectdCategory: string;
}

export const GetAllButton: FC<IComp> = ({ selectdCategory }) => {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4rem'
      }}
    >

      <NextLink href={`/menu/${selectdCategory}`}
        Sx={{width: 'auto'}}
      >
        <Button txt="Check All Items" size="large"
          Sx={{ letterSpacing: '0.2rem' }}
        />
      </NextLink>

    </div>
  )

};