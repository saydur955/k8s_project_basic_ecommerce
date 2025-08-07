import React, { Fragment } from 'react'
import { NextImage } from '../shared/nextImage';
import { NavDescription } from './navDescription';
import { Typo } from '@/components/shared/typography';
import { Button } from '@/components/shared/button/button';
import { NextLink } from '../shared/link';
import { Dashboard_navigation_item } from '@/dashboard/navigation';

export const HomeDelivary = () => {

  return (

    <NavDescription

      bgColor="var(--color_secondary)"

      dataChildren={
        <Fragment>
          <NextImage src="/images/home/home_delivary_logo.jpg" 
            width={120} height={120} alt="home delivary logo"
          />

          <Typo txt="Order for Home-Delivered Smiles"
            variant="h2" size="4rem" weight={700}
            margin="1.5rem 0 2rem 0"
          />

          <Typo txt="We deliver to your doorstep" variant="h4" size="1.8rem"
            color="var(--color_gold_light)" margin="0 0 2rem 0"
          />

          <Typo txt="McDelivery allows you to experience delicious McDonald’s food from the comfort of your sofa at home or cubicle in office. All orders are delivered quickly and efficiently, allowing you the peace of mind to know that smiles-inducing food is never too far."
            margin="1rem 0 0 0" color="#2d2d2d"
          />

          <div style={{ marginTop: '4rem' }} >
            <NextLink href={Dashboard_navigation_item.order} >
              <Button txt="Order Now" size="large" />
            </NextLink>
          </div>

        </Fragment>
      }

      imgChildren={
        <Fragment>
          <NextImage src="/images/home/home_delivary.jpg" alt="burger chef"
            width={600} height={439}
          />
        </Fragment>
      }

    />

  )

};