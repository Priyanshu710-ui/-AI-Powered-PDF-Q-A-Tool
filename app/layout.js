import './globals.css';

export const metadata = {
  title: 'AI-Powered PDF Q&A Tool',
  description: 'Upload a PDF and ask questions about its content.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
