import React from "react";
import { Plus } from "lucide-react";
import ProductCard from "@/components/Products/Cards/Card";

interface ProductPreviewProps {
  createdProduct: any | null;
  formCompletionPercentage: number;
  formSubmitted: boolean;
}

export default function ProductPreview({
  createdProduct,
  formCompletionPercentage,
  formSubmitted,
}: ProductPreviewProps) {
  return (
    <div className="border border-gray-800 h-full">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-medium uppercase tracking-widest text-center">
          Product Preview
        </h2>
      </div>

      <div className="p-5">
        {createdProduct ? (
          <ProductCard product={createdProduct} />
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 border border-dashed border-gray-700 rounded-full flex items-center justify-center mb-4">
              <Plus size={20} className="text-gray-500" />
            </div>
            <p className="text-gray-500 text-sm">
              Complete the form to see your product preview
            </p>
          </div>
        )}
      </div>

      {/* Form progress indicator */}
      {!formSubmitted && (
        <div className="p-5 border-t border-gray-800">
          <div className="flex items-center">
            <span className="text-xs text-gray-500 mr-2">Completion:</span>
            <div className="flex-grow bg-gray-900 h-1">
              <div
                className="bg-white h-1"
                style={{
                  width: `${formCompletionPercentage}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
