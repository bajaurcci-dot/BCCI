// SSR Polyfills
if (typeof window === 'undefined') {
    console.log('[Poly-SSR] Initializing global storage polyfills');
    console.log('[Poly-SSR] Initial global.localStorage:', typeof (global as any).localStorage);
    if ((global as any).localStorage) {
        console.log('[Poly-SSR] Initial keys:', Object.keys((global as any).localStorage));
        console.log('[Poly-SSR] getItem type:', typeof (global as any).localStorage.getItem);
    }

    const noop = () => null;
    const noopObj = {
        getItem: noop,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
        key: () => null,
        length: 0
    };

    try {
        // Attempt to delete if it exists and is configurable
        delete (global as any).localStorage;
        delete (global as any).sessionStorage;

        Object.defineProperty(global, 'localStorage', {
            value: noopObj,
            writable: false,
            configurable: true
        });
        Object.defineProperty(global, 'sessionStorage', {
            value: noopObj,
            writable: false,
            configurable: true
        });
        console.log('[Poly-SSR] global.localStorage forced to noopObj');
    } catch (e) {
        console.log('[Poly-SSR] Emergency fallback for storage polyfill:', e);
        (global as any).localStorage = noopObj;
        (global as any).sessionStorage = noopObj;
    }
}
export { };
