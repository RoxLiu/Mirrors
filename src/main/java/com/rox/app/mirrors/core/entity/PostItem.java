package com.rox.app.mirrors.core.entity;

import com.rox.app.mirrors.core.entity.IdEntity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * User: Administrator
 * Date: 13-8-27
 */
@Entity
@Table(name = "post_item")
public class PostItem extends IdEntity {
    public String author;
    public String date;
    public String content;

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
