import Script from "next/script";

export const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
    ]
};

// Breadcrumb for projects page
export const projectsBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://rizkiramadhan.web.id/projects" },
    ]
};

// Breadcrumb for articles page
export const articlesBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://rizkiramadhan.web.id/articles" },
    ]
};

// Dynamic breadcrumb for individual project pages
export const createProjectBreadcrumb = (project: ProjectDetails) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://rizkiramadhan.web.id/projects" },
        { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://rizkiramadhan.web.id/projects/${project.slug}` },
    ]
});

// Dynamic breadcrumb for individual article pages
export const createArticleBreadcrumb = (article: Article) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "Articles", "item": "https://rizkiramadhan.web.id/articles" },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://rizkiramadhan.web.id/articles/${article.slug}` },
    ]
});

export const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rizki Ramadhan",
    "url": "https://rizkiramadhan.web.id",
    "logo": "https://rizkiramadhan.web.id/favicon.ico",
    "description": "Full Stack Developer dan Creative Digital Solutions profesional dari Indonesia. Spesialis dalam pengembangan website modern, aplikasi web, UI/UX Design, dan solusi digital yang inovatif untuk bisnis.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Leuwiliang",
        "addressRegion": "Jawa Barat",
        "addressCountry": "ID",
        "postalCode": "16640"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-6.5614",
        "longitude": "106.6322"
    },
    "telephone": "+62-813-9863-2939",
    "email": "hallo@rizkiramadhan.web.id",
    "jobTitle": "Full Stack Developer",
    "worksFor": {
        "@type": "Organization",
        "name": "Rizki Ramadhan"
    },
    "knowsAbout": [
        "Web Development",
        "Full Stack Development",
        "UI/UX Design",
        "React Development",
        "Next.js Development",
        "Node.js Development",
        "Database Design",
        "API Development",
        "Mobile App Development",
        "E-commerce Development",
        "SEO Optimization",
        "Digital Marketing"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Solutions & Web Development Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Development"
                }
            }
        ]
    },
    "sameAs": [
        "https://www.facebook.com/rizki.ramadhan.419859",
        "https://github.com/Rizkiramadhan20",
        "https://www.instagram.com/rzkir.20",
        "https://www.tiktok.com/@rzkir.20",
        "https://www.linkedin.com/in/rizki-ramadhan12",
        "https://www.youtube.com/@codingwithrizki"
    ]
};

export const sitelinksJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rizki Ramadhan",
    "url": "https://rizkiramadhan.web.id",
    "description": "Full Stack Developer dan Creative Digital Solutions profesional dari Indonesia. Spesialis dalam pengembangan website modern, aplikasi web, UI/UX Design, dan solusi digital yang inovatif untuk bisnis.",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://rizkiramadhan.web.id/projects?search={search_term_string}",
        "query-input": "required name=search_term_string"
    },
    "mainEntity": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id",
        "sameAs": [
            "https://www.facebook.com/rizki.ramadhan.419859",
            "https://github.com/Rizkiramadhan20",
            "https://www.instagram.com/rzkir.20",
            "https://www.tiktok.com/@rzkir.20",
            "https://www.linkedin.com/in/rizki-ramadhan12",
            "https://www.youtube.com/@codingwithrizki"
        ]
    }
};

export const OrganizationSchema = () => (
    <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
        }}
        strategy="afterInteractive"
    />
);

export const BreadcrumbSchema = () => (
    <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
        }}
        strategy="afterInteractive"
    />
);

export const ProjectsBreadcrumbSchema = () => (
    <Script
        id="projects-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectsBreadcrumbJsonLd),
        }}
        strategy="afterInteractive"
    />
);

export const ProjectBreadcrumbSchema = ({ project }: { project: ProjectDetails }) => (
    <Script
        id="project-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createProjectBreadcrumb(project)),
        }}
        strategy="afterInteractive"
    />
);

export const SitelinksSchema = () => (
    <Script
        id="sitelinks-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(sitelinksJsonLd),
        }}
        strategy="afterInteractive"
    />
);

