package com.rox.app.mirrors.web.util.persistence;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.rox.app.mirrors.web.util.Collections3;
import com.rox.app.mirrors.web.util.DateUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.google.common.collect.Lists;

public class DynamicSpecifications {

    public static <T> Specification<T> bySearchFilter(final Collection<SearchFilter> filters, final Class<T> entityClazz) {
        return new Specification<T>() {
            @SuppressWarnings({"unchecked", "rawtypes"})
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                if (Collections3.isNotEmpty(filters)) {

                    List<Predicate> predicates = Lists.newArrayList();
                    for (SearchFilter filter : filters) {

                        // 日期型的
                        if (filter.fieldName.endsWith("Date") || filter.fieldName.endsWith("time")) {
                            if (!(filter.value instanceof Date)) {

                                if (filter.value.toString().length() == 10) {
                                    // 如果是结束日期，并且没有指定时分秒，则将时分秒改为 23:59:59
                                    Date maxDate = DateUtil.convertToDate(DateUtil.FORMATE_YYYY_MM_DD_MINUS, (String) filter.value);
                                    Calendar c = Calendar.getInstance();
                                    c.setTime(maxDate);
                                    if (SearchFilter.Operator.LTE.equals(filter.operator) && c.get(Calendar.HOUR) == 0
                                            && c.get(Calendar.MINUTE) == 0 && c.get(Calendar.SECOND) == 0) {
                                        c.set(Calendar.HOUR, 23);
                                        c.set(Calendar.MINUTE, 59);
                                        c.set(Calendar.SECOND, 59);
                                    }
                                    filter.value = c.getTime();
                                } else {
                                    filter.value = DateUtil.convertToDate(DateUtil.FORMATE_YYYY_MM_DD_HH_MM_SS_MINUS, (String) filter.value);
                                }
                            }
                        }
                        // nested path translate, 如Task的名为"user.name"的filedName, 转换为Task.user.name属性
                        String[] names = StringUtils.split(filter.fieldName, ".");
                        Path expression = root.get(names[0]);
                        for (int i = 1; i < names.length; i++) {
                            expression = expression.get(names[i]);
                        }
                        // logic operator
                        switch (filter.operator) {
                            case EQ:
                                predicates.add(builder.equal(expression, filter.value));
                                break;
                            case NEQ:
                                predicates.add(builder.notEqual(expression, filter.value));
                                break;
                            case LIKE:
                                predicates.add(builder.like(expression, "%" + filter.value + "%"));
                                break;
                            case STARTWITH:
                                predicates.add(builder.like(expression, filter.value + "%"));
                                break;
                            case GT:
                                predicates.add(builder.greaterThan(expression, (Comparable) filter.value));
                                break;
                            case LT:
                                predicates.add(builder.lessThan(expression, (Comparable) filter.value));
                                break;
                            case GTE:
                                predicates.add(builder.greaterThanOrEqualTo(expression, (Comparable) filter.value));
                                break;
                            case LTE:
                                predicates.add(builder.lessThanOrEqualTo(expression, (Comparable) filter.value));
                                break;
                            case IN:
                                predicates.add(builder.in(expression).value(filter.value));
                                break;
                        }
                    }
                    // 将所有条件用 and 联合起来
                    if (!predicates.isEmpty()) {
                        return builder.and(predicates.toArray(new Predicate[predicates.size()]));
                    }
                }

                return builder.conjunction();
            }
        };
    }
}
