"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function JpgToPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    if (!file) {
      alert("กรุณาเลือกรูปภาพก่อน");
      return;
    }

    try {
      setLoading(true);

      const fileBuffer = await file.arrayBuffer();

      const pdfDoc = await PDFDocument.create();

      const image =
        file.type === "image/png"
          ? await pdfDoc.embedPng(fileBuffer)
          : await pdfDoc.embedJpg(fileBuffer);

      const page = pdfDoc.addPage();

      const { width, height } = image.scale(1);

      page.setSize(width, height);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการแปลงไฟล์");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-blue-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          JPG to PDF Tool
        </div>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          JPG → PDF Converter
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60">
          แปลงรูปภาพเป็นไฟล์ PDF ได้ทันทีในเบราว์เซอร์
          ไม่ต้องอัปโหลด ไม่ต้องรอเซิร์ฟเวอร์
        </p>

        {/* Upload Box */}
        <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="block w-full rounded-2xl border border-white/10 bg-black/40 p-5"
          />

          <button
            onClick={handleConvert}
            disabled={loading}
            className="mt-6 rounded-2xl bg-white px-6 py-4 font-medium text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "กำลังแปลง..." : "แปลงเป็น PDF"}
          </button>

          {/* Preview & Download */}
          {pdfUrl && (
            <div className="mt-10">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm text-white/60">
                  แปลงไฟล์สำเร็จแล้ว
                </p>
              </div>

              <a
                href={pdfUrl}
                download="converted.pdf"
                className="mt-6 inline-block rounded-2xl bg-blue-500 px-6 py-4 font-medium text-white transition hover:scale-105"
              >
                ดาวน์โหลด PDF
              </a>
            </div>
          )}
        </div>

        <Link
          href="/"
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 transition hover:bg-white/10"
        >
          ← กลับหน้าแรก
        </Link>
      </section>
    </main>
  );
}