// Projects Schema - ItemList for projects page
export const createProjectsSchema = (projectsData: ProjectsContentProps[]) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rizki Ramadhan - Portfolio Projects",
    "description": "Koleksi proyek web development dan digital solutions yang telah dikerjakan oleh Rizki Ramadhan",
    "url": "https://rizkiramadhan.web.id/projects",
    "numberOfItems": projectsData.length,
    "itemListElement": projectsData.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "CreativeWork",
            "@id": `https://rizkiramadhan.web.id/projects/${project.slug}`,
            "name": project.title,
            "description": project.description,
            "url": `https://rizkiramadhan.web.id/projects/${project.slug}`,
            "image": project.thumbnail,
            "author": {
                "@type": "Person",
                "name": "Rizki Ramadhan",
                "url": "https://rizkiramadhan.web.id"
            },
            "creator": {
                "@type": "Person",
                "name": "Rizki Ramadhan",
                "url": "https://rizkiramadhan.web.id"
            },
            "dateCreated": project.createdAt,
            "dateModified": project.updatedAt,
            "genre": project.category,
            "keywords": project.frameworks?.map(f => f.title).join(", "),
            "about": project.category,
            "isPartOf": {
                "@type": "WebSite",
                "name": "Rizki Ramadhan Portfolio",
                "url": "https://rizkiramadhan.web.id"
            },
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://rizkiramadhan.web.id/projects/${project.slug}`
            },
            "offers": {
                "@type": "Offer",
                "url": project.previewLink,
                "availability": "https://schema.org/InStock",
                "price": "0",
                "priceCurrency": "IDR"
            }
        }
    }))
});

// Individual Project Schema
export const createProjectSchema = (project: ProjectDetails) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://rizkiramadhan.web.id/projects/${project.slug}`,
    "name": project.title,
    "description": project.description,
    "url": `https://rizkiramadhan.web.id/projects/${project.slug}`,
    "image": project.thumbnail,
    "author": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id",
        "sameAs": [
            "https://www.facebook.com/rizki.ramadhan.419859",
            "https://github.com/Rizkiramadhan20",
            "https://www.instagram.com/rzkir.20",
            "https://www.tiktok.com/@rzkir.20",
            "https://www.linkedin.com/in/rizki-ramadhan12",
            "https://www.youtube.com/@codingwithrizki"
        ]
    },
    "creator": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id"
    },
    "dateCreated": project.createdAt,
    "dateModified": project.updatedAt,
    "genre": project.category,
    "keywords": project.frameworks?.map(f => f.title).join(", "),
    "about": project.category,
    "isPartOf": {
        "@type": "WebSite",
        "name": "Rizki Ramadhan Portfolio",
        "url": "https://rizkiramadhan.web.id"
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://rizkiramadhan.web.id/projects/${project.slug}`
    },
    "offers": {
        "@type": "Offer",
        "url": project.previewLink,
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "IDR"
    },
    "workExample": project.imageUrl?.map(image => ({
        "@type": "ImageObject",
        "url": image,
        "name": project.title
    }))
});

// Projects Schema Component
export const ProjectsSchema = ({ projectsData }: { projectsData: ProjectsContentProps[] }) => (
    <Script
        id="projects-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createProjectsSchema(projectsData)),
        }}
        strategy="afterInteractive"
    />
);

// Individual Project Schema Component
export const ProjectSchema = ({ project }: { project: ProjectDetails }) => (
    <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createProjectSchema(project)),
        }}
        strategy="afterInteractive"
    />
);

// Individual Article Schema
export const createArticleSchema = (article: Article) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://rizkiramadhan.web.id/articles/${article.slug}`,
    "headline": article.title,
    "description": article.description,
    "url": `https://rizkiramadhan.web.id/articles/${article.slug}`,
    "image": article.thumbnail,
    "author": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id",
        "sameAs": [
            "https://www.facebook.com/rizki.ramadhan.419859",
            "https://github.com/Rizkiramadhan20",
            "https://www.instagram.com/rzkir.20",
            "https://www.tiktok.com/@rzkir.20",
            "https://www.linkedin.com/in/rizki-ramadhan12",
            "https://www.youtube.com/@codingwithrizki"
        ]
    },
    "publisher": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id"
    },
    "datePublished": article.createdAt,
    "dateModified": article.updatedAt,
    "articleSection": article.category,
    "keywords": article.category,
    "isPartOf": {
        "@type": "WebSite",
        "name": "Rizki Ramadhan Portfolio",
        "url": "https://rizkiramadhan.web.id"
    },
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://rizkiramadhan.web.id/articles/${article.slug}`
    }
});

// Article Breadcrumb Schema Component
export const ArticleBreadcrumbSchema = ({ article }: { article: Article }) => (
    <Script
        id="article-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createArticleBreadcrumb(article)),
        }}
        strategy="afterInteractive"
    />
);

// Individual Article Schema Component
export const ArticleSchema = ({ article }: { article: Article }) => (
    <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createArticleSchema(article)),
        }}
        strategy="afterInteractive"
    />
);

