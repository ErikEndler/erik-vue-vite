export interface CurrencyFormatOptions {
  style: 'currency'
  currency: string
}

const numberFormats = {
  en: {
    currencyFormat: {
      style: 'currency',
      currency: 'USD'
    } as CurrencyFormatOptions
  },
  pt: {
    currencyFormat: {
      style: 'currency',
      currency: 'BRL'
    } as CurrencyFormatOptions
  }
}

export default numberFormats
