import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewer({ pdfUrl }) {
  return (
    <div>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
      <embed
        src={pdfUrl}
        type="application/pdf"
        width="100%"
        height="500px"
      />
    </div>
  );
}

export default PdfViewer
