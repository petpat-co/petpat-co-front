import styled from 'styled-components';

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

const TagItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
  gap: 7px;
  margin-right: 7px;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 120px;
  cursor: pointer;
`;
