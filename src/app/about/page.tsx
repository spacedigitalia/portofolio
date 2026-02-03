import React, { Fragment } from 'react'

import About from '@/hooks/about/About'

import { AboutSchema, AboutBreadcrumbSchema } from "@/lib/Script";

import { fetchAboutContents } from "@/utils/FetchAbout";

import { fetchSkillsContents } from "@/utils/FetchSkils";

import { fetchAchievementsContents } from '@/utils/FetchAchievements';

import { generateMetadata as getAboutMetadata } from '@/hooks/about/meta/metadata'

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getAboutMetadata();
    return metadata;
}

export default async function page() {
    const aboutData = await fetchAboutContents();
    const skillsData = await fetchSkillsContents();
    const achievementsData = await fetchAchievementsContents();

    return (
        <Fragment>
            <AboutBreadcrumbSchema />
            <AboutSchema />
            <About aboutData={aboutData} skillsData={skillsData} achievementsData={achievementsData} />
        </Fragment>
    );
}