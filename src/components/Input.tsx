import { forwardRef, useContext, useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { GlobalContext } from '@Noble/contexts/GlobalContext';

interface ExtendedTextInputProps extends TextInputProps {
  typoValidation: (value: string) => boolean;
  iconName?: string;
}

export const Input = forwardRef<TextInput, ExtendedTextInputProps>(
  ({ style, iconName, typoValidation, ...props }, ref) => {
    const { design } = useContext(GlobalContext);
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);

    return (
      <View style={styles.view}>
        <TextInput
          value={value}
          ref={ref}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholderTextColor={design.textPlaceholder}
          onChangeText={t => {
            setValue(t);
            if (typoValidation(t)) setError(false);
            else setError(true);
          }}
          style={[
            {
              color: design.text,
              borderColor: design.secondary,
              ...(focused
                ? {
                    backgroundColor: design.secondary,
                    borderColor: design.variant,
                  }
                : {}),
              ...(iconName ? { paddingEnd: 12 + 22 } : { paddingEnd: 16 }),
              ...(error ? { color: design.danger, borderColor: design.danger } : {}),
            },
            styles.input,
            style,
          ]}
          {...props}
        />
        {iconName ? (
          <MaterialIcons
            style={styles.icon}
            name={iconName as never}
            size={20}
            color={design.text}
          />
        ) : (
          <></>
        )}
      </View>
    );
  },
);

export const PasswordInput = forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => {
  const { design } = useContext(GlobalContext);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);

  return (
    <View style={styles.view}>
      <TextInput
        secureTextEntry={!visible}
        ref={ref}
        placeholderTextColor={design.textPlaceholder}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        value={value}
        onChangeText={t => {
          setValue(t);
          if (t.length >= 8) setError(false);
          else setError(true);
        }}
        style={[
          styles.input,
          {
            color: design.text,
            borderColor: design.secondary,
            paddingEnd: 12 + 22,
            ...(focused
              ? {
                  backgroundColor: design.secondary,
                  borderColor: design.variant,
                }
              : {}),
            ...(error ? { color: design.danger, borderColor: design.danger } : {}),
          },
          style,
        ]}
        {...props}
      />
      <TouchableOpacity style={styles.passwordButton} onPress={() => setVisible(v => !v)}>
        <MaterialIcons
          name={visible ? 'visibility-off' : 'visibility'}
          size={20}
          color={design.text}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  view: { position: 'relative' },
  input: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingStart: 16,
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    marginEnd: 8,
    right: 0,
    transform: [{ translateY: -10 }],
  },
  passwordButton: {
    padding: 4,
    position: 'absolute',
    top: '50%',
    marginEnd: 8,
    right: 0,
    transform: [{ translateY: -14 }],
  },
});
