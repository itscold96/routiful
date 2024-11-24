import S from './Carousel.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TUTORIAL_DATA } from 'constants/tutorial';
import classNames from 'classnames';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const SWIPE_DISTANCE = 1000;

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const carouselIndex = (page + TUTORIAL_DATA.length) % TUTORIAL_DATA.length;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? SWIPE_DISTANCE : -SWIPE_DISTANCE,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1, zIndex: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -SWIPE_DISTANCE : SWIPE_DISTANCE,
      opacity: 0,
      zIndex: 0,
    }),
  };

  const handlePaginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  const handleDragEnd = (offset: number, velocity: number) => {
    const swipePower = Math.abs(offset) * velocity;
    if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      handlePaginate(-1);
    } else if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      handlePaginate(1);
    }
  };

  return (
    <div className={S.carouselContainer}>
      <div className={S.contentContainer}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => handleDragEnd(offset.x, velocity.x)}
          >
            <div className={S.content}>
              <motion.img className={S.image} src={TUTORIAL_DATA[carouselIndex].imageSrc} draggable={false} />
              <p className={S.description}>{TUTORIAL_DATA[carouselIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={S.dotContainer}>
        {TUTORIAL_DATA.map((_, index) => (
          <div key={index} className={classNames(S.dot, { [S.selected]: index === carouselIndex })} />
        ))}
      </div>
    </div>
  );
}
