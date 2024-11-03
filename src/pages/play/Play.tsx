import PlayList from 'components/play/PlayList';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

export default function Play() {
  const { routineId } = useParams();

  if (!routineId) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <PlayList routineId={routineId} />
    </Suspense>
  );
}
