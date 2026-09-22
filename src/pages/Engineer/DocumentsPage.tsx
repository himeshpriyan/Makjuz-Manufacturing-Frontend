import { useState, useEffect } from "react";
import { Upload, File, Download, Trash2 } from "lucide-react";
import { MockDB, mockDelay } from "../../data/mockData";

const DocumentsPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // Fetch uploaded documents
  const fetchDocuments = async () => {
    try {
      await mockDelay(150);
      const data = MockDB.getDocuments();
      setUploadedFiles(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file before uploading.");
      return;
    }

    try {
      setUploading(true);
      await mockDelay(300);
      MockDB.addDocument({
        name: selectedFile.name,
        size: selectedFile.size
      });

      alert("File uploaded successfully!");
      setSelectedFile(null);
      fetchDocuments(); // Refresh list
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Something went wrong during upload.");
    } finally {
      setUploading(false);
    }
  };

  // Handle file delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await mockDelay(150);
      MockDB.deleteDocument(id);
      alert("File deleted successfully!");
      fetchDocuments();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar space alignment */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents Management</h1>
            <p className="text-gray-600">Upload and manage engineering documents</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Upload Document
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        {/* Uploaded Documents List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <File className="w-5 h-5 text-gray-700" />
            Uploaded Documents
          </h2>

          {uploadedFiles.length === 0 ? (
            <p className="text-gray-500">No documents uploaded yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2">Document Name</th>
                  <th className="px-4 py-2">Upload Date</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file) => (
                  <tr key={file._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-800">{file.filename || file.originalName || file.name}</td>
                    <td className="px-4 py-2 text-gray-600">
                      {new Date(file.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <a
                        href={file.url || "#"}
                        download={file.filename || file.name}
                        onClick={(e) => {
                          if (!file.url || file.url === '#') {
                            e.preventDefault();
                            alert(`Simulated download for: ${file.filename || file.name}`);
                          }
                        }}
                        className="text-blue-600 hover:underline mr-3 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                      <button
                        onClick={() => handleDelete(file._id)}
                        className="text-red-600 hover:underline inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
