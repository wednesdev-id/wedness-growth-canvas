export type Language = 'ID' | 'EN';

export const translations = {
    ID: {
        nav: {
            home: "Beranda",
            about: "Tentang",
            services: "Layanan",
            portfolio: "Portofolio",
            products: "Produk",
            blog: "Blog",
            learn: "Belajar",
            contact: "Kontak",
            getStarted: "Mulai Sekarang"
        },
        hero: {
            title: "Kembangkan Bisnis Anda dengan Solusi Sistem yang Berdampak",
            subtitle: "Kami bantu bisnis Anda berkembang melalui analisis, optimasi, dan sistem yang berdampak nyata.",
            consultation: "Konsultasi Sekarang",
            whatsapp: "Chat via WhatsApp",
            badges: {
                clients: "Klien Puas",
                years: "Tahun Pengalaman",
                projects: "Proyek Selesai"
            },
            stats: {
                projects: "Proyek Selesai",
                industries: "Industri Terlayani",
                satisfaction: "Kepuasan Klien"
            }
        },
        about: {
            title: "Tentang",
            description: "WednesDev adalah agensi yang berfokus pada pendampingan solusi dan pembuatan sistem untuk membantu perusahaan tumbuh secara signifikan. Fokus utama kami adalah analisis risiko, mitigasi masalah, dan optimasi sistem yang berorientasi pada impact terhadap bisnis.",
            mission: {
                title: "Misi Kami",
                description: "Memberdayakan bisnis dengan solusi teknologi yang tepat sasaran dan berdampak langsung pada pertumbuhan."
            },
            vision: {
                title: "Visi Kami",
                description: "Menjadi mitra teknologi terpercaya yang menghadirkan transformasi digital berkelanjutan."
            },
            approach: {
                title: "Pendekatan Kami",
                description: "Kolaboratif, data-driven, dan fokus pada impact bisnis yang terukur."
            },
            values: {
                title: "Nilai Utama Kami",
                items: [
                    "Analisis Risiko Mendalam",
                    "Mitigasi Masalah Strategis",
                    "Optimasi Sistem Berkelanjutan",
                    "Kolaborasi Data-Driven"
                ]
            }
        },
        services: {
            title: "Solusi Kami",
            subtitle: "Empat pilar utama yang kami tawarkan untuk memastikan sistem Anda siap berkembang",
            items: [
                {
                    title: "Sistem Bisnis Kustom",
                    description: "Pembuatan sistem yang disesuaikan dengan kebutuhan spesifik bisnis Anda untuk meningkatkan efisiensi operasional.",
                    features: [
                        "Pengembangan Perangkat Lunak Kustom",
                        "Otomatisasi Proses Bisnis",
                        "Integrasi Sistem",
                        "Pengembangan API"
                    ]
                },
                {
                    title: "Optimasi Alur Kerja & Operasional",
                    description: "Analisis dan perbaikan proses bisnis untuk menghilangkan bottleneck dan meningkatkan produktivitas.",
                    features: [
                        "Analisis Proses",
                        "Optimasi Alur Kerja",
                        "Pemantauan Kinerja",
                        "Peningkatan Efisiensi"
                    ]
                },
                {
                    title: "Integrasi Teknologi dan Data",
                    description: "Menghubungkan berbagai sistem dan platform untuk menciptakan ekosistem teknologi yang terintegrasi.",
                    features: [
                        "Integrasi Sistem",
                        "Migrasi Data",
                        "Integrasi API",
                        "Solusi Cloud"
                    ]
                },
                {
                    title: "Konsultasi & Pendampingan Digital Transformation",
                    description: "Bimbingan strategis untuk transformasi digital yang berkelanjutan dan berorientasi pada hasil bisnis.",
                    features: [
                        "Strategi Digital",
                        "Konsultasi Teknologi",
                        "Manajemen Perubahan",
                        "Pelatihan & Dukungan"
                    ]
                }
            ]
        },
        packages: {
            title: "Paket Layanan Kami",
            subtitle: "Pilih paket yang tepat untuk memulai perjalanan digital Anda.",
            items: [
                {
                    name: "Starter",
                    priceLabel: "Rp 5.000.000",
                    target: "Untuk landing page & company profile",
                    features: [
                        "PRD mini & konsultasi",
                        "UI/UX basic (1–2 layar)",
                        "Development 1 halaman",
                        "Testing & deployment",
                        "1x revisi minor",
                        "Project PIC & laporan",
                    ],
                    duration: "1 Bulan",
                    optionalNote: "Opsional: Maintenance Rp 250.000/meeting",
                },
                {
                    name: "Growth / Startup",
                    priceLabel: "Rp 15.000.000 – 20.000.000",
                    target: "Untuk sistem kecil & dashboard dasar",
                    features: [
                        "PRD standard",
                        "UI/UX 5–7 layar",
                        "Frontend + backend CRUD & auth",
                        "API dasar",
                        "Testing & QA",
                        "2x revisi fungsional",
                        "Deployment & server setup",
                        "Project PIC",
                    ],
                    duration: "3 Bulan",
                    optionalNote: "Opsional: Maintenance modul Rp 500.000 – 800.000",
                },
                {
                    name: "Complex System",
                    priceLabel: "Rp 35.000.000 – 40.000.000",
                    target: "Untuk sistem menengah–besar, multi-role, integrasi API",
                    features: [
                        "PRD advanced (10–20 halaman)",
                        "UI/UX system design (10–20 layar)",
                        "Frontend & backend lengkap",
                        "Integrasi API / Payment / Chat",
                        "User testing",
                        "VPS/Docker deployment",
                        "3x revisi fungsional",
                        "Training & dokumentasi",
                    ],
                    duration: "6 Bulan",
                    optionalNote: "Opsional: Maintenance Rp 1.000.000 – 2.000.000/bulan",
                },
                {
                    name: "Enterprise / Custom",
                    priceLabel: "Custom (by request)",
                    target: "Sistem skala besar, integrasi penuh, project khusus lembaga & korporasi",
                    features: [
                        "Business consulting",
                        "Full PRD workshop",
                        "Multi-team development",
                        "Infrastruktur skala besar",
                        "SLA & support prioritas",
                    ],
                    duration: "Disepakati bersama",
                }
            ]
        },
        addons: {
            title: "Layanan Tambahan & Add-ons",
            subtitle: "Lengkapi kebutuhan proyek Anda dengan layanan tambahan yang kami sediakan.",
            categories: [
                {
                    title: "Konsultasi dan Dokumen",
                    items: [
                        { name: "Consultation / Meeting (Define Scope)", desc: "Diskusi kebutuhan sistem, mapping user flow, platform, feature list", price: "Rp300.000 / sesi" },
                        { name: "PRD Basic", desc: "Dokumen kebutuhan produk + flow dasar + sitemap", price: "Rp500.000" },
                        { name: "PRD Advanced", desc: "Detail fungsi, ERD, use case, prioritas fitur, dan estimasi sprint", price: "Rp1.000.000 – Rp2.000.000" },
                        { name: "Tech Consultation (Stack & Arsitektur)", desc: "Saran stack tech, integrasi API, dan skalabilitas", price: "Rp500.000 / sesi" },
                    ]
                },
                {
                    title: "Desain dan Branding",
                    items: [
                        { name: "Wireframe (UX structure)", desc: "Layout dasar tanpa warna", price: "Rp250.000 / layar" },
                        { name: "UI Design (Full Figma)", desc: "High fidelity, responsive", price: "Rp300.000 – Rp500.000 / layar" },
                        { name: "Prototype (Clickable)", desc: "Interaksi flow demo", price: "Rp500.000 / proyek" },
                        { name: "Logo Design", desc: "Minimal 2 konsep logo", price: "Rp750.000 – Rp1.000.000" },
                        { name: "Brand Identity Kit", desc: "Logo, color palette, typography, grid, dan mockup", price: "Rp2.000.000 – Rp3.000.000" },
                        { name: "Design System / UI Library", desc: "Button, component, layout grid, typography guide", price: "Rp1.000.000 – Rp1.500.000" },
                    ]
                },
                {
                    title: "Development",
                    items: [
                        { name: "Landing Page (Single Page)", desc: "Frontend only", price: "Rp2.500.000" },
                        { name: "Dashboard Basic (CRUD, auth)", desc: "Frontend + backend", price: "Rp10.000.000 – Rp12.000.000" },
                        { name: "Module / Feature Add-on", desc: "Tambah 1 fitur (contoh: export data, upload file, dll)", price: "Rp500.000 – Rp1.500.000 / modul" },
                        { name: "Integration (API, Payment, Third Party)", desc: "1 endpoint eksternal", price: "Rp750.000 – Rp1.500.000" },
                        { name: "Admin Panel / CMS Custom", desc: "Panel kelola konten & data", price: "Rp2.000.000 – Rp3.000.000" },
                        { name: "Testing & QA", desc: "Manual test + report", price: "Rp250.000 – Rp500.000 / sesi" },
                    ]
                },
                {
                    title: "Payment Gateway Integration",
                    note: "⚠️ Fee transaksi 2.9%–3.2% tetap ditanggung merchant (klien), bukan agency.",
                    items: [
                        { name: "Basic Integration (Midtrans/Xendit)", desc: "API + callback test", price: "Rp750.000" },
                        { name: "Multiple PG / Split Payment", desc: "2+ metode pembayaran", price: "Rp1.000.000 – Rp1.500.000" },
                        { name: "Merchant Setup & Verification Help", desc: "Bantuan pendaftaran akun, konfigurasi callback", price: "Rp300.000" },
                        { name: "Payment UI Customization", desc: "Desain flow pembayaran di frontend", price: "Rp250.000 – Rp500.000" },
                        { name: "Testing (Sandbox + Production)", desc: "QA dan simulasi transaksi", price: "Rp200.000" },
                    ]
                },
                {
                    title: "Maintenance dan Support",
                    items: [
                        { name: "Basic Maintenance", desc: "Bug fix minor 1x / bulan", price: "Rp300.000 / bulan" },
                        { name: "Standard Maintenance", desc: "2 meeting + update minor", price: "Rp500.000 / bulan" },
                        { name: "Pro Maintenance", desc: "4 meeting, backup + update major", price: "Rp1.000.000 / bulan" },
                        { name: "On-demand Fix / Urgent Task", desc: "Request minor <1 jam", price: "Rp150.000 / task" },
                        { name: "Feature Update (v2/v3)", desc: "Penambahan modul di sistem lama", price: "Rp500.000 – Rp2.000.000 / modul" },
                    ]
                },
                {
                    title: "Copywriting dan Konten",
                    items: [
                        { name: "Landing Page Copywriting", desc: "Headline, CTA, tagline", price: "Rp300.000 – Rp500.000" },
                        { name: "System Microcopy", desc: "UX writing per modul (Button, Label, Empty State)", price: "Rp150.000 / modul" },
                        { name: "Brand Voice & Messaging", desc: "Panduan gaya bahasa brand", price: "Rp500.000" },
                        { name: "Social Preview (meta + OG image)", desc: "Desain + teks promosi", price: "Rp300.000" },
                    ]
                },
                {
                    title: "Server, Hosting, dan Domain",
                    items: [
                        { name: "Server Setup (VPS/Droplet)", desc: "Initial setup Ubuntu + Nginx/PM2", price: "Rp300.000 – Rp500.000" },
                        { name: "Domain + SSL + Config", desc: "DNS, SSL, dan pointing", price: "Rp250.000" },
                        { name: "CI/CD Integration (GitHub – VPS)", desc: "Auto deploy pipeline", price: "Rp500.000" },
                        { name: "Backup Automation / Cronjob", desc: "Snapshot, DB backup", price: "Rp300.000" },
                        { name: "Monitoring (Uptime / Error Log)", desc: "Setting notifikasi uptime", price: "Rp200.000" },
                    ]
                },
                {
                    title: "Project Management",
                    items: [
                        { name: "Project Tracking (Notion / ClickUp Setup)", desc: "Setup + template task board", price: "Rp200.000" },
                        { name: "Sprint Management (Agile)", desc: "Estimasi waktu & sprint breakdown", price: "Rp500.000" },
                        { name: "Weekly Report / Review Meeting", desc: "Rekap + evaluasi progres", price: "Rp250.000 / minggu" },
                        { name: "Client Portal Access", desc: "Tambahan mini dashboard progress", price: "Rp500.000" },
                    ]
                }
            ]
        },
        approach: {
            title: "Langkah Kami",
            subtitle: "Metodologi terstruktur untuk memastikan setiap proyek mencapai hasil yang terukur",
            steps: [
                {
                    title: "Analisis Risiko & Kebutuhan",
                    description: "Deep dive ke dalam sistem Anda untuk memahami konteks bisnis, identifikasi bottleneck, dan mapping potensi risiko."
                },
                {
                    title: "Rencana & Mitigasi Masalah",
                    description: "Rancang strategi penyelesaian masalah yang tepat sasaran dengan meminimalkan disruption pada operasional bisnis."
                },
                {
                    title: "Pembuatan & Implementasi Sistem",
                    description: "Implementasi solusi dan fine-tuning sistem untuk mencapai performa optimal yang mendukung skalabilitas."
                },
                {
                    title: "Optimasi & Monitoring Dampak",
                    description: "Monitoring berkelanjutan dan iterasi untuk memastikan sistem terus berkembang sejalan dengan pertumbuhan bisnis."
                }
            ]
        },
        values: {
            title: "Nilai & Impact",
            subtitle: "Prinsip-prinsip yang memandu setiap keputusan dan tindakan kami",
            items: [
                {
                    title: "Impact-Driven",
                    description: "Setiap solusi dirancang untuk memberikan dampak langsung pada pertumbuhan dan efisiensi bisnis Anda."
                },
                {
                    title: "Collaborative",
                    description: "Kami percaya pada kemitraan sejati. Tim kami bekerja bersama tim Anda untuk mencapai tujuan bersama."
                },
                {
                    title: "Data-Oriented",
                    description: "Keputusan berbasis data, bukan asumsi. Setiap rekomendasi didukung oleh analisis mendalam dan metrics."
                },
                {
                    title: "Scalable Systems",
                    description: "Sistem yang kami bangun dirancang untuk tumbuh bersama bisnis Anda, dari startup hingga enterprise."
                }
            ],
            impactOptimization: {
                title: "Impact Optimization",
                before: {
                    title: "Before Optimization",
                    items: [
                        "Sistem lambat & tidak responsif",
                        "Frequent downtime & bugs",
                        "Unclear scalability path",
                        "High operational costs"
                    ]
                },
                after: {
                    title: "After Optimization",
                    items: [
                        "Fast & reliable performance",
                        "99.9% uptime guaranteed",
                        "Future-proof architecture",
                        "Reduced costs by 40%+"
                    ]
                }
            }
        },
        portfolio: {
            title: "Portfolio Projects",
            subtitle: "Beberapa proyek yang telah kami kerjakan untuk berbagai industri",
            modal: {
                visitWebsite: "Visit Website",
                description: "Project description",
                skills: "Skills and deliverables",
                clientReview: "Client Review",
                publishedOn: "Published on",
                screenshot: "Project Screenshot",
                moreBy: "More by"
            },
            items: [
                {
                    title: "folearn.id",
                    category: "Education Technology",
                    description: "Platform pembelajaran digital sederhana (Lightweight Learning Platform) yang dirancang khusus untuk siswa SMP. Sistem ini fokus pada penyediaan akses materi pelajaran dalam bentuk teks dan video yang mudah diakses. Dibangun dengan arsitektur yang mengutamakan reliabilitas dan kemudahan penggunaan, platform ini menggunakan Strapi sebagai CMS untuk manajemen konten guru dan antarmuka web yang intuitif untuk siswa, tanpa kompleksitas fitur LMS penuh.",
                    review: "Platform dasar yang solid dan sangat mudah digunakan oleh guru dan siswa. Fokus pada konten materi tersampaikan dengan baik."
                },
                {
                    title: "Sinergi UMKM Indonesia",
                    category: "SME Enabler Platform",
                    description: "Platform konsultan dan enabler berbasis teknologi tinggi untuk akselerasi UMKM Indonesia. Mengintegrasikan ekosistem lengkap mulai dari AI-powered Self-Assessment untuk mengukur kesiapan usaha, Dashboard personal, LMS untuk pelatihan, hingga akses ke pembiayaan (Financing Hub) dan pasar ekspor (Export Hub). Solusi komprehensif untuk digitalisasi, pendampingan, dan pertumbuhan bisnis UMKM.",
                    review: "Solusi digital terlengkap untuk UMKM. Fitur assessment dan roadmap-nya sangat membantu pemetaan bisnis."
                },
                {
                    title: "Whatsapp Scrapper",
                    category: "Customer Service Integration",
                    description: "Fitur integrasi WhatsApp ke Sistem Customer Service (CS) yang memungkinkan pengelolaan pesan secara terpusat dan real-time. Sistem ini menyediakan saluran komunikasi omnichannel, dashboard agent interaktif, dan penyimpanan riwayat chat terstruktur. Fitur utama meliputi inbound/outbound messaging, manajemen antrian chat, dan logging otomatis untuk monitoring kualitas layanan.",
                    review: "Sangat membantu tim CS kami dalam mengelola ribuan pesan pelanggan setiap hari dengan efisien."
                }
            ]
        },
        products: {
            title: "Katalog Produk Kami",
            subtitle: "Jelajahi koleksi lengkap solusi teknologi yang telah kami kembangkan untuk berbagai kebutuhan bisnis. Setiap produk dirancang dengan teknologi terdepan dan telah terbukti memberikan hasil nyata.",
            requestDemo: "Request Demo",
            notifyMe: "Notify Me",
            consult: "Request Demo / Consult",
            showMore: "Show More Products",
            category: "Category",
            description: "Description",
            keyFeatures: "Key Features",
            rating: "Rating",
            activeUsers: "Active Users",
            userFeedback: "User Feedback",
            releasedIn: "Released in",
            moreProducts: "More Products",
            status: {
                available: "Available",
                comingSoon: "Coming Soon"
            },
            items: [
                {
                    name: "ERP System Pro",
                    description: "Sistem manajemen sumber daya perusahaan yang komprehensif untuk mengoptimalkan operasional bisnis Anda. Modul lengkap mencakup Keuangan, HR, Inventori, dan Penjualan.",
                    review: "Sistem ERP terbaik yang pernah kami gunakan. Sangat membantu efisiensi operasional."
                },
                {
                    name: "Smart Inventory Manager",
                    description: "Solusi manajemen inventori cerdas dengan AI untuk prediksi stok dan otomatisasi pemesanan. Hindari kehabisan stok dan overstock dengan algoritma prediksi canggih kami.",
                    review: "Fitur prediksi AI-nya sangat akurat. Kami menghemat biaya penyimpanan hingga 30%."
                },
                {
                    name: "Customer Analytics Suite",
                    description: "Platform analitik pelanggan untuk memahami perilaku dan meningkatkan engagement. Dapatkan wawasan mendalam tentang perjalanan pelanggan Anda dari akuisisi hingga retensi.",
                    review: "Dashboard yang sangat intuitif. Membantu kami membuat keputusan berbasis data."
                },
                {
                    name: "Digital Workflow Automation",
                    description: "Otomatisasi alur kerja digital untuk meningkatkan efisiensi dan mengurangi kesalahan manual. Buat workflow custom tanpa coding dengan drag-and-drop interface.",
                    review: "Mengubah cara kerja tim kami menjadi jauh lebih produktif dan terorganisir."
                },
                {
                    name: "E-Commerce Platform Plus",
                    description: "Platform e-commerce lengkap dengan fitur advanced untuk bisnis online modern. Dukung pertumbuhan bisnis Anda dengan fitur marketing tools dan integrasi marketplace.",
                    review: "Platform yang stabil dan kaya fitur. Penjualan kami meningkat signifikan."
                },
                {
                    name: "AI Business Intelligence",
                    description: "Sistem business intelligence dengan AI untuk insight mendalam dan decision making yang lebih baik. Analisis tren pasar dan performa bisnis secara real-time.",
                    review: "Coming Soon"
                }
            ]
        },
        impact: {
            title: "Dampak Nyata untuk Bisnis Anda",
            subtitle: "Hasil terukur yang telah kami capai bersama klien-klien kami",
            cta: "Siap merasakan dampak yang sama untuk bisnis Anda?",
            button: "Mulai Konsultasi Sekarang",
            stats: [
                { label: "Efisiensi Operasional", description: "Peningkatan rata-rata efisiensi operasional klien kami" },
                { label: "Penghematan Waktu", description: "Waktu produksi yang berhasil dihemat melalui optimasi sistem" },
                { label: "Pengurangan Biaya", description: "Biaya operasional yang berhasil ditekan dengan sistem yang tepat" },
                { label: "Klien Puas", description: "Perusahaan yang telah merasakan dampak positif solusi kami" }
            ],
            testimonials: [
                { quote: "Solusi kami membantu klien menghemat waktu dan biaya produksi hingga 40%.", role: "Impact Analysis" },
                { quote: "Sistem yang dibangun tidak hanya efisien, tapi juga scalable untuk pertumbuhan jangka panjang.", role: "System Implementation" }
            ]
        },
        testimonials: {
            title: "Kata Mereka Tentang Kami",
            subtitle: "Kepercayaan klien adalah bukti nyata kualitas kerja kami",
            trustedBy: "Dipercaya oleh perusahaan terkemuka",
            items: [
                { testimonial: "Wedness Dev tidak hanya membantu kami membangun sistem, tapi juga mengajarkan best practices yang membuat tim kami lebih produktif. ROI yang kami dapatkan melebihi ekspektasi." },
                { testimonial: "Pendekatan mereka yang data-driven dan kolaboratif membuat kami merasa benar-benar dipahami. Sistem yang dibangun scalable dan mudah dimaintain. Highly recommended!" },
                { testimonial: "Tim yang sangat responsif dan professional. Mereka berhasil mengoptimasi sistem kami yang awalnya sering down menjadi 99.9% uptime. Impact langsung terasa pada revenue." },
                { testimonial: "Wedness Dev membantu kami mengidentifikasi bottleneck yang tidak kami sadari selama ini. Setelah optimasi, operational cost turun 35% dan kecepatan proses meningkat drastis." }
            ]
        },
        contact: {
            title: "Siap untuk Berkembang?",
            subtitle: "Konsultasikan kebutuhan sistem Anda dengan tim ahli kami. Gratis dan tanpa komitmen.",
            form: {
                title: "Hubungi Kami",
                description: "Tim kami siap mendengarkan kebutuhan Anda dan memberikan solusi terbaik untuk tantangan teknologi yang Anda hadapi.",
                name: "Nama Lengkap",
                namePlaceholder: "John Doe",
                email: "Email",
                message: "Pesan",
                messagePlaceholder: "Ceritakan tentang project atau tantangan yang Anda hadapi...",
                submit: "Kirim Pesan",
                submitting: "Mengirim...",
                success: "Pesan Terkirim!",
                successDesc: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
                locations: "Lokasi"
            },
            whatsappButton: "Chat Langsung via WhatsApp"
        },
        footer: {
            brandDesc: "Agensi untuk solusi sistem yang berdampak. Kami membantu bisnis berkembang melalui analisis, optimasi, dan sistem yang tepat sasaran.",
            copyright: "© 2024 WednesDev. All rights reserved.",
            links: {
                services: "Services",
                company: "Company",
                contact: "Contact"
            },
            items: {
                customSystem: "Sistem Bisnis Kustom",
                workflowOptimization: "Optimasi Alur Kerja",
                techIntegration: "Integrasi Teknologi",
                digitalConsulting: "Konsultasi Digital",
                about: "Tentang Kami",
                approach: "Langkah Kami",
                impact: "Dampak Nyata",
                portfolio: "Portfolio",
                contact: "Hubungi Kami"
            }
        }
    },
    EN: {
        nav: {
            home: "Home",
            about: "About",
            services: "Services",
            portfolio: "Portfolio",
            products: "Products",
            blog: "Blog",
            learn: "Learn",
            contact: "Contact",
            getStarted: "Get Started"
        },
        hero: {
            title: "Grow Your Business with Impact-Driven System Solutions",
            subtitle: "We help your business grow through analysis, optimization, and real-impact systems.",
            consultation: "Consult Now",
            whatsapp: "Chat via WhatsApp",
            badges: {
                clients: "Happy Clients",
                years: "Years Experience",
                projects: "Projects Completed"
            },
            stats: {
                projects: "Projects Delivered",
                industries: "Industries Served",
                satisfaction: "Client Satisfaction"
            }
        },
        about: {
            title: "About",
            description: "WednesDev is an agency focused on solution assistance and system creation to help companies grow significantly. Our main focus is risk analysis, problem mitigation, and system optimization oriented towards business impact.",
            mission: {
                title: "Our Mission",
                description: "Empowering businesses with targeted technology solutions that directly impact growth."
            },
            vision: {
                title: "Our Vision",
                description: "To be a trusted technology partner delivering sustainable digital transformation."
            },
            approach: {
                title: "Our Approach",
                description: "Collaborative, data-driven, and focused on measurable business impact."
            },
            values: {
                title: "Our Core Values",
                items: [
                    "Deep Risk Analysis",
                    "Strategic Problem Mitigation",
                    "Sustainable System Optimization",
                    "Data-Driven Collaboration"
                ]
            }
        },
        services: {
            title: "Our Solutions",
            subtitle: "Four main pillars we offer to ensure your system is ready to grow",
            items: [
                {
                    title: "Custom Business Systems",
                    description: "Creation of systems tailored to your specific business needs to increase operational efficiency.",
                    features: [
                        "Custom Software Development",
                        "Business Process Automation",
                        "System Integration",
                        "API Development"
                    ]
                },
                {
                    title: "Workflow & Operational Optimization",
                    description: "Analysis and improvement of business processes to eliminate bottlenecks and increase productivity.",
                    features: [
                        "Process Analysis",
                        "Workflow Optimization",
                        "Performance Monitoring",
                        "Efficiency Enhancement"
                    ]
                },
                {
                    title: "Technology and Data Integration",
                    description: "Connecting various systems and platforms to create an integrated technology ecosystem.",
                    features: [
                        "System Integration",
                        "Data Migration",
                        "API Integration",
                        "Cloud Solutions"
                    ]
                },
                {
                    title: "Digital Transformation Consulting & Assistance",
                    description: "Strategic guidance for sustainable and business-result-oriented digital transformation.",
                    features: [
                        "Digital Strategy",
                        "Technology Consulting",
                        "Change Management",
                        "Training & Support"
                    ]
                }
            ]
        },
        packages: {
            title: "Our Service Packages",
            subtitle: "Choose the perfect plan to kickstart your digital journey.",
            items: [
                {
                    name: "Starter",
                    priceLabel: "Rp 5.000.000",
                    target: "For landing page & company profile",
                    features: [
                        "Mini PRD & consultation",
                        "Basic UI/UX (1–2 screens)",
                        "1 page Development",
                        "Testing & deployment",
                        "1x minor revision",
                        "Project PIC & report",
                    ],
                    duration: "1 Month",
                    optionalNote: "Optional: Maintenance Rp 250.000/meeting",
                },
                {
                    name: "Growth / Startup",
                    priceLabel: "Rp 15.000.000 – 20.000.000",
                    target: "For small systems & basic dashboard",
                    features: [
                        "Standard PRD",
                        "UI/UX 5–7 screens",
                        "Frontend + backend CRUD & auth",
                        "Basic API",
                        "Testing & QA",
                        "2x functional revisions",
                        "Deployment & server setup",
                        "Project PIC",
                    ],
                    duration: "3 Months",
                    optionalNote: "Optional: Module maintenance Rp 500.000 – 800.000",
                },
                {
                    name: "Complex System",
                    priceLabel: "Rp 35.000.000 – 40.000.000",
                    target: "For medium-large systems, multi-role, API integration",
                    features: [
                        "Advanced PRD (10–20 pages)",
                        "UI/UX system design (10–20 screens)",
                        "Full Frontend & Backend",
                        "API / Payment / Chat Integration",
                        "User testing",
                        "VPS/Docker deployment",
                        "3x functional revisions",
                        "Training & documentation",
                    ],
                    duration: "6 Months",
                    optionalNote: "Optional: Maintenance Rp 1.000.000 – 2.000.000/month",
                },
                {
                    name: "Enterprise / Custom",
                    priceLabel: "Custom (by request)",
                    target: "Large scale systems, full integration, agency & corporate projects",
                    features: [
                        "Business consulting",
                        "Full PRD workshop",
                        "Multi-team development",
                        "Large scale infrastructure",
                        "SLA & priority support",
                    ],
                    duration: "Mutually agreed",
                }
            ]
        },
        addons: {
            title: "Additional Services & Add-ons",
            subtitle: "Complete your project needs with our additional services.",
            categories: [
                {
                    title: "Consultation and Documents",
                    items: [
                        { name: "Consultation / Meeting (Define Scope)", desc: "Discuss system needs, user flow mapping, platform, feature list", price: "Rp300.000 / session" },
                        { name: "PRD Basic", desc: "Product requirement document + basic flow + sitemap", price: "Rp500.000" },
                        { name: "PRD Advanced", desc: "Functional details, ERD, use case, feature priorities, and sprint estimation", price: "Rp1.000.000 – Rp2.000.000" },
                        { name: "Tech Consultation (Stack & Architecture)", desc: "Tech stack advice, API integration, and scalability", price: "Rp500.000 / session" },
                    ]
                },
                {
                    title: "Design and Branding",
                    items: [
                        { name: "Wireframe (UX structure)", desc: "Basic layout without colors", price: "Rp250.000 / screen" },
                        { name: "UI Design (Full Figma)", desc: "High fidelity, responsive", price: "Rp300.000 – Rp500.000 / screen" },
                        { name: "Prototype (Clickable)", desc: "Interaction flow demo", price: "Rp500.000 / project" },
                        { name: "Logo Design", desc: "Minimum 2 logo concepts", price: "Rp750.000 – Rp1.000.000" },
                        { name: "Brand Identity Kit", desc: "Logo, color palette, typography, grid, and mockups", price: "Rp2.000.000 – Rp3.000.000" },
                        { name: "Design System / UI Library", desc: "Buttons, components, layout grid, typography guide", price: "Rp1.000.000 – Rp1.500.000" },
                    ]
                },
                {
                    title: "Development",
                    items: [
                        { name: "Landing Page (Single Page)", desc: "Frontend only", price: "Rp2.500.000" },
                        { name: "Dashboard Basic (CRUD, auth)", desc: "Frontend + backend", price: "Rp10.000.000 – Rp12.000.000" },
                        { name: "Module / Feature Add-on", desc: "Add 1 feature (e.g. data export, file upload, etc.)", price: "Rp500.000 – Rp1.500.000 / module" },
                        { name: "Integration (API, Payment, Third Party)", desc: "1 external endpoint", price: "Rp750.000 – Rp1.500.000" },
                        { name: "Admin Panel / CMS Custom", desc: "Content & data management panel", price: "Rp2.000.000 – Rp3.000.000" },
                        { name: "Testing & QA", desc: "Manual test + report", price: "Rp250.000 – Rp500.000 / session" },
                    ]
                },
                {
                    title: "Payment Gateway Integration",
                    note: "⚠️ Transaction fee 2.9%–3.2% covered by merchant (client), not agency.",
                    items: [
                        { name: "Basic Integration (Midtrans/Xendit)", desc: "API + callback test", price: "Rp750.000" },
                        { name: "Multiple PG / Split Payment", desc: "2+ payment methods", price: "Rp1.000.000 – Rp1.500.000" },
                        { name: "Merchant Setup & Verification Help", desc: "Account registration help, callback configuration", price: "Rp300.000" },
                        { name: "Payment UI Customization", desc: "Frontend payment flow design", price: "Rp250.000 – Rp500.000" },
                        { name: "Testing (Sandbox + Production)", desc: "QA and transaction simulation", price: "Rp200.000" },
                    ]
                },
                {
                    title: "Maintenance and Support",
                    items: [
                        { name: "Basic Maintenance", desc: "Minor bug fix 1x / month", price: "Rp300.000 / month" },
                        { name: "Standard Maintenance", desc: "2 meetings + minor updates", price: "Rp500.000 / month" },
                        { name: "Pro Maintenance", desc: "4 meetings, backup + major updates", price: "Rp1.000.000 / month" },
                        { name: "On-demand Fix / Urgent Task", desc: "Minor request <1 hour", price: "Rp150.000 / task" },
                        { name: "Feature Update (v2/v3)", desc: "Adding modules to existing system", price: "Rp500.000 – Rp2.000.000 / module" },
                    ]
                },
                {
                    title: "Copywriting and Content",
                    items: [
                        { name: "Landing Page Copywriting", desc: "Headline, CTA, tagline", price: "Rp300.000 – Rp500.000" },
                        { name: "System Microcopy", desc: "UX writing per module (Buttons, Labels, Empty States)", price: "Rp150.000 / module" },
                        { name: "Brand Voice & Messaging", desc: "Brand language style guide", price: "Rp500.000" },
                        { name: "Social Preview (meta + OG image)", desc: "Design + promo text", price: "Rp300.000" },
                    ]
                },
                {
                    title: "Server, Hosting, and Domain",
                    items: [
                        { name: "Server Setup (VPS/Droplet)", desc: "Initial setup Ubuntu + Nginx/PM2", price: "Rp300.000 – Rp500.000" },
                        { name: "Domain + SSL + Config", desc: "DNS, SSL, and pointing", price: "Rp250.000" },
                        { name: "CI/CD Integration (GitHub – VPS)", desc: "Auto deploy pipeline", price: "Rp500.000" },
                        { name: "Backup Automation / Cronjob", desc: "Snapshot, DB backup", price: "Rp300.000" },
                        { name: "Monitoring (Uptime / Error Log)", desc: "Uptime notification setting", price: "Rp200.000" },
                    ]
                },
                {
                    title: "Project Management",
                    items: [
                        { name: "Project Tracking (Notion / ClickUp Setup)", desc: "Setup + task board template", price: "Rp200.000" },
                        { name: "Sprint Management (Agile)", desc: "Time estimation & sprint breakdown", price: "Rp500.000" },
                        { name: "Weekly Report / Review Meeting", desc: "Recap + progress evaluation", price: "Rp250.000 / week" },
                        { name: "Client Portal Access", desc: "Additional progress mini dashboard", price: "Rp500.000" },
                    ]
                }
            ]
        },
        approach: {
            title: "Our Steps",
            subtitle: "Structured methodology to ensure every project achieves measurable results",
            steps: [
                {
                    title: "Risk & Requirement Analysis",
                    description: "Deep dive into your system to understand business context, identify bottlenecks, and map potential risks."
                },
                {
                    title: "Plan & Problem Mitigation",
                    description: "Design targeted problem-solving strategies while minimizing disruption to business operations."
                },
                {
                    title: "System Creation & Implementation",
                    description: "Solution implementation and system fine-tuning to achieve optimal performance supporting scalability."
                },
                {
                    title: "Optimization & Impact Monitoring",
                    description: "Continuous monitoring and iteration to ensure the system keeps growing in line with business growth."
                }
            ]
        },
        values: {
            title: "Values & Impact",
            subtitle: "Principles guiding our decisions and actions",
            items: [
                {
                    title: "Impact-Driven",
                    description: "Every solution is designed to provide direct impact on your business growth and efficiency."
                },
                {
                    title: "Collaborative",
                    description: "We believe in true partnership. Our team works together with your team to achieve common goals."
                },
                {
                    title: "Data-Oriented",
                    description: "Data-based decisions, not assumptions. Every recommendation is supported by deep analysis and metrics."
                },
                {
                    title: "Scalable Systems",
                    description: "Systems we build are designed to grow with your business, from startup to enterprise."
                }
            ],
            impactOptimization: {
                title: "Impact Optimization",
                before: {
                    title: "Before Optimization",
                    items: [
                        "Slow & unresponsive system",
                        "Frequent downtime & bugs",
                        "Unclear scalability path",
                        "High operational costs"
                    ]
                },
                after: {
                    title: "After Optimization",
                    items: [
                        "Fast & reliable performance",
                        "99.9% uptime guaranteed",
                        "Future-proof architecture",
                        "Reduced costs by 40%+"
                    ]
                }
            }
        },
        portfolio: {
            title: "Portfolio Projects",
            subtitle: "Some projects we have worked on for various industries",
            modal: {
                visitWebsite: "Visit Website",
                description: "Project description",
                skills: "Skills and deliverables",
                clientReview: "Client Review",
                publishedOn: "Published on",
                screenshot: "Project Screenshot",
                moreBy: "More by"
            },
            items: [
                {
                    title: "folearn.id",
                    category: "Education Technology",
                    description: "Simple digital learning platform (Lightweight Learning Platform) designed specifically for middle school students. Focuses on providing access to study materials in text and video formats. Built with architecture prioritizing reliability and ease of use, using Strapi as CMS for teacher content management and intuitive web interface for students, without full LMS complexity.",
                    review: "Solid basic platform and very easy to use for teachers and students. Focus on material content is delivered well."
                },
                {
                    title: "Sinergi UMKM Indonesia",
                    category: "SME Enabler Platform",
                    description: "High-tech consultant and enabler platform for Indonesian SME acceleration. Integrating complete ecosystem from AI-powered Self-Assessment for business readiness, personal Dashboard, LMS for training, to access to Financing Hub and Export Hub. Comprehensive solution for digitalization, assistance, and SME business growth.",
                    review: "Most complete digital solution for SMEs. Assessment and roadmap features are very helpful for business mapping."
                },
                {
                    title: "Whatsapp Scrapper",
                    category: "Customer Service Integration",
                    description: "WhatsApp integration feature to Customer Service (CS) System enabling centralized and real-time message management. Provides omnichannel communication channel, interactive agent dashboard, and structured chat history storage. Key features include inbound/outbound messaging, chat queue management, and automated logging for service quality monitoring.",
                    review: "Very helpful for our CS team in efficiently managing thousands of customer messages daily."
                }
            ]
        },
        products: {
            title: "Our Product Catalog",
            subtitle: "Explore our complete collection of technology solutions developed for various business needs. Each product is designed with leading technology and proven to deliver real results.",
            requestDemo: "Request Demo",
            notifyMe: "Notify Me",
            consult: "Request Demo / Consult",
            showMore: "Show More Products",
            category: "Category",
            description: "Description",
            keyFeatures: "Key Features",
            rating: "Rating",
            activeUsers: "Active Users",
            userFeedback: "User Feedback",
            releasedIn: "Released in",
            moreProducts: "More Products",
            status: {
                available: "Available",
                comingSoon: "Coming Soon"
            },
            items: [
                {
                    name: "ERP System Pro",
                    description: "Comprehensive enterprise resource planning system to optimize your business operations. Complete modules including Finance, HR, Inventory, and Sales.",
                    review: "Best ERP system we've used. Very helpful for operational efficiency."
                },
                {
                    name: "Smart Inventory Manager",
                    description: "Smart inventory management solution with AI for stock prediction and automated ordering. Avoid stockouts and overstock with our advanced prediction algorithm.",
                    review: "AI prediction feature is very accurate. We saved storage costs up to 30%."
                },
                {
                    name: "Customer Analytics Suite",
                    description: "Customer analytics platform to understand behavior and improve engagement. Get deep insights into your customer journey from acquisition to retention.",
                    review: "Very intuitive dashboard. Helps us make data-driven decisions."
                },
                {
                    name: "Digital Workflow Automation",
                    description: "Digital workflow automation to increase efficiency and reduce manual errors. Create custom workflows without coding with drag-and-drop interface.",
                    review: "Changed our team's way of working to be much more productive and organized."
                },
                {
                    name: "E-Commerce Platform Plus",
                    description: "Complete e-commerce platform with advanced features for modern online businesses. Support your business growth with marketing tools and marketplace integration.",
                    review: "Stable and feature-rich platform. Our sales increased significantly."
                },
                {
                    name: "AI Business Intelligence",
                    description: "Business intelligence system with AI for deep insights and better decision making. Analyze market trends and business performance in real-time.",
                    review: "Coming Soon"
                }
            ]
        },
        impact: {
            title: "Real Impact for Your Business",
            subtitle: "Measurable results we have achieved with our clients",
            cta: "Ready to experience the same impact for your business?",
            button: "Start Consultation Now",
            stats: [
                { label: "Operational Efficiency", description: "Average increase in our clients' operational efficiency" },
                { label: "Time Savings", description: "Production time saved through system optimization" },
                { label: "Cost Reduction", description: "Operational costs reduced with the right system" },
                { label: "Satisfied Clients", description: "Companies that have felt the positive impact of our solutions" }
            ],
            testimonials: [
                { quote: "Our solution helped clients save production time and costs up to 40%.", role: "Impact Analysis" },
                { quote: "The system built is not only efficient, but also scalable for long-term growth.", role: "System Implementation" }
            ]
        },
        testimonials: {
            title: "What They Say About Us",
            subtitle: "Client trust is real proof of our work quality",
            trustedBy: "Trusted by leading companies",
            items: [
                { testimonial: "Wedness Dev not only helped us build the system, but also taught best practices making our team more productive. The ROI we got exceeded expectations." },
                { testimonial: "Their data-driven and collaborative approach made us feel truly understood. The system built is scalable and easy to maintain. Highly recommended!" },
                { testimonial: "Very responsive and professional team. They successfully optimized our system which was often down to 99.9% uptime. Impact felt directly on revenue." },
                { testimonial: "Wedness Dev helped us identify bottlenecks we didn't realize. After optimization, operational cost dropped 35% and process speed increased drastically." }
            ]
        },
        contact: {
            title: "Ready to Grow?",
            subtitle: "Consult your system needs with our expert team. Free and no commitment.",
            form: {
                title: "Contact Us",
                description: "Our team is ready to listen to your needs and provide the best solution for the tech challenges you face.",
                name: "Full Name",
                namePlaceholder: "John Doe",
                email: "Email",
                message: "Message",
                messagePlaceholder: "Tell us about the project or challenge you are facing...",
                submit: "Send Message",
                submitting: "Sending...",
                success: "Message Sent!",
                successDesc: "Thank you for contacting us. We will respond shortly.",
                locations: "Location"
            },
            whatsappButton: "Chat Directly via WhatsApp"
        },
        footer: {
            brandDesc: "Agency for impact-driven system solutions. We help businesses grow through analysis, optimization, and targeted systems.",
            copyright: "© 2024 WednesDev. All rights reserved.",
            links: {
                services: "Services",
                company: "Company",
                contact: "Contact"
            },
            items: {
                customSystem: "Custom Business Systems",
                workflowOptimization: "Workflow Optimization",
                techIntegration: "Technology Integration",
                digitalConsulting: "Digital Consulting",
                about: "About Us",
                approach: "Our Steps",
                impact: "Real Impact",
                portfolio: "Portfolio",
                contact: "Contact Us"
            }
        }
    }
};
