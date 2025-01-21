import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from "axios";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;

    &:hover {
      color: #374151;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: #16a34a;
      box-shadow: 0 0 0 3px rgba(16, 163, 74, 0.3);
    }
  }

  textarea {
    resize: none;
  }
`;

const TwoColumnGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;

    &.cancel {
      border: 1px solid #d1d5db;
      background: none;
      color: #374151;

      &:hover {
        background-color: #f9fafb;
      }
    }

    &.submit {
      background-color: #16a34a;
      color: white;
      border: none;

      &:hover {
        background-color: #15803d;
      }
    }
  }
`;

export default function AdminProductForm({ onClose, editingProduct, onSavedProduct, showForm }) {
  const [formData, setFormData] = useState(
    {
      name: "",
      price: "",
      stock: "",
      description: "",
      category: "",
    }
  );
  const [categories, setCategories] = useState([]);
  const [imageUpload, setImageUpload] = useState([]);
  const [removeImage, setRemoveImage] = useState([])
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const fetchDetails = async () => {
    if (editingProduct) {
      try {
        const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/${editingProduct._id}`);
        const details = response.data
        setFormData({
          name: details.name || "",
          price: details.price || "",
          stock: details.qtyAvailable || "",
          description: details.description || "",
          category: details.category?.name || "",
        });
  
        if (details.images) {
          const previewImages = details.images.map((image, index) => ({
            uid: index,
            name: image.split("/").pop(),
            status: "done",
            url: image,
          }))
          setImageUpload(previewImages)
        };
      } catch (err) {
        if (err.response?.data?.error) {
          setError(err.response?.data?.error)
        } else {
          setError(err.response.data?.message)
        }
      }
    }
  }

  useEffect(() => {
    setIsUpdate(!!editingProduct)
    fetchDetails()
  }, [editingProduct])

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://farmera-eyu3.onrender.com/api/v1/category/get/allCategories")
      setCategories(response.data)

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response?.data?.error)
      } else {
        setError(err.response.data?.message)
      }
    }
  }

  useEffect(() => {
    if (showForm) {
      fetchCategories()
    }
  }, [showForm])
 
  const updateProduct = async (productFormData) => {
    try {
      const response = await axios.put(`https://farmera-eyu3.onrender.com/api/v1/product/update/${editingProduct._id}`,
        productFormData,
      );
      console.log(response.data);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response?.data?.error)
      } else {
        setError(err.response?.data?.message)
      }
    }
  }

  const createProduct = async (productFormData) => {
    try {
      await axios.post("https://farmera-eyu3.onrender.com/api/v1/product/create",
        productFormData,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        },
      ); 
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response?.data?.error)
      } else {
        setError(err.response?.data?.message)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const productFormData = new FormData();
    productFormData.append("name", formData.name);
    productFormData.append("price", formData.price)
    productFormData.append("qtyAvailable", formData.stock)
    productFormData.append("description", formData.description)
    productFormData.append("category", formData.category)
    imageUpload
      .filter((file) => !removeImage.includes(file.url))
      .forEach((file) => {
        productFormData.append("images", file.originFileObj || file)
    })
    
    try {
      if (isUpdate) {
        await updateProduct(productFormData)
      } else {
        await createProduct(productFormData)
      }

      onSavedProduct();
      onClose();
    } catch(err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(err.response?.data?.message)
      }
    } finally {
      setSaving(false);
    }
  };

  const props = {
    name: 'images',
    multiple: true,
    showUploadList: true,
    beforeUpload: () => false,
    onChange(info) {
      let { fileList } = info

      if (fileList.length > 3) {
        message.error("You can only upload up to 3 images")
        fileList = fileList.slice(0, 3)
      }
      setImageUpload(fileList)
    },
    onRemove: (file) => {
      if (file.url) {
        setRemoveImage((prev) => [...prev, file.url])
      }
      const newFileList = imageUpload.filter((f) => f.uid !== file.uid)
      setImageUpload(newFileList)
      console.log(newFileList)
    },
    fileList: imageUpload,
  };

  return (
    <Overlay>
      <FormContainer>
        <Header>
          <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </InputGroup>

          <TwoColumnGroup>
            <InputGroup>
              <label>Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value })}
                required
              />
            </InputGroup>
          </TwoColumnGroup>

          <InputGroup>
            <label>Category</label>
            <select
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value })}
              required
            >
              <option value="" disabled>Select a category</option>
              {
                categories.map((category) => (
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))
              }
            </select>   
          </InputGroup>

          <InputGroup>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value })}
              rows={3}
              required
            />
          </InputGroup>
          <InputGroup>
          <label>Image</label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </InputGroup>

          <ButtonGroup>
            {
              error ? (<p>{error}</p>) : null
            }
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit" disabled={saving}>
              {saving ? "Saving..." : isUpdate ? "Update Product" : "Add Product"}
            </button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Overlay>
  );
}
