import {useState, useRef, useCallback} from "react";

const LaptopSpin = ({className = "", ...props}) => {
    const [frame, setFrame] = useState(0); // current frame index (0-767)
    const startX = useRef(null);
    const isDragging = useRef(false);

    const handleMouseMove = useCallback((e) => {
        if (startX.current === null || !isDragging.current) return;

        const deltaX = e.clientX - startX.current;
        const sensitivity = 0.5; // Adjusted for 768 frames - ultra smooth rotation

        setFrame(prevFrame => {
            let newFrame = (prevFrame + Math.floor(deltaX / sensitivity)) % 768;
            if (newFrame < 0) newFrame += 768; // wrap around backwards
            return newFrame;
        });

        startX.current = e.clientX; // Update reference point for smooth movement
    }, []);

    const handleMouseUp = useCallback(() => {
        startX.current = null;
        isDragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((e) => {
        startX.current = e.clientX;
        isDragging.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        e.preventDefault(); // Prevent default drag behavior
    }, [handleMouseMove, handleMouseUp]);

    const handleTouchMove = useCallback((e) => {
        if (startX.current === null || !isDragging.current) return;

        const deltaX = e.touches[0].clientX - startX.current;
        const sensitivity = 0.5; // Adjusted for 768 frames - ultra smooth rotation

        setFrame(prevFrame => {
            let newFrame = (prevFrame + Math.floor(deltaX / sensitivity)) % 768;
            if (newFrame < 0) newFrame += 768;
            return newFrame;
        });

        startX.current = e.touches[0].clientX;
        e.preventDefault();
    }, []);

    const handleTouchEnd = useCallback(() => {
        startX.current = null;
        isDragging.current = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
    }, [handleTouchMove]);

    // Touch events for mobile support
    const handleTouchStart = useCallback((e) => {
        startX.current = e.touches[0].clientX;
        isDragging.current = true;
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleTouchEnd);
        e.preventDefault();
    }, [handleTouchMove, handleTouchEnd]);

    // Format frame number to match file naming (0001, 0002, etc.)
    const formatFrameNumber = (frameNum) => {
        return String(frameNum + 1).padStart(4, '0');
    };

    return (
        <div
            className={`w-full h-full flex justify-center items-center select-none cursor-grab active:cursor-grabbing ${className}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
                touchAction: 'none',
                backgroundColor: 'transparent', // Ensure transparent background
                minHeight: '100%', // Ensure full height is draggable
                position: 'relative' // Ensure proper positioning
            }}
            {...props}
        >
            <img
                src={`/frames/${formatFrameNumber(frame)}.png`}
                alt="Interactive Spinning Laptop"
                className="max-w-full max-h-full pointer-events-none"
                draggable="false"
                style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    backgroundColor: 'transparent' // Ensure image has transparent background
                }}
            />

            {/* Optional: Add instruction text */}
            <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none"
                style={{pointerEvents: 'none'}} // Ensure text doesn't interfere with dragging
            >
                Drag to rotate
            </div>
        </div>
    );
};

export default LaptopSpin;