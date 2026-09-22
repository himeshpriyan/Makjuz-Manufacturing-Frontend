import { useState, useEffect } from 'react';
import type { Customer, Part, Order, PopulatedOrder } from '../store/types/orders';
import { MockDB, mockDelay } from '../data/mockData';

// API utility functions backed by MockDB
export const api = {
  // Customer endpoints
  customers: {
    getAll: async (): Promise<Customer[]> => {
      await mockDelay(150);
      const list = MockDB.getCustomers();
      return list.map(c => ({
        _id: c._id,
        customerId: c.customerId,
        companyName: c.companyName,
        phone: c.phone,
        email: c.email,
        address: c.address,
        partNumbers: c.partNumbers.map(p => p.partNumber),
        GST: c.GST,
        PAN: c.PAN,
        TAN: c.TAN,
        commercialEmail: c.commercialEmail,
        creditTerms: c.creditTerms,
        creditDays: c.creditDays,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      }));
    },
    
    getById: async (id: string): Promise<Customer> => {
      await mockDelay(100);
      const c = MockDB.getCustomerById(id);
      if (!c) throw new Error('Customer not found');
      return {
        _id: c._id,
        customerId: c.customerId,
        companyName: c.companyName,
        phone: c.phone,
        email: c.email,
        address: c.address,
        partNumbers: c.partNumbers.map(p => p.partNumber),
        GST: c.GST,
        PAN: c.PAN,
        TAN: c.TAN,
        commercialEmail: c.commercialEmail,
        creditTerms: c.creditTerms,
        creditDays: c.creditDays,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      };
    },
    
    create: async (customer: Partial<Customer>): Promise<Customer> => {
      await mockDelay(200);
      const created = MockDB.addCustomer(customer);
      return {
        _id: created._id,
        customerId: created.customerId,
        companyName: created.companyName,
        phone: created.phone,
        email: created.email,
        address: created.address,
        partNumbers: created.partNumbers.map(p => p.partNumber),
        GST: created.GST,
        PAN: created.PAN,
        TAN: created.TAN,
        commercialEmail: created.commercialEmail,
        creditTerms: created.creditTerms,
        creditDays: created.creditDays,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt
      };
    }
  },
  
  // Parts endpoints  
  parts: {
    getByCustomer: async (customerId: string): Promise<Part[]> => {
      await mockDelay(150);
      const parts = MockDB.getPartsByCustomer(customerId);
      if (parts.length > 0) {
        return parts as unknown as Part[];
      }
      // If customer has part numbers listed, synthesize parts
      const customer = MockDB.getCustomerById(customerId);
      if (!customer) return [];

      return customer.partNumbers.map((partNum: any) => ({
        _id: partNum._id || `part-${Date.now()}`,
        partNumber: partNum.partNumber,
        description: `Part ${partNum.partNumber}`,
        customer: customerId,
        documents: [],
        rawMaterial: 'Standard Steel',
        quantityPerScrew: 1,
        processSteps: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
  },
  
  // Orders endpoints
  orders: {
    getAll: async (): Promise<PopulatedOrder[]> => {
      await mockDelay(150);
      const orders = MockDB.getOrders();
      return orders as unknown as PopulatedOrder[];
    },
    
    create: async (order: Order): Promise<PopulatedOrder> => {
      await mockDelay(200);
      const created = MockDB.addOrder(order);
      return created as unknown as PopulatedOrder;
    },
    
    update: async (id: string, order: Partial<Order>): Promise<PopulatedOrder> => {
      await mockDelay(200);
      const updated = MockDB.updateOrder(id, order);
      if (!updated) throw new Error('Order not found');
      return updated as unknown as PopulatedOrder;
    }
  }
};

// Custom hooks
export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await api.customers.getAll();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, error, refetch: fetchCustomers };
};

export const useParts = (customerId: string | null) => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) {
      setParts([]);
      return;
    }

    const fetchParts = async () => {
      try {
        setLoading(true);
        const data = await api.parts.getByCustomer(customerId);
        setParts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch parts');
        setParts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, [customerId]);

  return { parts, loading, error };
};

export const useOrders = () => {
  const [orders, setOrders] = useState<PopulatedOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.orders.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
};