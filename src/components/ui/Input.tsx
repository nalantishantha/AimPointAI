import React, { useState } from 'react';
import { View, TextInput, TextInputProps, Pressable } from 'react-native';
import { cn } from '@/utils/utils';
import { Label } from './Typography';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName,
  className,
  secureTextEntry,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = secureTextEntry !== undefined;

  return (
    <View className={cn('w-full mb-4', containerClassName)}>
      {label && (
        <Label className="mb-2 text-secondary-text text-[13px] uppercase tracking-wider">
          {label}
        </Label>
      )}
      <View
        className={cn(
          'flex-row items-center w-full h-[56px] rounded-xl border px-4 bg-secondary-bg transition-colors',
          isFocused ? 'border-neural' : 'border-border',
          error ? 'border-error' : ''
        )}
      >
        <TextInput
          className={cn(
            'flex-1 h-full text-[16px] text-primary-text font-medium leading-relaxed',
            className
          )}
          placeholderTextColor="#A1A1AA"
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        {isPassword && (
          <Pressable
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="p-2"
            hitSlop={10}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color="#00F0FF" />
            ) : (
              <Eye size={20} color="#A1A1AA" />
            )}
          </Pressable>
        )}
      </View>
      {error && <Label className="text-error text-xs mt-1.5">{error}</Label>}
    </View>
  );
}
