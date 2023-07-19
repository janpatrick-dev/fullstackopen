import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification.show) {
    return null;
  }

  return (
    <div style={style}>
      { notification.message }
    </div>
  )
}

export default Notification