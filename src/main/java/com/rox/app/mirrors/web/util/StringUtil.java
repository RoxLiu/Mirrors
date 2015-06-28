package com.rox.app.mirrors.web.util;

import java.util.Random;

/**
 * 字符串操作类
 *
 * @author lixu
 */
public class StringUtil {

    /**
     * 在指定字符串左边添加指定位数的字符。
     *
     * @param st  需要处理的字符串
     * @param pad 追加的字符
     * @param cnt 追加的位数
     * @return 追加后的字符串
     */
    public static String lPad(String st, char pad, int cnt) {

        if (st == null) return st;
        StringBuilder sb = new StringBuilder();
        while (sb.toString().length() < cnt - st.length()) {
            sb.append(pad);
        }
        sb.append(st);
        return sb.toString();
    }

    /**
     * 给指定字符串在左边添加指定位数的0
     *
     * @param st  需要添加的字符串
     * @param cnt 位数
     * @return 添加后的字符串
     */
    public static String lPadZero(String st, int cnt) {

        return lPad(st, '0', cnt);
    }

    /**
     * @param str
     * @return
     * @description 将字符串的首字母转换成大写形式的
     */
    public static String capitalize(String str) {
        if (str == null || str.trim().length() == 0)
            return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1, str.length());
    }

    /**
     * @param str
     * @param symbol
     * @return
     * @description 提取最后一个标记之前的字符串
     */
    public static String beforeLastSymbol(String str, String symbol) {
        if (str == null || symbol == null)
            return null;
        int index = str.lastIndexOf(symbol);
        return index > -1 ? str.substring(0, index) : "";
    }

    /**
     * @param str
     * @param symbol
     * @return
     * @description 提取最后一个标记之后的字符串
     */
    public static String afterLastSymbol(String str, String symbol) {
        if (str == null || symbol == null)
            return null;
        int index = str.lastIndexOf(symbol);
        return index > -1 ? str.substring(index + symbol.length(), str.length()) : "";
    }

    /**
     * 给字符串去空
     *
     * @param str
     * @return
     */
    public static String TransNull(String str) {
        if (str == null) {
            str = "";
        }
        return str;
    }

    /**
     * 转换为html文字编码.<br>
     */
    public static String htmltextencoder(String src) {
        if (src == null || src.equals("")) {
            return "";
        }

        String dst = src;
        dst = replaceall(dst, "&amp;", "&");
        dst = replaceall(dst, "&lt;", "<");
        dst = replaceall(dst, "&gt;", ">");
        dst = replaceall(dst, "&quot;", "\"");
        dst = replaceall(dst, "&acute;", "\\");
        dst = replaceall(dst, "\r\n", "<br>");
        dst = replaceall(dst, "\r", "<br>");
        dst = replaceall(dst, "\n", "<br>");
        dst = replaceall(dst, " ", "");
        dst = replaceall(dst, "  ", "");
        return dst;
    }

    /**
     * 将字符串src中的子字符串fnd全部替换为新子字符串rep.<br>
     * 功能相当于java sdk 1.4的string.replaceall方法.<br>
     * 不同之处在于查找时不是使用正则表达式而是普通字符串.
     */
    public static String replaceall(String src, String fnd, String rep) {
        if (src == null || src.equals("")) {
            return "";
        }
        String dst = src;

        int idx = dst.indexOf(fnd);

        while (idx >= 0) {
            dst = dst.substring(0, idx) + rep
                    + dst.substring(idx + fnd.length(), dst.length());
            idx = dst.indexOf(fnd, idx + rep.length());
        }

        return dst;

    }

    public static final String escapeHTMLTags(String input) {
        if (input == null || input.length() == 0) {
            return input;
        }
        StringBuffer buf = new StringBuffer(input.length());
        char ch = ' ';
        for (int i = 0; i < input.length(); i++) {
            ch = input.charAt(i);
            if (ch == '<') {
                buf.append("&lt;");
            } else if (ch == '>') {
                buf.append("&gt;");
            } else {
                buf.append(ch);
            }
        }
        return buf.toString();
    }

    public static boolean isNum(String str) {
        return str.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$");
    }

    /**
     * 将字符串转移为ASCII码
     *
     * @param cnStr
     * @return
     */
    public static String getCnASCII(String cnStr) {
        StringBuffer strBuf = new StringBuffer();
        byte[] bGBK = cnStr.getBytes();
        for (int i = 0; i < bGBK.length; i++) {
            // System.out.println(Integer.toHexString(bGBK[i]&0xff));
            strBuf.append(Integer.toHexString(bGBK[i] & 0xff));
        }
        return strBuf.toString();
    }

    public static String getRandomInt() {
        // 种子你可以随意生成，但不能重复
        int[] seed = {1, 2, 3, 4, 5, 6, 7, 8, 9, 0};
        Random ran = new Random();
        StringBuilder sb = new StringBuilder();
        // 数量你可以自己定义。
        // 数量你可以自己定义。
        for (int i = 0; i < 6; i++) {
            //得到一个位置
            int j = ran.nextInt(seed.length - i);
            //得到那个位置的数值
            sb.append(seed[j]);
            //将最后一个未用的数字放到这里
            seed[j] = seed[seed.length - 1 - i];
        }
        return sb.toString();
    }

    public static String toUtf8String(String s) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 0 && c <= 255) {
                sb.append(c);
            } else {
                byte[] b;
                try {
                    b = Character.toString(c).getBytes("utf-8");
                } catch (Exception ex) {
                    System.out.println(ex);
                    b = new byte[0];
                }
                for (int j = 0; j < b.length; j++) {
                    int k = b[j];
                    if (k < 0)
                        k += 256;
                    sb.append("%" + Integer.toHexString(k).toUpperCase());
                }
            }
        }
        return sb.toString();
    }

    public static void main(String[] args) {

    }

}
