import { create } from 'zustand';
import { initDatabase } from '../database/schema';

interface ImageStore {
  images: Record<string, string>; // exercise_id -> base64
  loading: boolean;
  loadImages: () => Promise<void>;
  getImage: (exerciseId: string) => string | undefined;
  saveImage: (exerciseId: string, base64: string) => Promise<void>;
  deleteImage: (exerciseId: string) => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: {},
  loading: false,

  loadImages: async () => {
    set({ loading: true });
    try {
      const db = await initDatabase();
      const all = await db.getAll('exercise_images');
      const images: Record<string, string> = {};
      for (const row of all) {
        images[row.exercise_id] = row.image_data;
      }
      set({ images, loading: false });
    } catch (error) {
      console.error('Error loading images:', error);
      set({ loading: false });
    }
  },

  getImage: (exerciseId) => {
    return get().images[exerciseId];
  },

  saveImage: async (exerciseId, base64) => {
    try {
      const db = await initDatabase();
      await db.put('exercise_images', {
        exercise_id: exerciseId,
        image_data: base64,
        updated_at: new Date().toISOString(),
      });
      set({ images: { ...get().images, [exerciseId]: base64 } });
    } catch (error) {
      console.error('Error saving image:', error);
    }
  },

  deleteImage: async (exerciseId) => {
    try {
      const db = await initDatabase();
      await db.delete('exercise_images', exerciseId);
      const newImages = { ...get().images };
      delete newImages[exerciseId];
      set({ images: newImages });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  },
}));
