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
  email: string;
}

const formSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required").email("Invalid email."),
  password: yup.string().required("Password is required"),
});

const Signup = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { loading, error, success, register } = useAuth();

  const initialValues: FormValues = {
    username: "",
    password: "",
    email: "",
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
      register(values);
    },
  });

  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);

  const handleSignIn = () => {
    NavigationService.navigate(SCREENS.AUTH, {
      screen: SCREENS.SIGNIN,
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
          Sign Up
        </Text>
        <View style={{ marginBottom: 6, width: "100%" }}>
          <TextInput
            icon="user"
            placeholder="Enter your username"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            error={errors.username}
            touched={touched.username}
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </View>
        <View style={{ marginBottom: 6, width: "100%" }}>
          <TextInput
            ref={emailRef}
            icon="mail"
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>
        <View style={{ marginBottom: 6, width: "100%" }}>
          <TextInput
            ref={passwordRef}
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
          label="Sign up"
          onPress={handleSubmit}
          loading={loading}
          disabled={!(isValid && dirty)}
        />

        {!!error && (
          <Text style={{ marginVertical: 24 }} color={colors.danger}>
            {typeof error === "string" ? error : "Something went wrong!"}
          </Text>
        )}

        {!!success && (
          <Text style={{ marginVertical: 24 }} color={colors.primary}>
            {typeof success === "string" ? success : ""}
          </Text>
        )}

        <Text style={{ marginVertical: 12 }}>Already a member?</Text>

        <Button label="Log In" outlined onPress={handleSignIn} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default Signup;
