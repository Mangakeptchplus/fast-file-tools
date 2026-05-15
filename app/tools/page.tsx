import Link from "next/link";

const tools = [
  {
    title: "Compress Image",
    description: "ย่อขนาดรูป JPG PNG WEBP ออนไลน์ฟรี",
    href: "/compress-image",
  },
  {
    title: "JPG to PDF",
    description: "แปลงรูป JPG เป็น PDF ฟรี",
    href: "/jpg-to-pdf",
  },
  {
    title: "PDF to JPG",
    description: "แปลง PDF เป็นรูปภาพ JPG",
    href: "/pdf-to-jpg",
  },
  {
    title: "Merge PDF",
    description: "รวมไฟล์ PDF ออนไลน์ฟรี",
    href: "/merge-pdf",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-blue-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <div className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
            All Tools
          </div>

          <h1 className="mt-6 text-5xl font-bold md:text-7xl">
            เครื่องมือทั้งหมด
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            รวมเครื่องมือแปลงไฟล์ออนไลน์ฟรี ใช้งานง่าย รวดเร็ว และปลอดภัย
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-[32px] border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-bold text-blue-300">
                ⚡
              </div>

              <h2 className="mt-6 text-2xl font-semibold transition group-hover:text-blue-300">
                {tool.title}
              </h2>

              <p className="mt-3 text-white/60">
                {tool.description}
              </p>

              <div className="mt-8 inline-flex items-center text-sm text-blue-300">
                เปิดเครื่องมือ →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 transition hover:bg-white/10"
          >
            ← กลับหน้าแรก
          </Link>
        </div>
      </section>
    </main>
  );
}