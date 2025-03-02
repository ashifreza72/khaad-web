'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  Grid, 
  MenuItem, 
  IconButton, 
  Paper,
  Alert,
  InputAdornment,
  Stack,
  CircularProgress
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface Size {
  size: string;
  price: string;
}

interface ProductFormData {
  title: string;
  price: string;
  originalPrice: string;
  description: string;
  discount: string;
  category: string;
  stock: number;
  sizes: Size[];
  image: File | null;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id?.toString() || '';
  const { admin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [initialLoading, setInitialLoading] = useState(true);

  const categories = ['Fertilizers', 'Pesticides', 'Seeds'];

  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    price: '',
    originalPrice: '',
    description: '',
    discount: '',
    category: '',
    stock: 1,
    sizes: [{ size: '', price: '' }],
    image: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch product');
        }

        setFormData({
          title: data.product.title,
          price: data.product.price,
          originalPrice: data.product.originalPrice,
          description: data.product.description,
          discount: data.product.discount,
          category: data.product.category,
          stock: data.product.stock,
          sizes: data.product.sizes,
          image: null,
        });
        setImagePreview(data.product.image.url);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSizeChange = (index: number, field: keyof Size, value: string) => {
    const newSizes = [...formData.sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData({ ...formData, sizes: newSizes });
  };

  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, { size: '', price: '' }],
    });
  };

  const removeSize = (index: number) => {
    const newSizes = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Only append non-empty values
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'sizes') {
          formDataToSend.append('sizes', JSON.stringify(value.filter((size: Size) => size.size || size.price)));
        } else if (key === 'image' && value) {
          formDataToSend.append('image', value);
        } else if (value !== null && value !== '') {
          formDataToSend.append(key, String(value));
        }
      });

      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update product');
      }

      router.push('/dashboard/products');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Product
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper component="form" onSubmit={handleSubmit} elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              inputProps={{ maxLength: 100 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <MenuItem value="">Select a category</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Original Price"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Discount"
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              required
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              label="Stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              required
              inputProps={{ min: 1, max: 9999 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Sizes and Prices
            </Typography>
            {formData.sizes.map((size, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  label="Size"
                  value={size.size}
                  onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Price"
                  value={size.price}
                  onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                  sx={{ flex: 1 }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}
                />
                <IconButton 
                  onClick={() => removeSize(index)}
                  disabled={formData.sizes.length === 1}
                  color="error"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={addSize}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              Add Size
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Product Image
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
              </Button>
            </label>
            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <img 
                  src={imagePreview} 
                  alt="Product preview" 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} 
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => router.push('/dashboard/products')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Update Product'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
