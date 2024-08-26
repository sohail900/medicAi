/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            backgroundColor: {
                'primary-color': '#10B981',
                'secondary-color': '#000',
            },
            textColor: {
                'primary-color': '#10B981',
                'secondary-color': '#000',
                'tertiary-color': '#6B6B6B',
                'neutral-color': '#9F9F9F;',
            },
            backgroundImage: {
                'custom-gradient':
                    'linear-gradient(201.7deg, #10B981 1.43%, #048A5E 101.67%)',
            },
            boxShadow: {
                'primary-shadow': '0px 3.5px 52.54px 0px #0000000A',
                'secondary-shadow': '0px 4px 40px 0px #00000008',
            },
            fontSize: {
                'label-text': '1rem',
                'title-text': '2.1rem',
                'hero-title': '3.1rem',
            },
            dropShadow: {
                drop: '0.5px 0.5px 15px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
}
