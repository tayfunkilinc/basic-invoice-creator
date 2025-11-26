# Professional Invoice Generator

A modern, production-ready invoice generator that creates professional A4 PDF invoices matching industry standards.

## Features

- Professional invoice layout matching the provided sample PDF
- A4 format (210mm x 297mm) PDF generation
- Responsive form with validation
- Dynamic item management
- Real-time calculations (subtotal, tax, total)
- Multiple address fields (Bill To, Ship To)
- Tax rate customization
- Terms & Conditions section
- PDF download functionality
- Edit and preview modes

## Technology Stack

- React 18 with TypeScript
- Tailwind CSS for styling
- html2pdf.js for PDF generation
- Lucide React for icons
- Vite for build tooling

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Usage

1. Fill in the invoice form with:
   - Company information
   - Invoice details (number, dates, P.O. number)
   - Bill To and Ship To addresses
   - Tax rate
   - Invoice items (quantity, description, unit price)
   - Terms & Conditions

2. Add multiple items using the "Add Product/Service" button

3. Preview the total in real-time

4. Click "Generate Invoice" to see the preview

5. Download the invoice as a PDF or edit it

## Invoice Format

The generated invoice matches professional standards with:
- Company header with blue background
- Company address section
- Bill To / Ship To / Invoice details in three columns
- Item table with QTY, DESCRIPTION, UNIT PRICE, AMOUNT columns
- Subtotal, tax, and total calculations
- Terms & Conditions footer
- Professional typography and spacing

## PDF Output

- Format: A4 (210mm x 297mm)
- High quality: 98% JPEG quality, 2x scale
- Proper page breaks
- Print-optimized layout
