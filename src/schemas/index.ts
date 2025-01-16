import { passwordRegex } from "@/utils/regex";
import * as z from "zod";
//import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(["ADMIN", "USER"]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Nouveau mot de passe requis!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Mot de passe requis!",
      path: ["password"],
    }
  );


export const NewTerritorySchema = z.object({
  name: z.string().min(4, { message: 'Le nom doit comporter au moins 4 caractères' }),
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
  message: 'Le code CNUC doit comporter exactement 10 caractères',
  path: ['cnuc'],
});


  
export const NewPasswordSchema = z.object({
  token: z.string(),
  password: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
    .regex(passwordRegex, "Votre mot de passe doit contenir une combinaison de lettres majuscules et minuscules, de chiffres et de symboles spéciaux.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Ne doivent pas être des mots de passe avec des séquences courantes comme '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Ce mot de passe n'est pas similaire à celui saisi dans le champ précédent.",
  path: ["confirmPassword"],
});

export const ChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
    .regex(passwordRegex, "Votre mot de passe doit contenir une combinaison de lettres majuscules et minuscules, de chiffres et de symboles spéciaux.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Ne doivent pas être des mots de passe avec des séquences courantes comme '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Ce mot de passe n'est pas similaire à celui saisi dans le champ précédent.",
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
    message: "E-mail requis",
  }).email({
    message: "Votre e-mail n'a pas été saisi correctement.",
  }),
});

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "E-mail requis",
  }).email({
    message: "Votre e-mail n'a pas été saisi correctement.",
  }),
  password: z.string().min(1, {
    message: "Mot de passe requis",
  }),
});

const organizationDetailsSchema = z.object({
  name: z.string().min(1, "Nom de l'organisation requis"),
  type_id: z.string().min(1, "Aucun élément n'a été sélectionné."),
  acronym: z.string().optional(),
});

export const RegisterSchema = z.object({
  name: z.string().min(2,"Votre nom n'a pas été saisi correctement."),
  email: z.string().min(1, {
    message: "E-mail requis",
  }).email({
    message: "Votre e-mail n'a pas été saisi correctement.",
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
    message: "Veuillez entrer un numéro de téléphone valide au format (XX) XXXXX-XX",
  }),
  /* .refine((num) => num === undefined || /^\+?[1-9]\d{1,14}$/.test(num), {
    message: "Votre téléphone n'a pas été saisi correctement.",
  }), */
  organization: organizationDetailsSchema.optional()
  .optional(),
  invitationcode: z.string()
  .optional(),
  politics: z.boolean().refine(val => val === true, "Vous devez accepter les termes"),
  claimOtp: z.boolean().optional(),
  organizations: z.array(z.number()).optional(),
  password: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
    .regex(passwordRegex, "Votre mot de passe doit contenir une combinaison de lettres majuscules et minuscules, de chiffres et de symboles spéciaux.")
    .refine(pwd => !(pwd.includes("123456") || pwd.includes("abcdef")), {
      message: "Ne doivent pas être des mots de passe avec des séquences courantes comme '123456' ou 'abcdef'.",
    }),
  confirmPassword: z.string()
    .min(8, "Votre mot de passe doit contenir au moins 8 caractères.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Ce mot de passe n'est pas similaire à celui saisi dans le champ précédent.",
  path: ["confirmPassword"],
}).refine(data => data.organization || (data.organizations && data.organizations.length > 0), {
  message: "Au moins une organisation ou une sélection d'organisations est nécessaire, ou cliquez sur 'Autre organisation' en bas pour en créer une nouvelle si vous n'avez pas trouvé votre organisation dans la liste",
  path: ["organizations"], // This path is indicative; adjust based on actual validation needs
});
