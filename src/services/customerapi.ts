import { MockDB, mockDelay } from '../data/mockData';
import type { Customer, ApiResponse } from '../store/types/customer';

class ApiService {
  // Customer endpoints
  async getAllCustomers(): Promise<ApiResponse<Customer[]>> {
    await mockDelay(150);
    const customers = MockDB.getCustomers() as unknown as Customer[];
    return {
      success: true,
      message: 'Customers retrieved successfully',
      data: customers,
      count: customers.length
    };
  }

  async getCustomerById(id: string): Promise<ApiResponse<Customer>> {
    await mockDelay(100);
    const customer = MockDB.getCustomerById(id) as unknown as Customer;
    if (!customer) {
      return {
        success: false,
        message: 'Customer not found'
      };
    }
    return {
      success: true,
      message: 'Customer retrieved successfully',
      data: customer
    };
  }

  async createCustomer(customerData: any): Promise<ApiResponse<Customer>> {
    await mockDelay(200);
    const created = MockDB.addCustomer(customerData) as unknown as Customer;
    return {
      success: true,
      message: 'Customer created successfully',
      data: created
    };
  }

  async updateCustomer(id: string, customerData: any): Promise<ApiResponse<Customer>> {
    await mockDelay(200);
    const updated = MockDB.updateCustomer(id, customerData) as unknown as Customer;
    if (!updated) {
      return {
        success: false,
        message: 'Customer not found for update'
      };
    }
    return {
      success: true,
      message: 'Customer updated successfully',
      data: updated
    };
  }

  async deleteCustomer(id: string): Promise<ApiResponse<any>> {
    await mockDelay(150);
    MockDB.deleteCustomer(id);
    return {
      success: true,
      message: 'Customer deleted successfully'
    };
  }
}

export const apiService = new ApiService();
