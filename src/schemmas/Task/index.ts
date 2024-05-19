import { z } from "zod";

export const schemmaRegisterTask = z.object({
    title: z.string().min(4, 'Minimo de 4 caracteres.'),
    description: z.string().min(4, 'Minimo de 4 caracteres.')
  })