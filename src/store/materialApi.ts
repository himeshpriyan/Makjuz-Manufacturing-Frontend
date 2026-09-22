import { MockDB, mockDelay } from '../data/mockData';

export interface Material {
  _id: string;
  materialId: string;
  name: string;
  description?: string;
  currentStock: number;
  unit: string;
  reorderLevel: number;
  supplier?: string;
  lastRestockDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllMaterials = async (): Promise<Material[]> => {
  await mockDelay(150);
  const list = MockDB.getMaterials();
  return list.map(m => ({
    _id: m._id || m.id,
    materialId: m.materialId,
    name: m.name,
    description: m.description,
    currentStock: m.currentStock,
    unit: m.unit,
    reorderLevel: m.reorderLevel || m.minStockLevel || 0,
    supplier: m.supplier,
    lastRestockDate: m.lastRestockDate ? new Date(m.lastRestockDate) : undefined,
    createdAt: new Date(m.createdAt),
    updatedAt: new Date(m.updatedAt)
  }));
};

export const getMaterialById = async (id: string): Promise<Material> => {
  await mockDelay(100);
  const m = MockDB.getMaterialById(id);
  if (!m) throw new Error('Material not found');
  return {
    _id: m._id || m.id,
    materialId: m.materialId,
    name: m.name,
    description: m.description,
    currentStock: m.currentStock,
    unit: m.unit,
    reorderLevel: m.reorderLevel || m.minStockLevel || 0,
    supplier: m.supplier,
    lastRestockDate: m.lastRestockDate ? new Date(m.lastRestockDate) : undefined,
    createdAt: new Date(m.createdAt),
    updatedAt: new Date(m.updatedAt)
  };
};

export const createMaterial = async (materialData: Omit<Material, '_id' | 'createdAt' | 'updatedAt'>): Promise<Material> => {
  await mockDelay(200);
  const created = MockDB.addMaterial(materialData);
  return {
    _id: created._id || created.id,
    materialId: created.materialId,
    name: created.name,
    description: created.description,
    currentStock: created.currentStock,
    unit: created.unit,
    reorderLevel: created.reorderLevel,
    supplier: created.supplier,
    lastRestockDate: new Date(created.lastRestockDate),
    createdAt: new Date(created.createdAt),
    updatedAt: new Date(created.updatedAt)
  };
};

export const updateMaterial = async (id: string, materialData: Partial<Material>): Promise<Material> => {
  await mockDelay(200);
  const updated = MockDB.updateMaterial(id, materialData);
  if (!updated) throw new Error('Material not found');
  return {
    _id: updated._id || updated.id,
    materialId: updated.materialId,
    name: updated.name,
    description: updated.description,
    currentStock: updated.currentStock,
    unit: updated.unit,
    reorderLevel: updated.reorderLevel,
    supplier: updated.supplier,
    lastRestockDate: new Date(updated.lastRestockDate),
    createdAt: new Date(updated.createdAt),
    updatedAt: new Date(updated.updatedAt)
  };
};

export const deleteMaterial = async (id: string): Promise<void> => {
  await mockDelay(150);
  MockDB.deleteMaterial(id);
};
