/**
 * PDF Utility Functions
 * Fungsi utility untuk manipulasi PDF
 */

/**
 * PDF generation options interface
 */
interface PDFGenerationOptions {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  margins?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  format?: 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Document template types
 */
export const DOCUMENT_TEMPLATES = {
  SKTM: 'sktm',
  SURAT_DOMISILI: 'surat_domisili',
  SURAT_USAHA: 'surat_usaha',
  SURAT_KEMATIAN: 'surat_kematian',
  SURAT_KELAHIRAN: 'surat_kelahiran',
  SURAT_PINDAH: 'surat_pindah',
  SURAT_NIKAH: 'surat_nikah',
  LEGALISIR: 'legalisir',
  INVOICE: 'invoice',
  REPORT: 'report',
} as const;

/**
 * Check if browser supports PDF generation
 */
export const isPDFGenerationSupported = (): boolean => {
  return typeof window !== 'undefined' && 'jsPDF' in window;
};

/**
 * Generate PDF from HTML content
 */
export const generatePDFFromHTML = async (
  htmlContent: string,
  filename: string,
  options: PDFGenerationOptions = {}
): Promise<void> => {
  try {
    // This would require jsPDF library to be loaded
    if (!isPDFGenerationSupported()) {
      throw new Error('PDF generation not supported in this environment');
    }

    // Note: This is a placeholder implementation
    // In a real implementation, you would use jsPDF or similar library
    console.log('Generating PDF:', { htmlContent, filename, options });

    // For now, we'll create a simple download link
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Gagal menggenerate PDF');
  }
};

/**
 * Generate PDF from element
 */
export const generatePDFFromElement = async (
  elementId: string,
  filename: string,
  options: PDFGenerationOptions = {}
): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID '${elementId}' not found`);
    }

    const htmlContent = element.outerHTML;
    await generatePDFFromHTML(htmlContent, filename, options);
  } catch (error) {
    console.error('Error generating PDF from element:', error);
    throw new Error('Gagal menggenerate PDF dari element');
  }
};

/**
 * Create document header template
 */
export const createDocumentHeader = (data: {
  title: string;
  subtitle?: string;
  logo?: string;
  date?: string;
  number?: string;
}): string => {
  return `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 20px;">
      ${
        data.logo
          ? `<img src="${data.logo}" alt="Logo" style="max-height: 80px; margin-bottom: 10px;">`
          : ''
      }
      <h1 style="margin: 0; font-size: 18px; font-weight: bold; text-transform: uppercase;">
        ${data.title}
      </h1>
      ${
        data.subtitle
          ? `<h2 style="margin: 5px 0; font-size: 14px; font-weight: normal;">${data.subtitle}</h2>`
          : ''
      }
      <div style="margin-top: 15px; font-size: 12px;">
        ${data.number ? `<div>No: ${data.number}</div>` : ''}
        ${data.date ? `<div>Tanggal: ${data.date}</div>` : ''}
      </div>
    </div>
  `;
};

/**
 * Create document footer template
 */
export const createDocumentFooter = (data: {
  signatureTitle?: string;
  signaturePlace?: string;
  signatureDate?: string;
  signerName?: string;
  signerTitle?: string;
  signerNIP?: string;
  stamp?: boolean;
}): string => {
  return `
    <div style="margin-top: 50px;">
      <div style="text-align: right; margin-bottom: 80px;">
        <div>${data.signaturePlace || 'Guguak Malalo'}, ${
          data.signatureDate || new Date().toLocaleDateString('id-ID')
        }</div>
        <div style="margin-top: 5px;">${data.signatureTitle || 'Kepala Nagari'}</div>
        <div style="margin-top: 60px; border-bottom: 1px solid #000; width: 200px; margin-left: auto;"></div>
        <div style="margin-top: 5px; font-weight: bold;">${data.signerName || ''}</div>
        ${data.signerTitle ? `<div>${data.signerTitle}</div>` : ''}
        ${data.signerNIP ? `<div>NIP: ${data.signerNIP}</div>` : ''}
      </div>
      ${
        data.stamp
          ? '<div style="position: absolute; right: 50px; bottom: 100px; width: 80px; height: 80px; border: 2px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; text-align: center;">STEMPEL<br>NAGARI</div>'
          : ''
      }
    </div>
  `;
};

/**
 * Create SKTM document template
 */
export const createSKTMTemplate = (data: {
  number: string;
  date: string;
  applicantName: string;
  applicantNIK: string;
  applicantAddress: string;
  purpose: string;
  familyMembers?: Array<{
    name: string;
    relationship: string;
    age: number;
    occupation: string;
  }>;
}): string => {
  const header = createDocumentHeader({
    title: 'Surat Keterangan Tidak Mampu',
    subtitle: 'Nagari Guguak Malalo',
    number: data.number,
    date: data.date,
  });

  const familyMembersTable =
    data.familyMembers && data.familyMembers.length > 0
      ? `
    <h3>Data Anggota Keluarga:</h3>
    <table border="1" style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Hubungan</th>
          <th>Umur</th>
          <th>Pekerjaan</th>
        </tr>
      </thead>
      <tbody>
        ${data.familyMembers
          .map(
            (member, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.relationship}</td>
            <td>${member.age}</td>
            <td>${member.occupation}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `
      : '';

  const footer = createDocumentFooter({
    signaturePlace: 'Guguak Malalo',
    signatureDate: data.date,
    stamp: true,
  });

  return `
    <div style="padding: 40px; font-family: Arial, sans-serif; line-height: 1.6;">
      ${header}
      
      <div style="text-align: justify; margin: 30px 0;">
        <p>Yang bertanda tangan di bawah ini, Kepala Nagari Guguak Malalo, dengan ini menerangkan bahwa:</p>
        
        <table style="margin: 20px 0; width: 100%;">
          <tr>
            <td width="150">Nama</td>
            <td width="20">:</td>
            <td>${data.applicantName}</td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>:</td>
            <td>${data.applicantNIK}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>:</td>
            <td>${data.applicantAddress}</td>
          </tr>
        </table>

        ${familyMembersTable}

        <p>Adalah benar-benar termasuk keluarga tidak mampu dan memerlukan bantuan untuk ${data.purpose}.</p>
        
        <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      ${footer}
    </div>
  `;
};

/**
 * Create Surat Domisili template
 */
export const createSuratDomisiliTemplate = (data: {
  number: string;
  date: string;
  applicantName: string;
  applicantNIK: string;
  applicantAddress: string;
  domicileAddress: string;
  purpose: string;
}): string => {
  const header = createDocumentHeader({
    title: 'Surat Keterangan Domisili',
    subtitle: 'Nagari Guguak Malalo',
    number: data.number,
    date: data.date,
  });

  const footer = createDocumentFooter({
    signaturePlace: 'Guguak Malalo',
    signatureDate: data.date,
    stamp: true,
  });

  return `
    <div style="padding: 40px; font-family: Arial, sans-serif; line-height: 1.6;">
      ${header}
      
      <div style="text-align: justify; margin: 30px 0;">
        <p>Yang bertanda tangan di bawah ini, Kepala Nagari Guguak Malalo, dengan ini menerangkan bahwa:</p>
        
        <table style="margin: 20px 0; width: 100%;">
          <tr>
            <td width="150">Nama</td>
            <td width="20">:</td>
            <td>${data.applicantName}</td>
          </tr>
          <tr>
            <td>NIK</td>
            <td>:</td>
            <td>${data.applicantNIK}</td>
          </tr>
          <tr>
            <td>Alamat KTP</td>
            <td>:</td>
            <td>${data.applicantAddress}</td>
          </tr>
          <tr>
            <td>Alamat Domisili</td>
            <td>:</td>
            <td>${data.domicileAddress}</td>
          </tr>
        </table>

        <p>Adalah benar-benar berdomisili di alamat tersebut di atas. Surat keterangan ini dibuat untuk keperluan ${data.purpose}.</p>
        
        <p>Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      ${footer}
    </div>
  `;
};

/**
 * Validate PDF generation data
 */
export const validatePDFData = (
  template: string,
  data: Record<string, any>
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Common required fields
  const commonRequired = ['number', 'date', 'applicantName', 'applicantNIK'];

  commonRequired.forEach((field) => {
    if (!data[field]) {
      errors.push(`Field ${field} is required`);
    }
  });

  // Template-specific validation
  switch (template) {
    case DOCUMENT_TEMPLATES.SKTM:
      if (!data.purpose) {
        errors.push('Purpose is required for SKTM');
      }
      break;

    case DOCUMENT_TEMPLATES.SURAT_DOMISILI:
      if (!data.domicileAddress) {
        errors.push('Domicile address is required');
      }
      if (!data.purpose) {
        errors.push('Purpose is required');
      }
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Generate document number
 */
export const generateDocumentNumber = (type: string, sequence: number, year?: number): string => {
  const currentYear = year || new Date().getFullYear();
  const paddedSequence = sequence.toString().padStart(3, '0');

  const typeMap: Record<string, string> = {
    [DOCUMENT_TEMPLATES.SKTM]: 'SKTM',
    [DOCUMENT_TEMPLATES.SURAT_DOMISILI]: 'DOM',
    [DOCUMENT_TEMPLATES.SURAT_USAHA]: 'USH',
    [DOCUMENT_TEMPLATES.SURAT_KEMATIAN]: 'KMT',
    [DOCUMENT_TEMPLATES.SURAT_KELAHIRAN]: 'LHR',
    [DOCUMENT_TEMPLATES.SURAT_PINDAH]: 'PND',
    [DOCUMENT_TEMPLATES.SURAT_NIKAH]: 'NKH',
    [DOCUMENT_TEMPLATES.LEGALISIR]: 'LEG',
  };

  const typeCode = typeMap[type] || 'DOC';

  return `${paddedSequence}/${typeCode}/GM/${currentYear}`;
};

/**
 * Get document template by type
 */
export const getDocumentTemplate = (type: string, data: Record<string, any>): string => {
  switch (type) {
    case DOCUMENT_TEMPLATES.SKTM:
      return createSKTMTemplate(
        data as {
          number: string;
          date: string;
          applicantName: string;
          applicantNIK: string;
          applicantAddress: string;
          purpose: string;
          familyMembers?: Array<{
            name: string;
            relationship: string;
            age: number;
            occupation: string;
          }>;
        }
      );

    case DOCUMENT_TEMPLATES.SURAT_DOMISILI:
      return createSuratDomisiliTemplate(
        data as {
          number: string;
          date: string;
          applicantName: string;
          applicantNIK: string;
          applicantAddress: string;
          domicileAddress: string;
          purpose: string;
        }
      );

    default:
      throw new Error(`Template for type '${type}' not implemented`);
  }
};

/**
 * Preview PDF in new window
 */
export const previewPDF = (htmlContent: string): void => {
  const previewWindow = window.open('', '_blank');

  if (previewWindow) {
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview Dokumen</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print {
              body { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.print();
          </script>
        </body>
      </html>
    `);
    previewWindow.document.close();
  }
};

/**
 * Print PDF content
 */
export const printPDF = (htmlContent: string): void => {
  const printWindow = window.open('', '_blank');

  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Dokumen</title>
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print {
              body { margin: 0; padding: 0; }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  }
};
