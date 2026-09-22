// Centralized Mock Database for Makjuz Manufacturing System
// Persists to localStorage when available, with rich default data

export interface MockUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin' | 'planning' | 'production' | 'quality' | 'purchase' | 'npd' | 'sales' | 'stores';
  lastLogin: Date | string;
  phone?: string;
  companyName?: string;
  department?: string;
  location?: string;
  bio?: string;
  joinedDate?: string;
}

export interface MockCustomer {
  _id: string;
  customerId: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  vendorType: string;
  vendorCode: number;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  partNumbers: Array<{ _id: string; partNumber: string }>;
  GST: string;
  PAN: string;
  TAN: string;
  commercialEmail: string;
  creditTerms: 'Advance' | 'Net 7' | 'Net 10' | 'Net 15' | 'Net 30' | 'Net 60';
  creditDays: number;
  createdAt: string;
  updatedAt: string;
}

export interface MockMaterial {
  id: string;
  _id: string;
  materialId: string;
  name: string;
  description: string;
  unit: string;
  currentStock: number;
  minStockLevel: number;
  reorderLevel: number;
  supplier: string;
  lastRestockDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockPlan {
  _id: string;
  machineType: string;
  rawMaterials: string;
  manPower: number;
  partNumber: string;
  timeDuration: string;
  tooling: string;
  machineAvailability: string;
  shiftTimings: string;
  status: 'planned' | 'in_progress' | 'completed' | 'on_hold';
  createdAt: string;
  updatedAt: string;
}

export interface MockPart {
  _id: string;
  partNumber: string;
  description: string;
  customer: any;
  documents: string[];
  rawMaterial: string;
  quantityPerScrew: number;
  processSteps: Array<{
    processName: string;
    incomingVariation: Array<{ qualityParameterName: string; description: string }>;
    desiredOutcome: Array<{ qualityParameterName: string; description: string }>;
    toolsMaterials: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface MockPO {
  _id: string;
  poNumber: string;
  company: {
    _id: string;
    companyName: string;
    address: string;
  };
  poOrderNumber: string;
  poOrderDate: string;
  purchaseOrg: string;
  termsOfDelivery: string;
  paymentTerms: string;
  deliveryAddress: string;
  placeOfSupply: string;
  materials: Array<{
    srNo: number;
    partNumber: { _id: string; partNumber: string } | string;
    materialCode: string;
    materialDescriptionSpecification: string;
    HsnSacCode: string;
    quantity: number;
    deliverySchedule: string;
    unitPrice: number;
    freight: number;
    gst: number;
    isDelivered?: boolean;
    _id?: string;
  }>;
  netAmount: number;
  freightCharges: number;
  taxes: number;
  totalValue: number;
  isOpen: boolean;
  isCancelled: boolean;
  documents: any[];
}

export interface MockOrder {
  _id: string;
  order_number: string;
  po_number: string;
  customer_id: any;
  company_name: string;
  ordered_date: string;
  delivery_date: string;
  planning_date: string;
  production_date: string;
  status: 'pending' | 'adminApproved' | 'productionHeadApproved' | 'businessHeadApproved';
  uploaded_by: string;
  parts: Array<{
    part_number: any;
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

// -------------------------------------------------------------
// INITIAL SEED DATA
// -------------------------------------------------------------

export const INITIAL_USERS: MockUser[] = [
  {
    _id: "mock-admin-001",
    email: "admin@company.com",
    password: "admin123456",
    name: "Admin User",
    role: "admin",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543210",
    companyName: "Makjuz Manufacturing",
    department: "Executive Management",
    location: "Chennai, Tamil Nadu",
    bio: "Head Administrator with full system control and oversight.",
    joinedDate: "2023-01-15T00:00:00.000Z"
  },
  {
    _id: "mock-npd-001",
    email: "npd@company.com",
    password: "npd123456",
    name: "NPD Manager",
    role: "npd",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543211",
    companyName: "Makjuz Manufacturing",
    department: "New Product Development",
    location: "Madurai, Tamil Nadu",
    bio: "Leading research, prototype design and process engineering.",
    joinedDate: "2023-03-10T00:00:00.000Z"
  },
  {
    _id: "mock-purchase-001",
    email: "purchase@company.com",
    password: "purchase123456",
    name: "Purchase Manager",
    role: "purchase",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543212",
    companyName: "Makjuz Manufacturing",
    department: "Procurement & Supply Chain",
    location: "Madurai, Tamil Nadu",
    bio: "Managing vendor relations, raw material sourcing, and purchase orders.",
    joinedDate: "2023-02-01T00:00:00.000Z"
  },
  {
    _id: "mock-sales-001",
    email: "sales@company.com",
    password: "sales123456",
    name: "Sales Manager",
    role: "sales",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543213",
    companyName: "Makjuz Manufacturing",
    department: "Commercial & Sales",
    location: "Bangalore, Karnataka",
    bio: "Overseeing customer accounts, order commitments, and deliveries.",
    joinedDate: "2023-04-12T00:00:00.000Z"
  },
  {
    _id: "mock-stores-001",
    email: "stores@company.com",
    password: "stores123456",
    name: "Stores Manager",
    role: "stores",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543214",
    companyName: "Makjuz Manufacturing",
    department: "Stores & Warehouse",
    location: "Madurai, Tamil Nadu",
    bio: "Supervising inventory holding, dispatching, and incoming store receipts.",
    joinedDate: "2023-05-20T00:00:00.000Z"
  },
  {
    _id: "mock-planning-001",
    email: "planning@company.com",
    password: "planning123456",
    name: "Planning Lead",
    role: "planning",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543215",
    companyName: "Makjuz Manufacturing",
    department: "Production Planning & Control",
    location: "Madurai, Tamil Nadu",
    bio: "PPC specialist driving machine allocation and schedule optimization.",
    joinedDate: "2023-02-15T00:00:00.000Z"
  },
  {
    _id: "mock-production-001",
    email: "production@company.com",
    password: "production123456",
    name: "Production Supervisor",
    role: "production",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543216",
    companyName: "Makjuz Manufacturing",
    department: "Shopfloor Operations",
    location: "Madurai, Tamil Nadu",
    bio: "Managing shift operations, CNC lines and assembly stations.",
    joinedDate: "2023-06-01T00:00:00.000Z"
  },
  {
    _id: "mock-quality-001",
    email: "quality@company.com",
    password: "quality123456",
    name: "Quality Engineer",
    role: "quality",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543217",
    companyName: "Makjuz Manufacturing",
    department: "Quality Assurance",
    location: "Madurai, Tamil Nadu",
    bio: "Ensuring zero defect rate, standard compliance and calibration checks.",
    joinedDate: "2023-07-10T00:00:00.000Z"
  },
  {
    _id: "mock-user-001",
    email: "user@company.com",
    password: "user123456",
    name: "Standard Operator",
    role: "user",
    lastLogin: new Date().toISOString(),
    phone: "+91 9876543218",
    companyName: "Makjuz Manufacturing",
    department: "Operations",
    location: "Madurai, Tamil Nadu",
    bio: "Certified machine operator for manufacturing cells.",
    joinedDate: "2023-08-15T00:00:00.000Z"
  }
];

export const INITIAL_CUSTOMERS: MockCustomer[] = [
  {
    _id: "cust-001",
    customerId: "CUST-1001",
    companyName: "Apex Automotive Pvt Ltd",
    phone: "+91 98401 23456",
    email: "procurement@apexauto.in",
    address: "Plot 42, Ambattur Industrial Estate, Chennai, TN 600058",
    vendorType: "OEM Manufacturer",
    vendorCode: 1042,
    accountHolderName: "Apex Automotive Private Limited",
    bankName: "HDFC Bank",
    accountNumber: "50200012345678",
    ifscCode: "HDFC0000123",
    branch: "Ambattur",
    partNumbers: [
      { _id: "part-001", partNumber: "APX-SCREW-M8" },
      { _id: "part-002", partNumber: "APX-FLANGE-102" }
    ],
    GST: "33AAACA1234A1Z5",
    PAN: "AAACA1234A",
    TAN: "CHNA12345B",
    commercialEmail: "finance@apexauto.in",
    creditTerms: "Net 30",
    creditDays: 30,
    createdAt: "2024-01-10T09:30:00.000Z",
    updatedAt: "2024-02-15T14:20:00.000Z"
  },
  {
    _id: "cust-002",
    customerId: "CUST-1002",
    companyName: "Bharat Precision Dynamics",
    phone: "+91 97902 34567",
    email: "orders@bharatprecision.com",
    address: "Survey 18/2, Peenya Industrial Area Phase 2, Bangalore, KA 560058",
    vendorType: "Tier 1 Supplier",
    vendorCode: 1088,
    accountHolderName: "Bharat Precision Dynamics",
    bankName: "State Bank of India",
    accountNumber: "30987654321",
    ifscCode: "SBIN0001428",
    branch: "Peenya",
    partNumbers: [
      { _id: "part-003", partNumber: "BPD-ROTOR-55" },
      { _id: "part-004", partNumber: "BPD-PINION-08" }
    ],
    GST: "29AAACB5678B1Z2",
    PAN: "AAACB5678B",
    TAN: "BLRB23456C",
    commercialEmail: "accounts@bharatprecision.com",
    creditTerms: "Net 15",
    creditDays: 15,
    createdAt: "2024-01-18T11:00:00.000Z",
    updatedAt: "2024-03-01T16:45:00.000Z"
  },
  {
    _id: "cust-003",
    customerId: "CUST-1003",
    companyName: "Zenith Aero Tech Industries",
    phone: "+91 94433 88990",
    email: "contracts@zenithaero.co",
    address: "Kappalur Industrial Estate, Madurai, TN 625008",
    vendorType: "Aerospace Components",
    vendorCode: 1120,
    accountHolderName: "Zenith Aero Tech Industries",
    bankName: "ICICI Bank",
    accountNumber: "001205012399",
    ifscCode: "ICIC0000012",
    branch: "Madurai Main",
    partNumbers: [
      { _id: "part-005", partNumber: "ZAT-TITAN-NUT" },
      { _id: "part-006", partNumber: "ZAT-BUSHING-30" }
    ],
    GST: "33AAACZ9012C1Z8",
    PAN: "AAACZ9012C",
    TAN: "MDUZ78901D",
    commercialEmail: "billing@zenithaero.co",
    creditTerms: "Advance",
    creditDays: 0,
    createdAt: "2024-02-05T08:15:00.000Z",
    updatedAt: "2024-02-28T12:00:00.000Z"
  }
];

export const INITIAL_PARTS: MockPart[] = [
  {
    _id: "part-001",
    partNumber: "APX-SCREW-M8",
    description: "High tensile hex head fastener M8 x 45mm",
    customer: {
      _id: "cust-001",
      customerId: "CUST-1001",
      companyName: "Apex Automotive Pvt Ltd"
    },
    documents: ["Fastener_Spec_Rev2.pdf"],
    rawMaterial: "Stainless Steel 316L",
    quantityPerScrew: 1,
    processSteps: [
      {
        processName: "Cold Forging",
        incomingVariation: [{ qualityParameterName: "Wire Diameter", description: "8.00 ± 0.05 mm" }],
        desiredOutcome: [{ qualityParameterName: "Head Dimensions", description: "Hex 13mm across flats" }],
        toolsMaterials: ["Header Die Set M8", "Coolant Lubricant Oil"]
      },
      {
        processName: "Thread Rolling",
        incomingVariation: [{ qualityParameterName: "Blank Diameter", description: "7.18 ± 0.02 mm" }],
        desiredOutcome: [{ qualityParameterName: "Pitch Diameter", description: "M8x1.25 Class 6g" }],
        toolsMaterials: ["Rolling Cylindrical Dies M8"]
      }
    ],
    createdAt: "2024-01-12T10:00:00.000Z",
    updatedAt: "2024-02-10T15:30:00.000Z"
  },
  {
    _id: "part-002",
    partNumber: "APX-FLANGE-102",
    description: "Hydraulic intake adapter flange OD 102mm",
    customer: {
      _id: "cust-001",
      customerId: "CUST-1001",
      companyName: "Apex Automotive Pvt Ltd"
    },
    documents: ["Flange_CAD_102.pdf"],
    rawMaterial: "Carbon Steel C45",
    quantityPerScrew: 1,
    processSteps: [
      {
        processName: "CNC Turning",
        incomingVariation: [{ qualityParameterName: "Bar Diameter", description: "105mm rough stock" }],
        desiredOutcome: [{ qualityParameterName: "Outer Diameter", description: "102 ± 0.02 mm" }],
        toolsMaterials: ["CNMG 120408 Carbide Insert"]
      }
    ],
    createdAt: "2024-01-15T12:00:00.000Z",
    updatedAt: "2024-02-05T09:40:00.000Z"
  },
  {
    _id: "part-003",
    partNumber: "BPD-ROTOR-55",
    description: "Synchronous motor rotor shaft 55mm",
    customer: {
      _id: "cust-002",
      customerId: "CUST-1002",
      companyName: "Bharat Precision Dynamics"
    },
    documents: ["BPD_Rotor_V3.pdf"],
    rawMaterial: "Alloy Steel EN24",
    quantityPerScrew: 1,
    processSteps: [
      {
        processName: "Milling & Splining",
        incomingVariation: [{ qualityParameterName: "Turned Blank Runout", description: "< 0.01 mm" }],
        desiredOutcome: [{ qualityParameterName: "Spline Profile", description: "Involute 18 teeth" }],
        toolsMaterials: ["Spline Hob M1.5", "Synthetic Cutting Oil"]
      }
    ],
    createdAt: "2024-01-20T14:00:00.000Z",
    updatedAt: "2024-03-02T11:20:00.000Z"
  },
  {
    _id: "part-004",
    partNumber: "BPD-PINION-08",
    description: "Helical drive pinion 8-tooth modulus 2.5",
    customer: {
      _id: "cust-002",
      customerId: "CUST-1002",
      companyName: "Bharat Precision Dynamics"
    },
    documents: [],
    rawMaterial: "Case Hardened 20MnCr5",
    quantityPerScrew: 1,
    processSteps: [
      {
        processName: "Gear Hobbing",
        incomingVariation: [{ qualityParameterName: "Blank Concentricity", description: "< 0.008 mm" }],
        desiredOutcome: [{ qualityParameterName: "Tooth Lead Error", description: "< 0.005 mm" }],
        toolsMaterials: ["High Speed Hob Mod 2.5"]
      }
    ],
    createdAt: "2024-02-01T09:00:00.000Z",
    updatedAt: "2024-02-25T14:10:00.000Z"
  },
  {
    _id: "part-005",
    partNumber: "ZAT-TITAN-NUT",
    description: "Self-locking aeronautic locknut Titanium Grade 5",
    customer: {
      _id: "cust-003",
      customerId: "CUST-1003",
      companyName: "Zenith Aero Tech Industries"
    },
    documents: ["Titan_Nut_MS21042.pdf"],
    rawMaterial: "Titanium Ti-6Al-4V",
    quantityPerScrew: 1,
    processSteps: [
      {
        processName: "Swiss Lathe Machining",
        incomingVariation: [{ qualityParameterName: "Titanium Bar Diameter", description: "12.0 mm h9" }],
        desiredOutcome: [{ qualityParameterName: "Thread Pitch & Concentricity", description: "AS8879 Spec" }],
        toolsMaterials: ["Diamond Coated Taps", "PCD Inserts"]
      }
    ],
    createdAt: "2024-02-10T11:00:00.000Z",
    updatedAt: "2024-03-05T16:00:00.000Z"
  },
  {
    _id: "part-006",
    partNumber: "ZAT-BUSHING-30",
    description: "Bronze self-lubricating sleeve bushing 30mm",
    customer: {
      _id: "cust-003",
      customerId: "CUST-1003",
      companyName: "Zenith Aero Tech Industries"
    },
    documents: [],
    rawMaterial: "Phosphor Bronze CuSn8",
    quantityPerScrew: 1,
    processSteps: [],
    createdAt: "2024-02-12T13:00:00.000Z",
    updatedAt: "2024-02-28T10:00:00.000Z"
  }
];

export const INITIAL_MATERIALS: MockMaterial[] = [
  {
    id: "mat-001",
    _id: "mat-001",
    materialId: "RM-SS316L",
    name: "Stainless Steel 316L Wire Rod",
    description: "Corrosion resistant austenitic wire rod for cold forging",
    unit: "kg",
    currentStock: 3500,
    minStockLevel: 800,
    reorderLevel: 1000,
    supplier: "Jindal Stainless Limited",
    lastRestockDate: "2024-02-18T00:00:00.000Z",
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-02-18T00:00:00.000Z"
  },
  {
    id: "mat-002",
    _id: "mat-002",
    materialId: "RM-EN24",
    name: "EN24 Alloy Steel Round Bar 60mm",
    description: "High tensile nickel chromium molybdenum engineering steel",
    unit: "meters",
    currentStock: 480,
    minStockLevel: 150,
    reorderLevel: 200,
    supplier: "Kalyani Steels Pune",
    lastRestockDate: "2024-02-20T00:00:00.000Z",
    createdAt: "2024-01-08T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z"
  },
  {
    id: "mat-003",
    _id: "mat-003",
    materialId: "RM-TI64",
    name: "Titanium Gr.5 Ti-6Al-4V Bar",
    description: "Aerospace certified alpha-beta titanium alloy bar stock",
    unit: "kg",
    currentStock: 120,
    minStockLevel: 150, // Triggers low-stock indicator
    reorderLevel: 180,
    supplier: "Mishra Dhatu Nigam (MIDHANI)",
    lastRestockDate: "2024-01-15T00:00:00.000Z",
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z"
  },
  {
    id: "mat-004",
    _id: "mat-004",
    materialId: "RM-BRONZE",
    name: "Phosphor Bronze CuSn8 Round Stock",
    description: "Continuous cast bearing bronze with high wear resistance",
    unit: "kg",
    currentStock: 640,
    minStockLevel: 200,
    reorderLevel: 250,
    supplier: "Metal Associates Coimbatore",
    lastRestockDate: "2024-02-10T00:00:00.000Z",
    createdAt: "2024-01-12T00:00:00.000Z",
    updatedAt: "2024-02-10T00:00:00.000Z"
  },
  {
    id: "mat-005",
    _id: "mat-005",
    materialId: "RM-C45",
    name: "C45 Carbon Steel Bright Bar 110mm",
    description: "Medium carbon unalloyed engineering steel for flanges & shafts",
    unit: "meters",
    currentStock: 75,
    minStockLevel: 100, // Low stock indicator
    reorderLevel: 120,
    supplier: "Steel Authority of India Ltd (SAIL)",
    lastRestockDate: "2024-01-25T00:00:00.000Z",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-25T00:00:00.000Z"
  }
];

export const INITIAL_PLANS: MockPlan[] = [
  {
    _id: "plan-601001",
    machineType: "5-Axis CNC Milling Cell 01",
    rawMaterials: "RM-EN24 60mm Bar Stock (250m)",
    manPower: 3,
    partNumber: "BPD-ROTOR-55",
    timeDuration: "4h 30m per batch",
    tooling: "Indexable Face Mill 63mm, Solid Carbide Endmill 12mm",
    machineAvailability: "Available (98% OEE)",
    shiftTimings: "Shift 1 (06:00 - 14:00)",
    status: "in_progress",
    createdAt: "2024-03-01T08:00:00.000Z",
    updatedAt: "2024-03-01T08:00:00.000Z"
  },
  {
    _id: "plan-601002",
    machineType: "High Speed Cold Header Station 3",
    rawMaterials: "RM-SS316L Wire Coil (500kg)",
    manPower: 2,
    partNumber: "APX-SCREW-M8",
    timeDuration: "6h 15m",
    tooling: "M8 Tungsten Carbide Punch & Cutoff Knife",
    machineAvailability: "Scheduled Preventive Maintenance 14:00",
    shiftTimings: "Shift 2 (14:00 - 22:00)",
    status: "planned",
    createdAt: "2024-03-02T09:30:00.000Z",
    updatedAt: "2024-03-02T09:30:00.000Z"
  },
  {
    _id: "plan-601003",
    machineType: "Citizen Swiss CNC Lathe L20",
    rawMaterials: "RM-TI64 Titanium 12mm (40kg)",
    manPower: 1,
    partNumber: "ZAT-TITAN-NUT",
    timeDuration: "8h 00m",
    tooling: "Micro Thread Mill M6, PCD Grooving Insert",
    machineAvailability: "Online",
    shiftTimings: "Shift 1 (06:00 - 14:00)",
    status: "in_progress",
    createdAt: "2024-03-03T10:15:00.000Z",
    updatedAt: "2024-03-03T10:15:00.000Z"
  },
  {
    _id: "plan-601004",
    machineType: "Doosan Puma 2600Y Turning Center",
    rawMaterials: "RM-C45 Bright Bar (60m)",
    manPower: 2,
    partNumber: "APX-FLANGE-102",
    timeDuration: "5h 00m",
    tooling: "CNMG 120408, Boring Bar 25mm",
    machineAvailability: "Available",
    shiftTimings: "General Shift (08:30 - 17:30)",
    status: "completed",
    createdAt: "2024-02-27T08:00:00.000Z",
    updatedAt: "2024-02-28T17:00:00.000Z"
  }
];

export const INITIAL_PURCHASE_ORDERS: MockPO[] = [
  {
    _id: "po-1001",
    poNumber: "PO-2024-001",
    company: {
      _id: "cust-001",
      companyName: "Apex Automotive Pvt Ltd",
      address: "Plot 42, Ambattur Industrial Estate, Chennai, TN"
    },
    poOrderNumber: "APX/ORD/8821",
    poOrderDate: "2024-02-15T00:00:00.000Z",
    purchaseOrg: "Direct Procurement Dept",
    termsOfDelivery: "EXW-Factory",
    paymentTerms: "30 days credit from GRN date",
    deliveryAddress: "Apex Warehouse Unit 3, Ambattur, Chennai",
    placeOfSupply: "Tamil Nadu (33)",
    materials: [
      {
        srNo: 10,
        partNumber: { _id: "part-001", partNumber: "APX-SCREW-M8" },
        materialCode: "FAST-M8-SS",
        materialDescriptionSpecification: "Fastener M8x45 Hex Stainless Steel 316L",
        HsnSacCode: "73181500",
        quantity: 15000,
        deliverySchedule: "2024-03-25T00:00:00.000Z",
        unitPrice: 18.50,
        freight: 1200,
        gst: 18,
        isDelivered: false
      }
    ],
    netAmount: 277500,
    freightCharges: 1200,
    taxes: 50166,
    totalValue: 328866,
    isOpen: true,
    isCancelled: false,
    documents: []
  },
  {
    _id: "po-1002",
    poNumber: "PO-2024-002",
    company: {
      _id: "cust-002",
      companyName: "Bharat Precision Dynamics",
      address: "Peenya Industrial Area Phase 2, Bangalore, KA"
    },
    poOrderNumber: "BPD/24/PUR/091",
    poOrderDate: "2024-02-20T00:00:00.000Z",
    purchaseOrg: "Engineering Procurement",
    termsOfDelivery: "FOB Chennai Port",
    paymentTerms: "15 days credit from GRN date",
    deliveryAddress: "Bharat Precision Receiving Dock, Peenya, Bangalore",
    placeOfSupply: "Karnataka (29)",
    materials: [
      {
        srNo: 10,
        partNumber: { _id: "part-003", partNumber: "BPD-ROTOR-55" },
        materialCode: "ROTOR-55-EN24",
        materialDescriptionSpecification: "Motor Rotor Shaft EN24 Precision Machined",
        HsnSacCode: "84831099",
        quantity: 450,
        deliverySchedule: "2024-04-05T00:00:00.000Z",
        unitPrice: 1450.00,
        freight: 4500,
        gst: 18,
        isDelivered: false
      }
    ],
    netAmount: 652500,
    freightCharges: 4500,
    taxes: 118260,
    totalValue: 775260,
    isOpen: true,
    isCancelled: false,
    documents: []
  },
  {
    _id: "po-1003",
    poNumber: "PO-2024-003",
    company: {
      _id: "cust-003",
      companyName: "Zenith Aero Tech Industries",
      address: "Kappalur Industrial Estate, Madurai, TN"
    },
    poOrderNumber: "ZAT/AERO/PO/4402",
    poOrderDate: "2024-01-28T00:00:00.000Z",
    purchaseOrg: "Aerospace Materials Group",
    termsOfDelivery: "Door Delivery Freight Paid",
    paymentTerms: "100% Advance Payment Received",
    deliveryAddress: "Zenith Aero Cleanroom Unit, Kappalur, Madurai",
    placeOfSupply: "Tamil Nadu (33)",
    materials: [
      {
        srNo: 10,
        partNumber: { _id: "part-005", partNumber: "ZAT-TITAN-NUT" },
        materialCode: "NUT-TI-GRADE5",
        materialDescriptionSpecification: "Ti-6Al-4V Locknut Self Locking Flight Ready",
        HsnSacCode: "88033000",
        quantity: 1200,
        deliverySchedule: "2024-03-10T00:00:00.000Z",
        unitPrice: 320.00,
        freight: 800,
        gst: 18,
        isDelivered: true
      }
    ],
    netAmount: 384000,
    freightCharges: 800,
    taxes: 69264,
    totalValue: 454064,
    isOpen: false,
    isCancelled: false,
    documents: []
  }
];

export const INITIAL_ORDERS: MockOrder[] = [
  {
    _id: "ord-001",
    order_number: "ORD-2024-001",
    po_number: "PO-2024-001",
    customer_id: INITIAL_CUSTOMERS[0],
    company_name: "Apex Automotive Pvt Ltd",
    ordered_date: "2024-02-15T00:00:00.000Z",
    delivery_date: "2024-03-25T00:00:00.000Z",
    planning_date: "2024-02-18T00:00:00.000Z",
    production_date: "2024-03-01T00:00:00.000Z",
    status: "productionHeadApproved",
    uploaded_by: "Sales Manager",
    parts: [
      {
        part_number: INITIAL_PARTS[0],
        quantity: 15000
      }
    ],
    createdAt: "2024-02-15T10:00:00.000Z",
    updatedAt: "2024-02-19T14:00:00.000Z"
  },
  {
    _id: "ord-002",
    order_number: "ORD-2024-002",
    po_number: "PO-2024-002",
    customer_id: INITIAL_CUSTOMERS[1],
    company_name: "Bharat Precision Dynamics",
    ordered_date: "2024-02-20T00:00:00.000Z",
    delivery_date: "2024-04-05T00:00:00.000Z",
    planning_date: "2024-02-24T00:00:00.000Z",
    production_date: "2024-03-10T00:00:00.000Z",
    status: "adminApproved",
    uploaded_by: "Sales Lead",
    parts: [
      {
        part_number: INITIAL_PARTS[2],
        quantity: 450
      }
    ],
    createdAt: "2024-02-20T11:30:00.000Z",
    updatedAt: "2024-02-24T16:20:00.000Z"
  }
];

export const INITIAL_DOCUMENTS = [
  {
    _id: "doc-001",
    filename: "Fastener_Spec_Rev2.pdf",
    url: "#",
    fileSize: "2.4 MB",
    createdAt: "2024-01-12T10:00:00.000Z"
  },
  {
    _id: "doc-002",
    filename: "Flange_CAD_102.pdf",
    url: "#",
    fileSize: "4.1 MB",
    createdAt: "2024-01-15T12:00:00.000Z"
  },
  {
    _id: "doc-003",
    filename: "Titan_Nut_MS21042.pdf",
    url: "#",
    fileSize: "1.8 MB",
    createdAt: "2024-02-10T11:00:00.000Z"
  }
];

// -------------------------------------------------------------
// LOCAL STORAGE PERSISTENCE UTILITIES
// -------------------------------------------------------------

function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`makjuz_mock_${key}`);
    if (item) {
      return JSON.parse(item);
    }
  } catch (e) {
    console.warn(`Error reading localStorage for key ${key}:`, e);
  }
  return defaultValue;
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`makjuz_mock_${key}`, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing localStorage for key ${key}:`, e);
  }
}

// -------------------------------------------------------------
// IN-MEMORY & PERSISTED STATE
// -------------------------------------------------------------

let mockUsers = getStored<MockUser[]>('users', INITIAL_USERS);
let mockCustomers = getStored<MockCustomer[]>('customers', INITIAL_CUSTOMERS);
let mockParts = getStored<MockPart[]>('parts', INITIAL_PARTS);
let mockMaterials = getStored<MockMaterial[]>('materials', INITIAL_MATERIALS);
let mockPlans = getStored<MockPlan[]>('plans', INITIAL_PLANS);
let mockPOs = getStored<MockPO[]>('pos', INITIAL_PURCHASE_ORDERS);
let mockOrders = getStored<MockOrder[]>('orders', INITIAL_ORDERS);
let mockDocuments = getStored<any[]>('documents', INITIAL_DOCUMENTS);

// Simulated delay helper
export const mockDelay = (ms: number = 250) => new Promise(resolve => setTimeout(resolve, ms));

// -------------------------------------------------------------
// MOCK DATA ACCESSORS & MUTATORS
// -------------------------------------------------------------

export const MockDB = {
  // Users
  getUsers: () => [...mockUsers],
  getUserById: (id: string) => mockUsers.find(u => u._id === id),
  findUserByEmail: (email: string) => mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase()),
  addUser: (userData: Omit<MockUser, '_id'> & { _id?: string }) => {
    const newUser: MockUser = {
      ...userData,
      _id: userData._id || `user-${Date.now()}`,
      lastLogin: new Date().toISOString()
    };
    mockUsers = [newUser, ...mockUsers];
    setStored('users', mockUsers);
    return newUser;
  },
  updateUser: (id: string, updates: Partial<MockUser>) => {
    mockUsers = mockUsers.map(u => u._id === id ? { ...u, ...updates } : u);
    setStored('users', mockUsers);
    return mockUsers.find(u => u._id === id);
  },
  deleteUser: (id: string) => {
    mockUsers = mockUsers.filter(u => u._id !== id);
    setStored('users', mockUsers);
    return true;
  },

  // Customers
  getCustomers: () => [...mockCustomers],
  getCustomerById: (id: string) => mockCustomers.find(c => c._id === id || c.customerId === id),
  addCustomer: (custData: any) => {
    const id = `cust-${Date.now()}`;
    const newCust: MockCustomer = {
      _id: id,
      customerId: custData.customerId || `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: custData.companyName || 'New Customer',
      phone: custData.phone || '',
      email: custData.email || '',
      address: custData.address || '',
      vendorType: custData.vendorType || 'Supplier',
      vendorCode: Number(custData.vendorCode) || Math.floor(1000 + Math.random() * 9000),
      accountHolderName: custData.accountHolderName || custData.companyName || '',
      bankName: custData.bankName || 'State Bank of India',
      accountNumber: custData.accountNumber || '12345678901',
      ifscCode: custData.ifscCode || 'SBIN0001000',
      branch: custData.branch || 'Main Branch',
      partNumbers: Array.isArray(custData.partNumbers) 
        ? custData.partNumbers.map((p: any) => typeof p === 'string' ? { _id: `part-${Date.now()}-${Math.random()}`, partNumber: p } : p)
        : [],
      GST: custData.GST || '33AAAAA0000A1Z5',
      PAN: custData.PAN || 'AAAAA0000A',
      TAN: custData.TAN || 'CHNA00000A',
      commercialEmail: custData.commercialEmail || custData.email || '',
      creditTerms: custData.creditTerms || 'Net 30',
      creditDays: Number(custData.creditDays) || 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockCustomers = [newCust, ...mockCustomers];
    setStored('customers', mockCustomers);
    return newCust;
  },
  updateCustomer: (id: string, custData: any) => {
    mockCustomers = mockCustomers.map(c => {
      if (c._id === id || c.customerId === id) {
        return {
          ...c,
          ...custData,
          partNumbers: Array.isArray(custData.partNumbers)
            ? custData.partNumbers.map((p: any) => typeof p === 'string' ? { _id: `part-${Date.now()}-${Math.random()}`, partNumber: p } : p)
            : c.partNumbers,
          updatedAt: new Date().toISOString()
        };
      }
      return c;
    });
    setStored('customers', mockCustomers);
    return mockCustomers.find(c => c._id === id || c.customerId === id);
  },
  deleteCustomer: (id: string) => {
    mockCustomers = mockCustomers.filter(c => c._id !== id && c.customerId !== id);
    setStored('customers', mockCustomers);
    return true;
  },

