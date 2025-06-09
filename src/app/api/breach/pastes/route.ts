import { NextRequest, NextResponse } from 'next/server';

interface PasteResponse {
  Source: string;
  Id: string;
  Title: string;
  Date: string;
  EmailCount: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, apiKey } = body;

    // Validate required fields
    if (!email || !apiKey) {
      return NextResponse.json(
        { message: 'Email and API key are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/pasteaccount/${encodeURIComponent(email)}`,
      {
        headers: {
          'hibp-api-key': apiKey.trim(),
          'User-Agent': 'DataBreachChecker/1.0'
        }
      }
    );

    // Handle different response status codes
    if (response.status === 404) {
      // No pastes found - return empty array
      return NextResponse.json([]);
    }

    if (response.status === 401) {
      return NextResponse.json(
        { message: 'Invalid API key' },
        { status: 401 }
      );
    }

    if (response.status === 403) {
      return NextResponse.json(
        { message: 'Access forbidden - check your API key permissions' },
        { status: 403 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { message: 'Rate limit exceeded - please try again later' },
        { status: 429 }
      );
    }

    if (!response.ok) {
      console.error(`HIBP Pastes API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Pastes API Error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data: PasteResponse[] = await response.json();
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('Email paste check error:', error);
    return NextResponse.json(
      { message: 'Internal server error while checking email pastes' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
