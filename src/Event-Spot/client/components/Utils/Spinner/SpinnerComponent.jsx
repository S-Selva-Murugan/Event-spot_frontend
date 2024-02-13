import Spinner from 'react-bootstrap/Spinner';

function SpinnerComponent() {
  return (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default SpinnerComponent