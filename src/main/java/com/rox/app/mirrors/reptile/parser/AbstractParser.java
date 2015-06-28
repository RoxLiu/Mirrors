package com.rox.app.mirrors.reptile.parser;

/**
 * User: Administrator
 * Date: 13-8-27
 */
public abstract class AbstractParser {

    public abstract boolean hasNextPage();

    public abstract String getNextPage();

    public abstract void parser(String url);
}
