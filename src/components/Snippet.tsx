import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { Text, TextProps } from 'react-native';

interface ExtendedTextProps extends TextProps {
  snippetType?:
    | 'normal'
    | 'alert'
    | 'small-alert'
    | 'error'
    | 'small-error'
    | 'link'
    | 'small-link';
}

export function Snippet({ style, snippetType = 'normal', ...props }: ExtendedTextProps) {
  const { design } = useContext(GlobalContext);
  return (
    <Text
      style={[
        {
          fontSize: 16,
          color: design.text,
          ...(snippetType === 'small-alert'
            ? {
                color: design.warning,
                fontSize: 12,
              }
            : {}),
          ...(snippetType === 'link'
            ? {
                color: design.link,
                fontSize: 16,
                textDecorationLine: 'underline',
              }
            : {}),
          ...(snippetType === 'small-link'
            ? {
                color: design.link,
                fontSize: 12,
                textDecorationLine: 'underline',
              }
            : {}),
        },
        style,
      ]}
      {...props}
    />
  );
}