// Articles List Schema
export const createArticlesSchema = (articlesData: Article[]) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Articles - Rizki Ramadhan",
    "description": "Collection of articles and blog posts by Rizki Ramadhan",
    "url": "https://rizkiramadhan.web.id/articles",
    "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": articlesData.length,
        "itemListElement": articlesData.map((article, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Article",
                "name": article.title,
                "description": article.description,
                "url": `https://rizkiramadhan.web.id/articles/${article.slug}`,
                "image": article.thumbnail,
                "author": {
                    "@type": "Person",
                    "name": "Rizki Ramadhan"
                },
                "datePublished": article.createdAt,
                "articleSection": article.category
            }
        }))
    }
});

// Articles Schema Component
export const ArticlesSchema = ({ articlesData }: { articlesData: Article[] }) => (
    <Script
        id="articles-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createArticlesSchema(articlesData)),
        }}
        strategy="afterInteractive"
    />
);

// Articles Breadcrumb Schema Component
export const ArticlesBreadcrumbSchema = () => (
    <Script
        id="articles-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(articlesBreadcrumbJsonLd),
        }}
        strategy="afterInteractive"
    />
);

// Breadcrumb for contacts page
export const contactsBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://rizkiramadhan.web.id/contacts" },
    ]
};

// Contact Schema
export const createContactSchema = () => ({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact - Rizki Ramadhan",
    "description": "Get in touch with Rizki Ramadhan for web development and digital solutions",
    "url": "https://rizkiramadhan.web.id/contacts",
    "mainEntity": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id",
        "telephone": "+62-813-9863-2939",
        "email": "hallo@rizkiramadhan.web.id",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Leuwiliang",
            "addressRegion": "Jawa Barat",
            "addressCountry": "ID",
            "postalCode": "16640"
        },
        "sameAs": [
            "https://www.facebook.com/rizki.ramadhan.419859",
            "https://github.com/Rizkiramadhan20",
            "https://www.instagram.com/rzkir.20",
            "https://www.tiktok.com/@rzkir.20",
            "https://www.linkedin.com/in/rizki-ramadhan12",
            "https://www.youtube.com/@codingwithrizki"
        ]
    }
});

// Contacts Breadcrumb Schema Component
export const ContactsBreadcrumbSchema = () => (
    <Script
        id="contacts-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactsBreadcrumbJsonLd),
        }}
        strategy="afterInteractive"
    />
);

// Contacts Schema Component
export const ContactsSchema = () => (
    <Script
        id="contacts-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createContactSchema()),
        }}
        strategy="afterInteractive"
    />
);

// Breadcrumb for about page
export const aboutBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://rizkiramadhan.web.id" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://rizkiramadhan.web.id/about" },
    ]
};

// About Schema
export const createAboutSchema = () => ({
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About - Rizki Ramadhan",
    "description": "Learn more about Rizki Ramadhan, a Full Stack Developer and Creative Digital Solutions professional from Indonesia",
    "url": "https://rizkiramadhan.web.id/about",
    "mainEntity": {
        "@type": "Person",
        "name": "Rizki Ramadhan",
        "url": "https://rizkiramadhan.web.id",
        "jobTitle": "Full Stack Developer",
        "description": "Full Stack Developer dan Creative Digital Solutions profesional dari Indonesia. Spesialis dalam pengembangan website modern, aplikasi web, UI/UX Design, dan solusi digital yang inovatif untuk bisnis.",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Leuwiliang",
            "addressRegion": "Jawa Barat",
            "addressCountry": "ID",
            "postalCode": "16640"
        },
        "telephone": "+62-813-9863-2939",
        "email": "hallo@rizkiramadhan.web.id",
        "sameAs": [
            "https://www.facebook.com/rizki.ramadhan.419859",
            "https://github.com/Rizkiramadhan20",
            "https://www.instagram.com/rzkir.20",
            "https://www.tiktok.com/@rzkir.20",
            "https://www.linkedin.com/in/rizki-ramadhan12",
            "https://www.youtube.com/@codingwithrizki"
        ]
    }
});

// About Breadcrumb Schema Component
export const AboutBreadcrumbSchema = () => (
    <Script
        id="about-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutBreadcrumbJsonLd),
        }}
        strategy="afterInteractive"
    />
);

// About Schema Component
export const AboutSchema = () => (
    <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(createAboutSchema()),
        }}
        strategy="afterInteractive"
    />
);

export const AllSchemas = () => (
    <>
        <OrganizationSchema />
        <BreadcrumbSchema />
        <SitelinksSchema />
    </>
);
