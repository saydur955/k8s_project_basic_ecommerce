import { Fragment } from 'react';
import { NavDescription } from './navDescription';
import { NextImage } from '@/components/shared/nextImage';
import { Typo } from '@/components/shared/typography';
import { NextLink } from '@/components/shared/link';
import { Button } from '@/components/shared/button/button';

export const KitchenDescription = () => {

  return (
    <NavDescription

      bgColor="var(--color_primary)"

      dataChildren={
        <Fragment>
          <NextImage src="/images/home/kitchen_logo.png" alt="kitchen logo"
            width={160} height={160}
          />

          <Typo txt="Cook your own desire Burger-rich Ingredients"
            variant="h2" size="4rem" weight={700}
            margin="1.5rem 0 2rem 0"
          />

          <Typo txt="Be the Chef of your own Burger" variant="h4" size="1.8rem"
            color="var(--color_gold_light)" margin="0 0 2rem 0"
          />

          <Typo txt="Happy Meal Readers is part of McDonald’s commitment in bringing to life Truly Together moments by encouraging reading as a fun family activity. It is a cherished part of Happy Meal, offering a unique choice of books by Cressida Cowell with every Happy Meal."
            margin="1rem 0 0 0" color="#2d2d2d"
          />

          <div style={{ marginTop: '4rem' }} >
            <NextLink href="/kitchen" >
              <Button txt="Enter into Kitchen" size="large" />
            </NextLink>
          </div>
        </Fragment>
      }

      imgChildren={
        <Fragment>
          <NextImage src="/images/home/burger_chef.png" alt="burger chef"
            width={420} height={420}
          />
        </Fragment>
      }


    />
  )

};