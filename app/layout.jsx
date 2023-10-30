import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Titulo from '@/components/Titulo';
import ClienteProvider from '@/contexts/cliente';

export const metadata = {
  title: 'Só Nave Top',
  description: 'Loja de Nave Top',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <link rel="shortcut icon" href="./carro.png" type="image/x-icon" />
      <body>
        <ClienteProvider>
          <Titulo />
          {children}
        </ClienteProvider>
      </body>
    </html>
  )
}
