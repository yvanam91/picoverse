import { PageConfig } from '@/types/database'

export const DEFAULT_THEME: PageConfig = {
    colors: {
        background: '#ffffff',
        outerBackground: '#ffffff',
        primary: '#000000',
        secondary: '#e5e7eb',
        text: '#1f2937',
        link: '#000000',
        buttonText: '#ffffff'
    },
    typography: { fontFamily: 'inter' },
    borders: { radius: '8px', width: '1px', style: 'solid' },
    dividers: { style: 'solid', width: '1px', color: '#e5e7eb' },
    shadows: { style: 'none', opacity: 0.5 }
}
export const SYSTEM_THEME_ID = '00000000-0000-0000-0000-000000000000'
