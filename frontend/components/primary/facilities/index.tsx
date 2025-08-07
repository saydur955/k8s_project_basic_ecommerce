import React from 'react';
import { facilities_item_data } from '../../../data/facilities';
import { NextImage } from '../../shared/nextImage';
import { FacilitiesItem } from './facilitiesItem';
import { Section } from '@/components/shared/section';
import classes from '@/styles/primary/facilities/facilities.module.css';

export const Facilities = () => {

  return (
    <Section
      section_cls={classes.secion_root}
    >

      <div className={classes.root} >

        <div className={classes.img_container}>

          <NextImage src="/images/home/facilities_celebration.svg" alt="facilities"
            width={178} height={308}
          />

        </div>

        <div className={classes.data_container}>

          {
            facilities_item_data.map(el =>
              <FacilitiesItem item={el} key={el.index} />
            )
          }

        </div>

      </div>
    </Section>
  )

};