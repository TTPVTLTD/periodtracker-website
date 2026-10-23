'use client';

import React, { useState } from 'react';

export default function NewsHeroImage({ src, fallbackSrc, alt, className = '' }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}
