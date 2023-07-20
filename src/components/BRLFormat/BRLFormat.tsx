// eslint-disable-next-line import/named
import { NumericFormat, NumericFormatProps } from 'react-number-format';

export type IBRLFormatProps = NumericFormatProps;

export default function BRLFormat({ ...props }: IBRLFormatProps) {
  return (
    <NumericFormat
      fixedDecimalScale={true}
      prefix="R$ "
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      displayType="text"
      {...props}
    />
  );
}
