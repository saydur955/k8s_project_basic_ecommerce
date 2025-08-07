import { FC, Dispatch, SetStateAction, Fragment } from 'react';
// types
import { cls_join } from '@/functions/cls_join.func';
import { Typo } from '../shared/typography';
import { ty_category_item, ty_foodCategory } from '@/types/food.type';
import classes from '@/styles/primary/category.module.css';
import { Section } from '../shared/section';



interface IComp {
  selectdCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  categoryList: ty_category_item[];
}

export const Category: FC<IComp> = ({ selectdCategory, setSelectedCategory, categoryList }) => {

  return (
    <Section
      section_sx={{paddingBottom: '0'}}
    >

      <div className={classes.root} >

        <div className={classes.itemContainer}>
          {
            categoryList.map((el, idx) => (
              <Fragment key={el.name} >

                <div className={classes.item}
                >
                  <Typo txt={el.name}
                    clsName={
                      selectdCategory === el._id ?
                        cls_join([classes.txt, classes.txt_active]) :
                        classes.txt
                    }
                    variant="h4" size="1.8rem" weight={700} margin="0"
                    color={selectdCategory === el._id ? 'var(--color_primary)' : '#b7b7b7'}
                    Sx={{
                      textTransform: 'uppercase', cursor: 'pointer',
                    }}
                    onClick={() => setSelectedCategory(el._id)}
                  />
                </div>

                {
                  idx < categoryList.length - 1 &&
                  (
                    <div className={classes.navigation_separator} >
                      |
                    </div>
                  )
                }

              </Fragment>
            ))
          }
        </div>

      </div>
    </Section>

  )

};