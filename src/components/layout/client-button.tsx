
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
    // Render a placeholder on the server that matches the final client button's dimensions
    const sizeClasses = {
      default: "h-10",
      sm: "h-9",
      lg: "h-11",
      icon: "h-10 w-10",
    };
    const size = props.size || 'default';
    return <div className={`${props.className} ${sizeClasses[size]} animate-pulse bg-muted rounded-md`}></div>;
  }

  return <Button {...props} />;
}
