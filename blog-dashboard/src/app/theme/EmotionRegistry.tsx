'use client';

import createCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

export default function EmotionRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cache] = useState(() => {
        const cache = createCache({ key: 'mui-cache' });
        cache.compat = true;
        return cache;
    });

    useServerInsertedHTML(() => {
        return (
            <style
                data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: Object.values(cache.inserted).join(' '),
                }}
            />
        );
    });

    return <EmotionCacheProvider value={cache}>{children}</EmotionCacheProvider>;
}