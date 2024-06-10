import { Spinner } from '@/components/ui/loader';

export const SubmitButton = ({ children, isPending }: { children: any; isPending: boolean }) => {
  return (
    <button
      type='submit'
      disabled={isPending}
      className='bg-sky-900 hover:bg-sky-600 text-white font-medium rounded-md h-11 w-full duration-200 disabled:bg-sky-600 disabled:bg-opacity-70 flex items-center justify-center'>
      {isPending ? (
        <Spinner
          color='white'
          size='sm'
        />
      ) : (
        children
      )}
    </button>
  );
};
