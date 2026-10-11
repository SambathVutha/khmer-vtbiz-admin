// Centralized Enterprise Store for Khmer VTBiz ERP & POS
// Provides cross-page reactive synchronization across:
// - Products & Inventory
// - Sales & Invoicing (POS + B2B Sell)
// - Purchases & Stock Replenishment
// - Contacts (Customer Receivables & Supplier Payables)
// - Expenses & Outflows
// - Inter-Branch Stock Transfers
// - Stock Adjustments
// - POS Active Cashier Shift
// - Real-time Executive KPIs & Financial Reports

export interface StoreProduct {
  id: string
  name: string
  sku: string
  barcode?: string
  category: string
  unit: string
  costUsd: number
  sellUsd: number
  priceUsd?: number
  stock: number
  alertLevel: number
  branches: string[]
  status: 'active' | 'inactive'
  icon: string
  color: string
}

export interface StoreContact {
  id: string
  code: string
  type: 'customer' | 'supplier'
  name: string
  businessName?: string
  group?: 'retail' | 'vip' | 'wholesale'
  category?: string
  phone: string
  telegram?: string
  email?: string
  taxId?: string
  address?: string
  city: string
  creditLimitUsd: number
  paymentTerms: string
  balanceDueUsd: number
  totalOrders: number
  notes?: string
}

export interface StoreSaleLine {
  productId: string
  productName: string
  unitPrice: number
  qty: number
  discountPercent?: number
}

export interface StoreSale {
  id: string
  invoiceNo: string
  date: string
  time: string
  customerName: string
  customerPhone: string
  customerType: 'retail' | 'vip' | 'wholesale'
  branch: string
  channel: 'pos' | 'direct' | 'b2b' | 'online'
  orderStatus: 'completed' | 'draft' | 'quotation'
  paymentStatus: 'paid' | 'partial' | 'due'
  paymentMethod: string
  subtotalUsd: number
  orderDiscountUsd: number
  vatAmountUsd: number
  shippingFeeUsd: number
  grandTotalUsd: number
  paidAmountUsd: number
  dueAmountUsd: number
  cashier: string
  notes?: string
  items: StoreSaleLine[]
}

export interface StorePurchaseLine {
  productName: string
  sku: string
  unitCost: number
  quantity: number
  receivedQuantity: number
  totalCost: number
}

export interface StorePurchase {
  id: string
  referenceNo: string
  invoiceNo?: string
  supplierName: string
  supplierPhone: string
  branch: string
  date: string
  time?: string
  purchaseStatus: 'received' | 'pending' | 'ordered'
  paymentStatus: 'paid' | 'due' | 'partial'
  items: StorePurchaseLine[]
  subtotalUsd: number
  taxUsd: number
  shippingUsd: number
  discountUsd: number
  grandTotalUsd: number
  paidAmountUsd: number
  dueAmountUsd: number
  paymentMethod: string
  addedBy: string
  notes?: string
}

export interface StoreExpense {
  id: string
  referenceNo: string
  invoiceNo?: string
  date: string
  time?: string
  branch: string
  category: string
  payee: string
  amountUsd: number
  paidAmountUsd: number
  dueAmountUsd: number
  paymentStatus: 'paid' | 'due' | 'partial'
  paymentMethod: string
  loggedBy: string
  notes?: string
}

export interface StoreTransferLine {
  productName: string
  sku: string
  quantity: number
  unitPriceUsd?: number
  unitCostUsd?: number
  availableStock?: number
}

export interface StoreTransfer {
  id: string
  referenceNo: string
  trackingNo?: string
  date: string
  time?: string
  fromBranch: string
  toBranch: string
  status: 'completed' | 'in_transit' | 'pending' | 'cancelled'
  courierName: string
  dispatchedBy: string
  receivedBy?: string
  shippingCostUsd?: number
  shippingFeeUsd?: number
  merchandiseValueUsd?: number
  items: StoreTransferLine[]
  notes?: string
}

export interface StoreAdjustmentLine {
  productName: string
  sku: string
  previousStock?: number
  currentStock?: number
  quantity?: number
  adjustedQuantity?: number
  newStock?: number
  unitCostUsd: number
  reason?: string
}

export interface StoreAdjustment {
  id: string
  referenceNo: string
  date: string
  time?: string
  branch: string
  type?: 'normal' | 'abnormal'
  reason?: string
  adjustmentType?: string
  adjustedBy?: string
  conductedBy?: string
  items: StoreAdjustmentLine[]
  totalImpactUsd?: number
  netValueChangeUsd?: number
  notes?: string
}

export interface StoreShift {
  shiftNumber: string
  status: 'open' | 'closed'
  cashier: string
  branch: string
  registerId: string
  openedAt: string
  openingFloatUsd: number
  openingFloatKhr: number
  openingNotes: string
  cashSalesUsd: number
  cashSalesKhr: number
  khqrSalesUsd: number
  cardSalesUsd: number
  totalSalesUsd: number
  totalOrdersCount: number
  cashInUsd: number
  cashOutUsd: number
  closedAt?: string
  countedCashUsd?: number
  countedCashKhr?: number
  varianceUsd?: number
  varianceKhr?: number
  closingNotes?: string
}

