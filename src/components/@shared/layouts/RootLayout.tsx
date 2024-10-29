import { ReactNode } from 'react';
import S from './RootLayout.module.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={S.rootLayout}>
      <div className={S.rootLayoutContent}>{children}</div>
    </div>
  );
}
