"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function MergePdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleAddFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selected]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [
        copy[index],
        copy[index - 1],
      ];
      return copy;
    });
  }

  function moveDown(index: number) {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      [copy[index + 1], copy[index]] = [
        copy[index],
        copy[index + 1],
      ];
      return copy;
    });
  }

  async function handleMerge() {
    if (files.length < 2) {
      alert("กรุณาเลือกไฟล์ PDF อย่างน้อย 2 ไฟล์");
      return;
    }

    try {
      setLoading(true);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);

        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();

      const blob = new Blob([mergedBytes], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      setMergedUrl(url);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการรวมไฟล์");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-blue-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          Merge PDF Tool
        </div>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          Merge PDF
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60">
          รวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียวในเบราว์เซอร์
        </p>

        {/* Upload */}
        <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleAddFiles}
            className="block w-full rounded-2xl border border-white/10 bg-black/40 p-5"
          />

          {/* File List */}
          <div className="mt-6 space-y-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4"
              >
                <p className="text-sm text-white/80 truncate">
                  {file.name}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => moveUp(index)}
                    className="rounded bg-white/10 px-2 py-1 text-xs"
                  >
                    ↑
                  </button>

                  <button
                    onClick={() => moveDown(index)}
                    className="rounded bg-white/10 px-2 py-1 text-xs"
                  >
                    ↓
                  </button>

                  <button
                    onClick={() => removeFile(index)}
                    className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-300"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Merge Button */}
          <button
            onClick={handleMerge}
            disabled={loading}
            className="mt-6 rounded-2xl bg-white px-6 py-4 font-medium text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "กำลังรวมไฟล์..." : "รวม PDF"}
          </button>

          {/* Result */}
          {mergedUrl && (
            <div className="mt-10">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <p className="text-sm text-white/60">
                  รวมไฟล์สำเร็จแล้ว
                </p>
              </div>

              <a
                href={mergedUrl}
                download="merged.pdf"
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