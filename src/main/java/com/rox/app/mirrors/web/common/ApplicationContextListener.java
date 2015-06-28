package com.rox.app.mirrors.web.common;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

/**
 * spring上下文初始化监听器
 *
 * @author lixu
 */
public class ApplicationContextListener implements ApplicationListener<ContextRefreshedEvent> {
    private static ApplicationContext applicationContext;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        applicationContext = event.getApplicationContext();
    }

    public static Object getBean(String beanName) {
        return applicationContext.getBean(beanName);
    }

    public static <T> T getBean(Class<T> c) {
        return applicationContext.getBean(c);
    }
}
