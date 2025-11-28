import React from 'react';

function VirtualTourPage() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={process.env.PUBLIC_URL + '/virtual_tour_test/index.html'}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default VirtualTourPage;