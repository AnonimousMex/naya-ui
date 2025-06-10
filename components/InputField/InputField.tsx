import { ICONS } from '@/constants/images';
import { ReactHookFormControl } from '@/models/Common';
import { useState } from 'react';
import { Controller, UseControllerReturn} from 'react-hook-form';
import { ImageSourcePropType, Pressable, View, Text, Image, TextInput } from 'react-native';

type TInputField = {
  name: string;
  label: string;
  placeholder: string;
  control: ReactHookFormControl;
  required: boolean;
  isPassword?: boolean;
  iconSrc?: ImageSourcePropType;
};

const InputField =({
    name,
    label,
    placeholder,
    control,
    iconSrc,
    required,
    isPassword = false,
}: TInputField) =>{
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return(
        <Pressable>
            <View className="my-2 w-full">
                <Text className="text-base font-UrbanistBold pl-1 pb-4">
                    {label} {required && "*"}
                </Text>
                <Controller 
                    control={control}
                    name={name}
                    render={({
                        field: { onChange: fieldOnChange, value: fieldValue, ref},
                        fieldState
                    }: UseControllerReturn) =>{
                        const errorExists = Boolean(fieldState.error?.message);
                        const errorMessage = fieldState.error?.message || "";

                        return(
                            <>
                                <View className={`-mt-2 flex flex-row justify-center items-center relative bg-white rounded-full border-4 border-transparent ${
                                    errorExists? "border-[#fb190075]"
                                    : isFocused ? "border-[#E0E3CF]"
                                        :"border-none"
                                }`}
                                >
                                    {iconSrc && (
                                        <Image source={iconSrc} className="w-6 h-6 ml-4" />
                                    )}
                                    <TextInput 
                                        key={name}
                                        onChangeText={fieldOnChange}
                                        value={fieldValue}
                                        className="rounded-full p-4 font-UrbanistSemiBold text-[15px] flex-1 text-left text-gray-600"
                                        placeholder={placeholder}
                                        placeholderTextColor="#ACA9A5"
                                        secureTextEntry={isPassword && !showPassword}
                                        selectionColor="#9BB168"
                                        clearTextOnFocus={false}
                                        autoComplete='off'
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        blurOnSubmit={false}
                                    />
                                    {isPassword && (
                                        <Pressable
                                            onPress={() => {setShowPassword(!showPassword)}}> 
                                            <Image source={ showPassword ? ICONS.EYE_CLOSED_ICON : ICONS.EYE_OPEN_ICON} className='w-7 h-7 mr-2'/>
                                        </Pressable>
                                    )}
                                </View>
                                {errorExists && (
                                    <Text className="text-danger-500 text-xs mt-1 pl-1">
                                        { errorMessage }
                                    </Text>
                                )}
                            </>
                        );
                    }}
                />
            </View>
        </Pressable>
    )
}

export default InputField