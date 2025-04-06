import React, { PropsWithChildren } from 'react';

interface HeaderPageProps extends PropsWithChildren {
  title?: string;
  subtitle?: string;
}

function HeaderPage({ title, subtitle, children }: HeaderPageProps) {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div>{children}</div>
    </div>
  );
}

export default HeaderPage;
