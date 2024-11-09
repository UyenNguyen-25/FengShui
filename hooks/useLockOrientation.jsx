import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

export const useLockOrientation = (orientation) => {
    useEffect(() => {
        const lockOrientation = async () => {
            try {
                await ScreenOrientation.lockAsync(orientation);
            } catch (error) {
                console.warn("Failed to lock orientation:", error);
            }
        };
        lockOrientation();
    }, [orientation]);
};
