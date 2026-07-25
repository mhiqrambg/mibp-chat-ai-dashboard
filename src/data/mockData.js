export const MOCK_CHATS = {
  "Image Editing Request": {
    id: "chat-1",
    title: "Image Editing Request",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Tolong editkan gambar konsep logo ini agar memiliki nuansa glassmorphism futuristik dengan aksen neon cyan.",
        time: "10:24 AM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Tentu! Berikut adalah hasil generasi ulang gambar dengan gaya Glassmorphism, efek pencahayaan neon cyan, serta bayangan halus 3D:",
        time: "10:25 AM",
        media: {
          type: "image",
          title: "Mibp.dev Glassmorphism Concept v2.4",
          aspectRatio: "16/9",
          svgPreview: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
              <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0a1128"/>
                  <stop offset="50%" stop-color="#001f54"/>
                  <stop offset="100%" stop-color="#034078"/>
                </linearGradient>
                <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00f5d4"/>
                  <stop offset="100%" stop-color="#00bbf9"/>
                </linearGradient>
                <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
                  <stop offset="100%" stop-color="rgba(255,255,255,0.05)"/>
                </linearGradient>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="15"/>
                </filter>
              </defs>
              <rect width="800" height="450" fill="url(#bg)"/>
              <circle cx="250" cy="150" r="140" fill="url(#cyan-glow)" opacity="0.4" filter="url(#blur)"/>
              <circle cx="580" cy="300" r="160" fill="#7b2cbf" opacity="0.35" filter="url(#blur)"/>
              <!-- Glass Card -->
              <rect x="220" y="80" width="360" height="290" rx="30" fill="url(#glass)" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
              <!-- Orb -->
              <circle cx="400" cy="205" r="55" fill="url(#cyan-glow)"/>
              <circle cx="380" cy="185" r="18" fill="#ffffff" opacity="0.65"/>
              <text x="400" y="315" font-family="sans-serif" font-size="22" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="4">MIBP.DEV AI</text>
            </svg>
          `,
        },
        actions: ["Download 4K", "Varian Lain", "Upscale"],
      },
    ],
  },

  "Replace characters request": {
    id: "chat-2",
    title: "Replace characters request",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Bagaimana cara melakukan replace karakter spesifik dalam string menggunakan JavaScript & Regex?",
        time: "11:10 AM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Anda dapat menggunakan metode `.replace()` atau `.replaceAll()` bawaan JavaScript. Berikut adalah contoh implementasi lengkapnya:",
        time: "11:11 AM",
        codeSnippet: {
          language: "javascript",
          code: `// Contoh 1: Replace kata tertentu dengan Regex Global (g)
const text = "Mibp.dev v4.0 is super fast. Mibp.dev is smart!";
const result = text.replace(/Mibp.dev/g, "Mibp.dev AI Pro");

console.log(result); 
// Output: "Mibp.dev AI Pro v4.0 is super fast. Mibp.dev AI Pro is smart!"

// Contoh 2: Replace karakter spesifik menggunakan Callback Function
const rawInput = "user_name_123#test";
const sanitized = rawInput.replace(/[^a-zA-Z0-9]/g, (match) => {
  return match === '#' ? '_hash_' : '_';
});

console.log(sanitized);`,
        },
        actions: ["Copy Code", "Jalankan Test", "Versi Python"],
      },
    ],
  },

  "Shorten Notification Message": {
    id: "chat-3",
    title: "Shorten Notification Message",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Buatkan variasi pesan notifikasi yang singkat & persuasif saat kuota generasi gambar AI pengguna hampir habis.",
        time: "02:15 PM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Berikut adalah 3 opsi pesan notifikasi push singkat (max 60 karakter) yang bisa digunakan:",
        time: "02:15 PM",
        suggestions: [
          "⚡ Sisa 2 generasi AI! Upgrade ke Pro agar kreasi tak terhenti.",
          "🎨 Kueri AI Anda hampir habis. Nikmati kuota unlimited di Pro!",
          "🔥 Kuota harian sisa 10%. Tingkatkan ke paket Mibp.dev Pro.",
        ],
      },
    ],
  },

  "Image Concept Creation": {
    id: "chat-4",
    title: "Image Concept Creation",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Buatkan konsep visual kota futuristik tahun 2099 dengan tema cyber-green & neon lights.",
        time: "04:30 PM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Berikut adalah konsep ilustrasi kota futuristik tahun 2099 yang dirancang dengan arsitektur vertikal dan aksen neon hijau bioluminescent:",
        time: "04:31 PM",
        media: {
          type: "image",
          title: "Neo Metropolis 2099 — Concept Art",
          aspectRatio: "16/9",
          svgPreview: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
              <defs>
                <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#051923"/>
                  <stop offset="100%" stop-color="#003554"/>
                </linearGradient>
                <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00a6fb"/>
                  <stop offset="100%" stop-color="#05f140"/>
                </linearGradient>
              </defs>
              <rect width="800" height="450" fill="url(#sky)"/>
              <!-- Buildings -->
              <rect x="50" y="120" width="90" height="330" fill="#001219"/>
              <rect x="70" y="150" width="10" height="250" fill="#05f140" opacity="0.8"/>
              <rect x="180" y="80" width="120" height="370" fill="#002233"/>
              <rect x="230" y="100" width="15" height="300" fill="#00a6fb" opacity="0.9"/>
              <rect x="340" y="40" width="140" height="410" fill="#001524"/>
              <polygon points="410,10 370,50 450,50" fill="url(#neon)"/>
              <rect x="520" y="100" width="100" height="350" fill="#002233"/>
              <rect x="650" y="140" width="110" height="310" fill="#001219"/>
              <!-- Flying vehicles -->
              <ellipse cx="280" cy="180" rx="35" ry="4" fill="#05f140"/>
              <ellipse cx="580" cy="130" rx="45" ry="5" fill="#00a6fb"/>
            </svg>
          `,
        },
        actions: ["Variasi Cuaca", "Tampilkan Angle Kamera Lain", "Ekspor 3D Model"],
      },
    ],
  },

  "Design Enhancement Guide": {
    id: "chat-5",
    title: "Design Enhancement Guide",
    messages: [
      {
        id: "m1",
        sender: "user",
        text: "Berikan rincian saran peningkatan UI/UX untuk dashboard AI ini.",
        time: "06:00 PM",
      },
      {
        id: "m2",
        sender: "ai",
        text: "Berikut 4 poin utama rekomendasi peningkatan pengalaman pengguna (UX) dan estetika (UI):",
        time: "06:01 PM",
        checklists: [
          { title: "Micro-interactions", status: "Recommended", desc: "Tambahkan efek hover halus pada kartu fitur dan tombol action." },
          { title: "Theme Switching", status: "Done", desc: "Dukungan tema System, Light, dan Dark telah aktif dengan transisi mulus." },
          { title: "Streaming Response", status: "Active", desc: "Simulasi indikator ketik dan respon real-time dari model Mibp.dev v4.2." },
          { title: "Accessibility (a11y)", status: "Pending", desc: "Tingkatkan rasio kontras teks pada status badge." },
        ],
      },
    ],
  },
};

