import { NextRequest, NextResponse } from 'next/server';

interface BreachResponse {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
  IsSubscriptionFree: boolean;
  IsStealerLog: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    const apiKey = process.env.HIBP_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key not configured on server' },
        { status: 500 }
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
      `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'DataBreachChecker/1.0'
        }
      }
    );

    // Handle different response status codes
    if (response.status === 404) {
      // No breaches found - return empty array
      return NextResponse.json([]);
    }

    if (response.status === 401) {
      return NextResponse.json(
        { message: 'Invalid API key configuration' },
        { status: 500 }
      );
    }

    if (response.status === 403) {
      return NextResponse.json(
        { message: 'API access forbidden - check API key permissions' },
        { status: 500 }
      );
    }

    if (response.status === 429) {
      return NextResponse.json(
        { message: 'Rate limit exceeded - please try again later' },
        { status: 429 }
      );
    }

    if (!response.ok) {
      console.error(`HIBP API error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { message: `Service temporarily unavailable` },
        { status: 503 }
      );
    }

    const data: BreachResponse[] = await response.json();
    
    return NextResponse.json(data);

  } catch (error) {
    console.error('Email breach check error:', error);
    return NextResponse.json(
      { message: 'Internal server error while checking email breaches' },
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
