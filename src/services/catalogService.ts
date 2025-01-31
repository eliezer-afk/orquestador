import axios from 'axios';

class CatalogService {
    saveOrder(order: any) {
        throw new Error('Method not implemented.');
    }
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://catalog-service/api';
    }

    async getCatalogItems() {
        try {
            const response = await axios.get(`${this.baseUrl}/items`);
            return response.data;
        } catch (error) {
            console.error('Error fetching catalog items:', error);
            throw error;
        }
    }

    async getCatalogItemById(itemId: string) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/${itemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching catalog item with ID ${itemId}:`, error);
            throw error;
        }
    }

    async createCatalogItem(itemData: any) {
        try {
            const response = await axios.post(`${this.baseUrl}/items`, itemData);
            return response.data;
        } catch (error) {
            console.error('Error creating catalog item:', error);
            throw error;
        }
    }

    async updateCatalogItem(itemId: string, itemData: any) {
        try {
            const response = await axios.put(`${this.baseUrl}/items/${itemId}`, itemData);
            return response.data;
        } catch (error) {
            console.error(`Error updating catalog item with ID ${itemId}:`, error);
            throw error;
        }
    }

    async deleteCatalogItem(itemId: string) {
        try {
            const response = await axios.delete(`${this.baseUrl}/items/${itemId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting catalog item with ID ${itemId}:`, error);
            throw error;
        }
    }
}

export default new CatalogService();