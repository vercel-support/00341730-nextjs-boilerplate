
import fetchWrapper from "@/services/fetchWrapper";
import type { NextRequest } from "next/server";

export const revalidate = 3600;
export async function GET(req: NextRequest) {
  try {
    const data = await fetchWrapper({
      endpoint: '1',
    });


    // Define cache timestamp in UTC
    const cacheTimestampUTC = new Date();

    // Return a JSON response with cache timestamps and filtered data
    return new Response(
      JSON.stringify({
        status: "success",
        data,
        cacheTimestampUTC: cacheTimestampUTC.toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Cache-Timestamp-UTC": cacheTimestampUTC.toISOString(),
          "X-Requested-With": "headless",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    // Handle error and include actual error message
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", message: (error as Error).message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Handle CORS preflight request
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}