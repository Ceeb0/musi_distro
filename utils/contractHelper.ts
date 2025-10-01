import { User, Beat } from '../types';

export const generateContractText = (
    beat: Beat,
    artist: User,
    producer: User,
    licenseType: 'Non-Exclusive' | 'Exclusive',
    price: number,
    formatCurrency: (amount: number) => string
): string => {
    const today = new Date().toLocaleDateString();

    const nonExclusiveTerms = `
- Licensee (Artist) receives limited rights to use the beat for one commercial recording or broadcast.
- The Producer retains full ownership and copyright of the original composition.
- The Producer may continue to sell non-exclusive licenses for this beat to other parties.
- Licensee must credit the Producer in all metadata or descriptions as "Produced by ${producer.name}".
    `;

    const exclusiveTerms = `
- Licensee (Artist) receives exclusive rights to use the beat for unlimited commercial recordings and broadcasts.
- The beat will be immediately removed from the CACSdistro marketplace and will no longer be sold or leased.
- The Producer agrees not to sell or lease this beat to any other party in the future.
- The Producer retains 50% of the publishing rights. The Licensee receives 50% of the publishing rights.
- Licensee must credit the Producer in all metadata or descriptions as "Produced by ${producer.name}".
    `;

    return `
-----------------------------------------
CACSdistro Beat Lease Agreement
-----------------------------------------

This agreement is made on ${today} between:

(1) The Producer: ${producer.name}
(2) The Licensee (Artist): ${artist.name}

-----------------------------------------
DETAILS OF LEASE
-----------------------------------------

Beat Title: "${beat.title}"
License Type: ${licenseType}
Lease Fee: ${formatCurrency(price)}

-----------------------------------------
TERMS & CONDITIONS
-----------------------------------------

${licenseType === 'Non-Exclusive' ? nonExclusiveTerms.trim() : exclusiveTerms.trim()}

-----------------------------------------
AGREEMENT
-----------------------------------------

By signing this document, the Licensee agrees to the terms and conditions outlined above. This document serves as a legally binding contract.

Producer: ${producer.name}
Licensee: ${artist.name} (Signed as: ${artist.name})

Date: ${today}
`;
};
