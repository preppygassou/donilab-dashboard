import { passwordRegex } from "@/utils/regex";
import * as z from "zod";
//import { UserRole } from "@prisma/client";

export const SettingsSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  organizations: z.array(z.number()).optional(), // 
})


export const NewTerritorySchema = z.object({
  name: z.string().min(4, { message: 'O nome deve ter pelo menos 4 caracteres' }),
  cnuc: z.string().optional(), // Start as optional
  general_code: z.string().optional(),
  territory_type: z.number(),
  geocode_uf: z.array(z.number()).optional(),
  sphere: z.array(z.number()).optional(),
  group: z.array(z.number()).optional(),
  biome: z.array(z.number()).optional(),
  category: z.array(z.number()).optional(),
}).refine((data) => {
  if (data.territory_type === 1) {
     // Remove non-numeric characters before checking the length
     const rawCnuc = data.cnuc?.replace(/\D/g, ''); // Strip out anything that's not a digit
     return rawCnuc && rawCnuc.length === 10;
  }
  // If territory_type is not 1, cnuc can be optional and doesn't require validation
  return true;
}, {
  message: 'O código CNUC deve ter exatamente 10 caracteres',
  path: ['cnuc'],
});


  
export const NewPasswordSchema = z.object({
  token: z.string(),
  password: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
    .regex(passwordRegex, "Sua senha deve conter combinação de letras maiúsculas e minúsculas, números e símbolos especiais.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Não devem ser senhas com sequências comuns como '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Esta senha não é semelhante a inserida campo anterior. ",
  path: ["confirmPassword"],
});

export const ChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
    .regex(passwordRegex, "Sua senha deve conter combinação de letras maiúsculas e minúsculas, números e símbolos especiais.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Não devem ser senhas com sequências comuns como '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Esta senha não é semelhante a inserida campo anterior. ",
  path: ["confirmPassword"],
});

export const DeleteAccountSchema = z.object({
  password: z.string(),
  acepted: z.boolean(),
});

export const CreateNewFormSchema = z.object({
  form_type: z.string(),
  territory: z.any(),
  user_id: z.any().optional(),
  name: z.string(),
  description: z.string().optional(),
});
export const UpdateFormSchema = z.object({
  form_type: z.string(),
  territory: z.any(),
  form: z.any(),
  user_id: z.any().optional(),
  name: z.string(),
  description: z.string().optional(),
});
export const TerritoryApointmentCorrectionFormSchema = z.object({
  note: z.string(),
  territory_id:z.any(),
});
export const DeleteFormSchema = z.object({
  form_type: z.string(),
  form_id: z.any().optional(),

});

export const ResetSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail requerida",
  }).email({
    message: "Seu e-mail não foi digitado corretamente.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail requerida",
  }).email({
    message: "Seu e-mail não foi digitado corretamente.",
  }),
  password: z.string().min(1, {
    message: "Senha requerida",
  }),
});

const organizationDetailsSchema = z.object({
  name: z.string().min(1, "Nome organização requerida"),
  type_id: z.string().min(1, "Nenhum item foi selecionado."),
  acronym: z.string().optional(),
});

export const RegisterSchema = z.object({
  name: z.string().min(2,"Seu nome não foi digitado corretamente."),
  email: z.string().min(1, {
    message: "E-mail requerida",
  }).email({
    message: "Seu e-mail não foi digitado corretamente.",
  }),
  phone: z.string()
  .optional().refine((val) => {
    if (!val) return true; // If value is empty, it's valid (optional field)
    
    // Remove all non-digit characters
    const cleaned = val.replace(/\D/g, '');

    // Regular expression for validating Brazilian phone numbers
    const landlinePattern = /^(\d{2})(\d{4})(\d{4})$/; // (XX) XXXX-XXXX
    const mobilePattern = /^(\d{2})(9\d{4})(\d{4})$/;  // (XX) 9XXXX-XXXX

    return landlinePattern.test(cleaned) || mobilePattern.test(cleaned);
  }, {
    message: "Insira um número de telefone válido no formato (XX) XXXXX-XX",
  }),
  /* .refine((num) => num === undefined || /^\+?[1-9]\d{1,14}$/.test(num), {
    message: "Seu celular não foi digitado corretamente.",
  }), */
  organization: organizationDetailsSchema.optional()
  .optional(),
  invitationcode: z.string()
  .optional(),
  politics: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
  claimOtp: z.boolean().optional(),
  organizations: z.array(z.number()).optional(),
  password: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
    .regex(passwordRegex, "Sua senha deve conter combinação de letras maiúsculas e minúsculas, números e símbolos especiais.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Não devem ser senhas com sequências comuns como '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Sua senha deve conter pelo menos 8 caracteres.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Esta senha não é semelhante a inserida no campo anterior.",
  path: ["confirmPassword"],
}).refine(data => data.organization || (data.organizations && data.organizations.length > 0), {
  message: "Pelo menos uma organização ou seleção de organizações é necessária, Ou clique em 'Outra organização' na parte inferior para criar uma nova, caso não tenha encontrado sua organização na lista",
  path: ["organizations"], // This path is indicative; adjust based on actual validation needs
});
