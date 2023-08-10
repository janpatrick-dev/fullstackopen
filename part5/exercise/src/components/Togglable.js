import { useState, forwardRef, useImperativeHandle } from 'react';
import Button from '@mui/material/Button';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? 'none' : '' };
  const showIfVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });

  if (props.type === 'blog') {
    let buttonLabel = visible ? 'hide' : props.buttonLabel;

    return (
      <div style={{ display: 'inline' }}>
        <Button variant="contained" onClick={toggleVisibility} data-testid='togglableButton'>
          { buttonLabel }
        </Button>
        <div style={showIfVisible} className='blogDetailsContent'>
          { props.children }
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={hideIfVisible}>
        <Button variant="contained" onClick={toggleVisibility} data-testid='togglableButton'>
          { props.buttonLabel }
        </Button>
      </div>
      <div style={showIfVisible}>
        { props.children }
        <Button variant="outlined" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;