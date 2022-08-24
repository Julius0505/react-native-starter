import React, { useCallback, useState, useMemo } from "react";
import Icon from "react-native-dynamic-vector-icons";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./indicators.style";

interface StringIndicatorProps {
  title: string;
  value: string;
  description: string;
  color?: string;
  titleLeftPadding?: boolean;
  isNumber?: boolean;
  thickBorder?: boolean;
  boldTitle?: boolean;
  // eslint-disable-next-line
  links?: any[];
  // eslint-disable-next-line
  convertToAbsoluteLinks?: any;
}

export function StringIndicator({
  title,
  value,
  description,
  color,
  titleLeftPadding,
  isNumber = false,
  thickBorder = false,
  boldTitle = false,
  links = [],
  convertToAbsoluteLinks,
}: StringIndicatorProps) {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [open, setOpen] = useState(false);
  const onValueClick = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  return (
    <View>
      <View
        style={[
          styles.indicator,
          {
            marginLeft: titleLeftPadding ? 20 : 0,
            borderTopWidth: thickBorder ? 5 : 1,
          },
        ]}
      >
        {/* <HoverInfo text={description}> */}
        <Text
          style={{ fontWeight: boldTitle ? "700" : "400" }}
          color={colors.black}
        >
          {title}
        </Text>
        {/* </HoverInfo> */}

        <TouchableOpacity style={styles.inline} onPress={onValueClick}>
          <Text
            color={color ?? colors.black}
            style={{ fontWeight: isNumber ? "700" : "500" }}
          >
            {value}
          </Text>
          {links.length > 0 && (
            <Icon
              name={`caret-${open ? "up" : "down"}`}
              type="Ionicons"
              color={colors.primary}
              size={12}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.link}>
        {links.length > 0 &&
          open &&
          links.map((link) => {
            let href = link;

            if (convertToAbsoluteLinks && !isAbsoluteURL(href)) {
              href = `https://${href}`;
            }

            return (
              <View key={link}>
                <Text h5 color={colors.primary}>
                  {link}
                </Text>
                {/* <a
                  className="button"
                  href={href}
                  target={"_blank"}
                  rel={"noreferrer noopener"}
                >
                  {link}
                </a> */}
              </View>
            );
          })}
      </View>
    </View>
  );
}

interface HoverInfoProps {
  text: string;
  children?: React.ReactNode;
}

function HoverInfo({ text, children }: HoverInfoProps) {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View>
      {children}
      <Text style={styles.hover_info}>{text}</Text>
    </View>
  );
}

function isAbsoluteURL(url: string) {
  if (url.indexOf("://") > 0 || url.indexOf("//") === 0) {
    return true;
  }

  return false;
}
