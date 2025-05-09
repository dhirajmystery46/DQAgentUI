import jsPDF from 'jspdf';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

export const generatePDF = (content: string, chartImage?: string | null) => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;

  let htmlContent: string;

  try {
    const parsedContent = JSON.parse(content);
    if (parsedContent.type === "html") {
      htmlContent = parsedContent.result.replace(/```html\n|```$/g, '');
    } else {
      htmlContent = marked(parsedContent.result) as string;
    }
  } catch (error) {
    // If parsing fails, assume it's markdown
    console.log('Markdown', error);
    htmlContent = marked(content) as string;
  }

  const sanitizedContent = DOMPurify.sanitize(htmlContent, {
    ADD_TAGS: ['script', 'a'],
    ADD_ATTR: ['src', 'href'],
  });

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitizedContent;
  const scripts = tempDiv.getElementsByTagName('script');
  while (scripts.length > 0) {
    if (scripts[0].parentNode) {
      scripts[0].parentNode.removeChild(scripts[0]);
    }
  }
  let y = margin;
  let pageCount = 1;

  const addNewPage = () => {
    pdf.addPage();
    pageCount++;
    y = margin;
  };

  const renderElement = (element: Element, x: number): number => {
    if (element.nodeType === Node.TEXT_NODE) {
      const text = element.textContent?.trim() || '';
      if (text && element.parentElement?.tagName.toLowerCase() !== 'td' && element.parentElement?.tagName.toLowerCase() !== 'th') {
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
          if (y > pageHeight - margin) {
            addNewPage();
          }
          pdf.text(line, x, y);
          y += 5; // Reduced line height
        });
      }
      return y;
    }

    if (element.nodeType === Node.ELEMENT_NODE) {
      const el = element as HTMLElement;
      const tagName = el.tagName.toLowerCase();

      switch (tagName) {
        case 'h1':
          pdf.setFontSize(15);
          pdf.setFont('helvetica', 'bold');
          y +=6;
          break;
        case 'h2':
        case 'h3':
          pdf.setFontSize(13);
          pdf.setFont('helvetica', 'bold');
          y += 4;
          break;
        case 'strong':
        case 'b':
          pdf.setFont('helvetica', 'bold');
          break;
        case 'em':
        case 'i':
          pdf.setFont('helvetica', 'italic');
          break;
        case 'a':
          const href = el.getAttribute('href');
          if (href) {
            pdf.setTextColor(0, 0, 255);
            pdf.setFont('helvetica', 'underline');
            const linkText = el.textContent || href;
            const linkWidth = pdf.getStringUnitWidth(linkText) * pdf.getFontSize() / pdf.internal.scaleFactor;
            pdf.link(x, y - 5, linkWidth, 10, { url: href });
          }
          break;
        case 'br':
          y += 5;
          break;
        case 'li':
          if (y > pageHeight - margin) {
            addNewPage();
          }
          pdf.text('• ', x, y);
          x += 5;
          break;
        case 'table':
          y = renderTable(el, x);
          break;
        case 'canvas':
          if (chartImage) {
            if (y + 75 > pageHeight - margin) {
              addNewPage();
            }
            pdf.addImage(chartImage, 'PNG', x, y, 150, 75);
            y += 80;
          }
          break;
        default:
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'normal');
      }

      for (const child of Array.from(el.childNodes)) {
        y = renderElement(child as Element, x);
      }

      if (['p', 'div', 'li', 'ul', 'ol', 'h1', 'h2', 'h3'].includes(tagName)) {
        y += 3;
      }

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0);

      return y;
    }

    return y;
  };

  const renderTable = (table: HTMLElement, x: number): number => {
    const rows = table.querySelectorAll('tr');
    const cellPadding = 2;
    const fontSize = 12;
    pdf.setFontSize(fontSize);

    let columnWidths: number[] = [];

    // Calculate column widths
    rows.forEach((row) => {
      const cells = row.querySelectorAll('th, td');
      cells.forEach((cell, index) => {
        const cellWidth = pdf.getStringUnitWidth(cell.textContent || '') * fontSize / pdf.internal.scaleFactor;
        if (!columnWidths[index] || cellWidth > columnWidths[index]) {
          columnWidths[index] = cellWidth;
        }
      });
    });

    // Adjust column widths if they exceed page width
    const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
    if (totalWidth > maxWidth) {
      const scale = maxWidth / totalWidth;
      columnWidths = columnWidths.map(width => width * scale);
    }

    rows.forEach((row) => {
      const cells = row.querySelectorAll('th, td');
      let maxRowHeight = 0;

      // Calculate row height
      cells.forEach((cell, columnIndex) => {
        const cellWidth = columnWidths[columnIndex];
        const lines = pdf.splitTextToSize(cell.textContent || '', cellWidth - 2 * cellPadding);
        const cellHeight = lines.length * 5 + 2 * cellPadding; // Reduced cell height
        if (cellHeight > maxRowHeight) maxRowHeight = cellHeight;
      });

      // Check if we need a new page
      if (y + maxRowHeight > pageHeight - margin) {
        addNewPage();
      }

      // Render cells
      let currentX = x;
      cells.forEach((cell, columnIndex) => {
        const cellWidth = columnWidths[columnIndex];
        const lines = pdf.splitTextToSize(cell.textContent || '', cellWidth - 2 * cellPadding);

        pdf.rect(currentX, y, cellWidth, maxRowHeight);
        pdf.text(lines, currentX + cellPadding, y + cellPadding + 3);

        currentX += cellWidth;
      });

      y += maxRowHeight;
    });

    return y + 3; // Reduced space after the table
  };

  renderElement(tempDiv, margin);

  // Add page numbers
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10);
  }

  pdf.save('lease_details.pdf');
};