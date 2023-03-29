import { ReactComponent as CloseIcon } from '../close.svg';
import { ReactComponent as SearchIcon } from '../searchIcon.svg';

interface PropsType {
  size: string;
  color: string;
  onClick?: () => void;
}

export const Icon = {
  Close: (props: PropsType) => <Close {...props} />,
  Search: (props: PropsType) => <Search {...props} />,
};

const Close = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <CloseIcon width={size} height={size} fill={color} onClick={onClick} />
  );
};

const Search = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <SearchIcon width={size} height={size} stroke={color} onClick={onClick} />
  );
};