  // Parts
  getParts: () => [...mockParts],
  getPartsByCustomer: (customerId: string) => {
    return mockParts.filter(p => {
      if (typeof p.customer === 'string') return p.customer === customerId;
      return p.customer?._id === customerId;
    });
  },
  addPart: (partData: any) => {
    const newPart: MockPart = {
      _id: `part-${Date.now()}`,
      partNumber: partData.partNumber || `PRT-${Date.now()}`,
      description: partData.description || '',
      customer: partData.customer || '',
      documents: partData.documents || [],
      rawMaterial: partData.rawMaterial || 'Steel',
      quantityPerScrew: Number(partData.quantityPerScrew) || 1,
      processSteps: partData.processSteps || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockParts = [newPart, ...mockParts];
    setStored('parts', mockParts);
    return newPart;
  },
  updatePart: (id: string, updates: any) => {
    mockParts = mockParts.map(p => p._id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    setStored('parts', mockParts);
    return mockParts.find(p => p._id === id);
  },
  deletePart: (id: string) => {
    mockParts = mockParts.filter(p => p._id !== id);
    setStored('parts', mockParts);
    return true;
  },

  // Materials
  getMaterials: () => [...mockMaterials],
  getMaterialById: (id: string) => mockMaterials.find(m => m.id === id || m._id === id || m.materialId === id),
  addMaterial: (matData: any) => {
    const id = `mat-${Date.now()}`;
    const newMat: MockMaterial = {
      id,
      _id: id,
      materialId: (matData.materialId || `RM-${Math.floor(100 + Math.random() * 900)}`).toUpperCase(),
      name: matData.name || 'Raw Material',
      description: matData.description || '',
      unit: matData.unit || 'kg',
      currentStock: Number(matData.currentStock) || 0,
      minStockLevel: Number(matData.minStockLevel || matData.reorderLevel) || 0,
      reorderLevel: Number(matData.reorderLevel || matData.minStockLevel) || 0,
      supplier: matData.supplier || 'Internal Warehouse',
      lastRestockDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockMaterials = [newMat, ...mockMaterials];
    setStored('materials', mockMaterials);
    return newMat;
  },
  updateMaterial: (id: string, updates: any) => {
    mockMaterials = mockMaterials.map(m => {
      if (m.id === id || m._id === id || m.materialId === id) {
        return {
          ...m,
          ...updates,
          materialId: (updates.materialId || m.materialId).toUpperCase(),
          currentStock: updates.currentStock !== undefined ? Number(updates.currentStock) : m.currentStock,
          minStockLevel: updates.minStockLevel !== undefined ? Number(updates.minStockLevel) : m.minStockLevel,
          reorderLevel: updates.reorderLevel !== undefined ? Number(updates.reorderLevel) : m.reorderLevel,
          updatedAt: new Date().toISOString()
        };
      }
      return m;
    });
    setStored('materials', mockMaterials);
    return mockMaterials.find(m => m.id === id || m._id === id || m.materialId === id);
  },
  deleteMaterial: (id: string) => {
    mockMaterials = mockMaterials.filter(m => m.id !== id && m._id !== id && m.materialId !== id);
    setStored('materials', mockMaterials);
    return true;
  },

  // Plans
  getPlans: (query?: string) => {
    if (!query) return [...mockPlans];
    const q = query.toLowerCase();
    return mockPlans.filter(p => 
      p.machineType.toLowerCase().includes(q) ||
      p.partNumber.toLowerCase().includes(q) ||
      (p.status && p.status.toLowerCase().includes(q))
    );
  },
  addPlan: (planData: any) => {
    const id = `plan-${Date.now()}`;
    const newPlan: MockPlan = {
      _id: id,
      machineType: planData.machineType || 'Standard CNC',
      rawMaterials: planData.rawMaterials || '',
      manPower: Number(planData.manPower) || 1,
      partNumber: planData.partNumber || '',
      timeDuration: planData.timeDuration || '1h',
      tooling: planData.tooling || '',
      machineAvailability: planData.machineAvailability || 'Available',
      shiftTimings: planData.shiftTimings || 'Shift A',
      status: planData.status || 'planned',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockPlans = [newPlan, ...mockPlans];
    setStored('plans', mockPlans);
    return newPlan;
  },
  updatePlan: (id: string, updates: any) => {
    mockPlans = mockPlans.map(p => p._id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p);
    setStored('plans', mockPlans);
    return mockPlans.find(p => p._id === id);
  },
  deletePlan: (id: string) => {
    mockPlans = mockPlans.filter(p => p._id !== id);
    setStored('plans', mockPlans);
    return true;
  },

  // Purchase Orders (POs)
  getPOs: () => [...mockPOs],
  getPOById: (id: string) => mockPOs.find(p => p._id === id),
  addPO: (poData: any) => {
    const id = `po-${Date.now()}`;
    const company = mockCustomers.find(c => c._id === poData.company || c.companyName === poData.company);
    const materials = (poData.materials || []).map((m: any, idx: number) => ({
      ...m,
      srNo: m.srNo || (idx + 1) * 10,
      unitPrice: Number(m.unitPrice) || 0,
      quantity: Number(m.quantity) || 0,
      freight: Number(m.freight) || 0,
      gst: Number(m.gst) || 18,
      deliverySchedule: m.deliverySchedule || new Date().toISOString().split('T')[0]
    }));

    const netAmount = materials.reduce((sum: number, m: any) => sum + (m.unitPrice * m.quantity), 0);
    const freightCharges = materials.reduce((sum: number, m: any) => sum + (m.freight || 0), 0);
    const taxes = netAmount * 0.18;
    const totalValue = netAmount + freightCharges + taxes;

    const newPO: MockPO = {
      _id: id,
      poNumber: poData.poNumber || `PO-2024-${Math.floor(100 + Math.random() * 900)}`,
      company: {
        _id: company?._id || poData.company || '',
        companyName: company?.companyName || 'Specified Company',
        address: company?.address || poData.deliveryAddress || ''
      },
      poOrderNumber: poData.poOrderNumber || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      poOrderDate: poData.poOrderDate || new Date().toISOString().split('T')[0],
      purchaseOrg: poData.purchaseOrg || 'General Procurement',
      termsOfDelivery: poData.termsOfDelivery || 'EXW-Factory',
      paymentTerms: poData.paymentTerms || '15 days credit from GRN date',
      deliveryAddress: poData.deliveryAddress || (company?.address || 'Factory Site'),
      placeOfSupply: poData.placeOfSupply || 'Tamil Nadu (33)',
      materials,
      netAmount,
      freightCharges,
      taxes,
      totalValue,
      isOpen: true,
      isCancelled: false,
      documents: []
    };

    mockPOs = [newPO, ...mockPOs];
    setStored('pos', mockPOs);
    return newPO;
  },
  updatePO: (id: string, updates: any) => {
    mockPOs = mockPOs.map(p => {
      if (p._id === id) {
        const company = updates.company ? mockCustomers.find(c => c._id === updates.company) : null;
        const updatedCompany = company ? {
          _id: company._id,
          companyName: company.companyName,
          address: company.address
        } : p.company;

        const materials = updates.materials ? updates.materials.map((m: any, idx: number) => ({
          ...m,
          srNo: m.srNo || (idx + 1) * 10,
          unitPrice: Number(m.unitPrice) || 0,
          quantity: Number(m.quantity) || 0,
          freight: Number(m.freight) || 0,
          gst: Number(m.gst) || 18
        })) : p.materials;

        const netAmount = materials.reduce((sum: number, m: any) => sum + (m.unitPrice * m.quantity), 0);
        const freightCharges = materials.reduce((sum: number, m: any) => sum + (m.freight || 0), 0);
        const taxes = netAmount * 0.18;
        const totalValue = netAmount + freightCharges + taxes;

        return {
          ...p,
          ...updates,
          company: updatedCompany,
          materials,
          netAmount,
          freightCharges,
          taxes,
          totalValue
        };
      }
      return p;
    });
    setStored('pos', mockPOs);
    return mockPOs.find(p => p._id === id);
  },
  deletePO: (id: string) => {
    mockPOs = mockPOs.filter(p => p._id !== id);
    setStored('pos', mockPOs);
    return true;
  },

  // Orders
  getOrders: () => [...mockOrders],
  addOrder: (orderData: any) => {
    const id = `ord-${Date.now()}`;
    const customer = typeof orderData.customer_id === 'string' 
      ? mockCustomers.find(c => c._id === orderData.customer_id) 
      : orderData.customer_id;

    const newOrder: MockOrder = {
      _id: id,
      order_number: orderData.order_number || `ORD-2024-${Math.floor(100 + Math.random() * 900)}`,
      po_number: orderData.po_number || 'PO-NEW',
      customer_id: customer || mockCustomers[0],
      company_name: customer?.companyName || orderData.company_name || 'Customer Name',
      ordered_date: orderData.ordered_date || new Date().toISOString(),
      delivery_date: orderData.delivery_date || new Date().toISOString(),
      planning_date: orderData.planning_date || new Date().toISOString(),
      production_date: orderData.production_date || new Date().toISOString(),
      status: orderData.status || 'pending',
      uploaded_by: orderData.uploaded_by || 'Current User',
      parts: orderData.parts || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockOrders = [newOrder, ...mockOrders];
    setStored('orders', mockOrders);
    return newOrder;
  },
  updateOrder: (id: string, updates: any) => {
    mockOrders = mockOrders.map(o => o._id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o);
    setStored('orders', mockOrders);
    return mockOrders.find(o => o._id === id);
  },

  // Documents
  getDocuments: () => [...mockDocuments],
  addDocument: (doc: any) => {
    const newDoc = {
      _id: `doc-${Date.now()}`,
      filename: doc.name || doc.filename || 'Uploaded_Document.pdf',
      url: URL.createObjectURL ? URL.createObjectURL(doc) : '#',
      fileSize: doc.size ? `${(doc.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      createdAt: new Date().toISOString()
    };
    mockDocuments = [newDoc, ...mockDocuments];
    setStored('documents', mockDocuments);
    return newDoc;
  },
  deleteDocument: (id: string) => {
    mockDocuments = mockDocuments.filter(d => d._id !== id);
    setStored('documents', mockDocuments);
    return true;
  }
};
