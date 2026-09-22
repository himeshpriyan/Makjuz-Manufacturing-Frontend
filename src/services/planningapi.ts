// planningApi.ts
import { MockDB, mockDelay } from '../data/mockData';

export interface PlanPayload {
  machineType: string;
  rawMaterials?: string;
  manPower?: number;
  partNumber: string;
  timeDuration?: string;
  tooling?: string;
  machineAvailability?: string;
  shiftTimings?: string; 
  status?: string;
}

export interface Plan {
  _id: string;
  machineType: string;
  rawMaterials?: string;
  manPower?: number;
  partNumber: string;
  timeDuration?: string;
  tooling?: string;
  machineAvailability?: string;
  shiftTimings?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function getAllPlans(q?: string) {
  await mockDelay(150);
  const plans = MockDB.getPlans(q);
  return {
    success: true,
    plans,
    count: plans.length
  };
}

export async function createPlan(payload: PlanPayload) {
  await mockDelay(200);
  const plan = MockDB.addPlan(payload);
  return {
    success: true,
    message: 'Plan created successfully',
    plan
  };
}

export async function updatePlan(id: string, payload: Partial<PlanPayload>) {
  await mockDelay(200);
  const plan = MockDB.updatePlan(id, payload);
  if (!plan) {
    return {
      success: false,
      message: 'Plan not found'
    };
  }
  return {
    success: true,
    message: 'Plan updated successfully',
    plan
  };
}

export async function deletePlan(id: string) {
  await mockDelay(150);
  MockDB.deletePlan(id);
  return {
    success: true,
    message: 'Plan deleted successfully'
  };
}
