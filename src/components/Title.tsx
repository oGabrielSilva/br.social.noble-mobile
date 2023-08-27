import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { Text, TextProps } from 'react-native';

interface TitleProps extends TextProps {
  titleType?: 'large' | 'normal' | 'small';
}

export function Title({ style, titleType = 'large', ...props }: TitleProps) {
  const { design } = useContext(GlobalContext);
  return (
    <Text
      style={[
        {
          fontSize: titleType === 'large' ? 34 : titleType === 'normal' ? 28 : 22,
          fontWeight: 'bold',
          color: design.title,
        },
        style,
      ]}
      {...props}
    />
  );
}
