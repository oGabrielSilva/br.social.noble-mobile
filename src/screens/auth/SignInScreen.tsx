import { Backdrop } from '@Noble/components/Backdrop';
import { Button } from '@Noble/components/Button';
import { Input, PasswordInput } from '@Noble/components/Input';
import { Snippet } from '@Noble/components/Snippet';
import { Title } from '@Noble/components/Title';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { RootStackParamList } from '@Noble/routes/LoggedOutRouteHandler';
import { emailIsValid } from '@Noble/utils/validation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Platform,
  TextInput,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

export function SignInScreen({ navigation }: Props) {
  const { design, strings } = useContext(GlobalContext);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Backdrop>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.container,
            keyboardVisible
              ? {}
              : { minHeight: Dimensions.get('window').height, justifyContent: 'center' },
          ]}
        >
          <Title style={styles.title}>{strings.appName}</Title>
          <Snippet style={styles.welcome}>{strings.welcome}</Snippet>
          <Snippet style={styles.label}>{strings.email}</Snippet>
          <Input
            typoValidation={email => emailIsValid(email)}
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
            inputMode="email"
            keyboardType="email-address"
            ref={emailRef}
            placeholder={strings.emailPlaceholder}
            onSubmitEditing={() => {
              if (passwordRef.current) passwordRef.current.focus();
            }}
          />
          <Snippet style={styles.label}>{strings.password}</Snippet>
          <PasswordInput
            autoComplete="off"
            textContentType="password"
            autoCapitalize="none"
            returnKeyType="done"
            ref={passwordRef}
            placeholder={strings.passwordPlaceholder}
            onSubmitEditing={() => {}}
          />
          <Snippet snippetType="small-alert">{strings.passwordSmall}</Snippet>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity style={styles.forgotPassword}>
              <Snippet style={[styles.forgotPasswordSnippet, { color: design.link }]}>
                {strings.forgotPassword}
              </Snippet>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Button onPress={() => {}} style={[styles.button, styles.buttonSignIn]}>
              <Snippet>{strings.enter}</Snippet>
            </Button>
            <Button
              onPress={() => navigation.navigate('SignUp')}
              style={[styles.button, styles.buttonSignUp]}
            >
              <Snippet>{strings.signUp}</Snippet>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  title: { marginVertical: 32 },
  welcome: {
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPassword: {
    marginTop: 16,
    marginBottom: 32,
  },
  forgotPasswordSnippet: {
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    width: '50%',
  },
  buttonSignIn: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderEndWidth: 1,
  },
  buttonSignUp: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderEndWidth: 1,
  },
});
