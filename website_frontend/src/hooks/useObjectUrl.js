import { useEffect, useState } from "react";

// A temporary URL for previewing a picked file, or null when there's no file. The URL is
// released when the file changes or the component unmounts, and cleared with it.
export function useObjectUrl(file) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (!file) {
            setUrl(null);
            return undefined;
        }
        const objectUrl = URL.createObjectURL(file);
        setUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return url;
}
