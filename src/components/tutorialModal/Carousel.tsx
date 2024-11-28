import S from './Carousel.module.scss';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TUTORIAL_DATA } from 'constants/tutorial';
import classNames from 'classnames';

// 스와이프 인식 임계값과 애니메이션 이동 거리 상수 정의
const SWIPE_CONFIDENCE_THRESHOLD = 10000; // 스와이프 판정 기준값

export default function Carousel() {
  // 현재 페이지와 방향을 상태로 관리
  const [[page, direction], setPage] = useState([0, 0]);

  // 현재 보여질 슬라이드의 index를 순환적으로 계산
  const carouselIndex = ((page % TUTORIAL_DATA.length) + TUTORIAL_DATA.length) % TUTORIAL_DATA.length;

  // 슬라이드 페이지를 변경하는 함수
  const handlePaginate = (newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  // 드래그 종료 시 스와이프 방향과 세기를 계산하여 페이지 변경
  const handleDragEnd = (offset: number, velocity: number) => {
    const swipePower = Math.abs(offset) * velocity; // 스와이프 세기 계산
    if (swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      handlePaginate(-1); // 왼쪽으로 스와이프
    } else if (swipePower < -SWIPE_CONFIDENCE_THRESHOLD) {
      handlePaginate(1); // 오른쪽으로 스와이프
    }
  };

  return (
    <div className={S.carouselContainer}>
      {/* 슬라이드 컨텐츠 영역 */}
      <div className={S.contentContainer}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page} // 페이지 변경 시 key를 변경하여 애니메이션 재생
            custom={direction} // 방향 정보를 전달
            drag="x" // x축으로 드래그 가능
            dragConstraints={{ left: 0, right: 0 }} // 드래그 제약 조건
            onDragEnd={(e, { offset, velocity }) => handleDragEnd(offset.x, velocity.x)} // 드래그 종료 이벤트 핸들러
          >
            <div className={S.content}>
              {/* 현재 슬라이드 이미지 */}
              <img
                className={S.image}
                src={TUTORIAL_DATA[carouselIndex].imageSrc}
                draggable={false} // 이미지 자체 드래그 동작 비활성화
              />
              {/* 현재 슬라이드 설명 */}
              <p className={S.description}>{TUTORIAL_DATA[carouselIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 도트 네비게이션 */}
      <div className={S.dotContainer}>
        {TUTORIAL_DATA.map((_, index) => (
          <div
            key={index}
            className={classNames(S.dot, { [S.selected]: index === carouselIndex })} // 현재 슬라이드와 일치하면 선택 스타일 적용
          />
        ))}
      </div>
    </div>
  );
}
