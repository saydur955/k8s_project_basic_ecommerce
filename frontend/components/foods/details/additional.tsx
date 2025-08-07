import React from 'react';
import { Section } from '@/components/shared/section';
import classes from '@/styles/foods/details/additional.module.css';
import { Typo } from '@/components/shared/typography';

export const Additional = () => {

  return (
    <Section>

      {/* <h3 className={classes.header} >
        Nutritional Information
      </h3> */}

      <Typo txt="Nutritional Information" variant="h3"
        align="center" weight={700}
      />

      <p className={classes.txt_para} >
        McDonald’s Japan nutritional information shows the numerical values derived 
        from the nutritional analysis on standard product specifications and 
        preparations based on the "Food Labeling Standards" (Food Labeling Act).
        For parts of the ingredients, the information is obtained without analysis by 
        referring to the "Standard Tables of Food Composition in Japan 2015 
        (Seventh Revised Version)" (Ministry of Education, Culture, 
        Sports, Science and Technology).
      </p>

    </Section>
  )

};