import jsPDF from 'jspdf';
import TurndownService from 'turndown';
import type { Note } from '../types';

// Convert HTML to Markdown
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
});

/**
 * Export note to PDF
 */
export const exportToPDF = async (note: Note) => {
  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Add title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const titleLines = pdf.splitTextToSize(note.title, pageWidth - 2 * margin);
    pdf.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 10;

    // Add metadata
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Category: ${note.category}`, margin, yPosition);
    yPosition += 7;
    pdf.text(`Created: ${new Date(note.createdAt).toLocaleDateString()}`, margin, yPosition);
    yPosition += 7;
    if (note.tags && note.tags.length > 0) {
      pdf.text(`Tags: ${note.tags.join(', ')}`, margin, yPosition);
      yPosition += 10;
    } else {
      yPosition += 5;
    }

    // Add line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Add content (strip HTML tags)
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = note.content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    const contentLines = pdf.splitTextToSize(textContent, pageWidth - 2 * margin);
    
    contentLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });

    // Save PDF
    pdf.save(`${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export to PDF');
  }
};

/**
 * Export note to Markdown
 */
export const exportToMarkdown = (note: Note) => {
  try {
    // Convert HTML content to Markdown
    const markdown = turndownService.turndown(note.content);
    
    // Build markdown file content
    let mdContent = `# ${note.title}\n\n`;
    mdContent += `**Category:** ${note.category}  \n`;
    mdContent += `**Created:** ${new Date(note.createdAt).toLocaleDateString()}  \n`;
    
    if (note.tags && note.tags.length > 0) {
      mdContent += `**Tags:** ${note.tags.map(tag => `#${tag}`).join(' ')}  \n`;
    }
    
    mdContent += `\n---\n\n`;
    mdContent += markdown;

    // Create and download file
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Markdown:', error);
    throw new Error('Failed to export to Markdown');
  }
};

/**
 * Export note to JSON
 */
export const exportToJSON = (note: Note) => {
  try {
    const json = JSON.stringify(note, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    throw new Error('Failed to export to JSON');
  }
};

/**
 * Export all notes to JSON
 */
export const exportAllNotes = (notes: Note[]) => {
  try {
    const json = JSON.stringify(notes, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `notevault_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error exporting all notes:', error);
    throw new Error('Failed to export all notes');
  }
};
