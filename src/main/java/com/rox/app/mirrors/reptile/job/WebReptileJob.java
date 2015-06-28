package com.rox.app.mirrors.reptile.job;

import com.rox.app.mirrors.web.common.ApplicationContextListener;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.rox.app.mirrors.reptile.WebReptile;

public class WebReptileJob implements Job {

    public void execute(JobExecutionContext context) throws JobExecutionException {
        context.get("");
        System.err.println("WebReptileJob is executing...");
        WebReptile reptile = ApplicationContextListener.getBean(WebReptile.class);
        reptile.run();
    }
}
