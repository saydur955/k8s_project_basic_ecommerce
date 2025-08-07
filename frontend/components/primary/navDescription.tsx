import { FC, ReactNode } from 'react';
import classes from '@/styles/primary/navDescription.module.css';

interface IComp {
  dataChildren: ReactNode;
  imgChildren: ReactNode;
  bgColor: string;
}

export const NavDescription: FC<IComp> = ({ dataChildren, imgChildren, bgColor }) => {
  return (
    <div className={classes.root}
      style={{ backgroundColor: bgColor }}
    >

      {/* ========================= data container ========================= viewBox="0 0 1440 320" */}
      <div className={classes.dataContainer}>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1430 320"
          className={classes.curve}
        >
          <path fill={bgColor} fillOpacity="1" d="M0,160L60,176C120,192,240,224,360,218.7C480,213,600,171,720,160C840,149,960,171,1080,176C1200,181,1320,171,1380,165.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>

        <div className={classes.dataContent}>

          {dataChildren}

        </div>

      </div>

      {/* ========================= image container ========================= */}
      <div className={classes.imgContainer}>

        <div className={classes.imgContent}>
          {imgChildren}
        </div>

      </div>

    </div>
  )
};