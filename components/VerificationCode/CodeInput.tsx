import { RefObject } from "react";
import {
  Platform,
  TextInput,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";

type TCodeInput = {
  inputRef: RefObject<TextInput>;
  value: string;
  onChange: (value: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputSize: string;
  focusedBgColor?: string;
  unfocusedBgColor?: string;
  focusedTextColor?: string;
  unfocusedTextColor?: string;
  placeholderColor?: string;
  borderColor?: string;
  imageSource?: ImageSourcePropType;
  imageStyle?: object;
};

const PLACEHOLDER = "0";

const CodeInput = ({
  inputRef,
  value,
  onChange,
  isFocused,
  onFocus,
  onBlur,
  inputSize,
  focusedBgColor = "bg-pink-300", // Usando la clase Tailwind
  unfocusedBgColor = "bg-white",
  focusedTextColor = "text-white",
  unfocusedTextColor = "text-brown-800",
  placeholderColor = "#C9C7C5",
  borderColor = "border-green-600",
  imageSource,
  imageStyle = { width: 40, height: 40 },
}: TCodeInput) => (
  <View className={`${inputSize} rounded-full mx-1 mt-4 relative`}>
    {imageSource && (
      <View className="absolute -top-12 w-full items-center z-10">
        <Image source={imageSource} style={imageStyle} />
      </View>
    )}

    <TextInput
      ref={inputRef}
      className={`
        w-full h-full rounded-full text-center text-5xl p-1 font-UrbanistExtraBold
        ${
          isFocused
            ? `${focusedBgColor} ${focusedTextColor} border-2 ${borderColor}`
            : `${unfocusedBgColor} ${unfocusedTextColor}`
        }`}
      placeholderTextColor={placeholderColor}
      placeholder={PLACEHOLDER}
      multiline={true}
      style={{
        ...Platform.select({
          ios: {
            paddingTop: 30,
          },
          android: {
            lineHeight: 64,
            paddingVertical: 20,
          },
        }),
      }}
      keyboardType="numeric"
      maxLength={1}
      value={value}
      onChangeText={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </View>
);

export default CodeInput;
