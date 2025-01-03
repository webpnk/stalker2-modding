import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    app: {
        name: string;
        locales: string[];
        currentLocale: string;
        staticMode: boolean;
    };
    localizedUrls: {
        [key: string]: string;
    };
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Category = {
    id: number,
    name: string,
    slug: string,
    description: string,
    icon: string,
    color: string,
}

export type Post = {
    id: number,
    title: string,
    slug: string,
    body: string,
    seo_description: string,
    published_at: string,
    cover_image: string,
    category?: Category,
}

export type Mod = {
    id: number;
    name: string;
    summary: string;
    description: string;
    author: string;
    published_at: string;
    picture_url: string;
    source: string;
    source_url: string;
}
