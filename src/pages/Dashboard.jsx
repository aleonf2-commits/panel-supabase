import React, { useState, useEffect } from 'react';
import { getAirQualityData } from '../api/supabase';
import AirQualityCards from '../components/AirQualityCards';

const Dashboard = () => {
  const [historico, setHistorico] = useState([]);
  const [actual, setActual] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const datos = await getAirQualityData();
      if (datos.length > 0) {
        setHistorico(datos);
        setActual(datos[0]); // El registro más reciente
      }
    };

    fetchData();
    // Opcional: Configurar un setInterval aquí para polling
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#0056b3', textAlign: 'center' }}>Panel de Calidad del Aire</h1>

      <AirQualityCards data={actual} />

      <h3 style={{ marginTop: '40px' }}>Historial de Lecturas</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #0056b3' }}>
            <th>Fecha y Hora</th>
            <th>PM2.5 (µg/m³)</th>
            <th>PM10 (µg/m³)</th>
            <th>O₃ (µg/m³)</th>
          </tr>
        </thead>
        <tbody>
          {historico.map((registro) => (
            <tr key={registro.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
              <td>{new Date(registro.created_at).toLocaleString()}</td>
              <td>{registro.pm25}</td>
              <td>{registro.pm10}</td>
              <td>{registro.o3}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
