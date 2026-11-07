import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; 
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { 
        threshold: 0.1, 
        // Bắt buộc phần tử phải lọt sâu 150px vào màn hình mới kích hoạt
        rootMargin: "0px 0px -150px 0px" 
      }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ 
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionDuration: '1200ms', // 1.2s chậm rãi
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)', // Mượt mà
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)', // Trượt lên 50px
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};