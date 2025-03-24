import { Upload } from "lucide-react";

const UploadContent = () => (
  <div>
    <h1 className="mb-6 text-3xl font-bold">Upload</h1>
    <div className="rounded-lg bg-gray-800 p-6">
      <div className="mb-6 rounded-lg border-2 border-dashed border-gray-600 p-8 text-center">
        <Upload className="mx-auto mb-2 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-xl">Drag & Drop Files Here</p>
        <p className="text-gray-400">or</p>
        <button className="mt-4 rounded-md bg-indigo-600 px-4 py-2">
          Browse Files
        </button>
      </div>
      <div>
        <h3 className="mb-4 text-lg">Upload History</h3>
        <div className="space-y-3">
          <div className="flex justify-between rounded-md bg-gray-700 p-3">
            <div>
              <p>product-images.zip</p>
              <p className="text-sm text-gray-400">
                3.2 MB • Uploaded 2 hours ago
              </p>
            </div>
            <div className="flex items-center text-indigo-400">View</div>
          </div>
          <div className="flex justify-between rounded-md bg-gray-700 p-3">
            <div>
              <p>inventory-sheet.xlsx</p>
              <p className="text-sm text-gray-400">
                1.8 MB • Uploaded yesterday
              </p>
            </div>
            <div className="flex items-center text-indigo-400">View</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default UploadContent;
