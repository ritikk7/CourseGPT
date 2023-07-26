import { forwardRef } from 'react';

const ScrollRef = (prop, ref) => {
  return (
    <div id="dummy-div" ref={ref} style={{ float: 'left', clear: 'both' }} />
  );
};

export default forwardRef(ScrollRef);
