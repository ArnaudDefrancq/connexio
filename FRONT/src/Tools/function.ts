export const allYears = ():Array<string> => {
    const currentYear: number = new Date().getFullYear();
    const years: Array<string> = [];
  
    for (let y = 1900; y <= currentYear; y++) {
        years.push(y.toString());
    }

    return years;
}