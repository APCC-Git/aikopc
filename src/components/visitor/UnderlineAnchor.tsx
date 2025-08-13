import React from 'react';

type UnderlineAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

export const UnderlineAnchor: React.FC<UnderlineAnchorProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <a
      {...props}
      className={`relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0
                 after:w-full after:h-[2px] after:bg-accent-primary-400
                 after:scale-x-0 after:origin-center after:rounded-full
                 after:transition-transform after:duration-300
                 hover:after:scale-x-100 ${className}`}
    >
      {children}
    </a>
  );
};
