import { useState, useRef } from 'react';
import { Plus, Trash2, FileText, Building2, Globe, Settings, Upload, X, Image } from 'lucide-react';
import { 
  InvoiceData, 
  InvoiceItem, 
  CURRENCIES, 
  LANGUAGES, 
  Language, 
  DecimalPlaces,
  SystemLanguage,
  SYSTEM_LANGUAGES,
  SYSTEM_UI_TRANSLATIONS
} from '../types/invoice';

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
  initialData: InvoiceData | null;
  systemLanguage: SystemLanguage;
  onSystemLanguageChange: (lang: SystemLanguage) => void;
}

const InvoiceForm = ({ onSubmit, initialData, systemLanguage, onSystemLanguageChange }: InvoiceFormProps) => {
  const ui = SYSTEM_UI_TRANSLATIONS[systemLanguage];
  
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [companyLogo, setCompanyLogo] = useState<string | null>(initialData?.companyLogo || null);
  const [companyAddress, setCompanyAddress] = useState(initialData?.companyAddress || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyEmail, setCompanyEmail] = useState(initialData?.companyEmail || '');
  const [companyPhone, setCompanyPhone] = useState(initialData?.companyPhone || '');
  const [invoiceNumber, setInvoiceNumber] = useState(initialData?.invoiceNumber || '');
  const [invoiceDate, setInvoiceDate] = useState(
    initialData?.invoiceDate || new Date().toISOString().split('T')[0]
  );
  const [poNumber, setPoNumber] = useState(initialData?.poNumber || '');
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ||
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [billTo, setBillTo] = useState(initialData?.billTo || '');
  const [shipTo, setShipTo] = useState(initialData?.shipTo || '');
  const [currency, setCurrency] = useState(initialData?.currency || 'USD');
  const [language, setLanguage] = useState<Language>(initialData?.language || 'tr');
  const [decimalPlaces, setDecimalPlaces] = useState<DecimalPlaces>(initialData?.decimalPlaces || 2);
  const [taxEnabled, setTaxEnabled] = useState(initialData?.taxEnabled ?? true);
  const [taxRate, setTaxRate] = useState(initialData?.taxRate || 20);
  const [termsAndConditions, setTermsAndConditions] = useState(
    initialData?.termsAndConditions || ''
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [paymentDetails, setPaymentDetails] = useState(
    initialData?.paymentDetails || ''
  );
  const [items, setItems] = useState<InvoiceItem[]>(
    initialData?.items || [
      { id: '1', quantity: 1, description: '', unitPrice: 0, amount: 0 },
    ]
  );
  const [currencySearch, setCurrencySearch] = useState('');

  const getCurrencySymbol = () => {
    return CURRENCIES.find(c => c.code === currency)?.symbol || '$';
  };

  const formatNumber = (num: number) => {
    return num.toFixed(decimalPlaces);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo dosyası 2MB\'dan küçük olmalıdır.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300;
          const maxHeight = 100;
          let { width, height } = img;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const resizedDataUrl = canvas.toDataURL('image/png', 0.9);
          setCompanyLogo(resizedDataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setCompanyLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredCurrencies = CURRENCIES.filter(c => 
    c.code.toLowerCase().includes(currencySearch.toLowerCase()) ||
    c.name.toLowerCase().includes(currencySearch.toLowerCase())
  );

  const calculateAmount = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.amount = calculateAmount(
              updatedItem.quantity,
              updatedItem.unitPrice
            );
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        quantity: 1,
        description: '',
        unitPrice: 0,
        amount: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = taxEnabled ? (subtotal * taxRate) / 100 : 0;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, taxAmount, total } = calculateTotals();

    const data: InvoiceData = {
      companyName,
      companyLogo,
      companyAddress,
      companyEmail,
      companyPhone,
      invoiceNumber,
      invoiceDate,
      poNumber,
      dueDate,
      billTo,
      shipTo,
      items,
      currency,
      language,
      decimalPlaces,
      taxEnabled,
      taxRate,
      subtotal,
      taxAmount,
      total,
      termsAndConditions,
      notes,
      paymentDetails,
    };

    onSubmit(data);
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* System Language Selector */}
        <div className="flex justify-end mb-4 gap-2">
          {SYSTEM_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSystemLanguageChange(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                systemLanguage === lang.code
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {lang.flag} {lang.nativeName}
            </button>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {ui.title}
                </h1>
                <p className="text-emerald-100 mt-1">{ui.subtitle}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Dil ve Para Birimi Seçimi */}
            <div className="mb-8 bg-slate-800/30 border border-slate-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">{ui.invoiceLanguageAndCurrency}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.invoiceLanguage} *
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code} className="bg-slate-800">
                        {lang.nativeName} ({lang.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.currency} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={ui.searchCurrency}
                      value={currencySearch}
                      onChange={(e) => setCurrencySearch(e.target.value)}
                      className="w-full px-4 py-2 mb-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      size={5}
                    >
                      {filteredCurrencies.map((c) => (
                        <option key={c.code} value={c.code} className="bg-slate-800 py-1">
                          {c.symbol} {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {ui.selected}: {getCurrencySymbol()} {currency}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Settings className="w-4 h-4 inline mr-1" />
                    {ui.decimalPlaces}
                  </label>
                  <div className="flex gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => setDecimalPlaces(2)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        decimalPlaces === 2
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {ui.digits2}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDecimalPlaces(3)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        decimalPlaces === 3
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {ui.digits3}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {ui.decimalNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Şirket Bilgileri */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">{ui.companyInfo}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Logo Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Image className="w-4 h-4 inline mr-1" />
                    {ui.companyLogo}
                  </label>
                  <div className="flex items-start gap-4">
                    {companyLogo ? (
                      <div className="relative">
                        <img
                          src={companyLogo}
                          alt="Logo"
                          className="max-h-20 max-w-[200px] object-contain bg-white rounded-lg p-2"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex-1 cursor-pointer">
                        <div className="border-2 border-dashed border-slate-600 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                          <p className="text-slate-300 text-sm">{ui.uploadLogo}</p>
                          <p className="text-slate-500 text-xs mt-1">{ui.logoFormat}</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

            <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.companyName} *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.companyAddress} *
              </label>
              <textarea
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
                rows={2}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.email}
                  </label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.phone}
                  </label>
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Fatura Detayları */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                {ui.invoiceDetails}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.invoiceNumber} *
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="INV-001"
              />
            </div>

            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.poNumber}
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="PO-123456"
              />
            </div>

                {/* Tax Option */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.taxOptions}
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTaxEnabled(true)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        taxEnabled
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {ui.withTax}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaxEnabled(false)}
                      className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                        !taxEnabled
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
                      }`}
                    >
                      {ui.withoutTax}
                    </button>
                  </div>
                </div>

                {taxEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      {ui.taxRate} *
                    </label>
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                      required
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                )}

            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.invoiceDate} *
              </label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.dueDate} *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
              </div>
            </div>

            {/* Müşteri Bilgileri */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">{ui.customerInfo}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.billTo} *
                  </label>
              <textarea
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    {ui.shipTo} *
                  </label>
              <textarea
                value={shipTo}
                onChange={(e) => setShipTo(e.target.value)}
                required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>
              </div>
          </div>

            {/* Ürün/Hizmetler */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">{ui.productsServices}</h2>
              <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                    className="bg-slate-800/30 border border-slate-700 rounded-xl p-4"
                  >
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-12 md:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          {ui.quantity}
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          'quantity',
                              parseInt(e.target.value) || 0
                        )
                      }
                      required
                      min="0"
                      step="1"
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                      <div className="col-span-12 md:col-span-5">
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          {ui.description}
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, 'description', e.target.value)
                      }
                      required
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                      <div className="col-span-6 md:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          {ui.unitPrice} ({getCurrencySymbol()})
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          'unitPrice',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      required
                      min="0"
                          step="any"
                          className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                      <div className="col-span-4 md:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1">
                          {ui.amount}
                    </label>
                    <input
                      type="text"
                          value={`${getCurrencySymbol()}${formatNumber(item.amount)}`}
                      readOnly
                          className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-emerald-400 font-semibold"
                    />
                  </div>

                      <div className="col-span-2 md:col-span-1">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                          className="w-full px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          title={ui.removeItem}
                    >
                          <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
                className="mt-4 px-5 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 font-medium flex items-center gap-2 transition-all"
          >
            <Plus className="w-5 h-5" />
                {ui.addItem}
          </button>
            </div>

            {/* Ödeme Bilgileri */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">{ui.paymentInfo}</h2>
              <textarea
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                placeholder={ui.paymentPlaceholder}
              />
            </div>

            {/* Şartlar ve Notlar */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {ui.termsAndConditions}
                </label>
                <textarea
                  value={termsAndConditions}
                  onChange={(e) => setTermsAndConditions(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder={ui.termsPlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {ui.notes}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder={ui.notesPlaceholder}
                />
              </div>
            </div>

            {/* Özet */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
              <div className="max-w-sm ml-auto space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>{ui.subtotal}:</span>
                  <span className="font-medium">{getCurrencySymbol()}{formatNumber(subtotal)}</span>
                </div>
                {taxEnabled && (
                  <div className="flex justify-between text-slate-300">
                    <span>{ui.tax} ({taxRate}%):</span>
                    <span className="font-medium">{getCurrencySymbol()}{formatNumber(taxAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-slate-600">
                  <span>{ui.total}:</span>
                  <span className="text-emerald-400">{getCurrencySymbol()}{formatNumber(total)} {currency}</span>
                </div>
            </div>
          </div>

          <button
            type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-[1.02]"
          >
              {ui.generateInvoice}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
