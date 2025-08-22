import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { getStateByCode } from '~/lib/auth/register/curp-utils';
import type { RegisterForm } from '~/lib/auth/register/types';

export function extractBirthDateFromCurp(curp: string): Date | null {
  if (curp.length !== 18) return null;

  const yearStr = curp.substring(4, 6);
  const monthStr = curp.substring(6, 8);
  const dayStr = curp.substring(8, 10);

  let year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  year += year >= 30 ? 1900 : 2000;

  const birthDate = new Date(year, month, day);
  return birthDate.getFullYear() === year &&
    birthDate.getMonth() === month &&
    birthDate.getDate() === day
    ? birthDate
    : null;
}

export function extractBirthPlaceFromCurp(curp: string): string {
  if (curp.length !== 18) return '';

  const stateCode = curp.substring(11, 13).toUpperCase();
  const state = getStateByCode(stateCode);

  return state ? state.name : '';
}

export function extractGenderFromCurp(curp: string): 'hombre' | 'mujer' | '' {
  if (curp.length !== 18) return '';

  const genderChar = curp.charAt(10).toUpperCase();
  return genderChar === 'H' ? 'hombre' : genderChar === 'M' ? 'mujer' : '';
}

export const useCurpStep = () => {
  const form = useFormContext<RegisterForm>();

  const handleCurpSearch = useCallback(
    async (curp: string) => {
      try {
        if (curp.length !== 18)
          throw new Error('CURP debe tener 18 caracteres');

        const birthPlace = extractBirthPlaceFromCurp(curp);
        const birthDate = extractBirthDateFromCurp(curp);
        const gender = extractGenderFromCurp(curp);

        if (birthPlace) {
          form.setValue('profile.birthplace', birthPlace, {
            shouldValidate: true,
          });
        }

        if (birthDate) {
          const isoDate = birthDate.toISOString().split('T')[0];
          form.setValue('profile.birthdate', isoDate, { shouldValidate: true });
        }

        if (gender) {
          form.setValue('profile.gender', gender, { shouldValidate: true });
        } else {
          form.setValue('profile.gender', '', { shouldValidate: true });
        }

        form.clearErrors('profile.username');
      } catch (error) {
        form.setError('profile.username', {
          message:
            error instanceof Error ? error.message : 'Error al validar CURP',
        });
        form.setValue('profile.birthdate', '', { shouldValidate: true });
        form.setValue('profile.birthplace', '', { shouldValidate: true });
        form.setValue('profile.gender', '', { shouldValidate: true });
      }
    },
    [form]
  );

  const onSubmit = form.handleSubmit(async (data) => {
    try {
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'Error al guardar los datos',
      });
    }
  });

  return {
    form,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
    handleCurpSearch,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
  };
};

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
