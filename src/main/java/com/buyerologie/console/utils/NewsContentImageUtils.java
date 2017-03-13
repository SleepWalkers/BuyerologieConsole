package com.buyerologie.console.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;

public class NewsContentImageUtils {

    private static final String  RE1                      = "(<img alt=\".*?\" src=\")";          // Any Single Character 1
    private static final String  RE2                      = "(\\/image\\/.*?)";                   // Non-greedy match on filler
    private static final String  RE3                      = "(\" )";                              // Any Single Character 8
    private static final String  RE4                      = "(style=\")";                         // Word 5
    private static final String  RE5                      = "(.*?)";                              // Variable Name 3
    private static final String  RE6                      = "(\" )";                              // Any Single Character 11
    private static final String  RE7                      = "(\\/>)";                             // Any Single Character 13

    private static final String  REPLACE_STYLE            = "margin:0 auto; width:80%";

    private static final String  STYLE_ATTR               = "style=\"margin:0 auto; width:80%\" ";

    private static final String  A_TAG                    = "<a href=\"%s\">%s</a>";

    private static final Pattern IMAGE_HAVE_STYLE_PATTERN = Pattern.compile(
        RE1 + RE2 + RE3 + RE4 + RE5 + RE6 + RE7, Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

    private static final Pattern IMAGE_PATTERN            = Pattern.compile(RE1 + RE2 + RE3 + RE7,
        Pattern.CASE_INSENSITIVE | Pattern.DOTALL);

    public static String formatImageTag(String content) {
        if (StringUtils.isBlank(content)) {
            return null;
        }

        content = replaceImageTagHaveStyle(content);
        content = replaceImageTagNoStyle(content);
        return content;

    }

    private static final String replaceImageTagHaveStyle(String content) {
        Matcher m = IMAGE_HAVE_STYLE_PATTERN.matcher(content);
        while (m.find()) {
            String originalStr = m.group(1) + m.group(2) + m.group(3) + m.group(4) + m.group(5)
                                 + m.group(6) + m.group(7);

            if (originalStr.contains(STYLE_ATTR)) {
                continue;
            }
            String newStr = String.format(A_TAG, m.group(2),
                m.group(1) + m.group(2) + m.group(3) + m.group(4) + REPLACE_STYLE + m.group(6)
                                                             + m.group(7));

            content = content.replace(originalStr, newStr);
        }
        return content;
    }

    private static final String replaceImageTagNoStyle(String content) {
        Matcher m = IMAGE_PATTERN.matcher(content);
        while (m.find()) {
            if (m.group(2).contains("style")) {
                continue;
            }
            String originalStr = m.group(1) + m.group(2) + m.group(3) + m.group(4);
            if (originalStr.contains(STYLE_ATTR)) {
                continue;
            }
            String newStr = String.format(A_TAG, m.group(2),
                m.group(1) + m.group(2) + m.group(3) + STYLE_ATTR + m.group(4));
            content = content.replace(originalStr, newStr);
        }
        return content;
    }

    public static void main(String[] args) {
        String txt = "123123123123<a href=\"/image/d1dd3104e51d479898e1fcfd91fd7d701020 (2).jpg\"><img alt=\"\" src=\"/image/d1dd3104e51d479898e1fcfd91fd7d701020 (2).jpg\" style=\"margin:0 auto; width:80%\" /></a>13412414134<a href=\"/image/d1dd3104e51d479898e1fcfd91fd7d701020 (2).jpg\"><img alt=\"\" src=\"/image/d1dd3104e51d479898e1fcfd91fd7d701020 (2).jpg\" style=\"margin:0 auto; width:80%\" /></a>";

        System.out.println(txt);
        System.out.println(formatImageTag(txt));
    }
}
