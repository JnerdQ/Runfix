import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { errorToast, notValidToast, succesToast } from '../../utils/Toast';
import { isCcValid } from '../../utils/ValueChecks';
import { API_AUTH_REGISTER, API_EMPLOYEE } from 'src/api/api';

//                TOAST PARAMETERS
//Warning messages
const ALREADY_USER = 'Cédula ya registrada en el sistema';
const USER_UPDATED = 'El usuario ha sido actualizado';
const ALREADY_EMAIL = 'E-mail ya registrado en el sistema';
const ALREADY_PHONE = 'Número de telefono ya registrado en el sitema';

const RegistroEmpleados: React.FC = () => {
  const [userError, setUserError] = useState<string>('');

  const location = useLocation();

  const empleadoParaEditar = location.state?.filtrado;

  const { fullName, cc, age, position, phone, email } =
    empleadoParaEditar || {};

  const validationSchema = Yup.object({
    nombre: Yup.string().required('Requerido'),
    apellido: Yup.string().required('Requerido'),
    cedula: Yup.string().required('Requerido'),
    edad: Yup.string().required('Requerido'),
    rol: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string().required('Requerido'),
  });

  const formik = useFormik({
    initialValues: {
      nombre: fullName ? fullName.split(' ')[0] : '',
      apellido: fullName ? fullName.split(' ')[1] : '',
      cedula: cc || '',
      edad: age || '',
      rol: position || '',
      telefono: phone || '',
      email: email || '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setUserError('');

      try {
        const method = empleadoParaEditar ? 'put' : 'post';
        const url = empleadoParaEditar
          ? `${API_EMPLOYEE}/${empleadoParaEditar.cc}`
          : `${API_AUTH_REGISTER}`;

        let isValid = true;
        if (!isCcValid(values.cedula)) {
          notValidToast('Cedula');
          isValid = false;
        } else if (!isCcValid(values.telefono)) {
          notValidToast('Telefono');
          isValid = false;
        } else if (!isCcValid(values.edad)) {
          notValidToast('Edad');
          isValid = false;
        }

        //if cc, phone and age are valid
        if (isValid) {
          await axios[method](url, {
            cc: values.cedula,
            fullName: `${values.nombre.trim()} ${values.apellido.trim()}`,
            age: values.edad,
            position: values.rol,
            email: values.email.trim(),
            phone: values.telefono,
            password: values.password,
          });
          formik.resetForm();
          succesToast('Empleado registrado con éxito');
        }
        //navegar('/table_employee');
      } catch (error: any) {
        //Warnings from back-end
        switch (error.response.data.message) {
          case 'ALREADY_USER':
            setUserError(ALREADY_USER);
            errorToast(ALREADY_USER);
            break;
          case 'USER_UPDATED':
            succesToast(USER_UPDATED);
            break;
          case 'ALREADY_EMAIL':
            setUserError(ALREADY_EMAIL);
            errorToast(ALREADY_EMAIL);
            break;
          case 'ALREADY_PHONE':
            setUserError(ALREADY_PHONE);
            errorToast(ALREADY_PHONE);
            break;
        }
        console.error('Error al enviar la solicitud:', error);
      }
    },
  });

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen min-w-max bg-gray-50">
        <h2 className="text-4xl font-bold mb-8 text-slate-800">
          Registro de empleados
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-3xl shadow-2xl text-base w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {['nombre', 'apellido', 'cedula', 'edad', 'telefono'].map((field) => (
            <div className="mb-4" key={field}>
              <label
                className="block text-sm font-medium text-gray-50"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="mt-1 p-2 w-full rounded-md border"
                type="text"
                id={field}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                disabled={
                  field === 'cedula' && empleadoParaEditar ? true : false
                }
              />
            </div>
          ))}

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="rol"
            >
              Rol
            </label>
            <select
              className="mt-1 p-2 w-full rounded-md border"
              id="rol"
              name="rol"
              value={formik.values.rol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="" label="Selecciona un rol" />
              <option value="Empleado">Empleado</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 p-2 w-full rounded-md border"
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              className="block text-sm font-medium text-gray-50"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="mt-1 p-2 w-full rounded-md border"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <h1 className="text-center text-red-600">{userError}</h1>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-2xl"
            >
              Registrar empleado
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistroEmpleados;
