import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Imran Safdar - Full Stack Developer';
    const description = searchParams.get('description') || 'Full-stack developer passionate about creating innovative solutions';

    // Default colors
    const colors = {
      bg: '#ffffff',
      primary: '#3b82f6',
      secondary: '#1e293b',
      text: '#171717',
    };

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.bg,
            backgroundImage: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.secondary}20 100%)`,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary}15 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${colors.secondary}15 0%, transparent 50%)`,
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {/* Logo/Avatar */}
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '60px',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px',
                fontSize: '48px',
                fontWeight: 'bold',
                color: colors.bg,
              }}
            >
              IS
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: colors.text,
                margin: '0 0 20px 0',
                lineHeight: 1.1,
                maxWidth: '900px',
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '24px',
                color: colors.text,
                opacity: 0.8,
                margin: 0,
                maxWidth: '700px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </p>

            {/* Accent Line */}
            <div
              style={{
                width: '100px',
                height: '4px',
                background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                marginTop: '40px',
                borderRadius: '2px',
              }}
            />
          </div>

          {/* Bottom Brand */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: colors.text,
              opacity: 0.6,
              fontSize: '18px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '12px',
                background: colors.primary,
              }}
            />
            imran-safdar.dev
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