export function generateMockApiResponse(prompt) {
  const isCode = /code|script|react|javascript|python|css|html|function|api/i.test(prompt);
  const isImage = /image|gambar|foto|desain|logo|draw|generate|art|visual/i.test(prompt);
  const isVideo = /video|animasi|movie|cinematic|film/i.test(prompt);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isImage) {
    return {
      id: "ai-" + Date.now(),
      sender: "ai",
      text: `Tentu! Berikut adalah hasil visualisasi Mibp.dev AI berdasarkan petunjuk: "${prompt}"`,
      time: timeStr,
      media: {
        type: "image",
        title: prompt.slice(0, 30) + "...",
        aspectRatio: "16/9",
        svgPreview: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00c6fb"/>
                <stop offset="100%" stop-color="#005bea"/>
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="#0d1117"/>
            <rect x="50" y="40" width="700" height="370" rx="20" fill="url(#g1)" opacity="0.85"/>
            <circle cx="400" cy="225" r="90" fill="#ffffff" opacity="0.2"/>
            <text x="400" y="235" font-family="sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle">🎨 Generated Visual Result</text>
          </svg>
        `,
      },
      actions: ["Download HD", "Variasi Gambar", "Edit Prompt"],
    };
  }

  if (isCode) {
    return {
      id: "ai-" + Date.now(),
      sender: "ai",
      text: `Berikut adalah solusi kode yang dioptimalkan untuk permintaan Anda:`,
      time: timeStr,
      codeSnippet: {
        language: "javascript",
        code: `// Mibp.dev AI Code Assistant Solution
async function handleMibpApiRequest(payload) {
  try {
    const response = await fetch('/api/v4/mibp/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Mibp.dev Engine Error:', error);
  }
}`,
      },
      actions: ["Copy Code", "Format Code", "Jalankan Test"],
    };
  }

  if (isVideo) {
    return {
      id: "ai-" + Date.now(),
      sender: "ai",
      text: `Video cinematic berhasil dirancang berdasarkan petunjuk Anda: "${prompt}"`,
      time: timeStr,
      media: {
        type: "video",
        title: "Cinematic Preview — Mibp.dev Motion v4",
        aspectRatio: "16/9",
        svgPreview: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
            <rect width="800" height="450" fill="#090d16"/>
            <circle cx="400" cy="225" r="45" fill="rgba(0,198,251,0.9)"/>
            <polygon points="390,205 420,225 390,245" fill="#ffffff"/>
            <text x="400" y="320" font-family="sans-serif" font-size="18" fill="rgba(255,255,255,0.7)" text-anchor="middle">▶ Click to Play Video Simulation</text>
          </svg>
        `,
      },
      actions: ["Export MP4", "Ubah Frame Rate", "Enhance 4K"],
    };
  }

  return {
    id: "ai-" + Date.now(),
    sender: "ai",
    text: `Terima kasih! Saya telah memproses kueri Anda: "${prompt}". Mibp.dev v4.2 siap membantu menyelesaikan tugas Anda secara efisien. Ada hal lain yang ingin Anda kembangkan?`,
    time: timeStr,
    suggestions: [
      "Berikan contoh praktis",
      "Format dalam tabel",
      "Jelaskan langkah demi langkah",
    ],
  };
}
