import { Download, Edit } from 'lucide-react';
import { InvoiceData } from '../types/invoice';
import html2pdf from 'html2pdf.js';

interface InvoicePreviewProps {
  data: InvoiceData;
  onEdit: () => void;
}

const InvoicePreview = ({ data, onEdit }: InvoicePreviewProps) => {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatAddress = (address: string) => {
    return address.split('\n').map((line, index) => (
      <div key={index}>{line}</div>
    ));
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('invoice-content');
    const filename = `${data.invoiceNumber.replace(/[^a-z0-9]/gi, '_')}.pdf`;

    const buttons = document.getElementById('action-buttons');
    if (buttons) buttons.style.display = 'none';

    const options = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff',
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      if (buttons) buttons.style.display = 'flex';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-[210mm] mx-auto">
        <div
          id="invoice-content"
          className="bg-white shadow-lg"
          style={{
            width: '210mm',
            minHeight: '297mm',
            fontFamily: 'Arial, Helvetica, sans-serif',
          }}
        >
          <div className="bg-[#4472C4] text-white p-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{data.companyName}</h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">INVOICE</div>
            </div>
          </div>

          <div className="px-8 py-6 bg-white border-b-2 border-gray-200">
            {formatAddress(data.companyAddress)}
          </div>

          <div className="px-8 py-6 grid grid-cols-3 gap-8 border-b-2 border-gray-200">
            <div>
              <h3 className="font-bold text-sm mb-2">Bill To</h3>
              <div className="text-sm">{formatAddress(data.billTo)}</div>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-2">Ship To</h3>
              <div className="text-sm">{formatAddress(data.shipTo)}</div>
            </div>
            <div className="text-right text-sm">
              <div className="mb-1">
                <span className="font-bold">Invoice #</span> {data.invoiceNumber}
              </div>
              <div className="mb-1">
                <span className="font-bold">Invoice Date</span>{' '}
                {formatDate(data.invoiceDate)}
              </div>
              {data.poNumber && (
                <div className="mb-1">
                  <span className="font-bold">P.O.#</span> {data.poNumber}
                </div>
              )}
              <div>
                <span className="font-bold">Due Date</span>{' '}
                {formatDate(data.dueDate)}
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-3 text-left text-sm font-bold w-16">
                    QTY
                  </th>
                  <th className="border border-gray-400 px-4 py-3 text-left text-sm font-bold">
                    DESCRIPTION
                  </th>
                  <th className="border border-gray-400 px-4 py-3 text-right text-sm font-bold w-32">
                    UNIT PRICE
                  </th>
                  <th className="border border-gray-400 px-4 py-3 text-right text-sm font-bold w-32">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      {item.description}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-right">
                      {item.unitPrice.toFixed(2)}
                    </td>
                    <td className="border border-gray-400 px-4 py-2 text-right font-semibold">
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex justify-end">
              <div className="w-80">
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">{data.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                  <span>{data.taxRate.toFixed(1)}%</span>
                  <span className="font-semibold">{data.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-3 font-bold text-lg border-t-2 border-gray-400">
                  <span>TOTAL</span>
                  <span>{data.total.toFixed(2)} GBP</span>
                </div>
              </div>
            </div>
          </div>
          {data.termsAndConditions && (
            <div className="px-8 pb-8">
              <h3 className="font-bold mb-2">Terms & Conditions</h3>
              <p className="text-sm">{data.termsAndConditions}</p>
            </div>
          )}
        </div>

        <div
          id="action-buttons"
          className="flex justify-center gap-4 mt-8 print:hidden"
        >
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold"
          >
            <Download className="w-5 h-5" />
            Download PDF (A4)
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 font-semibold"
          >
            <Edit className="w-5 h-5" />
            Edit Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
