import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import createStyles from "./Report.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { handleMaxWordCount } from "shared/functions";
import { StringIndicator } from "./indicators.components";
import { INDICATORS } from "./contants";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface IReportProps {
  style?: CustomStyleProp;
  data: any;
}

const Report: React.FC<IReportProps> = ({ style, data }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const details = data?.details;
  const score = data?.score;
  return (
    <View style={styles.container}>
      <View style={styles.indicators_head}>
        <Text h2 bold color={colors.black}>
          Content Analysis
        </Text>
        <Text color={colors.black}>
          {"VR Score : "} {score}
        </Text>
      </View>
      {!!details?.quality && (
        <StringIndicator
          value={details?.quality?.score}
          title={INDICATORS.quality.title}
          //   max={INDICATORS.quality.maxScore}
          description={INDICATORS.quality.description}
          boldTitle
          isNumber
        />
      )}
      {!!details?.biasedLanguage && (
        <StringIndicator
          value={details?.biasedLanguage?.score}
          title={INDICATORS.biasedLanguage.title}
          //   max={INDICATORS.biasedLanguage.maxScore}
          description={INDICATORS.biasedLanguage.description}
          boldTitle
          thickBorder
          isNumber
        />
      )}
      {!!details?.tone && (
        <StringIndicator
          value={details?.tone?.label}
          title={INDICATORS.tone.title}
          description={INDICATORS.tone.description}
        />
      )}
      {/* {!!details?.languageStats?.data?.properNouns && (
        <StringIndicator
          value={INDICATORS.languageStats.toString(
            details?.languageStats?.data?.properNouns,
          )}
          title={INDICATORS.languageStats.data.properNouns.title}
          description={INDICATORS.languageStats.data.properNouns.description}
          titleLeftPadding
          isNumber
        />
      )}
      {!!details?.languageStats?.data?.pronouns && (
        <StringIndicator
          value={INDICATORS.languageStats.toString(
            details.languageStats.data.pronouns,
          )}
          title={INDICATORS.languageStats.data.pronouns.title}
          description={INDICATORS.languageStats.data.pronouns.description}
          titleLeftPadding
          isNumber
        />
      )}
      {!!details?.languageStats?.data?.adjectives && (
        <StringIndicator
          value={INDICATORS.languageStats.toString(
            details.languageStats.data.adjectives,
          )}
          title={INDICATORS.languageStats.data.adjectives.title}
          description={INDICATORS.languageStats.data.adjectives.description}
          titleLeftPadding
          isNumber
        />
      )}
      {!!details?.languageStats?.data?.adverbs && (
        <StringIndicator
          value={INDICATORS.languageStats.toString(
            details.languageStats.data.adverbs,
          )}
          title={INDICATORS.languageStats.data.adverbs.title}
          description={INDICATORS.languageStats.data.adverbs.description}
          titleLeftPadding
          isNumber
        />
      )} */}
      {!!details?.textLanguage && (details?.textLanguage?.score ?? 0) >= 50 && (
        <StringIndicator
          value={details.textLanguage.label}
          title={INDICATORS.textLanguage.title}
          description={INDICATORS.textLanguage.description}
        />
      )}
      {!!details?.readability && (
        <StringIndicator
          value={details.readability.score}
          title={INDICATORS.readability.title}
          //   max={INDICATORS.readability.maxScore}
          description={INDICATORS.readability.description}
          isNumber
          boldTitle
          thickBorder
        />
      )}
      {!!details?.offensiveLanguage && (
        <StringIndicator
          value={details.offensiveLanguage.label}
          title={INDICATORS.offensiveLanguage.title}
          description={INDICATORS.offensiveLanguage.description}
          color={INDICATORS.offensiveLanguage.scoreToColor(
            details.offensiveLanguage.score,
          )}
        />
      )}
      {!!details?.hateSpeech && (
        <StringIndicator
          value={details.hateSpeech.label}
          title={INDICATORS.hateSpeech.title}
          description={INDICATORS.hateSpeech.description}
          color={INDICATORS.hateSpeech.scoreToColor(details.hateSpeech.score)}
        />
      )}
      {!!details?.clickbait && (
        <StringIndicator
          value={details.clickbait.label}
          title={INDICATORS.clickbait.title}
          description={INDICATORS.clickbait.description}
          color={INDICATORS.clickbait.scoreToColor(details.clickbait.score)}
        />
      )}
      {!!details?.propagandaLikelihood && (
        <StringIndicator
          value={details.propagandaLikelihood.label}
          title={INDICATORS.propagandaLikelihood.title}
          description={INDICATORS.propagandaLikelihood.description}
          color={INDICATORS.propagandaLikelihood.scoreToColor(
            details.propagandaLikelihood.score,
          )}
        />
      )}
      {!!details?.timeValue && (
        <StringIndicator
          value={details.timeValue.label}
          title={INDICATORS.timeValue.title}
          description={INDICATORS.timeValue.description}
        />
      )}
      {!!details?.externalReferences &&
        Array.isArray(details.externalReferences.data) && (
          <StringIndicator
            value={details.externalReferences.label}
            title={INDICATORS.externalReferences.title}
            description={INDICATORS.externalReferences.description}
            color={INDICATORS.externalReferences.scoreToColor(
              details.externalReferences.score,
            )}
            thickBorder
            links={details.externalReferences.data}
          />
        )}
      {!!details?.sourceDiversity &&
        Array.isArray(details.sourceDiversity.data) && (
          <StringIndicator
            value={details.sourceDiversity.label}
            title={INDICATORS.sourceDiversity.title}
            description={INDICATORS.sourceDiversity.description}
            color={INDICATORS.sourceDiversity.scoreToColor(
              details.sourceDiversity.score,
            )}
            links={details.sourceDiversity.data}
            convertToAbsoluteLinks
          />
        )}
      {!!details?.affiliatedLinks &&
        Array.isArray(details.affiliatedLinks.data) && (
          <StringIndicator
            value={details.affiliatedLinks.label}
            title={INDICATORS.affiliatedLinks.title}
            description={INDICATORS.affiliatedLinks.description}
            color={INDICATORS.affiliatedLinks.scoreToColor(
              details.affiliatedLinks.score,
            )}
            links={details.affiliatedLinks.data}
          />
        )}
    </View>
  );
};

export default Report;
