import { Spinner } from '@/components/ui/loading-spinner';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
