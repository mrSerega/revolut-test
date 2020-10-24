import { Currency } from '../typings/currency';

export class MockServerApi {
    static async exchange(
    //     {
    //     // fromValue,
    //     // fromCurrency,
    //     // toCurrency
    // }: {
    //     fromValue: number,
    //     fromCurrency: Currency,
    //     toCurrency: Currency
    // }
    ): Promise<number> {
        return new Promise((res, rej) => {
            setTimeout(() => res(1337), 1000) // TODO:
        })
    }
}