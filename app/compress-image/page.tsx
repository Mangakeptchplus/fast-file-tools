"use client";

import imageCompression from "browser-image-compression";
import Link from "next/link";
import { useState } from "react";

export default function CompressImagePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCompress() {
    if (!selectedFile) {
      alert("กรุณาเลือกรูปภาพก่อน");
      return;
    }

    try {
      setLoading(true);

      const compressedFile = await imageCompression(selectedFile, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const imageUrl = URL.createObjectURL(compressedFile);

      setCompressedImage(imageUrl);
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-black to-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-300">
          Compress Image Tool
        </div>

        <h1 className="text-5xl font-bold md:text-7xl">
          ย่อรูปภาพออนไลน์ฟรี
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-white/60">
          ลดขนาดไฟล์รูป JPG, PNG และ WEBP ฟรี
          โดยไม่ต้องอัปโหลดขึ้นเซิร์ฟเวอร์
        </p>

        <div className="mt-12 w-full rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setSelectedFile(e.target.files?.[0] || null)
            }
            className="block w-full rounded-2xl border border-white/10 bg-black/40 p-5"
          />

          <button
            onClick={handleCompress}
            disabled={loading}
            className="mt-6 rounded-2xl bg-white px-6 py-4 font-medium text-black transition hover:scale-105 disabled:opacity-50"
          >
            {loading ? "กำลังย่อรูป..." : "เริ่มย่อรูปภาพ"}
          </button>

          {compressedImage && (
            <div className="mt-10">
              <div className="overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={compressedImage}
                  alt="Compressed"
                  className="w-full"
                />
              </div>

              <a
                href={compressedImage}
                download="compressed-image.jpg"
                className="mt-6 inline-block rounded-2xl bg-blue-500 px-6 py-4 font-medium text-white transition hover:scale-105"
              >
                ดาวน์โหลดรูปภาพ
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