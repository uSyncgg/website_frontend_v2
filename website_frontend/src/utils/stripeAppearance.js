export const stripeAppearance = {
    theme: 'night',
    variables: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeightNormal: '500',
        borderRadius: '10px',
        colorBackground: 'rgb(21, 19, 26)',
        colorPrimary: '#8e6ace',
        accessibleColorOnColorPrimary: 'white',
        colorText: 'white',
        colorTextSecondary: 'rgb(170, 166, 178)',
        colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
        colorDanger: '#f28ba8',
        tabIconColor: 'rgb(170, 166, 178)',
        tabIconSelectedColor: '#8e6ace',
        logoColor: 'light'
    },
    rules: {
        '.Input': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'none'
        },
        '.Input:focus': {
            border: '1px solid #8e6ace',
            boxShadow: '0 0 0 3px rgba(142, 106, 206, 0.18)'
        },
        '.Tab': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        },
        '.Tab:hover': {
            border: '1px solid rgba(255, 255, 255, 0.25)'
        },
        '.Tab--selected': {
            backgroundColor: 'rgba(142, 106, 206, 0.12)',
            border: '1px solid #8e6ace'
        },
        '.Label': {
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: '600'
        }
    }
};

// Enable the skeleton loader UI for optimal loading.
export const stripeLoader = 'auto';
