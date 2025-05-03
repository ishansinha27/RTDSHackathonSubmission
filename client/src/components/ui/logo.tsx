import React from 'react';

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" fill="url(#logo-gradient)" />
      <path
        d="M70 80H130M70 100H130M70 120H130"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M140 80L160 100L140 120"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="10"
          y1="10"
          x2="190"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A56FF" />
          <stop offset="0.5" stopColor="#C834FF" />
          <stop offset="1" stopColor="#FF44A1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoWithText({ className = "h-8" }: { className?: string }) {
  return (
    <div className="flex items-center">
      <Logo className={className} />
      <span className="ml-2 font-bold text-2xl text-gray-800">GPUxACE</span>
    </div>
  );
}