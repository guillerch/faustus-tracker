import Joyride from 'react-joyride';
import type { CallBackProps, Step } from 'react-joyride';

interface TourProps {
    run: boolean;
    callback: (data: CallBackProps) => void;
}

const Tour: React.FC<TourProps> = ({ run, callback }) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 900;

    const baseSteps: Step[] = [
        {
            target: '#dashboard',
            content: 'This is the dashboard. Here you can see a summary of your transactions.',
            placement: isMobile ? 'center' : 'center',
            disableBeacon: true,
        },
        {
            target: '#new-trade-button',
            content: 'Click here to register a new trade transaction.',
            placement: isMobile ? 'center' : 'bottom',
            disableBeacon: true,
        },
        {
            target: '#new-single-button',
            content: 'Click here to register a single transaction (buy or sell).',
            placement: isMobile ? 'center' : 'bottom',
            disableBeacon: true,
        },
        {
            target: '#history-button',
            content: 'Click here to see your transaction history.',
            placement: isMobile ? 'center' : 'bottom',
            disableBeacon: true,
        }
    ];

    // On mobile we want tooltips centered and prevent the overlay from interfering with tappable elements.
    const joyrideProps: any = {
        steps: baseSteps,
        run,
        callback,
        continuous: true,
        showProgress: true,
        showSkipButton: true,
        disableOverlayClose: true,
        scrollToFirstStep: true,
        scrollOffset: isMobile ? 80 : 120,
        styles: {
            options: {
                backgroundColor: 'var(--surface-color)',
                overlayColor: 'rgba(0, 0, 0, 0.7)',
                primaryColor: 'var(--primary-color)',
                textColor: 'var(--text-color)',
                zIndex: 4000,
            },
            tooltip: {
                backgroundColor: 'var(--surface-color)',
                padding: '18px',
                fontSize: isMobile ? '15px' : '14px',
                fontFamily: 'Poppins, sans-serif'
            },
            buttonNext: {
                backgroundColor: 'var(--primary-color)',
                padding: '8px 16px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '4px',
                color: 'var(--white-color)'
            },
            buttonBack: {
                backgroundColor: 'transparent',
                color: 'var(--text-color)',
                padding: '8px 16px',
                fontSize: '14px',
                border: '1px solid var(--text-color-darker)',
                borderRadius: '4px',
                marginRight: '8px'
            }
        }
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Joyride {...joyrideProps} />
    );
};

export default Tour;