export const useEnterpriseStore = () => {
  // 1. PRODUCTS & INVENTORY
  const products = useState<StoreProduct[]>('vtbiz_products', () => [
    {
      id: 'p1',
      name: 'Iced Americano',
      sku: 'BEV-001',
      barcode: '8850029110',
      category: 'Beverages',
      unit: 'Cup',
      costUsd: 1.00,
      sellUsd: 2.50,
      stock: 45,
      alertLevel: 10,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '☕',
      color: '#eff6ff'
    },
    {
      id: 'p2',
      name: 'Brown Sugar Milk Tea',
      sku: 'BEV-002',
      barcode: '8850029111',
      category: 'Beverages',
      unit: 'Cup',
      costUsd: 1.50,
      sellUsd: 3.25,
      stock: 38,
      alertLevel: 10,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '🧋',
      color: '#fef3c7'
    },
    {
      id: 'p3',
      name: 'Matcha Latte Ice',
      sku: 'BEV-003',
      barcode: '8850029112',
      category: 'Beverages',
      unit: 'Cup',
      costUsd: 1.60,
      sellUsd: 3.50,
      stock: 24,
      alertLevel: 8,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '🍵',
      color: '#ecfdf5'
    },
    {
      id: 'p4',
      name: 'Natural Mineral Water',
      sku: 'BEV-004',
      barcode: '8850029113',
      category: 'Beverages',
      unit: 'Bottle',
      costUsd: 0.35,
      sellUsd: 1.00,
      stock: 90,
      alertLevel: 15,
      branches: ['Phnom Penh Main Branch', 'Siem Reap Outlet'],
      status: 'active',
      icon: '💧',
      color: '#f0fdf4'
    },
    {
      id: 'p5',
      name: "L'Oréal Professional Shampoo 500ml",
      sku: 'SLN-001',
      barcode: '8850029114',
      category: 'Salon & Spa',
      unit: 'Bottle',
      costUsd: 10.50,
      sellUsd: 18.50,
      stock: 32,
      alertLevel: 5,
      branches: ['Phnom Penh Main Branch', 'Siem Reap Outlet'],
      status: 'active',
      icon: '🧴',
      color: '#eff6ff'
    },
    {
      id: 'p6',
      name: 'Moroccan Argan Treatment Oil 100ml',
      sku: 'SLN-002',
      barcode: '8850029115',
      category: 'Salon & Spa',
      unit: 'Bottle',
      costUsd: 16.00,
      sellUsd: 29.00,
      stock: 25,
      alertLevel: 5,
      branches: ['Phnom Penh Main Branch', 'Siem Reap Outlet'],
      status: 'active',
      icon: '✨',
      color: '#fef3c7'
    },
    {
      id: 'p7',
      name: 'Dyson Supersonic Professional Hair Dryer',
      sku: 'EQP-001',
      barcode: '8850029116',
      category: 'Equipment & Tools',
      unit: 'Unit',
      costUsd: 310.00,
      sellUsd: 420.00,
      stock: 14,
      alertLevel: 3,
      branches: ['Phnom Penh Main Branch', 'Siem Reap Outlet'],
      status: 'active',
      icon: '💨',
      color: '#fdf2f8'
    },
    {
      id: 'p8',
      name: 'Keratin Smoothing Repair Serum 250ml',
      sku: 'SLN-003',
      barcode: '8850029117',
      category: 'Salon & Spa',
      unit: 'Bottle',
      costUsd: 18.00,
      sellUsd: 34.00,
      stock: 28,
      alertLevel: 5,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '✨',
      color: '#fff7ed'
    },
    {
      id: 'p9',
      name: 'Butter Croissant',
      sku: 'FOD-001',
      barcode: '8850029118',
      category: 'Bakery & Food',
      unit: 'Piece',
      costUsd: 0.90,
      sellUsd: 2.25,
      stock: 16,
      alertLevel: 5,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '🥐',
      color: '#fef3c7'
    },
    {
      id: 'p10',
      name: 'Club Sandwich Supreme',
      sku: 'FOD-002',
      barcode: '8850029119',
      category: 'Bakery & Food',
      unit: 'Plate',
      costUsd: 1.80,
      sellUsd: 4.50,
      stock: 14,
      alertLevel: 5,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '🥪',
      color: '#ecfdf5'
    },
    {
      id: 'p11',
      name: 'Titanium Ionic Straightener Iron',
      sku: 'EQP-002',
      barcode: '8850029120',
      category: 'Equipment & Tools',
      unit: 'Unit',
      costUsd: 48.00,
      sellUsd: 85.00,
      stock: 18,
      alertLevel: 4,
      branches: ['Phnom Penh Main Branch'],
      status: 'active',
      icon: '✂️',
      color: '#faf5ff'
    },
    {
      id: 'p12',
      name: 'Salon Pro Towels Pack (12pcs)',
      sku: 'RTL-001',
      barcode: '8850029121',
      category: 'Retail & Merch',
      unit: 'Pack',
      costUsd: 12.00,
      sellUsd: 24.00,
      stock: 35,
      alertLevel: 8,
      branches: ['Phnom Penh Main Branch', 'Siem Reap Outlet', 'Battambang Mart'],
      status: 'active',
      icon: '🛍️',
      color: '#eff6ff'
    }
  ])

  // Backward compatibility: ensure priceUsd is defined for POS and other components
  products.value.forEach(p => {
    if (p.priceUsd === undefined) {
      p.priceUsd = p.sellUsd
    }
  })

  // 2. CONTACTS (Customers & Suppliers)
  const contacts = useState<StoreContact[]>('vtbiz_contacts', () => [
    {
      id: 'c-101',
      code: 'CUST-1001',
      type: 'customer',
      name: 'Sokha Meas',
      businessName: 'Meas Beauty & Salon Studio',
      group: 'vip',
      phone: '+855 12 888 234',
      telegram: '@sokhameas_pos',
      email: 'sokha.meas@gmail.com',
      taxId: 'K008-992144',
      address: 'Street 288, BKK1',
      city: 'Phnom Penh',
      creditLimitUsd: 2500,
      paymentTerms: 'Net 15 Days',
      balanceDueUsd: 0,
      totalOrders: 28,
      notes: 'VIP Gold Member. Regular salon client.'
    },
    {
      id: 'c-102',
      code: 'CUST-1002',
      type: 'customer',
      name: 'Walk-in Customer',
      businessName: '',
      group: 'retail',
      phone: '+855 12 000 000',
      telegram: '',
      email: '',
      address: 'Store Front Counter',
      city: 'Phnom Penh',
      creditLimitUsd: 0,
      paymentTerms: 'Immediate Cash / KHQR',
      balanceDueUsd: 0,
      totalOrders: 142,
      notes: 'Standard walk-in customer account.'
    },
    {
      id: 'c-103',
      code: 'CUST-1003',
      type: 'customer',
      name: 'Angkor Spa & Wellness Group',
      businessName: 'Angkor Grand Hospitality Co., Ltd.',
      group: 'wholesale',
      phone: '+855 63 965 111',
      telegram: '@angkorspa_procurement',
      email: 'purchasing@angkorspa.com.kh',
      taxId: 'K003-772188',
      address: 'Sivutha Blvd, Svay Dangkum',
      city: 'Siem Reap',
      creditLimitUsd: 5000,
      paymentTerms: 'Net 30 Days',
      balanceDueUsd: 455.00,
      totalOrders: 14,
      notes: 'Corporate B2B account. Bulk orders shipped via Virak Buntham Logistics.'
    },
    {
      id: 'c-104',
      code: 'CUST-1004',
      type: 'customer',
      name: 'Vicheka Heng',
      businessName: 'Heng Cosmetic Distributions',
      group: 'wholesale',
      phone: '+855 70 333 999',
      telegram: '@vicheka_distro',
      email: 'vicheka.heng@outlook.com',
      taxId: 'K008-119284',
      address: 'Russian Federation Blvd',
      city: 'Phnom Penh',
      creditLimitUsd: 3000,
      paymentTerms: 'Net 30 Days',
      balanceDueUsd: 620.00,
      totalOrders: 19,
      notes: 'Regular wholesale agent for Phnom Penh and Kandal.'
    },
    {
      id: 'c-105',
      code: 'CUST-1005',
      type: 'customer',
      name: 'Sopheap Seng',
      businessName: 'Battambang Premier Salon',
      group: 'retail',
      phone: '+855 98 777 654',
      telegram: '@sopheap_btb',
      email: 'sopheap.seng@gmail.com',
      address: 'Road No 3, Svay Por',
      city: 'Battambang',
      creditLimitUsd: 500,
      paymentTerms: 'Net 7 Days',
      balanceDueUsd: 0,
      totalOrders: 8,
      notes: 'Retail boutique owner in Battambang.'
    },
    {
      id: 's-201',
      code: 'SUP-2001',
      type: 'supplier',
      name: 'L’Oréal Cambodia Distribution Co.',
      businessName: 'L’Oréal Luxe & Professional Indochina',
      category: 'Cosmetics & Hair',
      phone: '+855 23 888 123',
      telegram: '@loreal_kh_sales',
      email: 'orders.cambodia@loreal.com',
      taxId: 'K001-0029188',
      address: 'Vattanac Capital Tower, Level 18',
      city: 'Phnom Penh',
      creditLimitUsd: 20000,
      paymentTerms: 'Net 30 Days',
      balanceDueUsd: 1250.00,
      totalOrders: 24,
      notes: 'Authorized primary supplier for professional hair serums, shampoos, and dyes.'
    },
    {
      id: 's-202',
      code: 'SUP-2002',
      type: 'supplier',
      name: 'Dyson Commercial Thailand / Cambodia',
      businessName: 'Central Retail Indochina Corp.',
      category: 'Equipment & Tools',
      phone: '+855 23 991 440',
      telegram: '@dyson_indochina',
      email: 'b2b.cambodia@dyson.com',
      taxId: 'K002-882711',
      address: 'Exchange Square, Level 10',
      city: 'Phnom Penh',
      creditLimitUsd: 15000,
      paymentTerms: 'Net 15 Days',
      balanceDueUsd: 600.00,
      totalOrders: 12,
      notes: 'Sole official distributor for Dyson Supersonic Hair Dryers.'
    },
    {
      id: 's-203',
      code: 'SUP-2003',
      type: 'supplier',
      name: 'Angkor Packaging & Eco Bottles Ltd.',
      businessName: 'EcoPack Indochina Mfg',
      category: 'Packaging & Consumables',
      phone: '+855 12 772 901',
      telegram: '@ecopack_cambodia',
      email: 'sales@ecopack.com.kh',
      taxId: 'K005-449102',
      address: 'Phnom Penh Special Economic Zone (PPSEZ)',
      city: 'Phnom Penh',
      creditLimitUsd: 5000,
      paymentTerms: 'Net 30 Days',
      balanceDueUsd: 0,
      totalOrders: 18,
      notes: 'Branded eco shopping bags and carton boxes.'
    }
  ])

  // 3. SALES & INVOICES
  const sales = useState<StoreSale[]>('vtbiz_sales', () => [
    {
      id: 's-101',
      invoiceNo: 'INV-2026-0101',
      date: '2026-10-04',
      time: '14:25',
      customerName: 'Sokha Meas',
      customerPhone: '+855 12 888 234',
      customerType: 'vip',
      branch: 'Phnom Penh Main Branch',
      channel: 'pos',
      orderStatus: 'completed',
      paymentStatus: 'paid',
      paymentMethod: 'Bakong KHQR',
      subtotalUsd: 185.00,
      orderDiscountUsd: 10.00,
      vatAmountUsd: 17.50,
      shippingFeeUsd: 0,
      grandTotalUsd: 192.50,
      paidAmountUsd: 192.50,
      dueAmountUsd: 0,
      cashier: 'Vannak Kem',
      items: [
        { productId: 'p5', productName: "L'Oréal Professional Shampoo 500ml", unitPrice: 18.50, qty: 4 },
        { productId: 'p6', productName: 'Moroccan Argan Treatment Oil 100ml', unitPrice: 29.00, qty: 2 },
        { productId: 'p8', productName: 'Keratin Smoothing Repair Serum 250ml', unitPrice: 34.00, qty: 1 }
      ]
    },
    {
      id: 's-102',
      invoiceNo: 'INV-2026-0102',
      date: '2026-10-04',
      time: '11:15',
      customerName: 'Walk-in Customer',
      customerPhone: '+855 12 000 000',
      customerType: 'retail',
      branch: 'Phnom Penh Main Branch',
      channel: 'pos',
      orderStatus: 'completed',
      paymentStatus: 'paid',
      paymentMethod: 'Cash (USD)',
      subtotalUsd: 46.50,
      orderDiscountUsd: 0,
      vatAmountUsd: 4.65,
      shippingFeeUsd: 0,
      grandTotalUsd: 51.15,
      paidAmountUsd: 51.15,
      dueAmountUsd: 0,
      cashier: 'Sreynet Pov',
      items: [
        { productId: 'p1', productName: 'Iced Americano', unitPrice: 2.50, qty: 2 },
        { productId: 'p9', productName: 'Butter Croissant', unitPrice: 2.25, qty: 1 }
      ]
    },
    {
      id: 's-103',
      invoiceNo: 'INV-2026-0103',
      date: '2026-10-03',
      time: '16:40',
      customerName: 'Angkor Spa & Wellness Group',
      customerPhone: '+855 63 965 111',
      customerType: 'wholesale',
      branch: 'Siem Reap Outlet',
      channel: 'b2b',
      orderStatus: 'completed',
      paymentStatus: 'partial',
      paymentMethod: 'ABA Pay',
      subtotalUsd: 1420.00,
      orderDiscountUsd: 120.00,
      vatAmountUsd: 130.00,
      shippingFeeUsd: 25.00,
      grandTotalUsd: 1455.00,
      paidAmountUsd: 1000.00,
      dueAmountUsd: 455.00,
      cashier: 'Dara Chan',
      notes: 'B2B bulk supply contract. Remaining due net 15 days.',
      items: [
        { productId: 'p7', productName: 'Dyson Supersonic Professional Hair Dryer', unitPrice: 420.00, qty: 2 },
        { productId: 'p6', productName: 'Moroccan Argan Treatment Oil 100ml', unitPrice: 29.00, qty: 10 },
        { productId: 'p12', productName: 'Salon Pro Towels Pack (12pcs)', unitPrice: 24.00, qty: 12 }
      ]
    },
    {
      id: 's-104',
      invoiceNo: 'INV-2026-0104',
      date: '2026-10-02',
      time: '10:05',
      customerName: 'Vicheka Heng',
      customerPhone: '+855 70 333 999',
      customerType: 'wholesale',
      branch: 'Phnom Penh Main Branch',
      channel: 'direct',
      orderStatus: 'completed',
      paymentStatus: 'due',
      paymentMethod: 'Credit Card',
      subtotalUsd: 590.00,
      orderDiscountUsd: 40.00,
      vatAmountUsd: 55.00,
      shippingFeeUsd: 15.00,
      grandTotalUsd: 620.00,
      paidAmountUsd: 0,
      dueAmountUsd: 620.00,
      cashier: 'Vannak Kem',
      notes: 'Invoice sent with goods delivery. 30-day payment term.',
      items: [
        { productId: 'p11', productName: 'Titanium Ionic Straightener Iron', unitPrice: 85.00, qty: 4 },
        { productId: 'p8', productName: 'Keratin Smoothing Repair Serum 250ml', unitPrice: 34.00, qty: 5 }
      ]
    }
  ])

  // 4. PURCHASES (Replenishment)
  const purchases = useState<StorePurchase[]>('vtbiz_purchases', () => [
    {
      id: 'po-1',
      referenceNo: 'PO-2026-001',
      invoiceNo: 'CB-98214',
      supplierName: 'L’Oréal Cambodia Distribution Co.',
      supplierPhone: '+855 23 888 123',
      branch: 'Phnom Penh Main Branch',
      date: '2026-10-02',
      time: '10:30',
      purchaseStatus: 'received',
      paymentStatus: 'due',
      paymentMethod: 'Bank Transfer',
      subtotalUsd: 1250.00,
      taxUsd: 0,
      shippingUsd: 0,
      discountUsd: 0,
      grandTotalUsd: 1250.00,
      paidAmountUsd: 0,
      dueAmountUsd: 1250.00,
      addedBy: 'Super Admin',
      items: [
        { productName: "L'Oréal Professional Shampoo 500ml", sku: 'SLN-001', unitCost: 10.50, quantity: 50, receivedQuantity: 50, totalCost: 525.00 },
        { productName: 'Moroccan Argan Treatment Oil 100ml', sku: 'SLN-002', unitCost: 16.00, quantity: 30, receivedQuantity: 30, totalCost: 480.00 }
      ]
    },
    {
      id: 'po-2',
      referenceNo: 'PO-2026-002',
      invoiceNo: 'DY-44910',
      supplierName: 'Dyson Commercial Thailand / Cambodia',
      supplierPhone: '+855 23 991 440',
      branch: 'Phnom Penh Main Branch',
      date: '2026-09-28',
      time: '15:15',
      purchaseStatus: 'received',
      paymentStatus: 'partial',
      paymentMethod: 'ABA Pay',
      subtotalUsd: 1860.00,
      taxUsd: 0,
      shippingUsd: 40.00,
      discountUsd: 100.00,
      grandTotalUsd: 1800.00,
      paidAmountUsd: 1200.00,
      dueAmountUsd: 600.00,
      addedBy: 'Super Admin',
      items: [
        { productName: 'Dyson Supersonic Professional Hair Dryer', sku: 'EQP-001', unitCost: 310.00, quantity: 6, receivedQuantity: 6, totalCost: 1860.00 }
      ]
    }
  ])

  // 5. OPERATING EXPENSES
  const expenses = useState<StoreExpense[]>('vtbiz_expenses', () => [
    {
      id: 'exp-1',
      referenceNo: 'EXP-2026-001',
      invoiceNo: 'EDC-OCT-9912',
      date: '2026-10-03',
      branch: 'Phnom Penh Main Branch',
      category: 'Utilities (Water & Electric)',
      payee: 'Electricite du Cambodge (EDC)',
      amountUsd: 385.00,
      paidAmountUsd: 385.00,
      dueAmountUsd: 0,
      paymentStatus: 'paid',
      paymentMethod: 'Bakong KHQR',
      loggedBy: 'Super Admin',
      notes: 'Monthly power consumption for salon dryers & lighting'
    },
    {
      id: 'exp-2',
      referenceNo: 'EXP-2026-002',
      invoiceNo: 'LEASE-BKK1-OCT',
      date: '2026-10-01',
      branch: 'Phnom Penh Main Branch',
      category: 'Rent & Facilities',
      payee: 'BKK1 Commercial Property Landlord',
      amountUsd: 1800.00,
      paidAmountUsd: 1800.00,
      dueAmountUsd: 0,
      paymentStatus: 'paid',
      paymentMethod: 'ABA Pay',
      loggedBy: 'Super Admin',
      notes: 'Storefront lease for October 2026'
    },
    {
      id: 'exp-3',
      referenceNo: 'EXP-2026-003',
      date: '2026-10-04',
      branch: 'Phnom Penh Main Branch',
      category: 'Marketing & Digital Ads',
      payee: 'Facebook / Meta Ads Cambodia',
      amountUsd: 250.00,
      paidAmountUsd: 250.00,
      dueAmountUsd: 0,
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      loggedBy: 'Super Admin',
      notes: 'Bakong KHQR campaign promotion'
    }
  ])

  // 6. STOCK TRANSFERS
  const transfers = useState<StoreTransfer[]>('vtbiz_transfers', () => [
    {
      id: 'tr-1',
      referenceNo: 'TR-2026-001',
      trackingNo: 'VET-882910',
      date: '2026-10-04',
      time: '09:30 AM',
      fromBranch: 'Phnom Penh Main Branch',
      toBranch: 'Siem Reap Outlet',
      status: 'in_transit',
      courierName: 'Virak Buntham Express',
      dispatchedBy: 'Sokha Warehouse Lead',
      shippingCostUsd: 15.00,
      shippingFeeUsd: 15.00,
      merchandiseValueUsd: 454.00,
      notes: 'Weekly retail stock replenishment for Siem Reap display shelves.',
      items: [
        { productName: "L'Oréal Professional Shampoo 500ml", sku: 'SLN-001', quantity: 12, unitCostUsd: 10.50, unitPriceUsd: 18.50, availableStock: 32 },
        { productName: 'Moroccan Argan Treatment Oil 100ml', sku: 'SLN-002', quantity: 8, unitCostUsd: 16.00, unitPriceUsd: 29.00, availableStock: 25 }
      ]
    },
    {
      id: 'tr-2',
      referenceNo: 'TR-2026-002',
      trackingNo: 'J&T-551923',
      date: '2026-10-03',
      time: '02:15 PM',
      fromBranch: 'Phnom Penh Main Branch',
      toBranch: 'Battambang Mart',
      status: 'completed',
      courierName: 'J&T Express Cambodia',
      dispatchedBy: 'Sokha Warehouse Lead',
      receivedBy: 'Branch Store Manager',
      shippingCostUsd: 12.00,
      shippingFeeUsd: 12.00,
      merchandiseValueUsd: 320.00,
      notes: 'Urgent restocking for weekend promotion.',
      items: [
        { productName: 'Iced Americano Roast Beans 1kg', sku: 'BEV-001-R', quantity: 20, unitCostUsd: 8.50, unitPriceUsd: 16.00, availableStock: 45 }
      ]
    }
  ])

  // 7. STOCK ADJUSTMENTS
  const adjustments = useState<StoreAdjustment[]>('vtbiz_adjustments', () => [
    {
      id: 'adj-1',
      referenceNo: 'ADJ-2026-001',
      date: '2026-10-01',
      time: '09:15 AM',
      branch: 'Phnom Penh Main Branch',
      type: 'abnormal',
      adjustmentType: 'damage',
      reason: 'Damaged in Store / Warehouse',
      totalImpactUsd: 85.00,
      netValueChangeUsd: -85.00,
      items: [
        { productName: 'Iced Americano', sku: 'BEV-001', quantity: 10, adjustedQuantity: -10, unitCostUsd: 1.00, currentStock: 45, reason: 'Damaged packaging' }
      ],
      adjustedBy: 'Sophea Chem',
      conductedBy: 'Sophea Chem',
      notes: 'Torn package during pallet transport in rear storage bay.'
    },
    {
      id: 'adj-2',
      referenceNo: 'ADJ-2026-002',
      date: '2026-10-02',
      time: '11:45 AM',
      branch: 'Siem Reap Outlet',
      type: 'normal',
      adjustmentType: 'audit',
      reason: 'Surplus Stock Found in Audit',
      totalImpactUsd: 160.00,
      netValueChangeUsd: 160.00,
      items: [
        { productName: 'Moroccan Argan Treatment Oil 100ml', sku: 'SLN-002', quantity: 10, adjustedQuantity: 10, unitCostUsd: 16.00, currentStock: 25, reason: 'Unlogged carton found' }
      ],
      adjustedBy: 'Channary Touch',
      conductedBy: 'Channary Touch',
      notes: 'Unlogged carton from previous supplier delivery discovered during monthly count.'
    },
    {
      id: 'adj-3',
      referenceNo: 'ADJ-2026-003',
      date: '2026-10-02',
      time: '02:30 PM',
      branch: 'Phnom Penh Main Branch',
      type: 'abnormal',
      adjustmentType: 'expiry',
      reason: 'Expired Product',
      totalImpactUsd: 65.00,
      netValueChangeUsd: -65.00,
      items: [
        { productName: 'Butter Croissant', sku: 'BAK-001', quantity: 10, adjustedQuantity: -10, unitCostUsd: 0.90, currentStock: 25, reason: 'Past shelf expiration' }
      ],
      adjustedBy: 'Vireak Dara',
      conductedBy: 'Vireak Dara',
      notes: 'Batch reached expiration date; disposed according to health regulations.'
    },
    {
      id: 'adj-4',
      referenceNo: 'ADJ-2026-004',
      date: '2026-10-03',
      time: '08:00 AM',
      branch: 'Phnom Penh Main Branch',
      type: 'abnormal',
      adjustmentType: 'shrinkage',
      reason: 'Theft / Shrinkage',
      totalImpactUsd: 130.00,
      netValueChangeUsd: -130.00,
      items: [
        { productName: 'Titanium Ionic Straightener Iron', sku: 'RTL-001', quantity: 2, adjustedQuantity: -2, unitCostUsd: 48.00, currentStock: 12, reason: 'Missing item variance' }
      ],
      adjustedBy: 'Sophea Chem',
      conductedBy: 'Sophea Chem',
      notes: 'Physical count discrepancy identified during end-of-week retail audit.'
    },
    {
      id: 'adj-5',
      referenceNo: 'ADJ-2026-005',
      date: '2026-10-03',
      time: '11:20 AM',
      branch: 'Phnom Penh Main Branch',
      type: 'normal',
      adjustmentType: 'audit',
      reason: 'Physical Stock Count Discrepancy',
      totalImpactUsd: 96.00,
      netValueChangeUsd: 96.00,
      items: [
        { productName: 'Natural Mineral Water', sku: 'BEV-004', quantity: 20, adjustedQuantity: 20, unitCostUsd: 0.35, currentStock: 70, reason: 'Extra physical units found' }
      ],
      adjustedBy: 'Vireak Dara',
      conductedBy: 'Vireak Dara',
      notes: 'Physical count exceeded system ledger due to unrecorded vendor promo sample.'
    },
    {
      id: 'adj-6',
      referenceNo: 'ADJ-2026-006',
      date: '2026-10-04',
      time: '10:10 AM',
      branch: 'Siem Reap Outlet',
      type: 'abnormal',
      adjustmentType: 'damage',
      reason: 'Damaged in Store / Warehouse',
      totalImpactUsd: 120.00,
      netValueChangeUsd: -120.00,
      items: [
        { productName: "L'Oréal Professional Shampoo 500ml", sku: 'SLN-001', quantity: 10, adjustedQuantity: -10, unitCostUsd: 10.50, currentStock: 32, reason: 'Broken bottle caps' }
      ],
      adjustedBy: 'Channary Touch',
      conductedBy: 'Channary Touch',
      notes: 'Broken seals during shelf restocking.'
    },
    {
      id: 'adj-7',
      referenceNo: 'ADJ-2026-007',
      date: '2026-10-04',
      time: '01:40 PM',
      branch: 'Phnom Penh Main Branch',
      type: 'abnormal',
      adjustmentType: 'audit',
      reason: 'Internal Quality Testing / Sample',
      totalImpactUsd: 72.50,
      netValueChangeUsd: -72.50,
      items: [
        { productName: 'Matcha Latte Ice', sku: 'BEV-003', quantity: 5, adjustedQuantity: -5, unitCostUsd: 1.60, currentStock: 24, reason: 'Quality assurance tasting' }
      ],
      adjustedBy: 'Vireak Dara',
      conductedBy: 'Vireak Dara',
      notes: 'Sampled for quality assurance and recipe consistency verification.'
    },
    {
      id: 'adj-8',
      referenceNo: 'ADJ-2026-008',
      date: '2026-10-04',
      time: '03:15 PM',
      branch: 'Phnom Penh Main Branch',
      type: 'normal',
      adjustmentType: 'restock',
      reason: 'Surplus Stock Found in Audit',
      totalImpactUsd: 220.00,
      netValueChangeUsd: 220.00,
      items: [
        { productName: 'Brown Sugar Milk Tea', sku: 'BEV-002', quantity: 15, adjustedQuantity: 15, unitCostUsd: 1.50, currentStock: 38, reason: 'Freezer container inventory count reconciliation' }
      ],
      adjustedBy: 'Sophea Chem',
      conductedBy: 'Sophea Chem',
      notes: 'Freezer container inventory count reconciliation.'
    }
  ])

  // 8. POS ACTIVE SHIFT
  const activeShift = useState<StoreShift>('vtbiz_active_shift', () => ({
    shiftNumber: 'SHIFT-2026-104',
    status: 'open',
    cashier: 'Super Admin',
    branch: 'Phnom Penh Main Branch',
    registerId: 'Register #01',
    openedAt: 'Today, 08:30 AM',
    openingFloatUsd: 50.00,
    openingFloatKhr: 200000,
    openingNotes: 'Morning opening float counted and verified by Duty Manager.',
    cashSalesUsd: 68.50,
    cashSalesKhr: 82000,
    khqrSalesUsd: 145.00,
    cardSalesUsd: 45.00,
    totalSalesUsd: 258.50,
    totalOrdersCount: 8,
    cashInUsd: 0,
    cashOutUsd: 0
  }))

  // =========================================================
  // ACTIONS & BUSINESS LOGIC (INTERCONNECTING ALL MODULES)
  // =========================================================

  // Record a Sale (from POS or Sell Page)
  const recordSale = (newSale: StoreSale) => {
    // 1. Add to sales list
    sales.value.unshift(newSale)

    // 2. Automatically deduct inventory stock in products list
    newSale.items.forEach((item) => {
      const prod = products.value.find(p => p.id === item.productId || p.name === item.productName)
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.qty)
      }
    })

    // 3. If credit sale (due balance), increase customer's balance due in Contacts
    if (newSale.dueAmountUsd > 0) {
      const cust = contacts.value.find(c => c.name.toLowerCase() === newSale.customerName.toLowerCase() && c.type === 'customer')
      if (cust) {
        cust.balanceDueUsd += newSale.dueAmountUsd
        cust.totalOrders++
      } else {
        // Create new contact entry automatically if not existing
        contacts.value.push({
          id: `c-${Date.now()}`,
          code: `CUST-${contacts.value.length + 1001}`,
          type: 'customer',
          name: newSale.customerName,
          phone: newSale.customerPhone,
          group: newSale.customerType,
          city: 'Phnom Penh',
          creditLimitUsd: 1000,
          paymentTerms: 'Net 15 Days',
          balanceDueUsd: newSale.dueAmountUsd,
          totalOrders: 1
        })
      }
    } else {
      // Just update customer order counter
      const cust = contacts.value.find(c => c.name.toLowerCase() === newSale.customerName.toLowerCase() && c.type === 'customer')
      if (cust) {
        cust.totalOrders++
      }
    }

    // 4. If POS channel and shift is open, update active shift revenue
    if (newSale.channel === 'pos' && activeShift.value.status === 'open') {
      activeShift.value.totalSalesUsd += newSale.grandTotalUsd
      activeShift.value.totalOrdersCount++
      if (newSale.paymentMethod.includes('Cash')) {
        activeShift.value.cashSalesUsd += newSale.paidAmountUsd
      } else if (newSale.paymentMethod.includes('KHQR') || newSale.paymentMethod.includes('Bakong')) {
        activeShift.value.khqrSalesUsd += newSale.paidAmountUsd
      } else {
        activeShift.value.cardSalesUsd += newSale.paidAmountUsd
      }
    }
  }

  // Record a Purchase Order (from Purchases Page)
  const recordPurchase = (newPurchase: StorePurchase) => {
    purchases.value.unshift(newPurchase)

    // 1. Automatically increment inventory stock in products list
    newPurchase.items.forEach((item) => {
      const prod = products.value.find(p => p.sku === item.sku || p.name.toLowerCase() === item.productName.toLowerCase())
      if (prod) {
        prod.stock += (item.receivedQuantity || item.quantity)
      }
    })

    // 2. If purchase has due amount, increment supplier's payable balance in Contacts
    if (newPurchase.dueAmountUsd > 0) {
      const supplier = contacts.value.find(s => s.name.toLowerCase() === newPurchase.supplierName.toLowerCase() && s.type === 'supplier')
      if (supplier) {
        supplier.balanceDueUsd += newPurchase.dueAmountUsd
        supplier.totalOrders++
      } else {
        contacts.value.push({
          id: `s-${Date.now()}`,
          code: `SUP-${contacts.value.length + 2001}`,
          type: 'supplier',
          name: newPurchase.supplierName,
          phone: newPurchase.supplierPhone,
          city: 'Phnom Penh',
          creditLimitUsd: 10000,
          paymentTerms: 'Net 30 Days',
          balanceDueUsd: newPurchase.dueAmountUsd,
          totalOrders: 1
        })
      }
    }
  }

  // Record an Operating Expense
  const recordExpense = (newExpense: StoreExpense) => {
    expenses.value.unshift(newExpense)
  }

  // Record a Stock Transfer
  const recordTransfer = (newTransfer: StoreTransfer) => {
    transfers.value.unshift(newTransfer)
    // Relocates stock between branch logs
  }

  // Record a Stock Adjustment
  const recordAdjustment = (newAdjustment: StoreAdjustment) => {
    adjustments.value.unshift(newAdjustment)
    // Update product stock based on adjustment delta
    newAdjustment.items.forEach((item) => {
      const prod = products.value.find(p => p.sku === item.sku || p.name.toLowerCase() === item.productName.toLowerCase())
      if (prod) {
        let delta = 0
        if (item.adjustedQuantity !== undefined) {
          delta = item.adjustedQuantity
        } else if (item.quantity !== undefined) {
          delta = newAdjustment.type === 'normal' ? item.quantity : -item.quantity
        }
        prod.stock = Math.max(0, prod.stock + delta)
      }
    })
  }

  // Settle Customer Receivable (from Contacts or Sell page)
  const settleCustomerReceivable = (contactName: string, amount: number) => {
    const cust = contacts.value.find(c => c.name.toLowerCase() === contactName.toLowerCase() && c.type === 'customer')
    if (cust) {
      cust.balanceDueUsd = Math.max(0, cust.balanceDueUsd - amount)
    }
    // Also mark oldest unpaid sale invoice as paid/partial
    const unpaidSale = sales.value.find(s => s.customerName.toLowerCase() === contactName.toLowerCase() && s.dueAmountUsd > 0)
    if (unpaidSale) {
      unpaidSale.paidAmountUsd += amount
      unpaidSale.dueAmountUsd = Math.max(0, unpaidSale.grandTotalUsd - unpaidSale.paidAmountUsd)
      unpaidSale.paymentStatus = unpaidSale.dueAmountUsd <= 0.01 ? 'paid' : 'partial'
    }
  }

  // Settle Supplier Payable (from Contacts or Purchases page)
  const settleSupplierPayable = (supplierName: string, amount: number) => {
    const sup = contacts.value.find(s => s.name.toLowerCase() === supplierName.toLowerCase() && s.type === 'supplier')
    if (sup) {
      sup.balanceDueUsd = Math.max(0, sup.balanceDueUsd - amount)
    }
    const unpaidPO = purchases.value.find(p => p.supplierName.toLowerCase() === supplierName.toLowerCase() && p.dueAmountUsd > 0)
    if (unpaidPO) {
      unpaidPO.paidAmountUsd += amount
      unpaidPO.dueAmountUsd = Math.max(0, unpaidPO.grandTotalUsd - unpaidPO.paidAmountUsd)
      unpaidPO.paymentStatus = unpaidPO.dueAmountUsd <= 0.01 ? 'paid' : 'partial'
    }
  }

  // =========================================================
  // GLOBAL REAL-TIME FINANCIAL COMPUTATIONS & METRICS
  // =========================================================

  // Total Gross Sales Revenue across completed orders
  const totalRevenueUsd = computed(() => {
    return sales.value
      .filter(s => s.orderStatus === 'completed')
      .reduce((sum, s) => sum + s.grandTotalUsd, 0)
  })

  // Total Purchases Spend
  const totalPurchasesUsd = computed(() => {
    return purchases.value.reduce((sum, p) => sum + p.grandTotalUsd, 0)
  })

  // Total Operating Expenses Outflow
  const totalExpensesUsd = computed(() => {
    return expenses.value.reduce((sum, e) => sum + e.amountUsd, 0)
  })

  // Cost of Goods Sold (estimated at 60% of sales or by product unit cost)
  const totalCogsUsd = computed(() => {
    return totalRevenueUsd.value * 0.58
  })

  // Gross Profit = Revenue - COGS
  const grossProfitUsd = computed(() => {
    return Math.max(0, totalRevenueUsd.value - totalCogsUsd.value)
  })

  // Net Profit = Gross Profit - Operating Expenses
  const netProfitUsd = computed(() => {
    return grossProfitUsd.value - totalExpensesUsd.value
  })

  // Total Customer Receivables (Unpaid balances owed to us)
  const totalReceivablesUsd = computed(() => {
    return contacts.value
      .filter(c => c.type === 'customer')
      .reduce((sum, c) => sum + c.balanceDueUsd, 0)
  })

  // Total Supplier Payables (Unpaid bills we owe to suppliers)
  const totalPayablesUsd = computed(() => {
    return contacts.value
      .filter(c => c.type === 'supplier')
      .reduce((sum, s) => sum + s.balanceDueUsd, 0)
  })

  // Total Inventory Valuation (cost * stock)
  const totalInventoryValuationUsd = computed(() => {
    return products.value.reduce((sum, p) => sum + (p.costUsd * p.stock), 0)
  })

  // Total Stock Units
  const totalStockUnits = computed(() => {
    return products.value.reduce((sum, p) => sum + p.stock, 0)
  })

  // Low Stock Items Count
  const lowStockProductsCount = computed(() => {
    return products.value.filter(p => p.stock <= p.alertLevel).length
  })

  return {
    // Reactive Collections
    products,
    contacts,
    sales,
    purchases,
    expenses,
    transfers,
    adjustments,
    activeShift,

    // Interconnected Mutation Actions
    recordSale,
    recordPurchase,
    recordExpense,
    recordTransfer,
    recordAdjustment,
    settleCustomerReceivable,
    settleSupplierPayable,

    // Live Financial & Operational Metrics
    totalRevenueUsd,
    totalPurchasesUsd,
    totalExpensesUsd,
    totalCogsUsd,
    grossProfitUsd,
    netProfitUsd,
    totalReceivablesUsd,
    totalPayablesUsd,
    totalInventoryValuationUsd,
    totalStockUnits,
    lowStockProductsCount
  }
}
