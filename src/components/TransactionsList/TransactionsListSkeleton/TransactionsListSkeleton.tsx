import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function TransactionsListSkeleton() {
  return (
    <SkeletonTheme height={65} borderRadius={8} baseColor="#e9e9e9">
      <Skeleton count={10} style={{ marginBottom: '.5em' }} />
    </SkeletonTheme>
  );
}
