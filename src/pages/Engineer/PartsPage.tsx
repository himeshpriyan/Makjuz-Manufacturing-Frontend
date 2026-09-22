import { useState, useEffect } from "react";
import { Plus, RefreshCw } from "lucide-react";
import PartsListView from "../../components/parts/PartsListView";
import PartForm from "../../components/parts/PartForm";
import PartDetailsView from "../../components/parts/PartDetailsView";
import type { Part, Customer, PartFormData } from "../../store/types/Part";
import type { Material } from "../../store/materialApi";
import { getAllMaterials } from "../../store/materialApi";
import { apiService } from "../../services/customerapi";
import { MockDB, mockDelay } from "../../data/mockData";

interface CustomerResponse {
  data?: Customer[];
  customers?: Customer[];
}

const PartsPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [editingPartId, setEditingPartId] = useState<string | null>(null);
  const [initialFormData, setInitialFormData] = useState<PartFormData | undefined>(undefined);

  // Fetch initial data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [customersResponse, materialsData] = await Promise.all([
          apiService.getAllCustomers(),
          getAllMaterials(),
        ]);

        if (customersResponse && typeof customersResponse === "object") {
          const customerResp = customersResponse as CustomerResponse | Customer[];
          if (Array.isArray(customerResp)) {
            setCustomers(customerResp);
          } else if (customerResp.data && Array.isArray(customerResp.data)) {
            setCustomers(customerResp.data);
          } else if (customerResp.customers && Array.isArray(customerResp.customers)) {
            setCustomers(customerResp.customers);
          }
        }

        if (Array.isArray(materialsData)) {
          setMaterials(materialsData);
        }

        await fetchParts();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    try {
      await mockDelay(150);
      const data = MockDB.getParts();
      setParts(data as unknown as Part[]);
    } catch (error) {
      console.error("Error fetching parts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await apiService.getAllCustomers();
      if (response && response.data) {
        setCustomers(response.data as unknown as Customer[]);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (formData: PartFormData) => {
    try {
      await mockDelay(200);
      const cleanedData = {
        ...formData,
        documents: formData.documents.filter((doc) => doc.trim() !== ""),
        quantityPerScrew: Number(formData.quantityPerScrew),
        processSteps: formData.processSteps.map((step) => ({
          ...step,
          toolsMaterials: step.toolsMaterials.filter((tool) => tool.trim() !== ""),
        })),
      };

      if (editingPartId) {
        MockDB.updatePart(editingPartId, cleanedData);
        alert("Part updated successfully!");
      } else {
        MockDB.addPart(cleanedData);
        alert("Part created successfully!");
      }

      fetchParts();
      setShowForm(false);
      setEditingPartId(null);
      setInitialFormData(undefined);
    } catch (error) {
      console.error("Error saving part:", error);
      alert("Error saving part. Please try again.");
    }
  };

  const handleEdit = (part: Part) => {
    setShowForm(true);
    setEditingPartId(part._id);
    setInitialFormData({
      partNumber: part.partNumber,
      description: part.description || "",
      customer: part.customer._id,
      documents: part.documents.length > 0 ? part.documents : [""],
      rawMaterial: part.rawMaterial,
      quantityPerScrew: part.quantityPerScrew.toString(),
      processSteps: part.processSteps,
    });
  };

  const handleCreateNew = () => {
    setShowForm(true);
    setEditingPartId(null);
    setInitialFormData(undefined);
  };

  const handleViewList = () => {
    setShowForm(false);
    setEditingPartId(null);
    setInitialFormData(undefined);
  };

  const safeCustomers = Array.isArray(customers) ? customers : [];
  const safeMaterials = Array.isArray(materials) ? materials : [];

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parts Management</h1>
          <p className="text-gray-600">Manage and create new parts</p>
        </div>
        <button
          onClick={showForm ? handleViewList : handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showForm ? (
            <>
              <RefreshCw className="w-4 h-4" />
              View Parts List
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create New Part
            </>
          )}
        </button>
      </div>

      {!showForm ? (
        <div className="bg-white rounded-lg shadow-sm">
          <PartsListView
            parts={parts}
            loading={loading}
            onEdit={handleEdit}
            onView={(part) => setSelectedPart(part)}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <PartForm
            initialData={initialFormData}
            customers={safeCustomers}
            loading={loading}
            onSubmit={handleFormSubmit}
            fetchCustomers={fetchCustomers}
          />
        </div>
      )}

      {selectedPart && (
        <PartDetailsView part={selectedPart} onClose={() => setSelectedPart(null)} />
      )}
    </div>
  );
};

export default PartsPage;
