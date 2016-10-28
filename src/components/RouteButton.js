import React from 'react';
import { Button } from 'react-bootstrap';

const RouteButton = ({ handleClick, text }) => (
    <Button
      onClick={handleClick}
    >
      {text}
    </Button>
);

export default RouteButton;
