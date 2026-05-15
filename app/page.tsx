import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
          Fast Thai File Tools
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          แปลงไฟล์ฟรี
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            รวดเร็ว ปลอดภัย
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60 md:text-xl">
          แปลง JPG เป็น PDF, ย่อรูป, แปลงไฟล์ออนไลน์ฟรี
          รองรับมือถือและใช้งานได้ทันทีโดยไม่ต้องสมัครสมาชิก
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/tools"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white transition hover:scale-105 hover:bg-white/10"
          >
            ดูเครื่องมือทั้งหมด
          </Link>
        </div>
      </section>
    </main>
  );
}