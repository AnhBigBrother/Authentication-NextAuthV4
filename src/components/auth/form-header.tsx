import React from 'react';

function FormHeader({ label }: { label: string }) {
  return (
    <div className='flex flex-col gap-1 items-center justify-center'>
      <h1 className='text-3xl font-semibold font- flex gap-1 items-center text-transparent bg-clip-text bg-gradient-to-r from-sky-900 to-sky-600'>Authentication</h1>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}

export { FormHeader };
