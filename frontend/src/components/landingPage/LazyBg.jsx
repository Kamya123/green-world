// src/components/landingPage/LazyBg.jsx
import React, { useRef, useState, useEffect } from 'react';

export default function LazyBg({ src, className, style, children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        backgroundImage: visible ? `url(${src})` : 'none',
      }}
    >
      {children}
    </div>
  );
}
