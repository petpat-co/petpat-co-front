import React from 'react';
import { TagItem } from './Tag.styled';

interface TagProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Tag({ children }: TagProps) {
  return (
    <TagItem>
      <span style={{ color: '#9a9a9a' }}>#</span>
      {children}
    </TagItem>
  );
}
