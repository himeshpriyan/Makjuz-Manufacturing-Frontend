// src/services/materialapi.ts
import type { Material, FormData } from '../store/types/Material';
import { MockDB, mockDelay } from '../data/mockData';

// Fetch all materials
export const fetchMaterials = async (): Promise<Material[]> => {
  await mockDelay(150);
  const materials = MockDB.getMaterials();
  return materials.map(m => ({
    id: m.id || m._id,
    materialId: m.materialId,
    name: m.name,
    description: m.description,
    unit: m.unit,
    currentStock: m.currentStock,
    minStockLevel: m.minStockLevel,
    supplier: m.supplier
  }));
};

// Create new material
export const createMaterial = async (material: FormData): Promise<Material> => {
  await mockDelay(200);
  const created = MockDB.addMaterial(material);
  return {
    id: created.id,
    materialId: created.materialId,
    name: created.name,
    description: created.description,
    unit: created.unit,
    currentStock: created.currentStock,
    minStockLevel: created.minStockLevel,
    supplier: created.supplier
  };
};

// Update existing material
export const updateMaterial = async (id: string, material: FormData): Promise<Material> => {
  await mockDelay(200);
  const updated = MockDB.updateMaterial(id, material);
  if (!updated) {
    throw new Error('Material not found');
  }
  return {
    id: updated.id,
    materialId: updated.materialId,
    name: updated.name,
    description: updated.description,
    unit: updated.unit,
    currentStock: updated.currentStock,
    minStockLevel: updated.minStockLevel,
    supplier: updated.supplier
  };
};

// Delete material
export const deleteMaterial = async (id: string): Promise<void> => {
  await mockDelay(150);
  MockDB.deleteMaterial(id);
};
