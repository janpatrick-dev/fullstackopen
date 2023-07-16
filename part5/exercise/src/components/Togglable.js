import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? 'none' : '' };
  const showIfVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  });

  if (props.type === 'blog') {
    let buttonLabel = visible ? 'hide' : props.buttonLabel;

    return (
      <div style={{ display: 'inline' }}>
        <button onClick={toggleVisibility}>{ buttonLabel }</button>
        <div style={showIfVisible}>
          { props.children }
        </div>
      </div>
    )
  }

  return ( 
    <div>
      <div style={hideIfVisible}>
        <button onClick={toggleVisibility}>{ props.buttonLabel }</button>
      </div>
      <div style={showIfVisible}>
        { props.children }
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});
 
export default Togglable;