import React, { useState, useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.left = `${posX}px`;
        cursorOutlineRef.current.style.top = `${posY}px`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
       if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* This is the inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed w-2 h-2 bg-amber-600 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`}
      />
      {/* This is the trailing outline */}
      <div
        ref={cursorOutlineRef}
        className={`fixed w-8 h-8 rounded-full border-2 border-amber-600 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isHovering ? 'scale-150 bg-amber-500/20 border-amber-500' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
