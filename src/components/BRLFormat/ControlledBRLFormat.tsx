import { Control, Controller } from 'react-hook-form';
// eslint-disable-next-line import/named
import { NumberFormatValues } from 'react-number-format';

import BRLFormat, { IBRLFormatProps } from './BRLFormat';

interface IControlledBRLFormatProps extends IBRLFormatProps {
  control: Control;
  name: string;
  onValueChangeExec?: (values: NumberFormatValues) => any;
}

export default function ControlledBRLFormat({
  control,
  onValueChangeExec,
  ...props
}: IControlledBRLFormatProps) {
  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <BRLFormat
          value={value}
          onValueChange={(values) => {
            onChange(values.floatValue || NaN);
            onValueChangeExec?.(values);
          }}
          type="text"
          displayType="input"
          placeholder="R$ 0,00"
          {...props}
        />
      )}
    />
  );
}
