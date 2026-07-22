import React from 'react';
import { Text, TextProps, Platform } from 'react-native';
import { cn } from '@/utils/utils';

interface TypographyProps extends TextProps {
  className?: string;
  children: React.ReactNode;
}

export function HeroTitle({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-4xl font-bold text-primary-text tracking-tight", className)} 
      {...props}
    >
      {children}
    </Text>
  );
}

export function Title({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-2xl font-semibold text-primary-text tracking-tight", className)} 
      {...props}
    >
      {children}
    </Text>
  );
}

export function Subtitle({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-lg font-medium text-secondary-text", className)} 
      {...props}
    >
      {children}
    </Text>
  );
}

export function Body({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-base font-normal text-secondary-text leading-6", className)} 
      {...props}
    >
      {children}
    </Text>
  );
}

export function Label({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-sm font-medium text-primary-text", className)} 
      {...props}
    >
      {children}
    </Text>
  );
}

export function MonoText({ className, children, ...props }: TypographyProps) {
  return (
    <Text 
      className={cn("text-sm text-neural tracking-widest", className)} 
      style={[{ fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }, props.style]}
      {...props}
    >
      {children}
    </Text>
  );
}
