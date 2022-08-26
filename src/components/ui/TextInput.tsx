import { useTheme } from "@react-navigation/native";
import React, { forwardRef, useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface TextInputProps extends RNTextInputProps {
  icon: string;
  error?: string;
  touched?: boolean;
}

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ icon, error, touched, ...rest }: TextInputProps, ref) => {
    const theme = useTheme();
    const { colors } = theme;
    const [secure, setSecure] = useState(rest.secureTextEntry);
    const validationColor = !touched
      ? colors.gray
      : error
      ? colors.danger
      : colors.gray;
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 48,
            borderRadius: 12,
            borderColor: validationColor,
            borderWidth: 1,
          }}
        >
          <Icon
            name={icon}
            type="AntDesign"
            color={validationColor}
            style={{ padding: 8 }}
            size={18}
          />
          <View style={{ flex: 1 }}>
            <RNTextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.5)"
              ref={ref}
              {...rest}
              secureTextEntry={secure}
            />
          </View>
          {rest.secureTextEntry && (
            <Icon
              name={secure ? "eye-off-outline" : "eye-outline"}
              type="Ionicons"
              color={validationColor}
              size={18}
              style={{ padding: 8 }}
              onPress={() => setSecure((s) => !s)}
            />
          )}
        </View>
        <Text color={validationColor}>{error}</Text>
      </>
    );
  },
);

export default TextInput;
