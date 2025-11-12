import React, {useRef} from "react";

interface PhysicalPhotoProps {
    src?: string;
    caption?: string;
    width?: number | string; // accepted values like 300 or "100%"
    selected?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    tabIndex?: number;
    role?: string;
    ariaSelected?: boolean;
}

export default function PhysicalPhoto({
                                            src = "/mnt/data/2b49cbe9-4639-4251-af9a-2cf84c7f4580.png",
                                            caption = "",
                                            width = 340,
                                            selected = false,
                                            onClick,
                                            onFocus,
                                            onBlur,
                                            tabIndex,
                                            role,
                                            ariaSelected
                                        }: PhysicalPhotoProps) {

    // Randomized subtle tilt and 3D orientation (computed once per mount)
    const tiltDeg = useRef((Math.random() * 10) - 5); // -5deg to +5deg
    const tiltXDeg = useRef((Math.random() * 6) - 3); // -3deg to +3deg
    const tiltYDeg = useRef((Math.random() * 6) - 3); // -3deg to +3deg

    const frameRadius = 4;

    const baseTransform = selected
        ? 'scale(1.5)'
        : `rotate(${tiltDeg.current}deg) rotateX(${tiltXDeg.current}deg) rotateY(${tiltYDeg.current}deg)`;

    const baseShadow = '0 10px 15px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10), inset 0 0.5px 0 rgba(255,255,255,0.8)';
    const focusRing = selected ? `, 0 0 0 4px var(--primary)` : '';

    return (
        <div style={{
            perspective: 1000,
            display: 'inline-block'
        }}>
            <div
                className="polaroid-frame"
                role={role}
                aria-selected={ariaSelected}
                tabIndex={tabIndex}
                onClick={onClick}
                style={{
                    position: 'relative',
                    minWidth: width,
                    background: '#fff',
                    borderRadius: frameRadius,
                    padding: 12,
                    cursor: onClick ? 'pointer' : 'default',
                    // multi-layer soft paper shadows + optional focus ring
                    boxShadow: baseShadow + focusRing,
                    transformStyle: 'preserve-3d',
                    transform: baseTransform,
                    transformOrigin: 'center',
                    transition: 'transform 250ms ease, box-shadow 200ms ease',
                    willChange: 'transform, box-shadow',
                    zIndex: selected ? 2 : 1,
                    // slight paper texture hint via background gradient
                    backgroundImage:
                        'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,248,248,0.98) 100%)'
                }}
            >
                <div style={{ position: 'relative', borderRadius: frameRadius - 2, overflow: 'hidden' }}>
                    <img src={src} alt={caption || 'Photo'} style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: frameRadius - 2,
                        transform: 'translateZ(1px)'
                    }} />

                    {/* Curvature/highlight overlay to emulate a gentle bend */}
                    <div aria-hidden={true} style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: frameRadius - 2,
                        pointerEvents: 'none',
                        background:
                            // top highlight and bottom shade (convex look)
                            'radial-gradient(ellipse at 50% -20%, rgba(255,255,255,0.35), transparent 60%),\
                             radial-gradient(ellipse at 50% 120%, rgba(0,0,0,0.20), transparent 60%),\
                             linear-gradient(90deg, rgba(0,0,0,0.10), rgba(255,255,255,0.10), rgba(0,0,0,0.10))',
                        boxShadow:
                            // subtle inner shadows along edges to suggest curve
                            'inset 0 14px 28px rgba(0,0,0,0.12), inset 0 -12px 24px rgba(0,0,0,0.10), inset 12px 0 24px rgba(0,0,0,0.08), inset -12px 0 24px rgba(0,0,0,0.08)'
                    }} />
                </div>

                {/* Caption area mimics thicker polaroid bottom */}
                <div style={{ paddingTop: 10, paddingBottom: 4 }}>
                    <p style={{
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: 'var(--text)',
                        margin: 0
                    }}>
                        {caption}
                    </p>
                </div>

                {/* Subtle outer curvature/shadow on the paper itself */}
                <div aria-hidden style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: frameRadius,
                    pointerEvents: 'none',
                    // faint vignette on the white frame to imply bend
                    boxShadow: 'inset 0 18px 28px rgba(0,0,0,0.06), inset 0 -14px 24px rgba(0,0,0,0.05)'
                }} />
            </div>
        </div>
    );
}

