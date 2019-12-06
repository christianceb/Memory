import React from 'react';
import { Alert } from 'react-bootstrap';

const Help = () => {
  return <Alert key="info" variant="info" className="help">
    <a href="https://github.com/christianceb/Memory#getting-started" target="_blank" rel="noopener noreferrer">Need help? <span role="img">🆘</span></a>
  </Alert>
}

export default Help;