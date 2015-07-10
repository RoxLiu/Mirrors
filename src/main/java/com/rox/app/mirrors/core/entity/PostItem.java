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
    public final static int TYPE_DELETED = 0;
    public final static int TYPE_OWNER = 1;
    public final static int TYPE_GENERAL = 2;
    public final static int TYPE_HIGHLIGHT = 3;

    public String author;
    public String date;
    public String content;
    public int type;
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

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
