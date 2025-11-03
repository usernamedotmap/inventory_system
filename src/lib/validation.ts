import z from 'zod';
import { FruitFormValues } from '../pages/Fruits/FruitsForm';

export const SignupValidation = z.object({
  username: z.string().trim().max(250).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, "password must be at least 6 characters long"),
});

export const SigninValidation  = z.object({
username: z.string().trim().max(250).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, "password must be at least 6 characters long"),
})

export const InventorySchema = z.object({
  quantity: z.number().min(0),
  spoilageQuantity: z.number().min(0).optional(),
  expirationDate: z.date().optional(),
  warehouseLocation: z.string().min(1),
  restockThreshold: z.number().min(0),
});

export const InventoryAddSchema =z.object({
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().min(0),
  spoilageQuantity: z.number().min(0).optional(),
  expirationDate: z.date().optional(),
  warehouseLocation: z.string().min(1),
  restockThreshold: z.number().min(0),
});


export const FruitsSchema = z.object({
  name: z.string().min(3),
  unit: z.enum(["PIECE", "KG", "BUNDLE", "BOX"]),
 price: z.number().min(0),
  createdAt: z.string(),
  available: z.boolean()
}) 

