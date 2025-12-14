export interface InvoiceItem {
  id: string;
  quantity: number;
  description: string;
  unitPrice: number;
  amount: number;
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

// All world currencies
export const CURRENCIES: CurrencyInfo[] = [
  // Major currencies
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  // European currencies
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
  // Middle East & Turkey
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'ب.د', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound' },
  { code: 'LBP', symbol: 'ل.ل', name: 'Lebanese Pound' },
  { code: 'IQD', symbol: 'ع.د', name: 'Iraqi Dinar' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  // Asia Pacific
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: '₨', name: 'Sri Lankan Rupee' },
  { code: 'NPR', symbol: '₨', name: 'Nepalese Rupee' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'MMK', symbol: 'K', name: 'Myanmar Kyat' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tugrik' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'сум', name: 'Uzbekistani Som' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
  // Americas
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ARS', symbol: 'AR$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: 'CL$', name: 'Chilean Peso' },
  { code: 'COP', symbol: 'COL$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolívar' },
  { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
  { code: 'CRC', symbol: '₡', name: 'Costa Rican Colón' },
  { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal' },
  { code: 'HNL', symbol: 'L', name: 'Honduran Lempira' },
  { code: 'NIO', symbol: 'C$', name: 'Nicaraguan Córdoba' },
  { code: 'PAB', symbol: 'B/.', name: 'Panamanian Balboa' },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad Dollar' },
  { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar' },
  { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar' },
  { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar' },
  // Africa
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: 'GH₵', name: 'Ghanaian Cedi' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  { code: 'ETB', symbol: 'Br', name: 'Ethiopian Birr' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA' },
  { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee' },
  { code: 'SCR', symbol: '₨', name: 'Seychellois Rupee' },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula' },
  { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar' },
  { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
  { code: 'MWK', symbol: 'MK', name: 'Malawian Kwacha' },
  { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc' },
  // Oceania
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar' },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina' },
  { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga' },
  { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },
  { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar' },
  // Crypto (common)
  { code: 'BTC', symbol: '₿', name: 'Bitcoin' },
  { code: 'ETH', symbol: 'Ξ', name: 'Ethereum' },
  { code: 'USDT', symbol: '₮', name: 'Tether' },
];

export type Language = 'tr' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'nl' | 'ru' | 'ar' | 'zh' | 'ja' | 'ko';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageInfo[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
];

export interface Translations {
  invoice: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  poNumber: string;
  billTo: string;
  shipTo: string;
  quantity: string;
  description: string;
  unitPrice: string;
  amount: string;
  subtotal: string;
  tax: string;
  total: string;
  termsAndConditions: string;
  notes: string;
  paymentDetails: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  tr: {
    invoice: 'FATURA',
    invoiceNumber: 'Fatura No',
    invoiceDate: 'Fatura Tarihi',
    dueDate: 'Vade Tarihi',
    poNumber: 'P.O. No',
    billTo: 'Fatura Adresi',
    shipTo: 'Teslimat Adresi',
    quantity: 'MİKTAR',
    description: 'AÇIKLAMA',
    unitPrice: 'BİRİM FİYAT',
    amount: 'TUTAR',
    subtotal: 'Ara Toplam',
    tax: 'Vergi',
    total: 'TOPLAM',
    termsAndConditions: 'Şartlar ve Koşullar',
    notes: 'Notlar',
    paymentDetails: 'Ödeme Bilgileri',
  },
  en: {
    invoice: 'INVOICE',
    invoiceNumber: 'Invoice #',
    invoiceDate: 'Invoice Date',
    dueDate: 'Due Date',
    poNumber: 'P.O. #',
    billTo: 'Bill To',
    shipTo: 'Ship To',
    quantity: 'QTY',
    description: 'DESCRIPTION',
    unitPrice: 'UNIT PRICE',
    amount: 'AMOUNT',
    subtotal: 'Subtotal',
    tax: 'Tax',
    total: 'TOTAL',
    termsAndConditions: 'Terms & Conditions',
    notes: 'Notes',
    paymentDetails: 'Payment Details',
  },
  de: {
    invoice: 'RECHNUNG',
    invoiceNumber: 'Rechnungsnr.',
    invoiceDate: 'Rechnungsdatum',
    dueDate: 'Fälligkeitsdatum',
    poNumber: 'Bestellnr.',
    billTo: 'Rechnungsadresse',
    shipTo: 'Lieferadresse',
    quantity: 'MENGE',
    description: 'BESCHREIBUNG',
    unitPrice: 'STÜCKPREIS',
    amount: 'BETRAG',
    subtotal: 'Zwischensumme',
    tax: 'MwSt.',
    total: 'GESAMT',
    termsAndConditions: 'Geschäftsbedingungen',
    notes: 'Anmerkungen',
    paymentDetails: 'Zahlungsinformationen',
  },
  fr: {
    invoice: 'FACTURE',
    invoiceNumber: 'N° Facture',
    invoiceDate: 'Date Facture',
    dueDate: 'Date d\'échéance',
    poNumber: 'N° Commande',
    billTo: 'Facturer à',
    shipTo: 'Livrer à',
    quantity: 'QTÉ',
    description: 'DESCRIPTION',
    unitPrice: 'PRIX UNIT.',
    amount: 'MONTANT',
    subtotal: 'Sous-total',
    tax: 'TVA',
    total: 'TOTAL',
    termsAndConditions: 'Conditions Générales',
    notes: 'Notes',
    paymentDetails: 'Informations de Paiement',
  },
  es: {
    invoice: 'FACTURA',
    invoiceNumber: 'N° Factura',
    invoiceDate: 'Fecha Factura',
    dueDate: 'Fecha Vencimiento',
    poNumber: 'N° Pedido',
    billTo: 'Facturar a',
    shipTo: 'Enviar a',
    quantity: 'CANT.',
    description: 'DESCRIPCIÓN',
    unitPrice: 'PRECIO UNIT.',
    amount: 'IMPORTE',
    subtotal: 'Subtotal',
    tax: 'IVA',
    total: 'TOTAL',
    termsAndConditions: 'Términos y Condiciones',
    notes: 'Notas',
    paymentDetails: 'Datos de Pago',
  },
  it: {
    invoice: 'FATTURA',
    invoiceNumber: 'N° Fattura',
    invoiceDate: 'Data Fattura',
    dueDate: 'Data Scadenza',
    poNumber: 'N° Ordine',
    billTo: 'Fatturare a',
    shipTo: 'Spedire a',
    quantity: 'QTÀ',
    description: 'DESCRIZIONE',
    unitPrice: 'PREZZO UNIT.',
    amount: 'IMPORTO',
    subtotal: 'Subtotale',
    tax: 'IVA',
    total: 'TOTALE',
    termsAndConditions: 'Termini e Condizioni',
    notes: 'Note',
    paymentDetails: 'Dettagli Pagamento',
  },
  pt: {
    invoice: 'FATURA',
    invoiceNumber: 'N° Fatura',
    invoiceDate: 'Data Fatura',
    dueDate: 'Data Vencimento',
    poNumber: 'N° Pedido',
    billTo: 'Faturar para',
    shipTo: 'Enviar para',
    quantity: 'QTD',
    description: 'DESCRIÇÃO',
    unitPrice: 'PREÇO UNIT.',
    amount: 'VALOR',
    subtotal: 'Subtotal',
    tax: 'IVA',
    total: 'TOTAL',
    termsAndConditions: 'Termos e Condições',
    notes: 'Notas',
    paymentDetails: 'Dados de Pagamento',
  },
  nl: {
    invoice: 'FACTUUR',
    invoiceNumber: 'Factuurnr.',
    invoiceDate: 'Factuurdatum',
    dueDate: 'Vervaldatum',
    poNumber: 'Bestelnr.',
    billTo: 'Factuuradres',
    shipTo: 'Afleveradres',
    quantity: 'AANTAL',
    description: 'OMSCHRIJVING',
    unitPrice: 'STUKPRIJS',
    amount: 'BEDRAG',
    subtotal: 'Subtotaal',
    tax: 'BTW',
    total: 'TOTAAL',
    termsAndConditions: 'Algemene Voorwaarden',
    notes: 'Opmerkingen',
    paymentDetails: 'Betalingsgegevens',
  },
  ru: {
    invoice: 'СЧЁТ',
    invoiceNumber: '№ Счёта',
    invoiceDate: 'Дата счёта',
    dueDate: 'Срок оплаты',
    poNumber: '№ Заказа',
    billTo: 'Плательщик',
    shipTo: 'Адрес доставки',
    quantity: 'КОЛ-ВО',
    description: 'ОПИСАНИЕ',
    unitPrice: 'ЦЕНА',
    amount: 'СУММА',
    subtotal: 'Подытог',
    tax: 'НДС',
    total: 'ИТОГО',
    termsAndConditions: 'Условия',
    notes: 'Примечания',
    paymentDetails: 'Реквизиты для оплаты',
  },
  ar: {
    invoice: 'فاتورة',
    invoiceNumber: 'رقم الفاتورة',
    invoiceDate: 'تاريخ الفاتورة',
    dueDate: 'تاريخ الاستحقاق',
    poNumber: 'رقم الطلب',
    billTo: 'الفاتورة إلى',
    shipTo: 'الشحن إلى',
    quantity: 'الكمية',
    description: 'الوصف',
    unitPrice: 'سعر الوحدة',
    amount: 'المبلغ',
    subtotal: 'المجموع الفرعي',
    tax: 'الضريبة',
    total: 'المجموع',
    termsAndConditions: 'الشروط والأحكام',
    notes: 'ملاحظات',
    paymentDetails: 'تفاصيل الدفع',
  },
  zh: {
    invoice: '发票',
    invoiceNumber: '发票号',
    invoiceDate: '发票日期',
    dueDate: '到期日',
    poNumber: '订单号',
    billTo: '账单地址',
    shipTo: '送货地址',
    quantity: '数量',
    description: '描述',
    unitPrice: '单价',
    amount: '金额',
    subtotal: '小计',
    tax: '税额',
    total: '总计',
    termsAndConditions: '条款和条件',
    notes: '备注',
    paymentDetails: '付款信息',
  },
  ja: {
    invoice: '請求書',
    invoiceNumber: '請求書番号',
    invoiceDate: '請求日',
    dueDate: '支払期限',
    poNumber: '注文番号',
    billTo: '請求先',
    shipTo: '送付先',
    quantity: '数量',
    description: '品目',
    unitPrice: '単価',
    amount: '金額',
    subtotal: '小計',
    tax: '消費税',
    total: '合計',
    termsAndConditions: '利用規約',
    notes: '備考',
    paymentDetails: 'お支払い情報',
  },
  ko: {
    invoice: '청구서',
    invoiceNumber: '청구서 번호',
    invoiceDate: '청구일',
    dueDate: '만기일',
    poNumber: '주문 번호',
    billTo: '청구지',
    shipTo: '배송지',
    quantity: '수량',
    description: '품목',
    unitPrice: '단가',
    amount: '금액',
    subtotal: '소계',
    tax: '세금',
    total: '합계',
    termsAndConditions: '이용약관',
    notes: '참고',
    paymentDetails: '결제 정보',
  },
};

export type DecimalPlaces = 2 | 3;

// System UI Language (for form interface)
export type SystemLanguage = 'tr' | 'en' | 'de' | 'fr' | 'es';

export interface SystemLanguageInfo {
  code: SystemLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SYSTEM_LANGUAGES: SystemLanguageInfo[] = [
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
];

export interface SystemUITranslations {
  title: string;
  subtitle: string;
  invoiceLanguageAndCurrency: string;
  invoiceLanguage: string;
  currency: string;
  searchCurrency: string;
  selected: string;
  decimalPlaces: string;
  digits2: string;
  digits3: string;
  decimalNote: string;
  companyInfo: string;
  companyLogo: string;
  uploadLogo: string;
  logoFormat: string;
  companyName: string;
  companyAddress: string;
  email: string;
  phone: string;
  invoiceDetails: string;
  invoiceNumber: string;
  poNumber: string;
  taxOptions: string;
  withTax: string;
  withoutTax: string;
  taxRate: string;
  invoiceDate: string;
  dueDate: string;
  customerInfo: string;
  billTo: string;
  shipTo: string;
  productsServices: string;
  quantity: string;
  description: string;
  unitPrice: string;
  amount: string;
  addItem: string;
  removeItem: string;
  paymentInfo: string;
  paymentPlaceholder: string;
  termsAndConditions: string;
  termsPlaceholder: string;
  notes: string;
  notesPlaceholder: string;
  subtotal: string;
  tax: string;
  total: string;
  generateInvoice: string;
  clearDraft: string;
  confirmClearDraft: string;
}

export const SYSTEM_UI_TRANSLATIONS: Record<SystemLanguage, SystemUITranslations> = {
  tr: {
    title: 'Fatura Oluşturucu',
    subtitle: 'Profesyonel faturalarınızı kolayca oluşturun',
    invoiceLanguageAndCurrency: 'Fatura Dili ve Para Birimi',
    invoiceLanguage: 'Fatura Dili',
    currency: 'Para Birimi',
    searchCurrency: 'Para birimi ara...',
    selected: 'Seçili',
    decimalPlaces: 'Ondalık Basamak',
    digits2: '2 Basamak',
    digits3: '3 Basamak',
    decimalNote: 'Tutar, toplam vb. gösterimde kullanılır',
    companyInfo: 'Şirket Bilgileri',
    companyLogo: 'Şirket Logosu (Opsiyonel)',
    uploadLogo: 'Logo yüklemek için tıklayın',
    logoFormat: 'PNG, JPG (maks. 2MB)',
    companyName: 'Şirket Adı',
    companyAddress: 'Şirket Adresi',
    email: 'E-posta',
    phone: 'Telefon',
    invoiceDetails: 'Fatura Detayları',
    invoiceNumber: 'Fatura Numarası',
    poNumber: 'P.O. Numarası',
    taxOptions: 'Vergi Seçeneği',
    withTax: 'Vergili',
    withoutTax: 'Vergisiz',
    taxRate: 'Vergi Oranı (%)',
    invoiceDate: 'Fatura Tarihi',
    dueDate: 'Vade Tarihi',
    customerInfo: 'Müşteri Bilgileri',
    billTo: 'Fatura Adresi',
    shipTo: 'Teslimat Adresi',
    productsServices: 'Ürün / Hizmetler',
    quantity: 'Miktar',
    description: 'Açıklama',
    unitPrice: 'Birim Fiyat',
    amount: 'Tutar',
    addItem: 'Ürün/Hizmet Ekle',
    removeItem: 'Öğeyi kaldır',
    paymentInfo: 'Ödeme Bilgileri',
    paymentPlaceholder: 'Banka:\nIBAN:\nHesap Sahibi:',
    termsAndConditions: 'Şartlar ve Koşullar',
    termsPlaceholder: 'Ödeme vadesi 15 gündür',
    notes: 'Notlar',
    notesPlaceholder: 'Fatura ile ilgili ek notlar...',
    subtotal: 'Ara Toplam',
    tax: 'Vergi',
    total: 'Toplam',
    generateInvoice: 'Fatura Oluştur',
    clearDraft: 'Taslağı Temizle',
    confirmClearDraft: 'Taslak silinecek. Emin misiniz?',
  },
  en: {
    title: 'Invoice Generator',
    subtitle: 'Create professional invoices easily',
    invoiceLanguageAndCurrency: 'Invoice Language & Currency',
    invoiceLanguage: 'Invoice Language',
    currency: 'Currency',
    searchCurrency: 'Search currency...',
    selected: 'Selected',
    decimalPlaces: 'Decimal Places',
    digits2: '2 Digits',
    digits3: '3 Digits',
    decimalNote: 'Used for amount, total display',
    companyInfo: 'Company Information',
    companyLogo: 'Company Logo (Optional)',
    uploadLogo: 'Click to upload logo',
    logoFormat: 'PNG, JPG (max. 2MB)',
    companyName: 'Company Name',
    companyAddress: 'Company Address',
    email: 'Email',
    phone: 'Phone',
    invoiceDetails: 'Invoice Details',
    invoiceNumber: 'Invoice Number',
    poNumber: 'P.O. Number',
    taxOptions: 'Tax Option',
    withTax: 'With Tax',
    withoutTax: 'Without Tax',
    taxRate: 'Tax Rate (%)',
    invoiceDate: 'Invoice Date',
    dueDate: 'Due Date',
    customerInfo: 'Customer Information',
    billTo: 'Bill To',
    shipTo: 'Ship To',
    productsServices: 'Products / Services',
    quantity: 'Quantity',
    description: 'Description',
    unitPrice: 'Unit Price',
    amount: 'Amount',
    addItem: 'Add Product/Service',
    removeItem: 'Remove item',
    paymentInfo: 'Payment Information',
    paymentPlaceholder: 'Bank:\nIBAN:\nAccount Holder:',
    termsAndConditions: 'Terms & Conditions',
    termsPlaceholder: 'Payment is due within 15 days',
    notes: 'Notes',
    notesPlaceholder: 'Additional notes about the invoice...',
    subtotal: 'Subtotal',
    tax: 'Tax',
    total: 'Total',
    generateInvoice: 'Generate Invoice',
    clearDraft: 'Clear Draft',
    confirmClearDraft: 'Draft will be deleted. Are you sure?',
  },
  de: {
    title: 'Rechnungsgenerator',
    subtitle: 'Erstellen Sie professionelle Rechnungen einfach',
    invoiceLanguageAndCurrency: 'Rechnungssprache & Währung',
    invoiceLanguage: 'Rechnungssprache',
    currency: 'Währung',
    searchCurrency: 'Währung suchen...',
    selected: 'Ausgewählt',
    decimalPlaces: 'Dezimalstellen',
    digits2: '2 Stellen',
    digits3: '3 Stellen',
    decimalNote: 'Wird für Beträge und Summen verwendet',
    companyInfo: 'Firmeninformationen',
    companyLogo: 'Firmenlogo (Optional)',
    uploadLogo: 'Klicken zum Hochladen',
    logoFormat: 'PNG, JPG (max. 2MB)',
    companyName: 'Firmenname',
    companyAddress: 'Firmenadresse',
    email: 'E-Mail',
    phone: 'Telefon',
    invoiceDetails: 'Rechnungsdetails',
    invoiceNumber: 'Rechnungsnummer',
    poNumber: 'Bestellnummer',
    taxOptions: 'Steueroption',
    withTax: 'Mit MwSt.',
    withoutTax: 'Ohne MwSt.',
    taxRate: 'Steuersatz (%)',
    invoiceDate: 'Rechnungsdatum',
    dueDate: 'Fälligkeitsdatum',
    customerInfo: 'Kundeninformationen',
    billTo: 'Rechnungsadresse',
    shipTo: 'Lieferadresse',
    productsServices: 'Produkte / Dienstleistungen',
    quantity: 'Menge',
    description: 'Beschreibung',
    unitPrice: 'Stückpreis',
    amount: 'Betrag',
    addItem: 'Produkt/Dienstleistung hinzufügen',
    removeItem: 'Artikel entfernen',
    paymentInfo: 'Zahlungsinformationen',
    paymentPlaceholder: 'Bank:\nIBAN:\nKontoinhaber:',
    termsAndConditions: 'Geschäftsbedingungen',
    termsPlaceholder: 'Zahlbar innerhalb von 15 Tagen',
    notes: 'Anmerkungen',
    notesPlaceholder: 'Zusätzliche Anmerkungen zur Rechnung...',
    subtotal: 'Zwischensumme',
    tax: 'MwSt.',
    total: 'Gesamt',
    generateInvoice: 'Rechnung erstellen',
    clearDraft: 'Entwurf löschen',
    confirmClearDraft: 'Entwurf wird gelöscht. Sind Sie sicher?',
  },
  fr: {
    title: 'Générateur de Factures',
    subtitle: 'Créez facilement des factures professionnelles',
    invoiceLanguageAndCurrency: 'Langue & Devise de Facture',
    invoiceLanguage: 'Langue de Facture',
    currency: 'Devise',
    searchCurrency: 'Rechercher devise...',
    selected: 'Sélectionné',
    decimalPlaces: 'Décimales',
    digits2: '2 Chiffres',
    digits3: '3 Chiffres',
    decimalNote: 'Utilisé pour les montants et totaux',
    companyInfo: 'Informations Société',
    companyLogo: 'Logo Société (Optionnel)',
    uploadLogo: 'Cliquez pour télécharger',
    logoFormat: 'PNG, JPG (max. 2Mo)',
    companyName: 'Nom de Société',
    companyAddress: 'Adresse Société',
    email: 'E-mail',
    phone: 'Téléphone',
    invoiceDetails: 'Détails Facture',
    invoiceNumber: 'Numéro de Facture',
    poNumber: 'Numéro de Commande',
    taxOptions: 'Option TVA',
    withTax: 'Avec TVA',
    withoutTax: 'Sans TVA',
    taxRate: 'Taux TVA (%)',
    invoiceDate: 'Date Facture',
    dueDate: 'Date d\'échéance',
    customerInfo: 'Informations Client',
    billTo: 'Facturer à',
    shipTo: 'Livrer à',
    productsServices: 'Produits / Services',
    quantity: 'Quantité',
    description: 'Description',
    unitPrice: 'Prix Unitaire',
    amount: 'Montant',
    addItem: 'Ajouter Produit/Service',
    removeItem: 'Supprimer',
    paymentInfo: 'Informations de Paiement',
    paymentPlaceholder: 'Banque:\nIBAN:\nTitulaire:',
    termsAndConditions: 'Conditions Générales',
    termsPlaceholder: 'Paiement sous 15 jours',
    notes: 'Notes',
    notesPlaceholder: 'Notes supplémentaires...',
    subtotal: 'Sous-total',
    tax: 'TVA',
    total: 'Total',
    generateInvoice: 'Générer Facture',
    clearDraft: 'Effacer Brouillon',
    confirmClearDraft: 'Le brouillon sera supprimé. Êtes-vous sûr?',
  },
  es: {
    title: 'Generador de Facturas',
    subtitle: 'Crea facturas profesionales fácilmente',
    invoiceLanguageAndCurrency: 'Idioma y Moneda de Factura',
    invoiceLanguage: 'Idioma de Factura',
    currency: 'Moneda',
    searchCurrency: 'Buscar moneda...',
    selected: 'Seleccionado',
    decimalPlaces: 'Decimales',
    digits2: '2 Dígitos',
    digits3: '3 Dígitos',
    decimalNote: 'Usado para montos y totales',
    companyInfo: 'Información de Empresa',
    companyLogo: 'Logo de Empresa (Opcional)',
    uploadLogo: 'Clic para subir',
    logoFormat: 'PNG, JPG (máx. 2MB)',
    companyName: 'Nombre de Empresa',
    companyAddress: 'Dirección de Empresa',
    email: 'Correo',
    phone: 'Teléfono',
    invoiceDetails: 'Detalles de Factura',
    invoiceNumber: 'Número de Factura',
    poNumber: 'Número de Pedido',
    taxOptions: 'Opción de Impuesto',
    withTax: 'Con IVA',
    withoutTax: 'Sin IVA',
    taxRate: 'Tasa de IVA (%)',
    invoiceDate: 'Fecha de Factura',
    dueDate: 'Fecha de Vencimiento',
    customerInfo: 'Información del Cliente',
    billTo: 'Facturar a',
    shipTo: 'Enviar a',
    productsServices: 'Productos / Servicios',
    quantity: 'Cantidad',
    description: 'Descripción',
    unitPrice: 'Precio Unitario',
    amount: 'Importe',
    addItem: 'Añadir Producto/Servicio',
    removeItem: 'Eliminar',
    paymentInfo: 'Información de Pago',
    paymentPlaceholder: 'Banco:\nIBAN:\nTitular:',
    termsAndConditions: 'Términos y Condiciones',
    termsPlaceholder: 'Pago en 15 días',
    notes: 'Notas',
    notesPlaceholder: 'Notas adicionales...',
    subtotal: 'Subtotal',
    tax: 'IVA',
    total: 'Total',
    generateInvoice: 'Generar Factura',
    clearDraft: 'Borrar Borrador',
    confirmClearDraft: 'El borrador será eliminado. ¿Está seguro?',
  },
};

export interface InvoiceData {
  companyName: string;
  companyLogo: string | null;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  invoiceNumber: string;
  invoiceDate: string;
  poNumber: string;
  dueDate: string;
  billTo: string;
  shipTo: string;
  items: InvoiceItem[];
  currency: string;
  language: Language;
  decimalPlaces: DecimalPlaces;
  taxEnabled: boolean;
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  termsAndConditions: string;
  notes: string;
  paymentDetails: string;
}
