import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import * as NavigationService from "react-navigation-helpers";
import { Image, View, TextInput as RNTextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SCREENS } from "@shared-constants";
import { useAuth } from "store/auth/hooks";
import TextInput from "components/ui/TextInput";
import Button from "components/ui/Button";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

interface FormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const formSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});

const Signin = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { loading, error, login } = useAuth();

  const initialValues: FormValues = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    dirty,
  } = useFormik({
    validationSchema: formSchema,
    initialValues,
    onSubmit: (values: FormValues) => {
      login(values), console.log("formData", values);
    },
  });

  const password = useRef<RNTextInput>(null);

  const handleSignUp = () => {
    NavigationService.navigate(SCREENS.AUTH, {
      screen: SCREENS.SIGNUP,
    });
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          paddingHorizontal: 32,
        }}
      >
        <Image
          source={require("/assets/img/logo_inline.png")}
          style={{ marginVertical: 20 }}
        />
        <Text
          style={{
            color: "#223e4b",
            fontSize: 20,
            margin: 30,
          }}
        >
          Log In
        </Text>
        <View style={{ marginBottom: 6, width: "100%" }}>
          <TextInput
            icon="user"
            placeholder="Enter your email or username"
            autoCapitalize="none"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            error={errors.username}
            touched={touched.username}
            onSubmitEditing={() => password.current?.focus()}
          />
        </View>
        <View style={{ marginBottom: 6, width: "100%" }}>
          <TextInput
            // ref={password}
            icon="lock"
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            onSubmitEditing={() => handleSubmit()}
          />
        </View>

        <Button
          label="Log In"
          onPress={handleSubmit}
          loading={loading}
          disabled={!(isValid && dirty)}
        />

        <Text style={{ marginVertical: 24 }} color={colors.danger}>
          {error}
        </Text>

        <Text style={{ marginVertical: 12 }}>Aren't you a member yet?</Text>

        <Button label="Sign Up" outlined onPress={handleSignUp} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signin;
