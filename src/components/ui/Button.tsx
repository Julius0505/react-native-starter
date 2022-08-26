import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ButtonProps {
  label: string;
  outlined?: boolean;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  label,
  onPress,
  outlined,
  loading,
  disabled,
}: ButtonProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <TouchableOpacity
      style={{
        borderRadius: 12,
        width: "100%",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: outlined ? colors.transparent : colors.primary,
        borderColor: colors.primary,
        opacity: disabled ? 0.6 : 1,
        borderWidth: 1,
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator color={outlined ? colors.primary : colors.white} />
      )}
      <Text
        style={{
          fontSize: 18,
          color: outlined ? colors.primary : colors.white,
          paddingHorizontal: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
