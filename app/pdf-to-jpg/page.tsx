"use client";

import Link from "next/link";
import { useState } from "react";

export default function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    if (!file) {
      alert("กรุณาเลือกไฟล์ PDF");
      return;
    }

    try {
      setLoading(true);
      setImages([]);

      // dynamic import ป้องกัน Next.js/Turbopack พัง
      const pdfjsLib = await import("pdfjs-dist");

      // worker
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      const outputImages: string[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);

        const viewport = page.getViewport({
          scale: 2,
        });

        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const imageUrl = canvas.toDataURL(
          "image/jpeg",
          0.95
        );

        outputImages.push(imageUrl);
      }

      setImages(outputImages);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการแปลง PDF");
    } finally {
      setLoading(false);
    }
  }

  function downloadImage(
    imageUrl: string,
    index: number
  ) {
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = `page-${index + 1}.jpg`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-blue-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        {/* Badge */}
        <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          PDF to JPG Tool
        </div>

        {/* Title */}
        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          PDF → JPG
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg text-white/60">
          แปลงไฟล์ PDF เป็นรูป JPG ออนไลน์ฟรี
          ทำงานในเบราว์เซอร์โดยไม่ต้องอัปโหลดไฟล์
        </p>

        {/* Upload Card */}
        <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              setFile(e.target.files?.[0] || null)
            }
            className="block w-full rounded-2xl border border-white/10 bg-black/40 p-5"
          />

          {/* Convert Button */}
          <button
            onClick={handleConvert}
            disabled={loading}
            className="mt-6 rounded-2xl bg-white px-6 py-4 font-medium text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading
              ? "กำลังแปลง PDF..."
              : "แปลงเป็น JPG"}
          </button>

          {/* Images */}
          {images.length > 0 && (
            <div className="mt-10 space-y-8">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-black/30"
                >
                  {/* Preview */}
                  <img
                    src={image}
                    alt={`page-${index + 1}`}
                    className="w-full"
                  />

                  {/* Download */}
                  <div className="p-5">
                    <button
                      onClick={() =>
                        downloadImage(image, index)
                      }
                      className="rounded-2xl bg-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-105"
                    >
                      ดาวน์โหลดหน้า {index + 1}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back */}
        <Link
          href="/tools"
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 transition hover:bg-white/10"
        >
          ← กลับหน้า Tools
        </Link>
      </section>
    </main>
  );
}