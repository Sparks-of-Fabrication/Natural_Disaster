import React from 'react';
import dynamic from 'next/dynamic';  // Dynamic import to prevent SSR issues

// Dynamically import the WebMap only on the client-side (to avoid SSR issues)
const WebMap = dynamic(() => import('@/components/WebMap'), { ssr: false });

const WebScreen: React.FC = () => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* Render the map only on web */}
            <WebMap />

        </div>
    );
};

export default WebScreen;
