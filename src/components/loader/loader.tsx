import React from 'react';
import classNames from 'classnames';
import { CircularProgress } from '@material-ui/core';

const Loader: React.FC<{
  className?: string;
}> = (props) => {
  return (
    <div className={classNames("loader", props.className)}>
      <CircularProgress size={36} />
    </div>
  );
}

export default Loader;
