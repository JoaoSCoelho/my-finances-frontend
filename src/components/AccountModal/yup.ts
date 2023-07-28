import * as yup from 'yup';

export const accountSchema = yup
  .object({
    name: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(30, 'Máximo de 30 caracteres')
      .matches(
        /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
        'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
      ),
    totalAmount: yup
      .number()
      .required('Campo obrigatório')
      .min(-999999999999, 'Mínimo: -1 trilhão')
      .max(999999999999, 'Máximo: 1 trilhão'),
    initialAmount: yup
      .number()
      .required('Campo obrigatório')
      .min(-999999999999, 'Mínimo: -1 trilhão')
      .max(999999999999, 'Máximo: 1 trilhão'),
    imageURL: yup
      .string()
      .matches(/^((http)|(https)):\/\/.+\..+(\/.+)?$/gi, {
        excludeEmptyString: true,
        message: 'URL inválida',
      })
      .notRequired(),
  })
  .required();
