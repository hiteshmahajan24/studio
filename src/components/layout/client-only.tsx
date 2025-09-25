
'use client';

import * as React from 'react';

/**
 * A wrapper component that ensures its children are only rendered on the client.
 * This is useful for preventing hydration errors with components that are sensitive
 * to client-side-only APIs, browser extensions, or locale differences.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or a loading spinner/placeholder
  }

  return <>{children}</>;
}
