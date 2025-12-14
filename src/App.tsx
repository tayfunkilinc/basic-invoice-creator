import { useState, useEffect } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData, SystemLanguage, SYSTEM_UI_TRANSLATIONS } from './types/invoice';

const STORAGE_KEY = 'invoice-draft';
const LANG_STORAGE_KEY = 'system-language';

function App() {
  const [systemLanguage, setSystemLanguage] = useState<SystemLanguage>(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return (saved as SystemLanguage) || 'tr';
  });

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [showPreview, setShowPreview] = useState(false);

  const ui = SYSTEM_UI_TRANSLATIONS[systemLanguage];

  // Save system language to localStorage
  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, systemLanguage);
  }, [systemLanguage]);

  // Save to localStorage whenever invoiceData changes
  useEffect(() => {
    if (invoiceData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceData));
    }
  }, [invoiceData]);

  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  const handleClearDraft = () => {
    if (confirm(ui.confirmClearDraft)) {
      localStorage.removeItem(STORAGE_KEY);
      setInvoiceData(null);
      setShowPreview(false);
    }
  };

  return (
    <div className="min-h-screen">
      {!showPreview ? (
        <div className="relative">
          <InvoiceForm 
            onSubmit={handleFormSubmit} 
            initialData={invoiceData}
            systemLanguage={systemLanguage}
            onSystemLanguageChange={setSystemLanguage}
          />
          {invoiceData && (
            <div className="fixed bottom-6 right-6">
              <button
                onClick={handleClearDraft}
                className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg text-sm font-medium shadow-lg backdrop-blur-sm transition-all"
              >
                {ui.clearDraft}
              </button>
            </div>
          )}
        </div>
      ) : (
        <InvoicePreview data={invoiceData!} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;
