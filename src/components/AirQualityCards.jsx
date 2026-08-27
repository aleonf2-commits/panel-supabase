import React from 'react';

const AirQualityCards = ({ data }) => {
  if (!data) return <p>Cargando sensores...</p>;

  return (
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>PM2.5</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.pm25} µg/m³</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>PM10</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.pm10} µg/m³</p>
      </div>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <h3>O₃</h3>
        <p style={{ fontSize: '24px', color: '#0056b3' }}>{data.o3} µg/m³</p>
      </div>
    </div>
  );
};

export default AirQualityCards;
