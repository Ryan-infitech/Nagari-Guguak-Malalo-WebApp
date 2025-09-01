/**
 * useUMKMProducts Hook
 * Hook untuk mengelola data produk UMKM
 */

import { useState, useCallback } from 'react';
import {
  UMKMProductsService,
  type UMKMProduct,
  type CreateUMKMProductData,
  type UMKMProductFilters,
} from '@/api/services/umkm-products.service';
import type { PaginatedResponse } from '@/api/types';

export interface UseUMKMProductsReturn {
  // Data
  products: UMKMProduct[];
  totalProducts: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Loading states
  loading: boolean;
  submitting: boolean;

  // Functions
  getProducts: (
    umkmId: string,
    filters?: UMKMProductFilters
  ) => Promise<PaginatedResponse<UMKMProduct>>;
  getProduct: (umkmId: string, productId: string) => Promise<UMKMProduct>;
  createProduct: (
    umkmId: string,
    productData: CreateUMKMProductData,
    imageFile?: File
  ) => Promise<UMKMProduct>;
  updateProduct: (
    umkmId: string,
    productId: string,
    productData: Partial<CreateUMKMProductData>,
    imageFile?: File
  ) => Promise<UMKMProduct>;
  deleteProduct: (umkmId: string, productId: string) => Promise<void>;
  toggleAvailability: (
    umkmId: string,
    productId: string,
    isAvailable: boolean
  ) => Promise<UMKMProduct>;
  toggleBestseller: (
    umkmId: string,
    productId: string,
    isBestseller: boolean
  ) => Promise<UMKMProduct>;
  uploadProductImage: (
    umkmId: string,
    productId: string,
    file: File
  ) => Promise<{ imageUrl: string }>;
  getProductCategories: () => Promise<string[]>;
  getProductsStatistics: (umkmId: string) => Promise<{
    total: number;
    available: number;
    unavailable: number;
    bestsellers: number;
    categories: Array<{ name: string; count: number }>;
  }>;
  bulkUpdateProducts: (
    umkmId: string,
    updates: Array<{
      id: string;
      isAvailable?: boolean;
      isBestseller?: boolean;
      category?: string;
    }>
  ) => Promise<UMKMProduct[]>;
  bulkDeleteProducts: (umkmId: string, productIds: string[]) => Promise<void>;
}

