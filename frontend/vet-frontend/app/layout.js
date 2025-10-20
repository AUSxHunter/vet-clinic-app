import './globals.css'

export const metadata = {
  title: 'VETCARE - Pet Owner Portal',
  description: 'Manage your pets, appointments, and invoices with ease',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-platinum">
        {children}
      </body>
    </html>
  )
}

