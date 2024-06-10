import { CheckCircledIcon } from '@radix-ui/react-icons';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const FormSuccess = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-emerald-500'>
      <CheckCircledIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
};

export function FormError({ message }: { message: string | undefined }) {
  if (!message) return null;
  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive'>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <p>{message}</p>
    </div>
  );
}
