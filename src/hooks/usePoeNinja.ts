
import { useState, useEffect } from 'react';

const POE_NINJA_API = '/api/currencyoverview?league=Standard&type=Currency';

interface CurrencyData {
    lines: {
        currencyTypeName: string;
        chaosEquivalent: number;
    }[];
}

export const usePoeNinja = () => {
    const [divinePrice, setDivinePrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchDivinePrice = async () => {
            try {
                const response = await fetch(POE_NINJA_API);
                const data: CurrencyData = await response.json();
                console.log(data);
                const divineOrb = data.lines.find(c => c.currencyTypeName === 'Divine Orb');
                if (divineOrb) {
                    setDivinePrice(divineOrb.chaosEquivalent);
                }
            } catch (error) {
                console.error('Error fetching Divine Orb price:', error);
            }
        };

        fetchDivinePrice();
        const interval = setInterval(fetchDivinePrice, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return { divinePrice };
};
