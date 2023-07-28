import ControlledBRLFormat from '@/components/BRLFormat/ControlledBRLFormat';
import FullInput from '@/components/FullInput/FullInput';
import { ReactNode, useEffect, useState } from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
// eslint-disable-next-line import/named
import { NumberFormatValues } from 'react-number-format';

import { AccountForm } from '../AccountModal';
import styles from './Inputs.module.css';

interface IInputsProps {
  form: UseFormReturn<AccountForm>;
  data: Partial<AccountForm> | undefined;
  inputNameLabel?: string;
  inputInitialAmountLabel?: string;
  inputTotalAmountLabel?: string;
  inputTotalAmountVisible?: boolean;
  inputImageURLLabel?: string;
}

type Input = {
  name: string;
  required?: boolean;
  type?: string;
  id: string;
  placeholder?: string;
  labelValue?: string;
  max?: string | number;
  min?: string | number;
  maxLength?: number;
  inputElement?: {
    element: (props: any) => ReactNode;
    className?: string;
    onValueChangeExec?: ((values: NumberFormatValues) => any) | undefined;
  };
  shouldAppear?: (() => boolean) | boolean;
};

export default function Inputs({
  form: {
    formState: { errors },
    register,
    control,
    setValue,
    watch,
  },
  data,
  inputNameLabel,
  inputInitialAmountLabel,
  inputTotalAmountLabel,
  inputTotalAmountVisible,
  inputImageURLLabel,
}: IInputsProps) {
  const [
    differenceBetweenTotalAmountAndInitialAmount,
    setDifferenceBetweenTotalAmountAndInitialAmount,
  ] = useState(0);

  const inputs: Input[] = [
    {
      id: 'account-name',
      labelValue: inputNameLabel,
      name: 'name',
      type: 'text',
      placeholder: 'Ex: Banco do Brasil',
      required: true,
    },
    {
      id: 'initial-account-amount',
      labelValue: inputInitialAmountLabel,
      name: 'initialAmount',
      placeholder: 'R$ 0,00',
      required: true,
      max: 1000000000000,
      min: -1000000000000,
      maxLength: 24,
      inputElement: {
        element: ControlledBRLFormat,
        className: styles.brlInput,
        onValueChangeExec: onInitialAmountChange,
      },
    },
    {
      shouldAppear: () => !!inputTotalAmountVisible,
      id: 'total-account-amount',
      labelValue: inputTotalAmountLabel,
      name: 'totalAmount',
      placeholder: 'R$ 0,00',
      required: true,
      max: 1000000000000,
      min: -1000000000000,
      maxLength: 24,
      inputElement: {
        element: ControlledBRLFormat,
        className: styles.brlInput,
        onValueChangeExec: onTotalAmountChange,
      },
    },
    {
      id: 'account-imageURL',
      labelValue: inputImageURLLabel,
      name: 'imageURL',
      type: 'text',
    },
  ];

  // On first rendering
  useEffect(() => {
    const formData = watch();
    setDifferenceBetweenTotalAmountAndInitialAmount(
      formData.totalAmount - formData.initialAmount,
    );
  }, []);

  return (
    <>
      {inputs.map(
        (input) =>
          (typeof input.shouldAppear === 'function'
            ? input.shouldAppear()
            : input.shouldAppear ?? true) && (
            <FullInput
              key={input.id}
              {...(!input.inputElement ? register(input.name as Path<AccountForm>) : {})}
              errors={errors}
              name={input.name}
              required={input.required}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              label
              labelValue={input.labelValue}
              wrapperClassName={styles.inputWrapper}
              containerClassName={styles.inputContainer}
              className={styles.input}
              max={input.max}
              min={input.min}
              maxLength={input.maxLength}
              inputElement={
                input.inputElement &&
                (({ ...props }) =>
                  input.inputElement!.element({
                    ...props,
                    className: input.inputElement!.className,
                    control,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    max: input.max,
                    min: input.min,
                    maxLength: input.maxLength,
                    onValueChangeExec: input.inputElement!.onValueChangeExec,
                  }))
              }
            />
          ),
      )}
    </>
  );

  // ---------- Functions ----------

  function onInitialAmountChange(values: NumberFormatValues) {
    if (inputTotalAmountVisible)
      setValue(
        'totalAmount',
        values.floatValue! + differenceBetweenTotalAmountAndInitialAmount,
      );
    else setValue('totalAmount', values.floatValue!);
  }

  function onTotalAmountChange(values: NumberFormatValues) {
    if (values.floatValue && data?.initialAmount !== undefined)
      setDifferenceBetweenTotalAmountAndInitialAmount(
        values.floatValue - (isNaN(data.initialAmount) ? 0 : data.initialAmount),
      );
  }
}
