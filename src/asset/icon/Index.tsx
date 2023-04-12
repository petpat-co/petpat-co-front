import { ReactComponent as ViewIcon } from 'src/asset/viewIcon.svg';
import { ReactComponent as CloseIcon } from '../close.svg';
import { ReactComponent as CommentIcon } from '../commentIcon.svg';
import { ReactComponent as SearchIcon } from '../searchIcon.svg';

interface PropsType {
  size: string;
  color: string;
  onClick?: () => void;
}

export const Icon = {
  Close: (props: PropsType) => <Close {...props} />,
  Comment: (props: PropsType) => <Comment {...props} />,
  Search: (props: PropsType) => <Search {...props} />,
  View: (props: PropsType) => <View {...props} />,
};

const Close = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <CloseIcon width={size} height={size} fill={color} onClick={onClick} />
  );
};

const Comment = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <CommentIcon width={size} height={size} fill={color} onClick={onClick} />
  );
};

const Search = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <SearchIcon width={size} height={size} stroke={color} onClick={onClick} />
  );
};

const View = (props: PropsType) => {
  const { size, color, onClick = () => {} } = props;

  return (
    <ViewIcon
      width={size}
      height={Number(size) - 5}
      stroke={color}
      onClick={onClick}
    />
  );
};
