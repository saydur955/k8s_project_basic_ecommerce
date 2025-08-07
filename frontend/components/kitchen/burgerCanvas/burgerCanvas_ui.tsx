import { useState, FC, MutableRefObject, Fragment } from 'react';
// import { GAME_MEASUREMENT } from '../../pages/game';

interface IComp {
  ctx: CanvasRenderingContext2D | null;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}


export const BurgerCanvasUI: FC<IComp> = ({ ctx, canvasRef }) => {


  // ================ plant click handler ===================


  return (

    <Fragment>

      {/* <div style={{
        display: 'flex', justifyContent: 'center',
        border: '0.1rem solid green'
      }} >

        <canvas ref={canvasRef}></canvas>

      </div> */}


      <div style={{ display: 'flex', justifyContent: 'center'}} >

        <div style={{ position: 'relative', display: 'inline-block' }} >

          <canvas ref={canvasRef}
            // style={{border: '0.1rem solid green'}}
          ></canvas>

        </div>

      </div>

    </Fragment>

  )

};
