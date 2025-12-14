import { Download, Edit, Mail, Phone } from 'lucide-react';
import { InvoiceData, CURRENCIES, TRANSLATIONS } from '../types/invoice';
import html2pdf from 'html2pdf.js';

interface InvoicePreviewProps {
  data: InvoiceData;
  onEdit: () => void;
}

const InvoicePreview = ({ data, onEdit }: InvoicePreviewProps) => {
  const t = TRANSLATIONS[data.language];
  
  const getCurrencySymbol = () => {
    return CURRENCIES.find(c => c.code === data.currency)?.symbol || '$';
  };

  const formatNumber = (num: number) => {
    return num.toFixed(data.decimalPlaces);
  };

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
    if (!element) return;
    
    const filename = `${data.invoiceNumber.replace(/[^a-z0-9]/gi, '_')}.pdf`;

    const buttons = document.getElementById('action-buttons');
    if (buttons) buttons.style.display = 'none';

    const options = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff',
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF oluşturulurken hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      if (buttons) buttons.style.display = 'flex';
    }
  };

  // RTL support for Arabic
  const isRTL = data.language === 'ar';

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-[210mm] mx-auto">
        <div
          id="invoice-content"
          className="bg-white shadow-lg"
          style={{
            width: '210mm',
            minHeight: '297mm',
            fontFamily: 'Arial, Helvetica, sans-serif',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
        >
          {/* Header - Clean Corporate Style */}
          <div className="p-8 border-b-2 border-gray-800">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                {data.companyLogo && (
                  <img
                    src={data.companyLogo}
                    alt="Logo"
                    className="max-h-16 max-w-[150px] object-contain"
                  />
                )}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{data.companyName}</h1>
                  <div className="mt-1 text-sm text-gray-600">
                    {formatAddress(data.companyAddress)}
                  </div>
                  {(data.companyEmail || data.companyPhone) && (
                    <div className="mt-2 text-sm text-gray-600 space-y-0.5">
                      {data.companyEmail && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {data.companyEmail}
                        </div>
                      )}
                      {data.companyPhone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {data.companyPhone}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className={isRTL ? 'text-left' : 'text-right'}>
                <div className="text-3xl font-bold text-gray-900 tracking-tight">{t.invoice}</div>
                <div className="text-lg font-semibold text-gray-700 mt-1">#{data.invoiceNumber}</div>
              </div>
            </div>
          </div>

          {/* Invoice Info Bar */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-200 grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-gray-500 text-xs uppercase font-medium">{t.invoiceDate}</div>
              <div className="font-semibold text-gray-800">{formatDate(data.invoiceDate)}</div>
            </div>
            <div>
              <div className="text-gray-500 text-xs uppercase font-medium">{t.dueDate}</div>
              <div className="font-semibold text-gray-800">{formatDate(data.dueDate)}</div>
            </div>
            {data.poNumber && (
              <div>
                <div className="text-gray-500 text-xs uppercase font-medium">{t.poNumber}</div>
                <div className="font-semibold text-gray-800">{data.poNumber}</div>
              </div>
            )}
            <div>
              <div className="text-gray-500 text-xs uppercase font-medium">{t.total}</div>
              <div className="font-bold text-gray-900">{getCurrencySymbol()}{formatNumber(data.total)}</div>
            </div>
          </div>

          {/* Addresses */}
          <div className="px-8 py-6 grid grid-cols-2 gap-8 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wide mb-2">{t.billTo}</h3>
              <div className="text-sm text-gray-800">{formatAddress(data.billTo)}</div>
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wide mb-2">{t.shipTo}</h3>
              <div className="text-sm text-gray-800">{formatAddress(data.shipTo)}</div>
            </div>
          </div>

          {/* Items Table - Clean Corporate */}
          <div className="px-8 py-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className={`pb-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-bold text-gray-600 uppercase w-16`}>
                    {t.quantity}
                  </th>
                  <th className={`pb-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-bold text-gray-600 uppercase`}>
                    {t.description}
                  </th>
                  <th className={`pb-3 ${isRTL ? 'text-left' : 'text-right'} text-xs font-bold text-gray-600 uppercase w-28`}>
                    {t.unitPrice}
                  </th>
                  <th className={`pb-3 ${isRTL ? 'text-left' : 'text-right'} text-xs font-bold text-gray-600 uppercase w-28`}>
                    {t.amount}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item, index) => (
                  <tr key={item.id} className={index !== data.items.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="py-3 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-gray-800">
                      {item.description}
                    </td>
                    <td className={`py-3 ${isRTL ? 'text-left' : 'text-right'} text-gray-700`}>
                      {getCurrencySymbol()}{formatNumber(item.unitPrice)}
                    </td>
                    <td className={`py-3 ${isRTL ? 'text-left' : 'text-right'} font-medium text-gray-900`}>
                      {getCurrencySymbol()}{formatNumber(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals - Clean Right-aligned */}
            <div className={`mt-6 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
              <div className="w-64">
                {data.taxEnabled && (
                  <>
                    <div className="flex justify-between py-2 text-sm text-gray-600">
                      <span>{t.subtotal}</span>
                      <span className="font-medium text-gray-800">{getCurrencySymbol()}{formatNumber(data.subtotal)}</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm text-gray-600">
                      <span>{t.tax} ({data.taxRate.toFixed(1)}%)</span>
                      <span className="font-medium text-gray-800">{getCurrencySymbol()}{formatNumber(data.taxAmount)}</span>
                    </div>
                  </>
                )}
                <div className={`flex justify-between py-3 ${data.taxEnabled ? 'border-t-2 border-gray-800 mt-2' : ''}`}>
                  <span className="font-bold text-gray-900">{t.total}</span>
                  <span className="font-bold text-gray-900 text-lg">{getCurrencySymbol()}{formatNumber(data.total)} {data.currency}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {data.paymentDetails && (
            <div className="px-8 pb-6">
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-2">{t.paymentDetails}</h3>
                <div className="text-sm text-gray-600 whitespace-pre-line">{data.paymentDetails}</div>
              </div>
            </div>
          )}

          {/* Terms & Notes */}
          {(data.termsAndConditions || data.notes) && (
            <div className="px-8 pb-8 grid grid-cols-2 gap-6 text-sm">
              {data.termsAndConditions && (
                <div>
                  <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wide mb-2">{t.termsAndConditions}</h3>
                  <p className="text-gray-600">{data.termsAndConditions}</p>
                </div>
              )}
              {data.notes && (
                <div>
                  <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wide mb-2">{t.notes}</h3>
                  <p className="text-gray-600">{data.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          id="action-buttons"
          className="flex justify-center gap-4 mt-8 print:hidden"
        >
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 font-semibold transition-all"
          >
            <Download className="w-5 h-5" />
            PDF İndir (A4)
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all"
          >
            <Edit className="w-5 h-5" />
            Düzenle
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
