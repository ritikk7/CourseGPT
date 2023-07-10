import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const TempButton = () => {
  return (
    <Link to="/data">
      <Button>Go to Data Page</Button>
    </Link>
  );
};

export default TempButton;
