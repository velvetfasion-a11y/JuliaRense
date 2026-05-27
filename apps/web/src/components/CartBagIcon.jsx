import React from 'react';

/** Shopping bag icon — matches Julia Rensé design */
const CartBagIcon = ({ className = 'h-9 w-9' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 42V80a6 6 0 0 0 6 6h40a6 6 0 0 0 6-6V42"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    <path
      d="M20 42 28 26h44l8 16"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M38 54c0 8 6 14 12 14s12-6 12-14"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export default CartBagIcon;
