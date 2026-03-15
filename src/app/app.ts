import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Navigation visibility
  hideNav = false;

  // --- Financial Logic Adapted for IT Consultant ---
  billableHours = signal(400); // Base target hours per month

  // Constants
  readonly pricePerHour = 500000; 
  readonly unitTotalHPP = 50000; // Cost API/Server scaling per hour of dev
  
  readonly marketingCostValue = 5000000;
  readonly operationalCostValue = 10000000; 
  readonly softwareCostValue = 5000000; 
  readonly salaryCostValue = 61000000; // Updated: 20jt + 15jt + 15jt + 11jt
  
  // Total Initial Investment Calculation
  readonly initialCapital = 50000000 + 100000000 + 120000000 + 10000000 + 20000000; 

  // Computed Values (Monthly Base for IT)
  totalRevenue = computed(() => this.billableHours() * this.pricePerHour);
  totalCOGS = computed(() => this.billableHours() * this.unitTotalHPP);
  
  monthlyFixedCostTotal = computed(() => 
    this.marketingCostValue + 
    this.operationalCostValue + 
    this.softwareCostValue + 
    this.salaryCostValue
  );

  totalMonthlyExpense = computed(() => this.totalCOGS() + this.monthlyFixedCostTotal());
  monthlyNetProfit = computed(() => this.totalRevenue() - this.totalMonthlyExpense());

  // Helper computed for display
  marketingCost = computed(() => this.marketingCostValue);
  opCost = computed(() => this.operationalCostValue); 
  softwareCost = computed(() => this.softwareCostValue);
  salaryCost = computed(() => this.salaryCostValue);

  // ROI Projection Logic
  roiProjection = computed(() => {
    const monthly = this.monthlyNetProfit();
    const initial = this.initialCapital;
    let cumulative = -initial;
    const projection = [];
    
    // Month 0 (Investment)
    projection.push({
      month: 'Bulan 0 (Investasi)',
      revenue: -initial,
      cumulative: cumulative,
      isBEP: false
    });

    for (let i = 1; i <= 12; i++) {
      cumulative += monthly;
      const isBEP = cumulative >= 0 && (cumulative - monthly) < 0;
      
      projection.push({
        month: `Bulan ${i}`,
        revenue: monthly,
        cumulative: cumulative,
        isBEP: isBEP
      });
    }
    return projection;
  });

  // --- Content Data Adapted for IT Consultant ---
  goals = [
    "Membantu perusahaan skala menengah bertransformasi secara digital dengan efisien (Osterwalder & Pigneur, 2010).",
    "Mengembangkan arsitektur perangkat lunak yang aman, scalable, dan modern (Sommerville, 2015).",
    "Mencapai target billable hours yang stabil melalui skema retainer bulanan.",
    "Menciptakan ekosistem kerja bagi talenta IT lokal terbaik di Bandung."
  ];

  servicesItems = [
    { name: "Custom Web & Mobile Development", tag: "Core Service", desc: "Pembuatan aplikasi full-stack (React, Node.js) yang dirancang khusus untuk memenuhi logika bisnis kompleks.", color: "bg-white", textColor: "" },
    { name: "Cloud Migration & DevOps", tag: "Infrastructure", desc: "Penyusunan arsitektur AWS/GCP dan implementasi CI/CD untuk memastikan aplikasi berjalan tanpa down-time.", color: "bg-white", textColor: "" },
    { name: "Cybersecurity & IT Audit", tag: "Security", desc: "Layanan Penetration Testing dan audit kerentanan sistem untuk mengamankan data sensitif perusahaan.", color: "bg-[#E0F2FE]/40", textColor: "" },
    { name: "Tech Consultancy & Retainer", tag: "Partnership", desc: "Dedikasi tim engineer secara bulanan (retainer) untuk maintenance dan pengembangan fitur berkelanjutan.", color: "bg-[#0F172A]", textColor: "text-white" }
  ];

  keys = ['a', 'b', 'c', 'd']; 
  marketAnalysis = [
    { title: "Kekuatan Layanan", list: ["Metodologi Agile yang transparan dan adaptif (Beck et al., 2001).", "Tech-stack modern (React/Go) yang anti-usang.", "Standar kode internasional dengan code review ketat."] },
    { title: "Tantangan Utama", list: ["Siklus penutupan klien B2B (sales cycle) yang relatif panjang.", "Ketatnya persaingan dengan Software House skala enterprise."] },
    { title: "Peluang (Opportunity)", list: ["Kebijakan digitalisasi UMKM/Korporat dari pemerintah.", "Banyaknya bisnis konvensional yang beralih ke e-commerce & aplikasi custom."] },
    { title: "Strategi Harga & Model", content: "Model bisnis menggunakan skema Billable Hours (Jam Kerja) senilai Rp 500.000/jam atau paket Retainer bulanan untuk klien jangka panjang (Osterwalder & Pigneur, 2010)." }
  ];

  devSteps = [
    "<strong class='text-[#38BDF8] block mb-1'>Requirement Gathering & Prototyping:</strong> Diskusi intensif dengan klien untuk memetakan alur bisnis. Hasilnya berupa wireframe (Figma) dan dokumen spesifikasi perangkat lunak (PRD) (Sommerville, 2015).",
    "<strong class='text-[#38BDF8] block mb-1'>Sprint Development (Agile):</strong> Pembuatan kode (frontend & backend) yang dibagi ke dalam sprint mingguan (Beck et al., 2001). Progres dapat dipantau klien secara real-time via staging server (Ries, 2011).",
    "<strong class='text-[#38BDF8] block mb-1'>QA Testing & Security Audit:</strong> Uji coba fungsionalitas menyeluruh (Automated & Manual testing) untuk memastikan tidak ada bug dan celah keamanan sebelum rilis (Sommerville, 2015).",
    "<strong class='text-[#38BDF8] block mb-1'>Deployment & Maintenance:</strong> Migrasi sistem ke Cloud Server production (AWS/GCP), disertai dukungan monitoring server 24/7."
  ];

  tenagaKerja = [
    { role: "Project Manager / Scrum Master", count: 1, salary: "Rp 20.000.000" },
    { role: "Frontend Engineer (React/Next.js)", count: 1, salary: "Rp 15.000.000" },
    { role: "Backend Engineer (Go/Node.js)", count: 1, salary: "Rp 15.000.000" },
    { role: "UI/UX Designer & QA", count: 1, salary: "Rp 11.000.000" }
  ];

  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  setBillableHours(value: number) {
    if (!isNaN(value) && value >= 0) {
      this.billableHours.set(value);
    }
  }

  downloadPDF() {
    window.print();
  }
}
