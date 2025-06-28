
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const googleMapsApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();

    switch (action) {
      case 'geocode':
        return await handleGeocode(params);
      case 'places':
        return await handlePlaces(params);
      case 'directions':
        return await handleDirections(params);
      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Error in maps-integration function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function handleGeocode({ address }: { address: string }) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`
  );
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handlePlaces({ location, radius, type }: { location: string, radius: number, type: string }) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${googleMapsApiKey}`
  );
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleDirections({ origin, destination }: { origin: string, destination: string }) {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${googleMapsApiKey}`
  );
  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
