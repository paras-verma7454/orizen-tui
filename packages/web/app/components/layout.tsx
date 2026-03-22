import { Sidebar } from '@/components/sidebar'

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 flex gap-8 min-h-[calc(100vh-3.5rem)]">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 py-8 min-w-0">
        {children}
      </main>
    </div>
  )
}
