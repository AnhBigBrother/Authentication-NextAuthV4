'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export const SignOutBtn = () => {
  return (
    <Button
      variant='default'
      size='lg'
      onClick={() => signOut()}>
      Log out
    </Button>
  );
};
