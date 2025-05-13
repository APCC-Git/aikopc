'use client';

import React, { useRef } from 'react';
import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css'; // keen-sliderの基本CSSをインポート

interface Slide {
  content: React.ReactNode;
  style?: React.CSSProperties;
}

interface CarouselProps {
  slides: Slide[];
  loop?: boolean;
  slidesPerView?: number | 'auto';
  spacing?: number;
  autoplayInterval?: number; // 自動再生の間隔 (ミリ秒)、0または指定なしで無効
  displayArrow?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  loop = true,
  slidesPerView = 1,
  spacing = 15,
  autoplayInterval,
  displayArrow = false,
  className = '',
}) => {
  const autoplayPlugin: KeenSliderPlugin = slider => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver || !autoplayInterval || autoplayInterval <= 0) return;
      timeout = setTimeout(() => {
        slider.next();
      }, autoplayInterval);
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });
    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);
  };

  const plugins: KeenSliderPlugin[] = [];
  if (autoplayInterval && autoplayInterval > 0) {
    plugins.push(autoplayPlugin);
  }

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: loop,
      slides: {
        perView: slidesPerView,
        spacing: spacing,
      },
      // その他のオプションはここに記述します
    },
    plugins
  );

  return (
    <div className={`carousel-container ${className}`}>
      {' '}
      {/* ナビゲーションボタンの位置調整用コンテナ */}
      <div ref={sliderRef} className="keen-slider w-full h-full min-h-[500px]">
        {slides.map((slide, index) => (
          <div className="keen-slider__slide w-full min-h-full" key={index} style={slide.style}>
            {slide.content}
          </div>
        ))}
      </div>
      {instanceRef.current && displayArrow && (
        <>
          <Arrow
            left
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={!loop && instanceRef.current?.track.details.rel === 0}
          />
          <Arrow
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={
              !loop &&
              instanceRef.current?.track.details.rel ===
                instanceRef.current?.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
};

// ナビゲーションボタンのコンポーネント
interface ArrowProps {
  disabled?: boolean;
  left?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const Arrow: React.FC<ArrowProps> = props => {
  const disabledClassName = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabledClassName}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};

export default Carousel;
