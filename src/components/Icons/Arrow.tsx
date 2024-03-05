import React from 'react';
import { twMerge } from 'tailwind-merge';

type ArrowProps = {
  className?: string
  onClick?: () => void
}

const Arrow: React.FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 13"
      className={twMerge('block w-auto h-10', className)}
      onClick={onClick}
    >
      <path 
        className="fill-brand-gray" 
        d="m 29.047754,1e-7 h -0.509799 l 6.310581,6.296875 H 0.45009825 v 0.40625 H 7.7658513 19.847518 34.848536 L 28.535777,13 h 0.511977 l 6.502148,-6.4999999 z"
      ></path>
    </svg>
  )
}

export default Arrow