export const ShowIf = (props) => {
  return !props.condition
    ? null
    : props.children;
};

