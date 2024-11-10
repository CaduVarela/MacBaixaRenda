import { fullNameRegex } from '@component/utils/constants';
import * as Yup from 'yup';

export const formUser = Yup.object().shape({
  celular: Yup.string().min(15, 'Celular inválido').required('Celular inválido'),
  name: Yup.string().required("O campo 'Nome' é obrigatório").matches(fullNameRegex, 'O campo "Nome" deve conter nome e sobrenome'),
});

export const formAddress = Yup.object().shape({
    number: Yup.string().min(1, 'Número iválido').required("O campo 'Número' é obrigatório"),
    street: Yup.string().required("O campo 'Rua' é obrigatório"),
    neighborhood: Yup.string().required("O campo 'Bairro' é obrigatório"),
    state: Yup.string().required("O campo 'Estado' é obrigatório"),
    city: Yup.string().required("O campo 'Cidade' é obrigatório"),
    cep: Yup.string().required('O campo "CEP" é obrigatório'),
  });