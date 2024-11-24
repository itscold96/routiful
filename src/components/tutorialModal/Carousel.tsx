import S from './Carousel.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TUTORIAL_DATA } from 'constants/tutorial';
import classNames from 'classnames';

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Carousel() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, TUTORIAL_DATA.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
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
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <div className={S.content}>
              <motion.img className={S.image} src={TUTORIAL_DATA[imageIndex].imageSrc} draggable={false} />
              <p className={S.description}>{TUTORIAL_DATA[imageIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={S.dotContainer}>
        {TUTORIAL_DATA.map((_, index) => (
          <div key={index} className={classNames(S.dot, { [S.selected]: index === imageIndex })} />
        ))}
      </div>
    </div>
  );
}
