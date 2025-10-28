import React from 'react'

import type { Metadata } from 'next'

import NotFound from "@/hooks/notfound/NotFound"

export const metadata: Metadata = {
    title: 'Not Found | Rizki Ramadhan',
    description: 'The page you are looking for does not exist. Full Stack Developer & Creative Digital Solutions.',
    openGraph: {
        title: 'Not Found | Rizki Ramadhan',
        description: 'The page you are looking for does not exist. Full Stack Developer & Creative Digital Solutions.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Not Found | Rizki Ramadhan',
        description: 'The page you are looking for does not exist. Full Stack Developer & Creative Digital Solutions.',
    },
}

export default function notfound() {
    return (
        <NotFound />
    )
}