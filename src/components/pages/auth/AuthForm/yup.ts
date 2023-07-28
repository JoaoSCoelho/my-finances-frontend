import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .required('Campo obrigatório')
  .email('Email inválido')
  .max(128, 'Máximo de 128 caracteres')
  .matches(/^[^@]+@[^@]+$/g, 'Deve possuir apenas um arroba "@"')
  .matches(
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@/gi,
    'Antes do "@" apenas letras, números e alguns caracteres especiais',
  )
  .matches(
    /@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
    'Depois do "@" apenas caracteres alfanuméricos, hífens e um ponto "." separador do TLD',
  )
  .matches(
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
    'Estrutura incorreta',
  );

export const passwordSchema = yup
  .string()
  .required('Campo obrigatório')
  .min(6, 'Mínimo de 6 caracteres')
  .max(100, 'Máximo de 100 caracteres')
  .matches(/[a-zÀ-ÿ]+/gi, 'Deve ter pelo menos uma letra')
  .matches(/\d+/g, 'Deve ter pelo menos um número');

export const usernameSchema = yup
  .string()
  .required('Campo obrigatório')
  .min(3, 'Mínimo de 3 caracteres')
  .max(30, 'Máximo de 30 caracteres')
  .matches(
    /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
    'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
  );

export const loginSchema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

export const registerSchema = yup
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .required();
