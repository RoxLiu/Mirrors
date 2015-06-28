/*******************************************************************************
 * Copyright (c)
 *******************************************************************************/
package com.rox.app.mirrors.web.util.persistence;

import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.StringUtils;

import com.google.common.collect.Maps;

public class SearchFilter {

    public enum Operator {
        EQ, LIKE, STARTWITH, GT, LT, GTE, LTE, NEQ, IN
    }

    public String fieldName;
    public Object value;
    public Operator operator;

    public SearchFilter(String fieldName, Operator operator, Object value) {
        this.fieldName = fieldName;
        this.value = value;
        this.operator = operator;
    }

    /**
     * searchParams中key的格式为OPERATOR_FIELDNAME
     */
    @SuppressWarnings("rawtypes")
    public static Map<String, SearchFilter> parse(Map<String, Object> searchParams) {

        Map<String, SearchFilter> filters = Maps.newHashMap();

        for (Entry<String, Object> entry : searchParams.entrySet()) {
            // 过滤掉空值
            String key = entry.getKey();
            Object value = entry.getValue();
            if (StringUtils.isBlank((String) value)) {
                continue;
            }
            // 拆分operator与filedAttribute
            String[] names = StringUtils.split(key, "_");
            if (names.length != 2) {
                throw new IllegalArgumentException(key + " is not a valid search filter name");
            }
            String filedName = names[1];
            Operator operator = Operator.valueOf(names[0]);
            if (Operator.IN == operator) {

                List<Object> list = new ArrayList<Object>();
                String[] filed_type = filedName.split("@");
                try {
                    Constructor c = Class.forName("java.lang." + filed_type[1]).getConstructor(String.class);
                    for (String s : ((String) value).split(",")) {
                        list.add(c.newInstance(s));
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }

                if (list.size() > 0) {
                    SearchFilter filter = new SearchFilter(filed_type[0], operator, list);
                    filters.put(key, filter);
                }
            } else {
                SearchFilter filter = new SearchFilter(filedName, operator, value);
                filters.put(key, filter);
            }
        }
        return filters;
    }
}
