
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { Plus } from "lucide-react";

const initialFormData = {
  title: "",
  property_type: "",
  sale_or_rent: "sale",
  owner_id: "",
  created_by_agent: "",
  status: "available",
  verification_docs: null,
  address: {
    street_line1: "",
    street_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    latitude: "",
    longitude: "",
    visibility_mark: false,
  },  
};

export function AddPropertyDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormData(initialFormData);
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "verification_docs" && type === "file") {
      setFormData((prev) => ({ ...prev, verification_docs: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("property_type", formData.property_type);
      data.append("sale_or_rent", formData.sale_or_rent);
      data.append("owner_id", formData.owner_id);
      data.append("created_by_agent", formData.created_by_agent);
      data.append("status", formData.status);

     if (formData.verification_docs) {
  data.append("verification_docs", formData.verification_docs, formData.verification_docs.name);
}
console.log(formData.verification_docs)

      const address = formData.address;
      for (const key in address) {
        data.append(`address[${key}]`, key === "visibility_mark" ? (address[key] ? 1 : 0) : address[key]);
      }

      await axiosInstance.post("/properties", data, {headers:{'Content-Type': 'multipart/form-data',
                            }});
      toast.success("Property added successfully.");
      onCreated?.();
      setOpen(false);
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Failed to add property.");
      console.error("Add property error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Fill in the property details below.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Property Type</Label>
              <Input name="property_type" value={formData.property_type} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Sale or Rent</Label>
              <select
                name="sale_or_rent"
                value={formData.sale_or_rent}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
            </div>
            <div>
              <Label>Status</Label>
              <Input name="status" value={formData.status} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Owner ID</Label>
              <Input name="owner_id" value={formData.owner_id} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Agent ID</Label>
              <Input name="created_by_agent" value={formData.created_by_agent} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Verification Docs</Label>
              <Input type="file" name="verification_docs" accept=".pdf,.jpg,.jpeg,.png" onChange={handleInputChange} />
            </div>

            {/* Address */}
            <div className="col-span-2 mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Address Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Street Line 1" name="street_line1" value={formData.address.street_line1} onChange={handleAddressChange} />
                <InputField label="Street Line 2" name="street_line2" value={formData.address.street_line2} onChange={handleAddressChange} />
                <InputField label="City" name="city" value={formData.address.city} onChange={handleAddressChange} />
                <InputField label="State" name="state" value={formData.address.state} onChange={handleAddressChange} />
                <InputField label="Postal Code" name="postal_code" value={formData.address.postal_code} onChange={handleAddressChange} />
                <InputField label="Country" name="country" value={formData.address.country} onChange={handleAddressChange} />
                <InputField label="Latitude" name="latitude" value={formData.address.latitude} onChange={handleAddressChange} type="number" />
                <InputField label="Longitude" name="longitude" value={formData.address.longitude} onChange={handleAddressChange} type="number" />
                <div className="col-span-2 flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={formData.address.visibility_mark}
                    onChange={(e) => handleAddressChange("visibility_mark", e.target.checked)}
                  />
                  <Label>Visibility Mark</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(name, e.target.value)} />
    </div>
  );
}

