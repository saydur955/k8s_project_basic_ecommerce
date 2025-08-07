import { FC } from 'react';
import { ty_facilities_item } from '../../../data/facilities';
import { NextImage } from '../../shared/nextImage';
import { Typo } from '@/components/shared/typography';
import classes from '@/styles/primary/facilities/facilitiesItem.module.css';

interface IComp {
  item: ty_facilities_item
}

export const FacilitiesItem: FC<IComp> = ({ item }) => {

  return (
    <div className={classes.item_root} >

      <div className={classes.content}>

        <NextImage src={item.img} alt={item.index}
          width={180} height={180}
        />

        <div className={classes.title_container} >
          {
            item.title.map((el, idx) => (
              <Typo key={idx} txt={el.txt} variant="h5" size="2rem"
                align="center" margin="0 0 0 0"
                color={el.color === 'primary' ?
                  'var(--color_primary)' : 'var(--color_secondary)'}
              />
            ))
          }
        </div>

      </div>

    </div>
  )

};