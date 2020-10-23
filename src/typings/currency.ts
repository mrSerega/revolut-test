export enum Currency {
    GBP,
    USD,
    EUR
}

export const CurrencySymbolMapper: Record<Currency, string> = {
    [Currency.GBP]: '£',
    [Currency.USD]: '$',
    [Currency.EUR]: '€'
}

export const CurrencyNameMapper: Record<Currency, string> = {
    [Currency.GBP]: 'GBP',
    [Currency.USD]: 'USD',
    [Currency.EUR]: 'EUR'
}
