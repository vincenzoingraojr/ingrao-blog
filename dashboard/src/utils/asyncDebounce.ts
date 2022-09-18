export function debounceAsync(func: any, waitMs: number) {
    let timeout: number | NodeJS.Timeout = null!;

    return (...args: any) => {
        clearTimeout(timeout);

        return new Promise((resolve) => {
            timeout = setTimeout(() => resolve(func(...args)), waitMs);
        });
    };
}
