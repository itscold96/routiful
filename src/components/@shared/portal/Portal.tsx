import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const portalElement = document.getElementById('modal');

  if (!portalElement) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
}
