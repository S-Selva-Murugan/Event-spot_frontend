import React, { useState } from 'react';

function ProgressBarHelper({step}) {

  const totalSteps = 3

  return (
    <div>
      <div style={{ width: '100%', backgroundColor: '#ccc', borderRadius: '5px' }}>
        <div
          style={{
            width: `${(step / totalSteps) * 100}%`,
            backgroundColor: 'green',
            height: '20px',
            borderRadius: '5px',
          }}
        ></div>
      </div>


    </div>
  );
}

export default ProgressBarHelper;
