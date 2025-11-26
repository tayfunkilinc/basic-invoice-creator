import { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types/invoice';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!showPreview ? (
        <InvoiceForm onSubmit={handleFormSubmit} initialData={invoiceData} />
      ) : (
        <InvoicePreview data={invoiceData!} onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;
