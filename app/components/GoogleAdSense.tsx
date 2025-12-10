'use client';

import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface GoogleAdSenseProps {
    slot: string;
    client?: string;
    className?: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
}


const GoogleAdSense: React.FC<GoogleAdSenseProps> = ({
    slot,
    client = 'ca-pub-5130489904430960',
    className = '',
    style = { display: 'block' },
    format = 'auto',
    layoutKey
}) => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // Check if element is visible (has dimensions or offsetParent)
            if (adRef.current && adRef.current.offsetParent !== null) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, [slot]); // Run when slot changes, though mostly once on mount.

    return (
        <div className={`ad-container ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={style}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
                {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
            />
        </div>
    );
};

export default GoogleAdSense;
