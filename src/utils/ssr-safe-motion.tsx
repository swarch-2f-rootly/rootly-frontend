import React from 'react';
import { motion } from 'framer-motion';

// Wrapper para hacer Framer Motion compatible con SSR
export function SSRSafeMotion({ children, ...props }: React.ComponentPropsWithoutRef<typeof motion.div>) {
  // En el servidor, renderizar como div normal sin animaciones
  if (typeof window === 'undefined') {
    const { initial, animate, exit, variants, transition, whileHover, whileTap, whileFocus, whileInView, ...htmlProps } = props as any;
    return <div {...htmlProps}>{children}</div>;
  }
  
  // En el cliente, usar motion.div con animaciones
  return <motion.div {...props}>{children}</motion.div>;
}

// Wrapper para motion.button
export function SSRSafeMotionButton({ children, ...props }: React.ComponentPropsWithoutRef<typeof motion.button>) {
  if (typeof window === 'undefined') {
    const { initial, animate, exit, variants, transition, whileHover, whileTap, whileFocus, whileInView, ...htmlProps } = props as any;
    return <button {...htmlProps}>{children}</button>;
  }
  
  return <motion.button {...props}>{children}</motion.button>;
}

// Wrapper para motion.span
export function SSRSafeMotionSpan({ children, ...props }: React.ComponentPropsWithoutRef<typeof motion.span>) {
  if (typeof window === 'undefined') {
    const { initial, animate, exit, variants, transition, whileHover, whileTap, whileFocus, whileInView, ...htmlProps } = props as any;
    return <span {...htmlProps}>{children}</span>;
  }
  
  return <motion.span {...props}>{children}</motion.span>;
}

// Wrapper para motion.section
export function SSRSafeMotionSection({ children, ...props }: React.ComponentPropsWithoutRef<typeof motion.section>) {
  if (typeof window === 'undefined') {
    const { initial, animate, exit, variants, transition, whileHover, whileTap, whileFocus, whileInView, ...htmlProps } = props as any;
    return <section {...htmlProps}>{children}</section>;
  }
  
  return <motion.section {...props}>{children}</motion.section>;
}

