const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const getAirQualityData = async () => {
  try {
    // Endpoint REST automático generado por Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/datos_calidad_aire?select=*&order=created_at.desc&limit=10`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    if (!response.ok) throw new Error('Error al obtener datos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
