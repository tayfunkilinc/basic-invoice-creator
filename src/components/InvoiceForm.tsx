import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceData, InvoiceItem } from '../types/invoice';

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
  initialData: InvoiceData | null;
}

const InvoiceForm = ({ onSubmit, initialData }: InvoiceFormProps) => {
  const [companyName, setCompanyName] = useState(initialData?.companyName || '');
  const [companyAddress, setCompanyAddress] = useState(initialData?.companyAddress || '');
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
  const [taxRate, setTaxRate] = useState(initialData?.taxRate || 20);
  const [termsAndConditions, setTermsAndConditions] = useState(
    initialData?.termsAndConditions || 'Payment is due within 15 days'
  );
  const [items, setItems] = useState<InvoiceItem[]>(
    initialData?.items || [
      { id: '1', quantity: 1, description: '', unitPrice: 0, amount: 0 },
    ]
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
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subtotal, taxAmount, total } = calculateTotals();

    const data: InvoiceData = {
      companyName,
      companyAddress,
      invoiceNumber,
      invoiceDate,
      poNumber,
      dueDate,
      billTo,
      shipTo,
      items,
      taxRate,
      subtotal,
      taxAmount,
      total,
      termsAndConditions,
    };

    onSubmit(data);
  };

  const { total } = calculateTotals();

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md">
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">Professional Invoice Generator</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Company Address *
              </label>
              <textarea
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Business Street, City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Invoice Number *
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="INV-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                P.O. Number
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PO-123456"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Invoice Date *
              </label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Tax Rate (%) *
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                required
                step="0.01"
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Bill To *</label>
              <textarea
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Customer Name&#10;Customer Address&#10;City, Postal Code"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Ship To *</label>
              <textarea
                value={shipTo}
                onChange={(e) => setShipTo(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Shipping Name&#10;Shipping Address&#10;City, Postal Code"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Terms & Conditions
              </label>
              <textarea
                value={termsAndConditions}
                onChange={(e) => setTermsAndConditions(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Payment is due within 15 days"
              />
            </div>
          </div>

          <hr className="my-6" />

          <h2 className="text-xl font-bold mb-4">Invoice Items</h2>

          <div className="space-y-4 mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          'quantity',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      required
                      min="0"
                      step="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-semibold"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label className="block text-xs font-semibold mb-1">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(item.id, 'description', e.target.value)
                      }
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Product or service description"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-1">
                      Unit Price *
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
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold mb-1">
                      Amount
                    </label>
                    <input
                      type="text"
                      value={item.amount.toFixed(2)}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 font-semibold"
                    />
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length === 1}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 font-semibold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product/Service
          </button>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Preview Total:</span>
              <span className="text-2xl font-bold text-blue-700">
                {total.toFixed(2)} GBP
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-bold text-lg"
          >
            Generate Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