export function useUMKMProducts(): UseUMKMProductsReturn {
  const [products, setProducts] = useState<UMKMProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Get products with filters
  const getProducts = useCallback(
    async (
      umkmId: string,
      filters?: UMKMProductFilters
    ): Promise<PaginatedResponse<UMKMProduct>> => {
      try {
        setLoading(true);
        console.log('=== useUMKMProducts getProducts ===');
        console.log('umkmId:', umkmId);
        console.log('filters:', filters);

        const response = await UMKMProductsService.getProducts(umkmId, filters);
        console.log('API response:', response);

        // Handle both paginated and direct response formats
        const productsData = response.data || [];
        const metaData = response.pagination || {};

        console.log('productsData:', productsData);
        console.log('metaData:', metaData);

        setProducts(productsData);
        setTotalProducts(metaData.total || productsData.length || 0);
        setPagination({
          page: metaData.page || 1,
          limit: metaData.limit || 10,
          total: metaData.total || productsData.length || 0,
          totalPages:
            metaData.pages ||
            Math.ceil((metaData.total || productsData.length || 0) / (metaData.limit || 10)),
        });

        console.log('Updated products state:', productsData);
        console.log('Products count:', productsData.length);

        return response;
      } catch (error) {
        console.error('Error fetching products:', error);
        // Set empty data on error
        setProducts([]);
        setTotalProducts(0);
        setPagination({
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get single product
  const getProduct = useCallback(
    async (umkmId: string, productId: string): Promise<UMKMProduct> => {
      try {
        setLoading(true);
        return await UMKMProductsService.getProduct(umkmId, productId);
      } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Create new product
  const createProduct = useCallback(
    async (
      umkmId: string,
      productData: CreateUMKMProductData,
      imageFile?: File
    ): Promise<UMKMProduct> => {
      try {
        setSubmitting(true);
        const newProduct = await UMKMProductsService.createProduct(umkmId, productData, imageFile);

        // Update local state
        setProducts((prev) => [newProduct, ...prev]);
        setTotalProducts((prev) => prev + 1);

        return newProduct;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Update existing product
  const updateProduct = useCallback(
    async (
      umkmId: string,
      productId: string,
      productData: Partial<CreateUMKMProductData>,
      imageFile?: File
    ): Promise<UMKMProduct> => {
      try {
        setSubmitting(true);
        const updatedProduct = await UMKMProductsService.updateProduct(
          umkmId,
          productId,
          productData,
          imageFile
        );

        // Update local state
        setProducts((prev) =>
          prev.map((product) => (product.id === productId ? updatedProduct : product))
        );

        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Delete product
  const deleteProduct = useCallback(async (umkmId: string, productId: string): Promise<void> => {
    try {
      setSubmitting(true);
      await UMKMProductsService.deleteProduct(umkmId, productId);

      // Update local state
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      setTotalProducts((prev) => prev - 1);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }, []);

  // Toggle product availability
  const toggleAvailability = useCallback(
    async (umkmId: string, productId: string, isAvailable: boolean): Promise<UMKMProduct> => {
      try {
        setSubmitting(true);
        const updatedProduct = await UMKMProductsService.toggleAvailability(
          umkmId,
          productId,
          isAvailable
        );

        // Update local state
        setProducts((prev) =>
          prev.map((product) => (product.id === productId ? updatedProduct : product))
        );

        return updatedProduct;
      } catch (error) {
        console.error('Error toggling product availability:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Toggle bestseller status
  const toggleBestseller = useCallback(
    async (umkmId: string, productId: string, isBestseller: boolean): Promise<UMKMProduct> => {
      try {
        setSubmitting(true);
        const updatedProduct = await UMKMProductsService.toggleBestseller(
          umkmId,
          productId,
          isBestseller
        );

        // Update local state
        setProducts((prev) =>
          prev.map((product) => (product.id === productId ? updatedProduct : product))
        );

        return updatedProduct;
      } catch (error) {
        console.error('Error toggling product bestseller status:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Upload product image
  const uploadProductImage = useCallback(
    async (umkmId: string, productId: string, file: File): Promise<{ imageUrl: string }> => {
      try {
        setSubmitting(true);
        const result = await UMKMProductsService.uploadProductImage(umkmId, productId, file);

        // Update local state with new image URL
        setProducts((prev) =>
          prev.map((product) =>
            product.id === productId ? { ...product, imageUrl: result.imageUrl } : product
          )
        );

        return result;
      } catch (error) {
        console.error('Error uploading product image:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Get product categories
  const getProductCategories = useCallback(async (): Promise<string[]> => {
    try {
      return await UMKMProductsService.getProductCategories();
    } catch (error) {
      console.error('Error fetching product categories:', error);
      throw error;
    }
  }, []);

  // Get products statistics
  const getProductsStatistics = useCallback(async (umkmId: string) => {
    try {
      return await UMKMProductsService.getProductsStatistics(umkmId);
    } catch (error) {
      console.error('Error fetching products statistics:', error);
      throw error;
    }
  }, []);

  // Bulk update products
  const bulkUpdateProducts = useCallback(
    async (
      umkmId: string,
      updates: Array<{
        id: string;
        isAvailable?: boolean;
        isBestseller?: boolean;
        category?: string;
      }>
    ): Promise<UMKMProduct[]> => {
      try {
        setSubmitting(true);
        const updatedProducts = await UMKMProductsService.bulkUpdateProducts(umkmId, updates);

        // Update local state
        setProducts((prev) => {
          const updatedMap = new Map(updatedProducts.map((p) => [p.id, p]));
          return prev.map((product) => updatedMap.get(product.id) || product);
        });

        return updatedProducts;
      } catch (error) {
        console.error('Error bulk updating products:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  // Bulk delete products
  const bulkDeleteProducts = useCallback(
    async (umkmId: string, productIds: string[]): Promise<void> => {
      try {
        setSubmitting(true);
        await UMKMProductsService.bulkDeleteProducts(umkmId, productIds);

        // Update local state
        setProducts((prev) => prev.filter((product) => !productIds.includes(product.id)));
        setTotalProducts((prev) => prev - productIds.length);
      } catch (error) {
        console.error('Error bulk deleting products:', error);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  return {
    // Data
    products,
    totalProducts,
    pagination,

    // Loading states
    loading,
    submitting,

    // Functions
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    toggleAvailability,
    toggleBestseller,
    uploadProductImage,
    getProductCategories,
    getProductsStatistics,
    bulkUpdateProducts,
    bulkDeleteProducts,
  };
}

export default useUMKMProducts;
