import React from 'react';

type HitComponent = {
  objectID: string;
  [name: string]: any;
};

const Hit = ({ hit }: { hit: HitComponent }) => {
  const { objectID = 'unknown', ...properties } = hit || {};
  const { name, customBvAverageRating } = properties || {};
  return (
    <div>
      <h3>{`objectID: ${objectID}`}</h3>
      <p style={{ wordBreak: 'break-all' }}>
        {name}, rating: {customBvAverageRating}
      </p>
    </div>
  );
};

export default Hit;
