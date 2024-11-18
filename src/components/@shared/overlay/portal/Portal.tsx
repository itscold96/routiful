import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalElementId = 'modal' | 'toast';

interface PortalProps {
  children: ReactNode;
  elementId: PortalElementId;
}

export default function Portal({ children, elementId }: PortalProps) {
  const portalElement = document.getElementById(elementId);

  if (!portalElement) {
    return null;
  }

  return createPortal(<>{children}</>, portalElement);
}
