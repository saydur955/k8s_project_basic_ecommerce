import { useState } from 'react';
import { HeaderItem } from './headerItem';
import { ButtonSlider } from '@/components/shared/button/button_slider';
// style
import classes from '@/styles/primary/header.module.css';

interface T_header_data {
  txtShadow: string;
  txtList: string[];
  image: string;
  href?: string;
}

const HEADER_ITEM_LIST: T_header_data[] = [
  {
    txtShadow: "Value Meal",
    txtList: ['For every', 'budget'],
    image: "/images/home/header/header_01.jpg"
  },
  {
    txtShadow: "New Item",
    txtList: ['Wholesome', 'Whole Wheat'],
    image: "/images/home/header/header_02.jpg",
    href: '/kitchen'
  },
  {
    txtShadow: "Happy Birthday",
    txtList: ["Celebrate your", "child's birthday", "with us"],
    image: "/images/home/header/header_03.jpg"
  }
]


export const HeaderPrimary = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const leftHanlder = () => {
    currentIndex === 0 ? setCurrentIndex(HEADER_ITEM_LIST.length - 1) :
      setCurrentIndex(currentIndex - 1);
  }

  const rightHanlder = () => {
    currentIndex === HEADER_ITEM_LIST.length - 1 ? setCurrentIndex(0) :
      setCurrentIndex(currentIndex + 1);
  }

  return (

    <div className={classes.container}>

      <div className={classes.slider}>
        {
          HEADER_ITEM_LIST.map((el, idx) => (
            <div key={idx} className={classes.item_root}
              style={{
                transform: `translateX(${currentIndex * (-100)}%)`,
              }}
            >
              <HeaderItem {...el}
                leftHanlder={leftHanlder} rightHanlder={rightHanlder}
              />
            </div>
          ))
        }
      </div>

      <div className={classes.btn_content}>
        <ButtonSlider
          clsName=''
          leftHanlder={leftHanlder}
          rightHanlder={rightHanlder}
          combo="red"
        />
      </div>


    </div>
  )

};