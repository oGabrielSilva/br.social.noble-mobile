import { Backdrop } from '@Noble/components/Backdrop';
import { Button } from '@Noble/components/Button';
import { Input } from '@Noble/components/Input';
import { Snippet } from '@Noble/components/Snippet';
import { Title } from '@Noble/components/Title';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { RootStackParamList } from '@Noble/routes/LoggedOutRouteHandler';
import { getNumber } from '@Noble/utils/validation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const profilePlaceholderDT = require('@Noble/Assets/profile-placeholder-dt.png');

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const currentYear = new Date().getFullYear();
const minAge = 14;
const maxAge = 55;
const profileSize = Math.floor(Dimensions.get('screen').width / 6);

const getYearIsValid = (y: number) => y <= currentYear - minAge && y >= currentYear - maxAge;

export function SignUpScreen({ navigation }: Props) {
  const { design, strings } = useContext(GlobalContext);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const nameRef = useRef<TextInput>(null);
  const birthYearRef = useRef<TextInput>(null);

  const [gender, setGender] = useState<Gender>('M');

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
          <Title style={styles.title}>{strings.signUp}</Title>
          <Snippet style={styles.welcome}>{strings.welcomeSignUp}</Snippet>
          <View style={styles.profileContainer}>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={profilePlaceholderDT}
                style={{ width: profileSize, height: profileSize }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Snippet snippetType="link">{strings.remove}</Snippet>
            </TouchableOpacity>
          </View>
          <Snippet style={styles.label}>{strings.name}</Snippet>
          <Input
            typoValidation={name => name.length >= 2}
            autoComplete="name"
            maxLength={40}
            textContentType="name"
            autoCapitalize="words"
            returnKeyType="next"
            inputMode="text"
            keyboardType="default"
            ref={nameRef}
            placeholder={strings.namePlaceholder}
            onSubmitEditing={() => {
              if (birthYearRef.current) birthYearRef.current.focus();
            }}
          />
          <Snippet snippetType="small-alert">{strings.nameSmall}</Snippet>
          <Snippet style={styles.label}>{strings.birth}</Snippet>
          <Input
            maxLength={4}
            keyboardType="decimal-pad"
            placeholder="2003"
            ref={birthYearRef}
            typoValidation={text => {
              const year = getNumber(text);
              if (!year) return false;
              return getYearIsValid(Number(year));
            }}
          />
          <Snippet snippetType="small-alert">{strings.birthSmall}</Snippet>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => (gender === 'M' ? void 0 : setGender('M'))}>
              <Snippet
                style={{
                  color: gender !== 'M' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}
              >
                {strings.male}
              </Snippet>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (gender === 'F' ? void 0 : setGender('F'))}>
              <Snippet
                style={{
                  color: gender !== 'F' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}
              >
                {strings.female}
              </Snippet>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (gender === 'O' ? void 0 : setGender('O'))}>
              <Snippet
                style={{
                  color: gender !== 'O' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}
              >
                {strings.other}
              </Snippet>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => (navigation.canGoBack() ? navigation.goBack() : void 0)}
              style={[styles.button, { borderColor: design.danger }]}
            >
              <Snippet style={{ color: design.danger }}>{strings.goBack}</Snippet>
            </Button>
            <Button onPress={() => {}} style={[styles.button]}>
              <Snippet>{strings.createAccount}</Snippet>
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
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    borderRadius: profileSize,
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
    marginVertical: 32,
    justifyContent: 'space-evenly',
  },
  button: {
    width: '45%',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 32,
  },
});
