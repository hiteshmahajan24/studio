
'use client';

import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';

/**
 * A wrapper around the Button component that ensures it only renders on the client.
 * This is useful to prevent hydration errors when browser extensions modify the DOM.
 */
export function ClientButton(props: ButtonProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Or a placeholder
  }

  return <Button {...props} />;
}
