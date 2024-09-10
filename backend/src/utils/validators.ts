import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido!').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória')
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido!').required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória')
});