// Separate layout for login page - completely bypasses admin layout
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
