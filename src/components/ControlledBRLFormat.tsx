import { Control, Controller } from 'react-hook-form';

import BRLFormat, { IBRLFormatProps } from './BRLFormat';

interface IControlledBRLFormatProps extends IBRLFormatProps {
  control: Control;
  name: string;
}

export default function ControlledBRLFormat(props: IControlledBRLFormatProps) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <BRLFormat
          value={value}
          onValueChange={(values) => onChange(values.floatValue)}
          type="text"
          displayType="input"
          placeholder="R$ 0,00"
          {...props}
        />
      )}
    />
  );
}
