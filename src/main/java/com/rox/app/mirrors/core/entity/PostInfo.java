package com.rox.app.mirrors.core.entity;

/**
 * User: Administrator
 * Date: 13-8-27
 */

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author Administrator
 */
@Entity
@Table(name = "post_info")
public class PostInfo extends IdEntity{
    public static final int STATUS_IDLE = 0;
    public static final int STATUS_SYNC = 1;

    String title;
    String url;
    String lastUrl;
    int lastPost;
    int account;
    int status;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLastUrl() {
        return lastUrl;
    }

    public void setLastUrl(String lastUrl) {
        this.lastUrl = lastUrl;
    }

    public int getLastPost() {
        return lastPost;
    }

    public void setLastPost(int lastPost) {
        this.lastPost = lastPost;
    }

    public int getAccount() {
        return account;
    }

    public void setAccount(int account) {
        this.account = account;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
