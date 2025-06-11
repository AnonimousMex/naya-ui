import { CloudBackground } from '@/components/MainPanesComponents/CloudBackground';
import { ICONS, IMAGES } from '@/constants/images';
import { TSignUpSchema } from '@/models/Auth';
import { useScreenDimensions } from '@/utils/dimensions';
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from 'react-hook-form';
import { MainButton } from "@/components/MainButton";
import { 
  ScrollView, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  View
} from 'react-native'
import { singUpSchema } from '@/schemas/authSchema';
import { singUpDefaultValues } from '@/constants/defaultValues/auth';
import InputField from '@/components/InputField/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordFields from '@/components/SingUp/PasswordFields';
import { ERROR_TEXTS } from '@/constants/errors/errorTexts';
import { validatePasswordMatch } from '@/utils/auth';
import { BackButton } from '@/components/BackButton';
import { router } from 'expo-router';
import { useSnackbar } from '@/hooks/useSnackbar';

function SingUp() {
  const { sloganWidth, sloganHeight } =
      useScreenDimensions();    

  const formMethods = useForm<TSignUpSchema>({
    resolver: zodResolver(singUpSchema),
    mode: "onSubmit",
    defaultValues: singUpDefaultValues,
  })

  const {control, handleSubmit, setError } = formMethods;
  const { showSnackbar } = useSnackbar();

  const handleOnSubmit = (data: TSignUpSchema) => {
    if (!validatePasswordMatch(data.password, data.confirmPassword)) {
      setError("password", {
        message: ERROR_TEXTS.INVALID_PASSWORDS_MATCH_FIELD,
      });
      setError("confirmPassword", {
        message: ERROR_TEXTS.INVALID_PASSWORDS_MATCH_FIELD,
      });
      showSnackbar({
        message: ERROR_TEXTS.INVALID_PASSWORDS_MATCH_ALERT,
        type: "error",
      });
      return;
    }
  }
  const onInvalidForm = () => {
    showSnackbar({ type: "warning" });
  }

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-pink-200" 
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <CloudBackground />
        <SafeAreaView>
          <ScrollView className="mt-8 px-7" showsVerticalScrollIndicator={false}>
            <View className="items-start">
                <BackButton onPress={() => router.push("/(auth)/welcome")} />
            </View>
            <Image
              className='mt-4 mb-8 self-center'
              source={IMAGES.NAYA_SLOGAN}
              style={{
                width: sloganWidth,
                height: sloganHeight,
                resizeMode: "contain",
              }}
            />
            <FormProvider {...formMethods}>
              <InputField
                name="name"
                label='Nombre'
                placeholder='Ingresa tu nombre'
                control={control}
                required
                iconSrc={ICONS.PERSON_ICON}
              />
              <InputField 
                name="email"
                label='Email'
                placeholder='Ingresa tu correo electronico'
                control={control}
                required
                iconSrc={ICONS.EMAIL_ICON}
              />
              <PasswordFields />
              <MainButton
                mainText="Registrarme"
                onPress={handleSubmit(handleOnSubmit, onInvalidForm)}
                className="w-80 py-3 mt-16 mb-20"
                style={{ height: 50 }}
              />
            </FormProvider>
          </ScrollView>
        </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default SingUp;