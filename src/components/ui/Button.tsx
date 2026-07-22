import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { MotiView } from 'moti';
import { cn } from '@/utils/utils';
import { Label } from './Typography';

interface ButtonProps extends PressableProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neural';
  fullWidth?: boolean;
  className?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
}

export function Button({
  label,
  variant = 'primary',
  fullWidth = true,
  className,
  labelClassName,
  icon,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent border-accent';
      case 'secondary':
        return 'bg-secondary-bg border-border border';
      case 'outline':
        return 'bg-transparent border-border border';
      case 'neural':
        return 'bg-transparent border-neural border border-opacity-50';
      case 'ghost':
        return 'bg-transparent border-transparent';
      default:
        return 'bg-accent border-accent';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return 'text-white';
      case 'secondary':
        return 'text-primary-text';
      case 'neural':
        return 'text-neural';
      case 'outline':
      case 'ghost':
        return 'text-primary-text';
      default:
        return 'text-white';
    }
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={cn(
        'h-[56px] rounded-xl flex-row items-center justify-center px-6',
        fullWidth ? 'w-full' : 'self-start',
        getVariantStyles(),
        className
      )}
      {...props}
    >
      <MotiView
        animate={{ scale: isPressed ? 0.96 : 1, opacity: isPressed ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex-row items-center justify-center w-full h-full"
      >
        {icon && <MotiView className="mr-2">{icon}</MotiView>}
        <Label className={cn('text-[16px] font-semibold tracking-wide', getTextStyles(), labelClassName)}>
          {label}
        </Label>
      </MotiView>
    </Pressable>
  );
}
