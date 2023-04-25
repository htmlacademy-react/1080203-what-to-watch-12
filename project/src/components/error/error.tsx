import './error.css';

function Error({ showError, message }: { showError: boolean; message: string }): JSX.Element | null {
  if (!showError) {
    return null;
  }

  return (
    <div className='error'>{message}</div>
  );
}

export default Error;
