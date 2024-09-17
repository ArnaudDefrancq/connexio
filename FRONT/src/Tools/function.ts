// Permet d'avoir un tableau d'année
export const allYears = ():Array<string> => {
    const currentYear: number = new Date().getFullYear();
    const years: Array<string> = [];
  
    for (let y = 1900; y <= currentYear; y++) {
        years.push(y.toString());
    }

    return years;
}

// Permet de set le localStorage
export const setDataLocalStorage = (storageKey: string, node: string, value: string | number | boolean): void => {
    const storedData = localStorage.getItem(storageKey);
    if (!storedData) {
        return;
    }
    const data = JSON.parse(storedData);

    data[node] = value;

    localStorage.setItem(storageKey, JSON.stringify(data));
}

// Permet de delete et remttrer le localStorage
export const deleteAndCreateLocalStorage = <T>(storageKey: string, data:T): boolean => {
    try {
        localStorage.removeItem(storageKey);
        const valueToStore = typeof data === 'string' ? data : JSON.stringify(data);
        localStorage.setItem(storageKey, valueToStore);
        return true;
    } catch (error) {
        console.log("Erreur lors de l'accès au localStorage :", error);
        return false;        
    }
}

// Permet de prendre une date dd/mm/yyyy et de rendre un timestamp
export const dateToTimestamp = (date: string): number => {
    const [day, month, year] = date.split('/').map(Number);
    const timestamp = new Date(year, month - 1, day).getTime();
    return timestamp / 1000;
}

// Perme de donner la date à partir d'un timestamp
export const timestampToDate = (timestamp: number): string => {
    return (timestamp * 1000).toLocaleString('fr-FR');
}